import { AxiosError } from "axios";
import { toast } from "react-toastify";

export * as Enums from "./enums";

export function meiliRange(item: any, query: string) {
  if (item.name) {
    item.meili = `<div>${item.name.replace(query, `<mark>${query}</mark>`)}${
      item?.meta ? `<p class="text-gray-500 text-sm">${item?.meta}</p>` : ""
    }<div>`;
  }

  if (item.displayName) {
    item.meili = `<div>${item.displayName.replace(
      query,
      `<mark>${query}</mark>`
    )}${
      item?.meta ? `<p class="text-gray-500 text-sm">${item?.meta}</p>` : ""
    }<div>`;
  }

  if (item.title) {
    item.meili = `<div>${item.title.replace(query, `<mark>${query}</mark>`)}${
      item?.meta ? `<p class="text-gray-500 text-sm">${item?.meta}</p>` : ""
    }<div>`;
  }

  return item;
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

class ToastClass {
  options = undefined;

  info(info: string) {
    toast.info(info, this.options);
  }

  success(message: string) {
    toast.success(message, this.options);
  }

  error(error: AxiosError) {
    let message =
      error.message || error.response?.statusText || "Server Side Error";

    if (Array.isArray(message)) {
      message = message.join(", ");
    }

    toast.error(message, this.options);
  }

  warning(warning: string) {
    toast.warn(warning, this.options);
  }
}

export const Toast = new ToastClass();

export const formatData = (formdata: any) => {
  const postData = new FormData();
  const formatData: any = {
    ...formdata,
  };

  Object.keys(formatData).forEach((key) => {
    if (![undefined, null, "undefined"].includes(formatData[key])) {
      if (Array.isArray(formatData[key])) {
        formatData[key].forEach((data: any, i: number) => {
          postData.append(key, data);
        });

        return;
      }

      if (formatData[key] instanceof Object) {
        if (Object.keys(formatData[key]).length) {
          Object.keys(formatData[key]).forEach((key2) => {
            postData.append(`${key}[${key2}]`, formatData[key][key2]);
          });

          return;
        } else {
          postData.append(key, formatData[key]);
        }
      } else {
        postData.append(key, formatData[key]);
      }
    }
  });

  return postData;
};

export const imageUpload =
  (setPreview: (preview: any) => void, setFile: (file: File) => void) =>
  (e: any) => {
    const file = e.target.files[0];
    setFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

export const pageSwitch = (path: string[]) => {
  const page = path[0];

  switch (page) {
    case "genres":
      return "Жанры";
    case "acters":
      return "Актеры";
    case "categories":
      return "Категории";
    case "producers":
      return "Продюсеры";
    case "profile":
      return "Profile";

    default:
      return "";
  }
};
