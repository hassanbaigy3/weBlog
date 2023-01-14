import { FC, useState } from "react";
import { useMatch } from "react-router-dom";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

import NavBar from "./navbar.component";
import Search from "./search.component";


type BlogsContainerProps = React.PropsWithChildren<{
  isEmpty: Boolean;
  setSearchField: (searchField: string) => void;
}>;

const BlogsContainer: FC<BlogsContainerProps> = ({ setSearchField, isEmpty, children }) => {
  const currentUser = useSelector((state: RootState) => state.currentUser);

  const myBlogsPage = "/myblogs";
  const isMyBlogs = useMatch(myBlogsPage) ? true : false;

  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const onSearchChangeHandler = (e: React.SyntheticEvent) => {
    const searchFieldString = (e.target as HTMLInputElement).value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  return (
    <div className="flex flex-col w-full h-screen justify-between lg:pl-14">
      <div className="flex flex-col mt-9 md:ml-0 lg:px-28 md:px-10 w-screen max-w-7xl">
        <Search onChangeHandler={onSearchChangeHandler} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <div className="lg:top-0 fixed left-0 md:bottom-0 ">
          <NavBar onSearchClick={() => setIsOpen(!isOpen)} />
        </div>
        {isEmpty ? (
          <>
            <div className=" sm:flex sm:flex-col sm:justify-center ">
              <div className="bg-primary w-5 h-1 "></div>
              <h1 className="font-normal font-Lexand text-xl mb-3">{isMyBlogs ? currentUser.displayName : `Latest`}</h1>
            </div>
            <div></div>
          </>
        ) : (
          <div className="font-Lexand font-3xl font-bold">Nothing to Show, Create some blogs first....</div>
        )}

        <div className="flex flex-col justify-center mb-14">{children}</div>
      </div>
    </div>
  );
};

export default BlogsContainer;
