import { useState, ChangeEvent, useEffect } from "react";

import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setMyBlogs } from "../features/my-blogs.slice";
import { setAllBlogs } from "../features/all-blogs.slice";

import Loader from "./loader.component";
import FormInput from "./form-input.component";
import ErrorToast from "./error-toast.component";

import { EditBlog } from "../utils/types";
import { createNewBlog, getMyBlogs, getAllBlogs, updateBlog } from "../utils/firebase.utils";


type EditBlogModalProps =
  | {
      isEdit: boolean;
      blogToEdit: EditBlog;
    }
  | {
      isEdit?: boolean;
      blogToEdit: null;
    };

type BlogModalProps = EditBlogModalProps & {
  onClose: () => void;
};

const defaultFormFields = {
  title: "",
  content: "",
};

const CreateBlogModal = ({ isEdit = false, blogToEdit, onClose }: BlogModalProps) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { title, content } = formFields;

  //Global Variables
  const dispatch = useDispatch();
  const myGlobalBlogs = useSelector((state: RootState) => state.myBlogs);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  useEffect(() => {
    if (blogToEdit !== null) {
      setFormFields({ title: blogToEdit.title as string, content: blogToEdit.content as string });
    } else {
      setFormFields({ title: "", content: "" });
    }
  }, [blogToEdit]);

  const fetchBlogs = async () => {
    const fetchedAllBlogs = await getAllBlogs();
    const fetchedMyBlogs = await getMyBlogs(currentUser.uid);
    dispatch(setAllBlogs(fetchedAllBlogs));
    dispatch(setMyBlogs(fetchedMyBlogs));
  };

  const handleOnClose = (e: React.SyntheticEvent) => {
    if ((e.target as HTMLInputElement).id === "container" || (e.target as HTMLInputElement).id === "closeBTN") {
      onClose();
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isEdit) {
      await updateBlog(blogToEdit?.uid, formFields.title, formFields.content);

      const updatedBlogs = myGlobalBlogs.myBlogs.map((obj) => {
        if (obj.uid === blogToEdit?.uid) {
          return { ...obj, title: formFields.title, content: formFields.content };
        }
        return obj;
      });
      dispatch(setMyBlogs(updatedBlogs));
      setIsLoading(false);
    } else {
      const CurrentDate = new Date();
      const setCurrentDate = CurrentDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const newBlog = {
        title,
        content,
        date: setCurrentDate,
        postedBy: currentUser.uid,
        displayName: currentUser.displayName,
      };

      try {
        const newBlogSuccess = await createNewBlog(newBlog);
        if (newBlogSuccess!.type === "document") {
          fetchBlogs();
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setError("Couldn't create blog");
      }
    }
    setFormFields(defaultFormFields);
    onClose();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div
      id="container"
      className="flex justify-center items-center bg-black/30 fixed inset-0 bg-opacity-50 backdrop-blur-sm"
    >
      <div className="w-3/5 h-fit p-8 bg-white rounded shadow-black shadow-2xl max-w-6xl md:w-4/5 sm:p-4">
        <div className="flex flex-row justify-between mb-6">
          <div className="font-Serif-Display text-4xl md:text-center sm:text-2xl">
            {isEdit ? `EDIT BLOG` : `CREATE BLOG`}
          </div>
          <button
            onClick={handleOnClose}
            id="closeBTN"
            className="flex justify-center items-center w-12 bg-black font-Lexand font-bold text-white md:w-9 md:text-lg"
          >
            X
          </button>
        </div>
        {error && <ErrorToast error={error} />}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
            required
            placeholder="Blog Title"
            className="pl-4"
          />
          <textarea
            name="content"
            value={content}
            onChange={handleChange}
            required
            placeholder="Enter your blog here..."
            className="w-full h-64 pl-4 pt-2 border-2  border-secondary/75 focus:outline-none focus:border-primary/75"
          />
          <button
            type="submit"
            className="flex no-wrap justify-center items-center text-white bg-black text-2xl w-1/3 h-16 shrink-0 sm:text-xl md:w-full"
          >
            {isLoading ? <Loader color="bg-white" /> : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogModal;
