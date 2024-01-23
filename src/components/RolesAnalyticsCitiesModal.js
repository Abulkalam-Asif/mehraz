import { Button, H2, Spinner } from "./";

const RolesAnalyticsCitiesModal = ({
  children,
  heading = "",
  buttonText = "",
  onButtonClick = () => {},
  className,
  showModalSpinner = false,
}) => {
  return (
    <>
      <div className="relative">
        <H2 text={heading} className="py-3" />
        <form>
          <div className={`border-y p-6 border-y-accent-1-dark ${className}`}>
            {children}
          </div>
          <div className="p-3 flex justify-end">
            {showModalSpinner ? (
              <Spinner size={"xs"} />
            ) : (
              <Button
                text={buttonText}
                className={`text-xs ml-auto`}
                onClick={onButtonClick}
                disabled={showModalSpinner}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default RolesAnalyticsCitiesModal;
