import { CSearchSelect, CTextarea, SlideoversFoot } from "components/shared";
import { useForm } from "react-hook-form";
import { createService, Toast } from "services/index";
import { getAll } from "store/comment/comment.thunks";
import { useAppDispatch } from "store/hooks";

interface Props {
  close: () => void;
}

export const CreateComment: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    Toast.info(`Создание комментария`);

    return createService(data, "comment")
      .then(({ title }) => {
        Toast.success(`Комментарий создан`);
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
      <div className="flex items-center gap-3">
        <div className="w-full">
          <CSearchSelect
            name="userId"
            title="Пользователь"
            index="users"
            control={control}
            error={errors["userId"]}
          />
        </div>

        <div className="w-full">
          <CSearchSelect
            name="movieId"
            title="Фильм"
            index="movies"
            control={control}
            error={errors["movieId"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CTextarea
            name="text"
            title="Комментарий"
            placeholder="Комментарий"
            control={control}
            error={errors["text"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
