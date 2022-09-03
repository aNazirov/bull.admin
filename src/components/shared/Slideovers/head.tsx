import { XIcon } from "@heroicons/react/solid";

interface Props {
  title?: string;
  close: () => void;
}

export const SlideoversHead: React.FC<Props> = ({ title, close }) => {
  return (
    <div className="pb-6">
      <div className="flex items-start justify-between">
        <div className="h-7 flex items-center">
          <button
            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-blue-500"
            onClick={close}
          >
            <span className="sr-only">Close panel</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <h2
          id="slide-over-heading"
          className="ml-3 text-lg font-medium text-gray-900"
        >
          {title}
        </h2>
      </div>
    </div>
  );
};
