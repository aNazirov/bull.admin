import { CInput, SlideoversFoot } from "components/shared";
import { useForm } from "react-hook-form";
import { createService, Toast } from "services/index";
import { getAll } from "store/genre/genre.thunks";
import { useAppDispatch } from "store/hooks";

interface Props {
  close: () => void;
}

export const CreateGenre: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    Toast.info(`Создание жанра`);
    let fileId = undefined;

    return createService(
      {
        ...data,
        fileId,
        byBonus: data.byBonus || false,
      },
      "genre"
    )
      .then(({ title }) => {
        Toast.success(`${title} создан`);
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
            control={control}
            error={errors["slug"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
