import React from "react";
import { Button, H2 } from "./";

const RolesAnalyticsCitiesModal = ({
  children,
  heading = "",
  buttonText = "",
  onButtonClick = () => {},
  className,
}) => {
  return (
    <>
      <div>
        <H2 text={heading} className="py-3" />
        <form>
          <div className={`border-y p-6 border-y-accent-1-dark ${className}`}>
            {children}
          </div>
          <div className="p-3 flex justify-end">
            <Button
              text={buttonText}
              className="text-xs ml-auto"
              onClick={onButtonClick}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default RolesAnalyticsCitiesModal;
