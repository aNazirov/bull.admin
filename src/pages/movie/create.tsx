import { CInput, SlideoversFoot } from "components/shared";
import { useForm } from "react-hook-form";
import { createService, Toast } from "services/index";
import { useAppDispatch } from "store/hooks";
import { getAll } from "store/movie/movie.thunks";

interface Props {
  close: () => void;
}

export const CreateMovie: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    Toast.info(`Создание фильм`);

    return createService(
      {
        ...data,
      },
      "movie"
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
        {/* <div className="w-full">
          <CInput
            name="email"
            title="Email"
            placeholder="Email"
            control={control}
            error={errors["email"]}
          />
        </div>
        <div className="w-full">
          <CInput
            name="password"
            title="Пароль"
            type="password"
            required={false}
            control={control}
            error={errors["password"]}
          />
        </div> */}
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
