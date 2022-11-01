import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import { Id, toast, TypeOptions } from "react-toastify";

export * as Enums from "./enums";

export const filter = (params: any) => {
  const obj = { ...params };

  Object.keys(obj).forEach((key) => {
    if (obj[key] instanceof Object && !Object.keys(obj[key]).length) {
      delete obj[key];
    }
  });

  return obj;
};

export function meiliRange(item: any, query: string) {
  const obj = { ...item };

  if (obj.name) {
    obj.meili = `<div>${obj.name.replace(query, `<mark>${query}</mark>`)}${
      obj?.meta ? `<p class="text-gray-500 text-sm">${obj?.meta}</p>` : ""
    }<div>`;
  }

  if (obj.title) {
    if (obj.title instanceof Object) {
      obj.title = obj.title.ru.match(query) ? obj.title.ru : obj.title.uz;
    }

    obj.meili = `<div>${obj.title.replace(query, `<mark>${query}</mark>`)}${
      obj?.meta ? `<p class="text-gray-500 text-sm">${obj?.meta}</p>` : ""
    }<div>`;
  }

  return obj;
}

export const sort = (
  a: any,
  b: any,
  sortBy: string,
  orderBy: "asc" | "desc" = "asc"
) => {
  console.log(a, b);

  if (orderBy === "asc") {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }
  } else {
    if (a[sortBy] < b[sortBy]) {
      return 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return -1;
    }
  }
  // a должно быть равным b
  return 0;
};

export const formatNumber = (
  number: number = 0,
  currency: string,
  fixed: number = 2
) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: currency,
  }).format(Number(typeof number === "number" ? number?.toFixed(fixed) : 0));
};

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

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
  (
    setPreview: Dispatch<SetStateAction<string>>,
    setFile: Dispatch<SetStateAction<File | null>>
  ) =>
  (e: any) => {
    const file = e.target.files[0];
    setFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

export const pageSwitch = (path: string[]) => {
  const page = path[0];

  switch (page) {
    case "categories":
      return "Категории";
    case "materials":
      return "Материалы";
    case "banners":
      return "Баннеры";
    case "users":
      return "Пользователи";
    case "lessons":
      return "Уроки";
    case "subsctiption-type":
      return "Подписки";

    default:
      return "";
  }
};

class ToastClass {
  options = undefined;

  info(info: string) {
    toast.info(info, this.options);
  }

  success(message: string) {
    toast.success(message, this.options);
  }

  error(error: AxiosError<any, any>) {
    let message =
      error.response?.data.message || error.message || "Server Side Error";

    if (error.response?.data instanceof Blob) {
      const fr = new FileReader();

      fr.onload = function () {
        if (typeof this.result === "string") {
          const e = JSON.parse(this.result);
          message = e.message;
        }

        toast.error(message);
      };

      return fr.readAsText(error.response?.data);
    }

    if (Array.isArray(message)) {
      message = message.join(", ");
    }

    toast.error(message, this.options);
  }

  warning(warning: string) {
    toast.warn(warning, this.options);
  }

  promise(
    func: Promise<any>,
    { pending, success }: { pending: string; success: string }
  ) {
    return toast.promise(func, {
      pending,
      success,
      error: {
        render({ data }) {
          let message =
            data.response?.data?.message || data.message || "Server Side Error";

          if (data.response?.data instanceof Blob) {
            const fr = new FileReader();

            fr.onload = function () {
              if (typeof this.result === "string") {
                const e = JSON.parse(this.result);
                message = e.message;
              }

              toast.error(message);
            };

            return fr.readAsText(data.response?.data);
          }

          if (Array.isArray(message)) {
            message = message.join(", ");
          }
          // When the promise reject, data will contains the error
          return message;
        },
      },
    });
  }

  loading(message: string): Id {
    return toast.loading(message, this.options);
  }

  update(
    id: Id,
    data: {
      render: string;
      type: TypeOptions;
      isLoading?: boolean;
    }
  ) {
    toast.update(id, data);
  }
}

export const Toast = new ToastClass();
