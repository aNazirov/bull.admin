import { Control, useController } from "react-hook-form";
import { SceletonForInput } from "../Sceleton";

interface Props extends React.HTMLProps<HTMLInputElement> {
  name: string;
  title?: string;
  error?: {
    message?: string;
  };
  className?: string;
  control: Control<any, any>;
  loading?: boolean;
  defaultValue?: any;
  required?: boolean;
}

export const CInput: React.FC<Props> = ({
  name,
  title,
  defaultValue,
  className,
  control,
  error,
  loading = false,
  required = true,
  ...props
}) => {
  return (
    <>
      {loading ? (
        <SceletonForInput />
      ) : (
        <Input
          title={title}
          name={name}
          control={control}
          defaultValue={defaultValue || undefined}
          error={error}
          className={className}
          required={required}
          {...props}
        />
      )}
    </>
  );
};

const Input: React.FC<Props> = ({
  name,
  title,
  defaultValue,
  control,
  className,
  error,
  loading,
  required,
  ...props
}) => {
  const defaultClassName = `${
    error?.message ? "border-red-300" : "border-gray-300"
  } mt-1 w-full rounded-sm border bg-white py-1 px-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm`;

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
    defaultValue,
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
      <input
        id={name}
        onBlur={field.onBlur}
        onChange={(e) => {
          let event = e;

          if (props.type === "number") {
            event = Object.assign(event, {
              target: { value: +e.target.value },
            });
          }

          // if (typeof e.target.value === "string") {
          //   event = Object.assign(event, {
          //     target: { value: e.target.value.trim() },
          //   });
          // }

          field.onChange(event);
        }}
        value={field.value}
        autoCapitalize="off"
        className={className || defaultClassName}
        min={props.type === "number" ? 0 : props.min}
        step={props.type === "number" && !props.step ? 1 : props.step}
        {...props}
      />
      {error?.message && (
        <p className="mt-2 text-red-600 text-sm">{error?.message}</p>
      )}
    </>
  );
};
