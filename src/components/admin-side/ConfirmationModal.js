import { Button } from "@/components";

const ConfirmationModal = ({
  confirmationMessage = "",
  confirmationHandler,
  toggleModal,
}) => {
  return (
    <>
      <div className="px-6 py-4">
        <p className="text-lg pr-8">{confirmationMessage}</p>
        <div className="flex items-center justify-end gap-2 mt-4">
          <>
            <Button
              text="confirm"
              color="accent-2"
              isTransitioned={true}
              size="sm"
              onClick={() => {
                toggleModal();
                confirmationHandler();
              }}
            />
            <Button
              text="Cancel"
              color="accent-2-outlined"
              size="sm"
              onClick={toggleModal}
            />
          </>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
