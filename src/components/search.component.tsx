type SearchProps = {
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  isOpen: Boolean;
  onClose: () => void;
};
//handle isOpen in parent component
//avoid using any type
const Search = ({ onChangeHandler, isOpen, onClose }: SearchProps) => {
  if (!isOpen) return null;
  return (
    <div className="flex flex-nowrap flex-row space-x-2  items-center justify-center ">
      <input
        className="w-full my-4 px-8 h-14 rounded-2xl border-2 shadow-sm border-secondary/75 focus:outline-none focus:border-primary/75 md:w-full sm:h-12"
        type="search"
        placeholder="SEARCH"
        onChange={onChangeHandler}
      />
      <button
        id="closeBTN"
        onClick={onClose}
        className="bg-black font-Lexand font-bold text-white flex justify-center items-center w-12 h-12 my-4 rounded sm:h-10"
      >
        X
      </button>
    </div>
  );
};

export default Search;
