import { ChangeEvent, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../features/current-user.slice";
import { signInAuthUserWithEmailAndPassword } from "../utils/firebase.utils";

import Loader from "../components/loader.component";
import ErrorToast from "../components/error-toast.component";

import AuthContainer from "../components/auth-container.component";
import FormInput from "../components/form-input.component";

const defaultFormFields = {
  email: "",
  password: "",
};

function LogIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formFields;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      dispatch(setCurrentUser(response!.user));
      const isAuthenticated = JSON.parse(localStorage.getItem("persist:currentUser")!);
      if (isAuthenticated.accessToken !== null) {
        setIsLoading(false);
        setFormFields(defaultFormFields);
        navigate("/");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.code === "auth/wrong-password") {
        setError("Invalid Credentials");
      } else if (error.code === "auth/user-not-found") {
        setError("No such user exists");
      }
    }
  };

  const enabled = email.length > 0 && password.length > 0;
  const submitVerifyColorChange = enabled ? "bg-black" : "bg-secondary";

  return (
    <AuthContainer isLogin>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
          placeholder="Enter your Email Address"
        />
        <FormInput
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          placeholder="Enter your Password"
          required
        />

        <button
          type="submit"
          disabled={!enabled}
          className={`text-2xl mt-6 w-1/3 h-16 flex no-wrap justify-center items-center shrink-0 text-white md:w-full ${submitVerifyColorChange}`}
        >
          {isLoading ? <Loader color="bg-white" /> : "LOGIN"}
        </button>
        {error && <ErrorToast error={error} />}
      </form>
    </AuthContainer>
  );
}
export default LogIn;
