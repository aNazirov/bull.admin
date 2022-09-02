import { useState } from "react";
import { Control, useController } from "react-hook-form";
import { SceletonForInput } from "../Sceleton";

interface Value {
  name: string;
  title: string;
  value?: number | string;
}

interface Type {
  name: string;
  title: string;
}

interface Props extends React.HTMLProps<HTMLInputElement> {
  error: {
    message: true;
  };
  className?: string;
  control: Control;
  values: Value[];
  types: Type[];
  loading?: boolean;
  defaultType?: any;
  required?: boolean;
}

export const CMultiInput: React.FC<Props> = ({
  loading = false,
  required = true,
  ...props
}) => {
  return (
    <>
      {loading ? (
        <SceletonForInput />
      ) : (
        <Input required={required} {...props} />
      )}
    </>
  );
};

const Input: React.FC<Props> = ({
  defaultType,
  control,
  className,
  error,
  loading,
  types,
  values,
  required,
  ...props
}) => {
  const [type, setType] = useState(defaultType);
  const defaultClassName = `${
    error?.message ? "border-red-300" : "border-gray-300"
  } mt-1 w-full rounded-sm border bg-white py-1 pl-2 pr-14 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`;

  const { title, name, value } = values[type];

  const { field } = useController({
    rules: {
      required: required && "Should not be empty",
      ...(props.type === "tel"
        ? {
            pattern: {
              value:
                /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
              message: "Please enter a valid phone number",
            },
          }
        : {}),
    },
    control,
    defaultValue: value,
    name,
  });

  return (
    <>
      {title && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {title}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          value={field.value}
          className={className || defaultClassName}
          min={props.type === "number" ? 0 : undefined}
          step={props.type === "number" ? 1 : props.step}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <select className="focus:ring-indigo-500 focus:border-indigo-500 py-1 px-2 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-sm">
            {types.map((x) => {
              return <option value={x.name}>{x.title}</option>;
            })}
          </select>
        </div>
      </div>
      {error?.message && (
        <p className="mt-2 text-red-600 text-sm">{error?.message}</p>
      )}
    </>
  );
};
