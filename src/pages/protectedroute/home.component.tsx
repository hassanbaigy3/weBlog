import { useEffect, useState } from "react";

import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setAllBlogs } from "../../features/all-blogs.slice";

import Blog from "../../components/blog.component";
import BlogsContainer from "../../components/blogs-container.component";

import { Blog as BlogType } from "../../utils/types";
import { getAllBlogs } from "../../utils/firebase.utils";


const Home = () => {
  //Local State
  const [searchField, setSearchField] = useState("");

  //Global State Variables
  const dispatch = useDispatch();
  const allGlobalBlogs = useSelector((state: RootState) => state.allBlogs);

  //Fetch & set allGlobalBlogs on page mount
  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs: Array<BlogType> = await getAllBlogs();
      dispatch(setAllBlogs(fetchedBlogs));
    };
    fetchBlogs();
  },);

  const filteredBlogs: Array<BlogType> = allGlobalBlogs.allBlogs.filter((blog: BlogType) =>
    blog.title.toLowerCase().includes(searchField)
  );

  return (
    <BlogsContainer isEmpty={filteredBlogs.length ? true : false} setSearchField={setSearchField}>
      {filteredBlogs.map((blog: BlogType) => (
        <Blog key={blog.uid} blog={blog} />
      ))}
    </BlogsContainer>
  );
};

export default Home;
