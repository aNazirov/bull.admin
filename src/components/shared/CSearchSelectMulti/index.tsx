import { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { autoComplite } from "services";
import { meiliRange, Toast } from "utils";
import { useDebounce } from "../CSearchSelect";
import { SceletonForInput } from "../Sceleton";

interface Props {
  title: string;
  defaultValue?: number;
  search?: string;
  meta?: string;
  filter?: string[];
  name: string;
  error: {
    message: true;
  };
  control: Control;
  index: string;
  loading?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const animatedComponents = makeAnimated();

export const CSearchSelect: React.FC<Props> = ({
  loading = false,
  ...props
}) => {
  return <>{loading ? <SceletonForInput /> : <SearchSelect {...props} />}</>;
};

export const SearchSelect: React.FC<Props> = ({
  title,
  error,
  search = "",
  index,
  filter,
  defaultValue,
  name,
  control,
  required = true,
}) => {
  const { field } = useController({
    rules: {
      required: required && "Should not be empty",
    },
    control,
    defaultValue,
    name,
  });

  const [items, setItems] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<any>(undefined);

  const debouncedValue = useDebounce({ value: query, delay: 500 });

  useEffect(() => {
    if (debouncedValue) {
      autoComplite({ index, search: query, filter })
        .then(({ hits, query }) => {
          hits = hits.map((hit: any) => meiliRange(hit, query));
          setItems(hits);
        })
        .catch((e) => Toast.error(e));
    }
  }, [debouncedValue]);

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          if (item?.name) {
            return {
              value: item.id,
              label: item.name.toLowerCase().includes(query.toLowerCase()),
            };
          }

          if (item?.displayName) {
            return {
              value: item.id,
              label: item.displayName
                .toLowerCase()
                .includes(query.toLowerCase()),
            };
          }

          return {
            value: item.id,
            label: item.title.toLowerCase().includes(query.toLowerCase()),
          };
        });

  const changeInput = (val: string) => {
    setQuery(val);
  };

  const selectInput = (val: any) => {
    setSelectedItems(val.map((item: any) => item.value || item.id));
  };

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

      <Select
        defaultValue={field.value}
        isMulti
        name="items"
        value={selectedItems}
        onChange={selectInput}
        closeMenuOnSelect={false}
        onInputChange={changeInput}
        options={filteredItems}
        components={animatedComponents}
        className="basic-multi-select"
        classNamePrefix="select"
      />

      {error?.message && (
        <p className="mt-2 text-red-600 text-sm">{error.message}</p>
      )}
    </>
  );
};
