import { CInput, Photo, SlideoversFoot } from "core/components/shared";
import { createService, filesUpload } from "core/services/index";
import { useAppDispatch } from "core/store/hooks";
import { getAll } from "core/store/producer/producer.thunks";
import { formatData } from "core/utils/index";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

export const CreateProducer: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const [avatar, setAvatar] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    let avatarId = undefined;

    if (avatar) {
      avatarId = (await filesUpload(formatData({ files: [avatar] })))[0].id;
    }

    return createService(
      {
        ...data,
        avatarId,
      },
      "producer"
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
      <div className="mt-1 flex gap-3 items-center">
        <Photo
          setFile={setAvatar}
          previewClassName="h-12 w-12 rounded-full overflow-hidden bg-gray-100"
        />
      </div>

      <div className="w-full">
        <CInput
          name="name"
          title="Имя"
          placeholder="Имя"
          control={control}
          error={errors["name"]}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="slug"
            title="Slug"
            placeholder="Slug"
            control={control}
            error={errors["slug"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
