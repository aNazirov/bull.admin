import { fileDelete } from "core/services";
import { imageUpload } from "core/utils";
import { defaultImage } from "core/_data/datas";
import { Dispatch, SetStateAction, useId, useState } from "react";

interface Props {
  title?: string;
  previewId?: number;
  previewUrl?: string;
  previewClassName?: string;
  setFile: Dispatch<SetStateAction<File | null>>;
}

export const Photo: React.FC<Props> = ({
  title,
  previewId,
  previewUrl,
  previewClassName = "h-36 object-cover w-full rounded-sm overflow-hidden bg-gray-100",
  setFile,
}) => {
  const id = useId();
  const [preview, setPreview] = useState<string>(previewUrl || defaultImage);
  const [loading, setLoading] = useState(false);

  const imageDelete = (id: number) => {
    setLoading(true);
    return fileDelete(id).finally(() => {
      setLoading(false);
    });
  };

  const onDelete = () => {
    setPreview(defaultImage);
    setFile(null);
    previewId && imageDelete(previewId);
  };

  return (
    <>
      {!!title && (
        <p className="block text-sm font-medium text-gray-700">{title}</p>
      )}
      <div className={previewClassName}>
        <img
          src={preview}
          alt="preview"
          className="h-full w-full object-cover"
          crossOrigin={"use-credentials"}
        />
      </div>
      <div className="flex gap-3 mt-1">
        <label
          htmlFor={id}
          className=" bg-white py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Загрузить
        </label>

        {preview && (
          <a
            href={preview}
            target="_blank"
            className=" bg-white py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Открыть
          </a>
        )}
        <button
          type="button"
          className=" bg-red-600 py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={onDelete}
          disabled={loading}
        >
          Удалить
        </button>
        <input
          id={id}
          type="file"
          accept="image/*"
          className="w-0"
          disabled={loading}
          onChange={imageUpload(setPreview, setFile)}
        />
      </div>
    </>
  );
};
