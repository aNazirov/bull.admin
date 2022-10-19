import { CInput, SlideoversFoot } from "core/components/shared";
import { createService } from "core/services/index";
import { getAll } from "core/store/category/category.thunks";
import { useAppDispatch } from "core/store/hooks";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

export const CreateCategory: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    return createService(
      {
        ...data,
        addToMenu: data["addToMenu"] || false,
      },
      "category"
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

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="significance"
            required={false}
            control={control}
            title="Значимость"
            type="number"
            error={errors["significance"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="addToMenu"
            required={false}
            control={control}
            title="Добавить в меню"
            type="checkbox"
            className=" "
            error={errors["addToMenu"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
