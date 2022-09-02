import React, { useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SlideoverModes } from "@utils/enums";
import { SlideoversHead } from "./head";
import { AppContext } from "@utils/contexts";
export * from "./foot";

interface Props {
  title?: string;
  close: () => void;
  confirmModal?: (open: boolean) => void;
  Edit?: React.JSXElementConstructor<any>;
  Create?: React.JSXElementConstructor<any>;
}

export const SlideOvers: React.FC<Props> = ({
  title,
  close,
  confirmModal,
  Edit,
  Create,
}) => {
  const { mode, open } = useContext(AppContext);

  const Component = () => {
    if (Edit && mode === SlideoverModes.edit) {
      return <Edit confirmModal={confirmModal} close={close} />;
    }

    if (Create && mode === SlideoverModes.create) {
      return <Create close={close} />;
    }

    return null;
  };

  return (
    <Transition show={open} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="inset-0 overflow-hidden"
        open={open}
        onClose={close}
      >
        <div className="inset-0 overflow-hidden">
          <div className="fixed z-10 inset-y-0 right-0 pl-0 max-w-full flex sm:pl-16">
            <Transition.Child
              as={React.Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="flex flex-col w-screen max-w-2xl">
                <div className="px-4 py-6 sm:px-6 h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <SlideoversHead title={title} close={close} />

                  {/* Main */}
                  <div className="flex flex-col flex-1 w-full">
                    <Component />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
