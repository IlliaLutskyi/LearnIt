import { RiLoader4Fill } from "react-icons/ri";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <RiLoader4Fill className="animate-spin " />
    </div>
  );
};

export default Loader;
