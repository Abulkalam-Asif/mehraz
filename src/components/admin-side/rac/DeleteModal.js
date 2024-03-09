import { Button } from "@/components";

const DeleteModal = ({ toggleModal, itemToDelete, deleteHandler }) => {
  return (
    <>
      <div className="px-6 py-4">
        <p className="text-lg pr-8">
          Do you really want to delete this{" "}
          <span className="font-bold uppercase">{itemToDelete.name}</span>?
        </p>
        <div className="flex items-center justify-end gap-2 mt-4">
          <>
            <Button
              text="Delete"
              color="red"
              size="sm"
              onClick={deleteHandler}
            />
            <Button text="Cancel" size="sm" onClick={toggleModal} />
          </>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
