import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/current-user.slice";

import Loader from "../components/loader.component";
import FormInput from "../components/form-input.component";
import ErrorToast from "../components/error-toast.component";
import AuthContainer from "../components/auth-container.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../utils/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const enabled = email.length > 0 && password.length > 0 && displayName.length > 0 && confirmPassword.length > 0;
  const submitVerifyColorChange = enabled ? "bg-black" : "bg-secondary";

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords Don't Match");
      return;
    }

    try {
      setIsLoading(true);
      const user = await createAuthUserWithEmailAndPassword(email, password, displayName);
      await createUserDocumentFromAuth(user, { displayName });

      dispatch(setCurrentUser(user!.user));

      const isAuthenticated = JSON.parse(localStorage.getItem("persist:currentUser")!);

      if (isAuthenticated.accessToken !== null) {
        setFormFields(defaultFormFields);
        navigate("/");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <AuthContainer>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          onChange={handleChange}
          value={displayName}
          placeholder="Full Name"
          required
        />
        <FormInput type="email" name="email" onChange={handleChange} value={email} placeholder="Email Address" required />
        <FormInput
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          placeholder="Password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
          placeholder="Confirm Password"
          required
        />
        <button
          type="submit"
          disabled={!enabled}
          className={`text-2xl mt-6 w-1/3 h-16 flex no-wrap justify-center items-center shrink-0 text-white md:w-full ${submitVerifyColorChange}`}
        >
          {isLoading ? <Loader color="bg-white" /> : "Submit"}
        </button>
        {error ? <ErrorToast error={error} /> : null}
      </form>
    </AuthContainer>
  );
}

export default SignUp;
