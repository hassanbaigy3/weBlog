import { useState } from "react";

import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { resetMyBlogs, setMyBlogs } from "../features/my-blogs.slice";

import Loader from "./loader.component";

import { Blog as BlogType } from "../utils/types";
import { deleteBlog, getMyBlogs } from "../utils/firebase.utils";

type DeleteBlogModalProps = {
  uid: string | null;
  onClose: () => void;
};

const DeleteBlogModal = ({ uid, onClose }: DeleteBlogModalProps) => {
  //Global Variables
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const handleConfirm = async () => {
    setIsLoading(true);
    await deleteBlog(uid!);
    const myAllBlogs: BlogType[] = await getMyBlogs(currentUser.uid);
    if (!myAllBlogs.length) {
      dispatch(resetMyBlogs());
      setIsLoading(false);
      onClose();
      return;
    }
    dispatch(setMyBlogs(myAllBlogs));
    setIsLoading(false);
    onClose();
  };

  const handleOnClose = (e: React.SyntheticEvent) => {
    if (
      (e.target as HTMLInputElement).id === "container" ||
      (e.target as HTMLInputElement).id === "closeBTN"
    ) {
      onClose();
    }
  };

  return (
    <div>
      <div
        onClick={handleOnClose}
        id="container"
        className="bg-black/30 fixed inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center "
      >
        <div className="w-2/5 h-fit p-6  bg-white rounded shadow-black shadow-2xl md:w-4/5 sm:p-4 max-w-4xl">
          <div className="font-Lexand font-bold text-center text-3xl md:text-center sm:text-xl ">
            DELETE BLOG
          </div>
          <div className="font-Lexand  py-2 text-center text-xl text-black/70 md:text-center sm:text-lg ">
            To permanantly delete this blog hit confirm, this action can not be
            undone.
          </div>
          <div className="flex flex-nowrap justify-center space-x-6 mt-6">
            <button
              onClick={handleConfirm}
              type="submit"
              className="text-xl rounded w-2/5 h-16 flex no-wrap justify-center items-center shrink-0 text-white bg-rose-500 sm:text-sm sm:h-12 "
            >
              {isLoading ? <Loader color="bg-white" /> : "CONFIRM"}
            </button>
            <button
              type="submit"
              onClick={handleOnClose}
              id="closeBTN"
              className="text-xl w-2/5 h-16 rounded flex no-wrap justify-center items-center shrink-0 text-white bg-black  sm:text-sm sm:h-12"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteBlogModal;
