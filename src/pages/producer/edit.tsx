import { CInput, SlideoversFoot } from "core/components/shared";
import { fileDelete, filesUpload, updateService } from "core/services/index";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll } from "core/store/producer/producer.thunks";
import { formatData, imageUpload } from "core/utils/index";
import { defaultAvatar } from "core/_data/datas";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

export const EditProducer: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const { producer } = useAppSelector((state) => state.producers);

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(
    producer?.avatar
      ? `${process.env.REACT_APP_API_HOST}${producer.avatar?.url}`
      : defaultAvatar
  );
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    let avatarId = undefined;

    if (avatar) {
      avatarId = (await filesUpload(formatData({ files: [avatar] })))[0].id;
    }

    return updateService(producer!.id, { ...data, avatarId }, "producer").then(
      ({ name }) => {
        dispatch(getAll());
        close();
      }
    );
  };

  const imageDelete = (id: number) => {
    setLoadingPhoto(true);
    return fileDelete(id).then(() => {
      setLoadingPhoto(false);
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
            src={preview}
            alt="preview"
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
              setPreview("");
              setAvatar(null);
              producer?.avatar && imageDelete(producer?.avatar?.id);
            }}
            disabled={loadingPhoto || !producer?.avatar?.id}
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
          defaultValue={producer?.name}
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
            defaultValue={producer?.slug}
            control={control}
            error={errors["slug"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
