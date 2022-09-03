import { IStatus } from "interfaces/interfaces";
import React from "react";
import { Control, useController } from "react-hook-form";
import { classNames } from "utils/index";

interface Props {
  title?: string;
  name: string;
  tabs: IStatus[];
  control: Control;
  loading?: boolean;
  defaultValue?: any;
  required?: boolean;
}

export const CQuickFilter: React.FC<Props> = ({
  title,
  control,
  defaultValue,
  name,
  tabs,
  required,
}) => {
  const { field } = useController({
    rules: {
      required: required && "Should not be empty",
    },
    control,
    defaultValue,
    name,
  });

  return (
    <>
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <div className="overflow-x-auto pb-4 mt-2 flex justify-start">
        <div className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <React.Fragment key={tab.title}>
              <label
                className={classNames(
                  tab.id === field.value
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 border",
                  "px-2 py-1 font-medium text-sm rounded-sm w-72 cursor-pointer"
                )}
                htmlFor={tab.title}
              >
                {tab.title}
              </label>
              <input
                id={tab.title}
                onBlur={field.onBlur}
                onChange={(e) => {
                  let event: any = e;

                  event = {
                    ...event,
                    target: { ...event.target, value: +event.target.value },
                  };

                  field.onChange(event);
                }}
                name={name}
                className="hidden"
                type="radio"
                value={tab.id}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
