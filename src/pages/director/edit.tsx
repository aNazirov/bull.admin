import { CInput, Photo, SlideoversFoot } from "core/components/shared";
import { filesUpload, updateService } from "core/services/index";
import { getAll } from "core/store/director/director.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { formatData } from "core/utils/index";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

export const EditDirector: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const { director } = useAppSelector((state) => state.directors);

  const [avatar, setAvatar] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    let avatarId = undefined;

    if (avatar) {
      avatarId = (await filesUpload(formatData({ files: [avatar] })))[0].id;
    }

    return updateService(director!.id, { ...data, avatarId }, "director").then(
      ({ name }) => {
        dispatch(getAll());
        close();
      }
    );
  };

  // const imageDelete = (id: number) => {
  //   setLoadingPhoto(true);
  //   return fileDelete(id).then(() => {
  //     setLoadingPhoto(false);
  //   });
  // };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="h-full flex flex-col"
      autoComplete="off"
    >
      <div className="mt-1 flex gap-3 items-center">
        <Photo
          setFile={setAvatar}
          previewId={director?.avatar?.id}
          previewUrl={director?.avatar?.url}
          previewClassName="h-12 w-12 rounded-full overflow-hidden bg-gray-100"
        />
      </div>

      <div className="w-full">
        <CInput
          name="name"
          title="Имя"
          placeholder="Имя"
          defaultValue={director?.name}
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
            defaultValue={director?.slug}
            control={control}
            error={errors["slug"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
