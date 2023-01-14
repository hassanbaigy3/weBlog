import { Routes, Route, Navigate } from "react-router-dom";

import LogIn from "./pages/login.component";
import SignUp from "./pages/signup.component";

import Home from "./pages/protectedroute/home.component";
import ProtectedRoute from "./pages/protectedroute/protectedroute.component";
import FullBlog from "./pages/protectedroute/full-blog.component";
import MyBlogs from "./pages/protectedroute/my-blogs.component";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ProtectedRoute componentToPassDown={<Home />} />} />
        <Route path="/myblogs" element={<ProtectedRoute componentToPassDown={<MyBlogs />} />} />
        <Route path="/blog/:uid" element={<ProtectedRoute componentToPassDown={<FullBlog />} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
