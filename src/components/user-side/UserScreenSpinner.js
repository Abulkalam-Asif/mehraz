import { Spinner } from "@/components";

const UserScreenSpinner = ({ text = null, size = "lg", className = "" }) => {
  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner text={text} size={size} className={className} />
      </div>
    </>
  );
};

export default UserScreenSpinner;
