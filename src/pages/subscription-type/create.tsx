import {
  CInput,
  CTextarea,
  Photo,
  SlideoversFoot,
} from "core/components/shared";
import { CSearchSelectMulti } from "core/components/shared/CSearchSelectMulti";
import { createService, filesUpload } from "core/services";
import { useAppDispatch } from "core/store/hooks";
import { getAll } from "core/store/subscription-type/subscription-type.thunks";
import { formatData } from "core/utils";
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

  const [poster, setPoster] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    let posterId = undefined;

    if (poster) {
      posterId = (await filesUpload(formatData({ files: [poster] })))[0].id;
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
        <Photo title="Постер" setFile={setPoster} />
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

      <div className="w-full mt-3">
        <CTextarea
          name="description"
          title="Описание"
          placeholder="Описание"
          control={control}
          error={errors["description"]}
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
