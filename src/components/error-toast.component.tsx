type ErrorToastType = {
  error: string;
};
const ErrorToast = ({ error }: ErrorToastType) => {
  return (
    <div className="w-1/3 h-6 mt-4 flex justify-center items-center bg-rose-200 px-4 text-se text-sm text-center border-1 border-rose-300/50 sm:w-full">
      {error}
    </div>
  );
};

export default ErrorToast;
