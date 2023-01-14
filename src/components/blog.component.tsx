import { useMatch, useNavigate } from "react-router-dom";

import { Blog as BlogType } from "../utils/types";

import deleteIcon from "../assets/deleteIcon.svg";
import editIcon from "../assets/editIcon.svg";

type BlogProps = {
  blog: BlogType;
  onEdit?: () => void;
  onDelete?: () => void;
};

const Blog = ({ blog, onDelete, onEdit }: BlogProps) => {
  const navigate = useNavigate();

  const myBlogsPage = "/myblogs";
  const isMyBlogs = useMatch(myBlogsPage) ? true : false;

  const { uid, date, title, content, displayName } = blog;

  const handleReadMore = () => {
    navigate(`/blog/${uid}`);
  };

  return (
    <>
      <div className="flex flex-col mt-7">
        <div className="font-Lexand font-bold text-2xl">{date}</div>
        <div onClick={handleReadMore} className="font-Serif-Display text-primary text-3xl mt-1 cursor-pointer">
          {title}
        </div>
        <div className="font-Lexand mt-1 break-all whitespace-pre-wrap">
          {content.length > 450 ? (
            <>
              {content.substring(0, 450)}
              <span className="text-primary cursor-pointer" onClick={handleReadMore}>
                ...read more
              </span>
            </>
          ) : (
            content
          )}
        </div>
        {isMyBlogs ? (
          <>
            <div className="flex felx-row justify-start space-x-4 pt-4 mb-2">
              <button onClick={onDelete} className="w-10 text-white px-2 py-1 rounded text-sm bg-rose-500">
                <img src={deleteIcon} alt={"Delete Blog"} />
              </button>
              <button onClick={onEdit} className="w-10 text-black px-2 py-1 rounded text-sm border-2 border-black">
                <img src={editIcon} alt={"Edit Blog"} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-secondary mt-2">@{displayName.toLowerCase()}</div>
          </>
        )}
      </div>
    </>
  );
};

export default Blog;
