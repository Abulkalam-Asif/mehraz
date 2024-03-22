import { Button, H2 } from "@/components";

const AdminModal = ({
  children,
  heading = "",
  buttonText = "",
  onButtonClick = () => {},
  className = "",
}) => {
  return (
    <>
      <div className="relative">
        <H2 text={heading} className="py-3" />
        <form onSubmit={e => e.preventDefault()}>
          <div
            className={`border-y p-6 border-y-accent-1-dark ${className} max-h-[80vh] overflow-y-auto`}>
            {children}
          </div>
          <div className="p-3 flex justify-end">
            <Button
              text={buttonText}
              className={`ml-auto`}
              size="xs"
              onClick={onButtonClick}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminModal;
