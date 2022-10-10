import { CInput, SlideoversFoot } from "core/components/shared";
import { CSearchSelectMulti } from "core/components/shared/CSearchSelectMulti";
import { createService, filesUpload } from "core/services";
import { useAppDispatch } from "core/store/hooks";
import { getAll } from "core/store/subscription-type/subscription-type.thunks";
import { formatData, imageUpload } from "core/utils";
import { defaultImage } from "core/_data/datas";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

export const CreateSubscriptionType: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(undefined);

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    let posterId = undefined;

    if (avatar) {
      posterId = (await filesUpload(formatData({ files: [avatar] })))[0].id;
    }

    return createService(
      {
        ...data,
        posterId,
      },
      "subscription-type"
    ).then(({ title }) => {
      dispatch(getAll());
      close();
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="h-full flex flex-col"
      autoComplete="off"
    >
      <div className="mt-1">
        <div className="h-36 object-cover w-full rounded-sm overflow-hidden bg-gray-100">
          <img
            src={preview || defaultImage}
            alt="preview"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex gap-3 mt-1">
          <label
            htmlFor="upload-image"
            className=" bg-white py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Загрузить
          </label>
          <button
            type="button"
            className=" bg-red-600 py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

      <div className="w-full mt-3">
        <CInput
          name="title"
          title="Название"
          placeholder="Название"
          control={control}
          error={errors["title"]}
        />
      </div>

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
        <div className="w-full">
          <CSearchSelectMulti
            name="genres"
            required={false}
            title="Жанры"
            placeholder="Жанры"
            index="genres"
            defaultValue={[]}
            control={control}
            error={errors["genres"]}
          />
        </div>

        <div className="w-full">
          <CSearchSelectMulti
            name="countries"
            required={false}
            title="Страны"
            placeholder="Страны"
            index="countries"
            defaultValue={[]}
            control={control}
            error={errors["countries"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
        <div className="w-full">
          <CSearchSelectMulti
            name="categories"
            required={false}
            title="Категории"
            placeholder="Категории"
            index="categories"
            defaultValue={[]}
            control={control}
            error={errors["categories"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="price"
            title="Цена"
            type="number"
            placeholder="0.00"
            step={0.01}
            control={control}
            error={errors["price"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
