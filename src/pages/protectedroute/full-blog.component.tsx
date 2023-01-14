import { useEffect, useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";

import ArrowLeft from "../../assets/arrow-left.svg";
import { getBlogByID } from "../../utils/firebase.utils";

const FullBlog = () => {
  const navigate = useNavigate();

  const fullBlog = "/blog/:id";
  const blogId = useMatch(fullBlog)?.params.id;

  const [blog, setBlog] = useState({
    uid: "",
    title: "",
    content: "",
    date: "",
    displayName: "",
    postedBy: "",
  });

  useEffect(() => {
    const getCurrentBlog = async () => {
      const currentBlog = await getBlogByID(blogId);
      setBlog(currentBlog!);
    };
    getCurrentBlog();
  }, [blogId]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="mt-16 lg:flex lg:flex-nowrap">
        <div className="h-screen ml-12 md:hidden">
          <div className="font-Serif-Display text-xl cursor-pointer hover:text-primary" onClick={handleBack}>
            Back
            <img src={ArrowLeft} className=" " />
          </div>
        </div>
        <div className="flex flex-col h-screen itmes-center px-20 max-w-7xl sm:px-8">
          <div className="mb-8 lg:hidden ">
            <button className="font-Serif-Display text-xl cursor-pointer hover:text-primary" onClick={handleBack}>
              Back
            </button>
          </div>
          <div className="font-Serif-Display text-5xl text-primary ">{blog.title}</div>
          <div className="text-secondary font-Lexand text-xl mt-6 font-extralight">
            written by @{blog.displayName.toLowerCase()}
          </div>
          <div className="text-secondary font-Lexand font-extralight text-xl ">on {blog.date}</div>
          <div className="text-xl break-all whitespace-pre-wrap	mt-8">
            <p className="text-7xl">{blog.content.substring(0, 1)}</p>
            {blog.content.substring(1)}
          </div>
        </div>
      </div>
    </>
  );
};

export default FullBlog;
