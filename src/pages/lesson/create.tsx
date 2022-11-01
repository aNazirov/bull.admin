import {
  CCombobox,
  CInput,
  CTextarea,
  Photo,
  SlideoversFoot,
} from "core/components/shared";
import { CSearchSelectMulti } from "core/components/shared/CSearchSelectMulti";
import { ITranslate } from "core/interfaces";
import { createService, filesUpload } from "core/services/index";
import { useAppDispatch } from "core/store/hooks";
import { getAll } from "core/store/lesson/lesson.thunks";
import { formatData, imageUpload } from "core/utils";
import { DifficultyLevel, Gender } from "core/utils/enums";
import { difficultyLevels } from "core/_data/datas";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: ITranslate;
  description: ITranslate;
  difficultyLevel: DifficultyLevel;
  genders: Gender[];
  categories: number[];
  materials: number[];
  free: boolean;
};

export const CreateLesson: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();

  const [poster, setPoster] = useState<File | null>(null);

  const [video, setVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState("");

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    let posterId = undefined;
    let videoId = undefined;

    if (poster) {
      posterId = (await filesUpload(formatData({ files: [poster] })))[0].id;
    }

    if (video) {
      videoId = (await filesUpload(formatData({ files: [video] })))[0].id;
    }

    return createService(
      {
        ...data,
        posterId,
        videoId,
        free: data["free"] ?? false,
      },
      "lesson"
    ).then(() => {
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
      <div className="flex gap-3 justify-between">
        <div className="mt-1 w-full">
          <Photo title="Постер" setFile={setPoster} />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <CInput
            name="title.ru"
            title="Название (ru)"
            placeholder="Название (ru)"
            control={control}
            error={errors.title?.ru}
          />
        </div>

        <div className="w-full">
          <CInput
            name="title.uz"
            title="Название (uz)"
            placeholder="Название (uz)"
            control={control}
            error={errors.title?.uz}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <CTextarea
            name="description.ru"
            title="Описание (ru)"
            placeholder="Описание (ru)"
            required={false}
            control={control}
            error={errors.description?.ru}
          />
        </div>

        <div className="w-full">
          <CTextarea
            name="description.uz"
            title="Описание (uz)"
            placeholder="Описание (uz)"
            required={false}
            control={control}
            error={errors.description?.uz}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
        <div className="w-full">
          <CCombobox
            name="difficultyLevel"
            required={false}
            items={difficultyLevels}
            title="Сложность"
            control={control}
            error={errors["difficultyLevel"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
        <div className="w-full">
          <CSearchSelectMulti
            name="categories"
            required={false}
            title="Тематики"
            placeholder="Тематики"
            index="categories"
            defaultValue={[]}
            control={control}
            error={errors["categories"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3 flex-col sm:flex-row">
        <div className="w-full">
          <CSearchSelectMulti
            name="materials"
            required={false}
            title="Материалы"
            placeholder="Материалы"
            index="materials"
            defaultValue={[]}
            control={control}
            error={errors["materials"]}
          />
        </div>
      </div>

      <div className="mt-3">
        {videoPreview ? (
          <div className="h-42 object-cover w-full rounded-sm overflow-hidden bg-gray-100">
            <video
              src={videoPreview}
              className="h-full w-full object-cover"
              crossOrigin={"use-credentials"}
              controls
            />
          </div>
        ) : (
          <div className="block text-sm font-medium text-gray-700">Урок</div>
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
              setVideoPreview("");
              setVideo(null);
            }}
          >
            Удалить
          </button>
          <input
            id="upload-treiler"
            type="file"
            accept="video/*"
            className="w-0"
            disabled={!!videoPreview}
            onChange={imageUpload(setVideoPreview, setVideo)}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="free"
            required={false}
            control={control}
            title="Бесплатный урок"
            type="checkbox"
            className=" "
            error={errors["free"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
