import {
  CInput,
  CTextarea,
  Photo,
  SlideoversFoot,
} from "core/components/shared";
import { ITranslate } from "core/interfaces";
import { filesUpload, updateService } from "core/services";
import { getAll } from "core/store/banner/banner.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { formatData, Toast } from "core/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: ITranslate;
  description: ITranslate;
};

export const EditBanner: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const { banner } = useAppSelector((state) => state.banners);

  const [poster, setPoster] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    let posterId = undefined;

    if (!banner?.id && !poster) return Toast.warning("Загрузите постер");

    posterId = (await filesUpload(formatData({ files: [poster] })))[0].id;

    return updateService(banner!.id, { ...data, posterId }, "banner").then(
      () => {
        dispatch(getAll());
        close();
      }
    );
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
            previewId={banner?.poster?.id}
            previewUrl={banner?.poster?.url}
          />
        </div>
      </div>

      <div className="flex mt-3 gap-3">
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

      <div className="flex mt-3 gap-3">
        <div className="w-full">
          <CTextarea
            name="description.ru"
            title="Описание (ru)"
            placeholder="Описание (ru)"
            control={control}
            error={errors.description?.ru}
          />
        </div>
        <div className="w-full">
          <CTextarea
            name="description.uz"
            title="Описание (uz)"
            placeholder="Описание (uz)"
            control={control}
            error={errors.description?.uz}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
