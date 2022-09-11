import { CInput, CTextarea, SlideoversFoot } from "components/shared";
import { CSearchSelectMulti } from "components/shared/CSearchSelectMulti";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { fileDelete, filesUpload, Toast, updateService } from "services/index";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAll, setMovie } from "store/movie/movie.thunks";
import { formatData, imageUpload } from "utils";
import { defaultImage } from "_data/datas";

interface Props {
  close: () => void;
}

export const EditMovie: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const { token } = useAppSelector((state) => state.global);
  const { movie } = useAppSelector((state) => state.movies);
  const { pathname } = useLocation();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(
    movie?.poster ? `/file/${movie?.poster.name}` : defaultImage
  );
  const [loading, setLoading] = useState(false);

  const [treiler, setTreiler] = useState<File | null>(null);
  const [treilerPreview, setTreilerPreview] = useState(
    movie?.treiler ? `/file/${movie?.treiler.name}` : undefined
  );

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    Toast.info(`Обновление фильма`);

    let posterId = undefined;

    if (avatar) {
      posterId = (await filesUpload(formatData({ files: [avatar] })))[0].id;
    }

    let treilerId = undefined;

    if (treiler) {
      treilerId = (await filesUpload(formatData({ files: [treiler] })))[0].id;
    }

    return updateService(
      movie!.id,
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
      .then((movie) => {
        Toast.success(`${movie.title} обновлен`);

        if (pathname === "/movies") {
          dispatch(getAll());
        } else {
          dispatch(setMovie(movie));
        }
        close();
      })
      .catch((e) => {
        Toast.error(e);
      });
  };

  const deleteFile = (id: number) => {
    setLoading(true);
    return fileDelete(id)
      .then(() => {
        Toast.success("Файл удален");
        setLoading(false);
      })
      .catch((e) => Toast.error(e));
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
              movie?.poster && deleteFile(movie?.poster?.id);
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
            disabled={!!preview || loading}
            onChange={imageUpload(setPreview, setAvatar)}
          />
        </div>
      </div>

      <div className="mt-3 w-full">
        <CInput
          name="title"
          title="Название"
          placeholder="Название"
          defaultValue={movie?.title}
          control={control}
          error={errors["title"]}
        />
      </div>
      <div className="mt-3 w-full">
        <CInput
          name="slug"
          title="Slug"
          placeholder="Slug"
          defaultValue={movie?.slug}
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
          defaultValue={movie?.description}
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
            defaultValue={movie?.imdb}
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
            defaultValue={movie?.rating}
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
            defaultValue={movie?.ageRemark}
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
            defaultValue={movie?.year}
            title="Год"
            type="number"
            min={1900}
            max={2030}
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
            defaultValue={movie?.categories?.map((x) => ({
              value: x.id,
              label: x.title,
            }))}
            index="categories"
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
            defaultValue={movie?.acters?.map((x) => ({
              value: x.id,
              label: x.name,
            }))}
            index="acters"
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
            defaultValue={movie?.countries?.map((x) => ({
              value: x.id,
              label: x.title,
            }))}
            index="countries"
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
            defaultValue={movie?.genres?.map((x) => ({
              value: x.id,
              label: x.title,
            }))}
            index="genres"
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
            defaultValue={movie?.producers?.map((x) => ({
              value: x.id,
              label: x.name,
            }))}
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
              preload="metadata"
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
              movie?.treiler && deleteFile(movie?.treiler?.id);
            }}
            disabled={loading}
          >
            Удалить
          </button>
          <input
            id="upload-treiler"
            type="file"
            accept="video/*"
            className="w-0"
            disabled={!!treilerPreview || loading}
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
            defaultValue={movie?.isNew}
            title="Новинка"
            type="checkbox"
            className=" "
            error={errors["isNew"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="bySubscription"
            required={false}
            control={control}
            defaultValue={movie?.bySubscription}
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
