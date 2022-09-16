import { Switch } from "@headlessui/react";
import { classNames } from "utils/index";

interface Props {
  disabled: boolean;
  checked: boolean;
  onToggle: (x: boolean) => void;
}

export const CToggle: React.FC<Props> = ({ disabled, checked, onToggle }) => {
  return (
    <Switch
      disabled={disabled}
      checked={checked}
      onChange={onToggle}
      className={classNames(
        checked ? "bg-orange-500" : "bg-gray-200",
        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          checked ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        )}
      />
    </Switch>
  );
};
