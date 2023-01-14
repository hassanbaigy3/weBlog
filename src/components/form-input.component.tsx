import { InputHTMLAttributes, FC } from "react";

type FormInputProps = InputHTMLAttributes<HTMLInputElement>;
const FormInput: FC<FormInputProps> = (props) => {
  return (
    <input
      {...props}
      className="w-full mt-6 pl-8 h-14 border-2  border-secondary/75 focus:outline-none focus:border-primary/75"
    />
  );
};

export default FormInput;
