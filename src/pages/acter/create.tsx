import { CInput, SlideoversFoot } from "components/shared";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createService, filesUpload, Toast } from "services/index";
import { getAll } from "store/acter/acter.thunks";
import { useAppDispatch } from "store/hooks";
import { formatData, imageUpload } from "utils/index";
import { defaultAvatar } from "_data/datas";

interface Props {
  close: () => void;
}

export const CreateActer: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(undefined);

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    Toast.info(`Создание жанра`);
    let avatarId = undefined;

    if (avatar) {
      avatarId = (await filesUpload(formatData({ files: [avatar] })))[0].id;
    }

    return createService(
      {
        ...data,
        avatarId,
      },
      "acter"
    )
      .then(({ title }) => {
        Toast.success(`${title} создан`);
        dispatch(getAll());
        close();
      })
      .catch((e) => {
        Toast.error(e);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="h-full flex flex-col"
      autoComplete="off"
    >
      <div className="mt-1 flex items-center">
        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
          <img
            src={preview || defaultAvatar}
            className="h-full w-full object-cover"
          />
        </span>
        <div>
          <label
            htmlFor="upload-image"
            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Загрузить
          </label>
          <button
            type="button"
            className="ml-5 bg-red-600 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setPreview(undefined);
              setAvatar(null);
            }}
            disabled={false}
          >
            Удалить
          </button>
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            className="w-0"
            onChange={imageUpload(setPreview, setAvatar)}
          />
        </div>
      </div>
      <div className="w-full">
        <CInput
          name="name"
          title="Имя"
          placeholder="Имя"
          control={control}
          error={errors["name"]}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="slug"
            title="Slug"
            placeholder="Slug"
            control={control}
            error={errors["slug"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
