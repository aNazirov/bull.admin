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
  link: string;
  active: boolean;
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

    if (!banner?.poster.id && !poster) return Toast.warning("Загрузите постер");

    if (poster) {
      posterId = (await filesUpload(formatData({ files: [poster] })))[0].id;
    }

    return updateService(
      banner!.id,
      { ...data, posterId, active: data["active"] || false },
      "banner"
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
          <Photo
            title="Постер"
            setFile={setPoster}
            previewId={banner?.poster.id}
            previewUrl={banner?.poster.url}
          />
        </div>
      </div>

      <div className="flex mt-3 gap-3">
        <div className="w-full">
          <CInput
            name="title.ru"
            title="Название (ru)"
            placeholder="Название (ru)"
            defaultValue={banner?.title.ru}
            control={control}
            error={errors.title?.ru}
          />
        </div>
        <div className="w-full">
          <CInput
            name="title.uz"
            title="Название (uz)"
            placeholder="Название (uz)"
            defaultValue={banner?.title.uz}
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
            defaultValue={banner?.description.ru}
            control={control}
            error={errors.description?.ru}
          />
        </div>
        <div className="w-full">
          <CTextarea
            name="description.uz"
            title="Описание (uz)"
            placeholder="Описание (uz)"
            defaultValue={banner?.description.uz}
            control={control}
            error={errors.description?.uz}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            title="Ссылка"
            name="link"
            control={control}
            defaultValue={banner?.link}
            placeholder="Ссылка"
            error={errors["link"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="active"
            required={false}
            control={control}
            title="Активный"
            defaultChecked={banner?.active}
            defaultValue={banner?.active}
            type="checkbox"
            className=" "
            error={errors["active"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
