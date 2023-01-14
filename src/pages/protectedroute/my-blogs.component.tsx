import { useEffect, useState } from "react";

import Blog from "../../components/blog.component";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { resetMyBlogs, setMyBlogs } from "../../features/my-blogs.slice";

import { getMyBlogs } from "../../utils/firebase.utils";
import { Blog as BlogType, EditBlog } from "../../utils/types";
import CreateBlogModal from "../../components/create-blog-modal.component";
import DeleteBlogModal from "../../components/delete-blog.componenet";
import BlogsContainer from "../../components/blogs-container.component";

const MyBlogs = () => {
  //Local State

  const [searchField, setSearchField] = useState("");
  const [blogToEdit, setBlogToEdit] = useState<EditBlog | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //Global State Variabless
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const myGlobalBlogs = useSelector((state: RootState) => state.myBlogs);

  useEffect(() => {
    const myBlogs = async () => {
      const myAllBlogs: BlogType[] = await getMyBlogs(currentUser.uid);
      if (myAllBlogs.length) {
        dispatch(setMyBlogs(myAllBlogs));
      } else {
        dispatch(resetMyBlogs());
      }
    };
    myBlogs();
  }, );

  const filteredBlogs: Array<BlogType> = myGlobalBlogs.myBlogs.filter((blog: BlogType) =>
    blog.title.toLowerCase().includes(searchField)
  );

  return (
    <>
      <BlogsContainer isEmpty={filteredBlogs.length ? true : false} setSearchField={setSearchField}>
        {filteredBlogs.map((blog: BlogType) => (
          <Blog
            key={blog.uid}
            blog={blog}
            onEdit={() => {
              setBlogToEdit({ uid: blog.uid, title: blog.title, content: blog.content });
              setIsEditModalOpen(!isEditModalOpen);
            }}
            onDelete={() => {
              setBlogToDelete(blog.uid);
              setIsDeleteModalOpen(!isDeleteModalOpen);
            }}
          />
        ))}
      </BlogsContainer>
      {isDeleteModalOpen ? (
        <DeleteBlogModal
          uid={blogToDelete}
          onClose={() => {
            setBlogToDelete(null);
            setIsDeleteModalOpen(false);
          }}
        />
      ) : null}
      {isEditModalOpen ? (
        <CreateBlogModal
          isEdit
          blogToEdit={blogToEdit}
          onClose={() => {
            setBlogToEdit(null);
            setIsEditModalOpen(false);
          }}
        />
      ) : null}
    </>
  );
};

export default MyBlogs;
