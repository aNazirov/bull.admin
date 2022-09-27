import React, { useRef } from "react";
import { Dialog } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { CModal } from "../CModal";

interface Data {
  id: number;
  name?: string;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: (id: number) => void;
  data: Data;
}

export const MDelete: React.FC<Props> = ({
  open,
  setOpen,
  handleDelete,
  data,
}) => {
  const cancelButtonRef = useRef(null);

  const deleteHandle = (id: number) => () => {
    handleDelete(id);
    setOpen(false);
  };

  return (
    <CModal open={open} setOpen={setOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-lg mt-1 leading-6 font-medium text-gray-900"
            >
              Delete : {data.name}?
            </Dialog.Title>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={deleteHandle(data.id)}
          >
            Delete
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => {
              setOpen(false);
            }}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
      </div>
    </CModal>
  );
};
