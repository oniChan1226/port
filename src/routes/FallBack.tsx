import {RingLoader} from "react-spinners"

const FallBack = () => {
  return (
    <div className="flex justify-center items-center lg:h-[75vh] w-full">
      <span className="animate-pulse">
        <RingLoader color="#a1a1a1"/>
      </span>
    </div>
  );
};

export default FallBack;
