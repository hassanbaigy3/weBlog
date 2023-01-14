import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrentUser } from "../features/current-user.slice";
import { signOutUser } from "../utils/firebase.utils";
import { useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";

import { setAllBlogs } from "../features/all-blogs.slice";
import { resetMyBlogs } from "../features/my-blogs.slice";
import CreateBlogModal from "./create-blog-modal.component";

import searchIcon from "../assets/search.svg";
import createIcon from "../assets/add_circle.svg";
import signOutIcon from "../assets/signout.svg";
import homeIcon from "../assets/homeIcon.svg";

type NavBarProps = {
  onSearchClick: () => void;
};

const NavBar = ({ onSearchClick }: NavBarProps) => {
  const navigate = useNavigate();

  const myBlogsPage = "/myblogs";
  const isMyBlogs = useMatch(myBlogsPage) ? true : false;

  //Global Variables
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser();
    dispatch(setCurrentUser({}));
    dispatch(setAllBlogs([]));
    dispatch(resetMyBlogs());
  };

  const handleCreateModal = () => setIsCreateModalOpen((prev) => !prev);

  return (
    <>
      {isCreateModalOpen ? <CreateBlogModal blogToEdit={null} onClose={() => setIsCreateModalOpen(false)} /> : null}
      <div className="flex flex-col flex-start items-center bg-dark-grey h-screen w-24 py-4 drop-shadow-2xl lg:gap-7 md:w-screen  navMobile:h-14 md:flex-row md:justify-around md:shrink-0 md:h-20">
        {isMyBlogs ? (
          <div className="md:flex md:gap-2 md:items-center">
            <div
              onClick={() => {
                navigate("/");
              }}
              className="flex items-center justify-center cursor-pointer font-bold text-2xl  w-16 h-16 text-white hover:bg-white rounded-full bg-primary hover:text-black md:mt-0 md:w-9 md:h-9 navMobile:text-white"
            >
              <img src={homeIcon} alt={"Home"} />
            </div>
            <div className="lg:hidden sm:hidden text-white">home</div>
          </div>
        ) : (
          <div className="md:flex md:gap-2 md:items-center">
            <div
              onClick={() => {
                navigate("/myblogs");
              }}
              className="flex items-center justify-center cursor-pointer font-bold text-2xl  w-16 h-16 text-white rounded-full bg-primary hover:text-black md:mt-0 md:w-9 md:h-9 md:text-black md:hover:text-white"
            >
              {currentUser.displayName?.charAt(0).toUpperCase()}
            </div>
            <div className="lg:hidden sm:hidden text-white">{currentUser.displayName?.toLowerCase()}</div>
          </div>
        )}
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center cursor-pointer text-white hover:text-primary md:flex-row md:gap-2 md:items-center"
        >
          <img src={searchIcon} alt={"Search"} />
          <h2 className="sm:hidden">search</h2>
        </button>
        <button
          className="flex flex-col items-center cursor-pointer text-white hover:text-primary md:flex-row md:gap-2 md:items-center"
          onClick={handleCreateModal}
        >
          <img src={createIcon} alt={"Create Blog"} />
          <h2 className="sm:hidden">create</h2>
        </button>

        <button
          className="flex flex-col items-center cursor-pointer text-white hover:text-primary lg:mt-auto md:mt-0"
          onClick={handleSignOut}
        >
          <img src={signOutIcon} alt={"Signout"} />
          <h2 className="sm:hidden">sign out</h2>
        </button>
      </div>
    </>
  );
};

export default NavBar;
