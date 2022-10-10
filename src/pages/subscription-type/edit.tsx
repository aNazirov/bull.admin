import { CInput, SlideoversFoot } from "core/components/shared";
import { CSearchSelectMulti } from "core/components/shared/CSearchSelectMulti";
import { fileDelete, filesUpload, updateService } from "core/services";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll } from "core/store/subscription-type/subscription-type.thunks";
import { formatData, imageUpload } from "core/utils";
import { defaultImage } from "core/_data/datas";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

export const EditSubscriptionType: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const { subscriptionType } = useAppSelector(
    (state) => state.subscriptionTypes
  );

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(
    subscriptionType?.poster
      ? `${process.env.REACT_APP_API_HOST}${subscriptionType.poster?.url}`
      : defaultImage
  );
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    let posterId = undefined;

    if (avatar) {
      posterId = (await filesUpload(formatData({ files: [avatar] })))[0].id;
    }

    return updateService(
      subscriptionType!.id,
      { ...data, posterId },
      "subscription-type"
    ).then(({ title }) => {
      dispatch(getAll());
      close();
    });
  };

  const deleteFile = (id: number) => {
    setLoading(true);
    return fileDelete(id).then(() => {
      setLoading(false);
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
            src={preview}
            alt="preview"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex gap-3 mt-1">
          <label
            htmlFor="upload-poster"
            className=" bg-white py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Загрузить
          </label>
          <button
            type="button"
            className=" bg-red-600 py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setPreview(defaultImage);
              setAvatar(null);
              subscriptionType?.poster &&
                deleteFile(subscriptionType?.poster?.id);
            }}
            disabled={loading}
          >
            Удалить
          </button>
          <input
            id="upload-poster"
            type="file"
            accept="image/*"
            className="w-0"
            disabled={loading}
            onChange={imageUpload(setPreview, setAvatar)}
          />
        </div>
      </div>

      <div className="w-full mt-3">
        <CInput
          name="title"
          title="Название"
          placeholder="Название"
          defaultValue={subscriptionType?.title}
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
            defaultValue={subscriptionType?.genres?.map((x) => ({
              value: x.id,
              label: x.title,
            }))}
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
            defaultValue={subscriptionType?.countries?.map((x) => ({
              value: x.id,
              label: x.title,
            }))}
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
            defaultValue={subscriptionType?.categories?.map((x) => ({
              value: x.id,
              label: x.title,
            }))}
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
            defaultValue={subscriptionType?.price}
            control={control}
            error={errors["price"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
