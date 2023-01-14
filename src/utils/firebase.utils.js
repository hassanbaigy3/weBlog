import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  deleteDoc,
  where,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChOSmUPjdwsXcmKx60rBdwL3pHyn3oU8c",
  authDomain: "capstone-blogging-db208.firebaseapp.com",
  projectId: "capstone-blogging-db208",
  storageBucket: "capstone-blogging-db208.appspot.com",
  messagingSenderId: "974424590878",
  appId: "1:974424590878:web:0e0e7f0e92f9af1505bc0f",
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectstoAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectstoAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.uid);
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const createNewBlog = async (newBlog) => {
  const collectionRef = collection(db, "blogs");
  return await addDoc(collectionRef, newBlog);
};
export const deleteBlog = async (documentId) => {
  const collectionRef = collection(db, "blogs");
  await deleteDoc(doc(collectionRef, documentId));
};

export const updateBlog = async (documentId, title, content) => {
  const collectionRef = collection(db, "blogs");
  const docRef = doc(collectionRef, documentId);
  await updateDoc(docRef, {
    title: title,
    content: content,
  });
};

//API TO FETCH MYBLOGS
export const getMyBlogs = async (uid) => {
  const collectionRef = collection(db, "blogs");
  const q = query(collectionRef, where("postedBy", "==", uid));
  const querySnapshot = await getDocs(q);
  const myBlogsArray = querySnapshot.docs.map((docSnapshot) => {
    const { title, content, date, displayName, postedBy } = docSnapshot.data();
    const obj = {
      uid: docSnapshot.id,
      title,
      content,
      date,
      displayName,
      postedBy,
    };
    return obj;
  });
  return myBlogsArray;
};

export const getBlogByID = async (blogID) => {
  const docRef = doc(db, "blogs", blogID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { uid, title, content, date, displayName, postedBy } = docSnap.data();
    return {
      uid,
      title,
      content,
      date,
      displayName,
      postedBy,
    };
  }
};

export const getAllBlogs = async () => {
  const collectionRef = collection(db, "blogs");

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const allBlogsArray = querySnapshot.docs.map((docSnapshot) => {
    const { title, content, date, displayName, postedBy } = docSnapshot.data();
    const obj = {
      uid: docSnapshot.id,
      title,
      content,
      date,
      displayName,
      postedBy,
    };
    return obj;
  });
  return allBlogsArray;
};

//Function to create user in the DB
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.user.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, uid } = userAuth.user;
    await setDoc(userDocRef, {
      uid,
      email,
      displayName,
      ...additionalInformation,
    });
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
  if (!email || !password) return;
  const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, { displayName: displayName });
  return userCredentials;
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  signOut(auth);
};
