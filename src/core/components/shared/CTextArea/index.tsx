import { Control, useController } from "react-hook-form";
import { SceletonForTextarea } from "../Sceleton";

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  name: string;
  error?: {
    message?: string;
  };
  className?: string;
  control: Control;
  loading?: boolean;
  defaultValue?: any;
}

export const CTextarea: React.FC<Props> = ({ loading = false, ...props }) => {
  return <>{loading ? <SceletonForTextarea /> : <TextArea {...props} />}</>;
};

const TextArea: React.FC<Props> = ({
  title,
  name,
  defaultValue,
  control,
  className,
  error,
  loading = false,
  ...props
}) => {
  const defaultClassName = `${
    error?.message ? "border-red-300" : "border-gray-300"
  } mt-1 block w-full h-20 border border-gray-300 min-h-40 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`;

  const { field } = useController({
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
      <textarea
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={field.value}
        className={className ? className : defaultClassName}
        {...props}
      />
      {error?.message && (
        <p className="mt-2 text-red-600 text-sm">{error?.message}</p>
      )}
    </>
  );
};
