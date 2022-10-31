import { CInput, Photo, SlideoversFoot } from "core/components/shared";
import { ITranslate } from "core/interfaces";
import { filesUpload, updateService } from "core/services";
import { getAll } from "core/store/category/category.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { formatData } from "core/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: ITranslate;
};

export const EditCategory: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const { category } = useAppSelector((state) => state.categories);

  const [poster, setPoster] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    let posterId = undefined;

    if (poster) {
      posterId = (await filesUpload(formatData({ files: [poster] })))[0].id;
    }

    return updateService(category!.id, { ...data, posterId }, "category").then(
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
            previewId={category?.poster?.id}
            previewUrl={category?.poster?.url}
          />
        </div>
      </div>

      <div className="flex mt-3 gap-3">
        <div className="w-full">
          <CInput
            name="title.ru"
            title="Название (ru)"
            placeholder="Название (ru)"
            defaultValue={category?.title.ru}
            loading={!category}
            control={control}
            error={errors.title?.ru}
          />
        </div>
        <div className="w-full">
          <CInput
            name="title.uz"
            title="Название (uz)"
            placeholder="Название (uz)"
            defaultValue={category?.title.uz}
            loading={!category}
            control={control}
            error={errors.title?.uz}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
