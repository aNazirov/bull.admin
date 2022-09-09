import { CInput, CTextarea, SlideoversFoot } from "components/shared";
import { CSearchSelectMulti } from "components/shared/CSearchSelectMulti";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createService, filesUpload, Toast } from "services/index";
import { useAppDispatch } from "store/hooks";
import { getAll } from "store/movie/movie.thunks";
import { formatData, imageUpload } from "utils";
import { defaultImage } from "_data/datas";

interface Props {
  close: () => void;
}

export const CreateMovie: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(undefined);

  const [treiler, setTreiler] = useState<File | null>(null);
  const [treilerPreview, setTreilerPreview] = useState(undefined);

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    Toast.info(`Создание фильм`);

    let posterId = undefined;

    if (avatar) {
      posterId = (await filesUpload(formatData({ files: [avatar] })))[0].id;
    }

    let treilerId = undefined;

    if (avatar) {
      treilerId = (await filesUpload(formatData({ files: [treiler] })))[0].id;
    }

    return createService(
      {
        ...data,
        posterId,
        treilerId,
        isNew: data["isNew"] || false,
        isSerial: data["isSerial"] || false,
        bySubscription: data["bySubscription"] || false,
      },
      "movie"
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

      <div className="mt-3 w-full">
        <CInput
          name="title"
          title="Название"
          placeholder="Название"
          control={control}
          error={errors["title"]}
        />
      </div>
      <div className="mt-3 w-full">
        <CInput
          name="slug"
          title="Slug"
          placeholder="Slug"
          control={control}
          error={errors["slug"]}
        />
      </div>

      <div className="mt-3 w-full">
        <CTextarea
          name="description"
          required={false}
          title="Описание"
          placeholder="Описание"
          control={control}
          error={errors["description"]}
        />
      </div>

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
        <div className="w-full">
          <CInput
            name="imdb"
            required={false}
            control={control}
            title="Imdb"
            type="number"
            min={0}
            max={10}
            error={errors["imdb"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="rating"
            required={false}
            control={control}
            title="Рейтинг"
            type="number"
            min={0}
            max={10}
            error={errors["rating"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="ageRemark"
            required={false}
            control={control}
            title="Воз-ое огран."
            type="number"
            min={0}
            max={100}
            error={errors["ageRemark"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="year"
            required={false}
            control={control}
            title="Год"
            type="number"
            min={1900}
            max={2030}
            defaultValue={2022}
            error={errors["year"]}
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

        <div className="w-full">
          <CSearchSelectMulti
            name="acters"
            required={false}
            title="Актеры"
            placeholder="Актеры"
            index="acters"
            defaultValue={[]}
            control={control}
            error={errors["acters"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
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
      </div>

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
        <div className="w-full">
          <CSearchSelectMulti
            name="producers"
            required={false}
            title="Продюсеры"
            placeholder="Продюсеры"
            index="producers"
            control={control}
            error={errors["producers"]}
          />
        </div>
      </div>

      <div className="mt-3">
        {treilerPreview ? (
          <div className="h-42 object-cover w-full rounded-sm overflow-hidden bg-gray-100">
            <video
              src={treilerPreview}
              className="h-full w-full object-cover"
              controls
            />
          </div>
        ) : (
          <div className="block text-sm font-medium text-gray-700">Трейлер</div>
        )}

        <div className="flex gap-3 mt-3">
          <label
            htmlFor="upload-treiler"
            className=" bg-white py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Загрузить
          </label>
          <button
            type="button"
            className=" bg-red-600 py-2 px-3 border border-gray-300 rounded-sm shadow-sm text-sm leading-4 font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => {
              setTreilerPreview(undefined);
              setTreiler(null);
            }}
          >
            Удалить
          </button>
          <input
            id="upload-treiler"
            type="file"
            accept="video/*"
            className="w-0"
            disabled={!!treilerPreview}
            onChange={imageUpload(setTreilerPreview, setTreiler)}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="isNew"
            required={false}
            control={control}
            title="Новинка"
            type="checkbox"
            className=" "
            error={errors["isNew"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="isSerial"
            required={false}
            control={control}
            title="Сериал"
            type="checkbox"
            className=" "
            error={errors["isSerial"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="bySubscription"
            required={false}
            control={control}
            title="По подписке"
            type="checkbox"
            className=" "
            error={errors["bySubscription"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
