import { CInput, SlideoversFoot } from "core/components/shared";
import { useForm } from "react-hook-form";
import { Toast, updateService } from "core/services/index";
import { getAll } from "core/store/genre/genre.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";

interface Props {
  close: () => void;
}

export const EditGenre: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const { genre } = useAppSelector((state) => state.genres);

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    Toast.info(`Идет обновление`);

    return updateService(genre!.id, { ...data }, "genre")
      .then(({ title }) => {
        Toast.success(`${title} обновлен`);
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
      <div className="w-full">
        <CInput
          name="title"
          title="Название"
          placeholder="Название"
          defaultValue={genre?.title}
          control={control}
          error={errors["title"]}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="slug"
            title="Slug"
            placeholder="Slug"
            defaultValue={genre?.slug}
            control={control}
            error={errors["slug"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
