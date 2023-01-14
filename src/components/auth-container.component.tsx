import * as React from "react";
import { Link } from "react-router-dom";

import BackDrop from "../assets/BackdropAuth.jpg";

type AuthContainerProps = React.PropsWithChildren<{
  isLogin?: Boolean;
}>;

const AuthContainer: React.FC<AuthContainerProps> = ({ isLogin = false, children }) => {
  return (
    <div className="flex flex-row">
      <div className="w-1/3 h-screen relative md:hidden">
        <img src={BackDrop} alt={"LOGIN"} className="w-full h-full object-cover" />
        <div className="absolute bg-gray-800 opacity-100"></div>
        <div className="-rotate-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-bold text-8xl text-white ">{isLogin ? `Login` : `Signup`}</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <div className=" max-w-5xl px-12 w-full">
          <div className="md:text-center ">
            <h1 className="font-Serif-Display text-5xl">Welcome to weBlog</h1>
            <p className="text-2xl text-secondary-text font-light min-w-full">Let's log you in quickly</p>
          </div>
          <div className="pt-12">{children}</div>
          <div className="mt-6">
            <h2 className="text-xl">
              Don't have an account?
              <Link
                to={isLogin ? `/signup` : `/login`}
                className="text-primary/75 hover:cursor-pointer hover:text-primary/100"
              >
                Sign-up
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
