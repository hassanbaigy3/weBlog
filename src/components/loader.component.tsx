type LoaderProps = {
  color: string;
};

const Loader = ({ color }: LoaderProps) => {
  let circleCommonClasses = `h-2.5 w-2.5 ${color} rounded-full`;

  return (
    <div className="flex">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
};

export default Loader;
