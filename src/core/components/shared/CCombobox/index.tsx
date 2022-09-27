import { Combobox } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";
import { classNames } from "core/utils/index";
import { SceletonForInput } from "../Sceleton";

interface Props {
  title: string;
  items: any[];
  defaultValue?: number;
  name: string;
  error?: {
    message?: string;
  };
  control: Control<any>;
  loading?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export const CCombobox: React.FC<Props> = ({
  loading = false,
  required = true,
  disabled = false,
  ...props
}) => {
  return (
    <>
      {loading ? (
        <SceletonForInput />
      ) : (
        <Combox required={required} disabled={disabled} {...props} />
      )}
    </>
  );
};

export const Combox: React.FC<Props> = ({
  title,
  items,
  defaultValue,
  name,
  control,
  error,
  required,
  disabled,
}) => {
  const { field } = useController({
    rules: {
      required: required && "Should not be empty",
    },
    control,
    defaultValue,
    name,
  });

  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    if (items.length && defaultValue && !selectedItem) {
      setSelectedItem(items.find((item) => item.id === defaultValue));
    }
  }, [items]);

  const filteredItems =
    query === ""
      ? items
      : items.filter((item) => {
          if (item?.name) {
            return item.name.toLowerCase().includes(query.toLowerCase());
          }

          if (item?.displayName) {
            return item.displayName.toLowerCase().includes(query.toLowerCase());
          }

          if (item?.part) {
            return item.part.toLowerCase().includes(query.toLowerCase());
          }

          return item.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <>
      <Combobox
        as="div"
        disabled={disabled}
        value={selectedItem}
        onChange={(item: any) => {
          field.onChange(item.id);
          setSelectedItem(item);
        }}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700">
          {title}
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            autoComplete="off"
            className={classNames(
              error?.message ? "border-red-300" : "border-gray-300",
              "w-full rounded-sm border bg-white py-1 pl-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            )}
            onChange={(event) => setQuery(event.target.value)}
            displayValue={(item: any) =>
              item?.name || item?.displayName || item?.title || ""
            }
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {filteredItems.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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

              {filteredItems.map((item) => {
                const label =
                  item?.name || item?.displayName || item?.title || item?.part;

                return (
                  <Combobox.Option
                    key={item.id}
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
                        >
                          {label}
                        </span>

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
                );
              })}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      {error?.message && (
        <p className="mt-2 text-red-600 text-sm">{error.message}</p>
      )}
    </>
  );
};
