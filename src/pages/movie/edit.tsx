import {
  CInput,
  CTextarea,
  Photo,
  SlideoversFoot,
} from "core/components/shared";
import { CSearchSelectMulti } from "core/components/shared/CSearchSelectMulti";
import { fileDelete, filesUpload, updateService } from "core/services/index";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll, setMovie } from "core/store/movie/movie.thunks";
import { formatData, imageUpload } from "core/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

interface Props {
  close: () => void;
}

export const EditMovie: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const { movie } = useAppSelector((state) => state.movies);
  const { pathname } = useLocation();

  const [poster, setPoster] = useState<File | null>(null);
  const [posterForPremier, setPosterForPremier] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [treiler, setTreiler] = useState<File | null>(null);
  const [treilerPreview, setTreilerPreview] = useState(
    movie?.treiler ? movie.treiler?.url : ""
  );

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    let posterId = undefined;
    let posterForPremierId = undefined;
    let treilerId = undefined;

    if (poster) {
      posterId = (await filesUpload(formatData({ files: [poster] })))[0].id;
    }

    if (posterForPremier) {
      posterForPremierId = (await filesUpload(formatData({ files: [posterForPremier] })))[0].id;
    }

    if (treiler) {
      treilerId = (await filesUpload(formatData({ files: [treiler] })))[0].id;
    }

    return updateService(
      movie!.id,
      {
        ...data,
        posterId,
        posterForPremierId,
        treilerId,
        isNew: data["isNew"] || false,
        isSerial: data["isSerial"] || false,
        isPremier: data["isPremier"] || false,
        bySubscription: data["bySubscription"] || false,
      },
      "movie"
    ).then((movie) => {
      if (pathname === "/movies") {
        dispatch(getAll());
      } else {
        dispatch(setMovie(movie));
      }
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
      <div className="flex gap-3 justify-between">
        <div className="mt-1 w-full">
          <Photo
            title="Постер"
            setFile={setPoster}
            previewId={movie?.poster?.id}
            previewUrl={movie?.poster?.url}
          />
        </div>

        <div className="mt-1 w-full">
          <Photo
            title="Постер для слайдера"
            setFile={setPosterForPremier}
            previewId={movie?.posterForPremier?.id}
            previewUrl={movie?.posterForPremier?.url}
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
            step={0.1}
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
            step={0.1}
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
            name="directors"
            required={false}
            title="Режисеры"
            placeholder="Режисеры"
            defaultValue={movie?.directors?.map((x) => ({
              value: x.id,
              label: x.name,
            }))}
            index="directors"
            control={control}
            error={errors["directors"]}
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

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
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

      <div className="mt-3">
        {treilerPreview ? (
          <div className="h-42 object-cover w-full rounded-sm overflow-hidden bg-gray-100">
            <video
              src={treilerPreview}
              className="h-full w-full object-cover"
              preload="metadata"
              controls
              crossOrigin={"use-credentials"}
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
              setTreilerPreview("");
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
            defaultChecked={movie?.isNew}
            title="Новинка"
            type="checkbox"
            className=" "
            error={errors["isNew"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="isPremier"
            required={false}
            control={control}
            defaultValue={movie?.isPremier}
            defaultChecked={movie?.isPremier}
            title="Премьера"
            type="checkbox"
            className=" "
            error={errors["isPremier"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="bySubscription"
            required={false}
            control={control}
            defaultValue={movie?.bySubscription}
            defaultChecked={movie?.bySubscription}
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
