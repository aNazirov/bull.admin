import { Combobox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";
import { autoComplite, Toast } from "services/index";
import { classNames, meiliRange } from "utils/index";
import { SceletonForInput } from "../Sceleton";

interface Props {
  title: string;
  defaultValue?: number;
  search?: string;
  meta?: string;
  filter?: string[];
  name: string;
  error?: {
    message?: string;
  };
  control: Control;
  index: string;
  loading?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export const CSearchSelect: React.FC<Props> = ({
  loading = false,
  ...props
}) => {
  return <>{loading ? <SceletonForInput /> : <SearchSelect {...props} />}</>;
};

const SearchSelect: React.FC<Props> = ({
  title,
  error,
  search = "",
  meta = "",
  index,
  filter,
  defaultValue,
  name,
  control,
  required = true,
  disabled = false,
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
  const [selectedItem, setSelectedItem] = useState<any>(undefined);

  const debouncedValue = useDebounce({ value: query, delay: 500 });

  useEffect(() => {
    if (search && !items.length) {
      setSelectedItem(undefined);
      autoComplite({ index, search, filter })
        .then(({ hits, query }) => {
          hits = hits.map((hit: any) => meiliRange(hit, query));
          setItems(hits);
        })
        .catch((e) => Toast.error(e));
    }
  }, [search]);

  useEffect(() => {
    if (filter?.length && items.length) {
      setSelectedItem(undefined);

      autoComplite({ index, search, filter })
        .then(({ hits, query }) => {
          hits = hits.map((hit: any) => meiliRange(hit, query));
          setItems(hits);
        })
        .catch((e) => Toast.error(e));
    }
  }, [filter]);

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

  useEffect(() => {
    if (items.length && defaultValue && !selectedItem) {
      setSelectedItem(items.find((item) => item.id === defaultValue));
    }

    if (!items.length && defaultValue && search && !selectedItem) {
      setSelectedItem({
        name: `${search}${meta ? ` (${meta})` : ""}`,
        id: defaultValue,
      });
    }
  }, [items]);

  useEffect(() => {
    return () => {
      setItems([]);
    };
  }, []);

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          if (item?.name) {
            return item.name.toLowerCase().includes(query.toLowerCase());
          }

          return item.title.toLowerCase().includes(query.toLowerCase());
        });

  const displayValue = (item: any) => {
    let title = item?.name || item?.title || "";

    if (item?.meta) {
      title = title + ` (${item.meta})`;
    }

    return title;
  };

  return (
    <>
      <Combobox
        as="div"
        value={selectedItem}
        onChange={(item: any) => {
          field.onChange(item.id);
          setSelectedItem(item);
        }}
        disabled={disabled}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          {title}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className={classNames(
              error?.message ? "border-red-300" : "border-gray-300",
              "w-full rounded-sm border bg-white py-1 pl-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            )}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={displayValue}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Combobox.Option
              value={{ title: "", id: undefined }}
              className={({ active }) =>
                classNames(
                  "relative cursor-default select-none py-2 pl-3 pr-9",
                  active ? "bg-orange-500 text-white" : "text-gray-900"
                )
              }
            >
              <span className="block truncate h-5">Cancel</span>
            </Combobox.Option>
            {filteredItems.map((item, i) => (
              <Combobox.Option
                key={item.id + i}
                value={item}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-orange-500 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                      dangerouslySetInnerHTML={{
                        __html: selected
                          ? item?.name || item?.title
                          : item.meili,
                      }}
                    />

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-blue-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      {error?.message && (
        <p className="mt-2 text-red-600 text-sm">{error.message}</p>
      )}
    </>
  );
};

interface IProps {
  value: string;
  delay: number;
}

export const useDebounce = ({ value, delay }: IProps) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
