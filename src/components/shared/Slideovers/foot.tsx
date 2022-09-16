import { useContext } from "react";
import { AppContext } from "utils/contexts";
import { SlideoverModes } from "utils/enums";
import { Spinner } from "../Loader";

interface Props {
  close: () => void;
  disabled: boolean;
}

export const SlideoversFoot: React.FC<Props> = ({ close, disabled }) => {
  const { mode } = useContext(AppContext);

  let buttonTitle: string = mode;

  if (mode === SlideoverModes.edit) {
    buttonTitle = "Save";
  }

  return (
    <div className="flex justify-end mt-auto pt-6">
      <button
        type="button"
        onClick={close}
        className="transition duration-300 ease-in-out rounded-3xl mr-3 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="transition duration-300 ease-in-out rounded-3xl inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-orange-500 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={disabled}
      >
        {buttonTitle}
      </button>
      {disabled && <Spinner size={8} />}
    </div>
  );
};
