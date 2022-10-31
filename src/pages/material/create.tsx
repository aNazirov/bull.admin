import { CInput, CTextarea, SlideoversFoot } from "core/components/shared";
import { ITranslate } from "core/interfaces";
import { createService } from "core/services/index";
import { useAppDispatch } from "core/store/hooks";
import { getAll } from "core/store/material/material.thunks";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: ITranslate;
  description: ITranslate;
};

export const CreateMaterial: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return createService(data, "material").then(({ title }) => {
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
      <div className="flex gap-3">
        <div className="w-full">
          <CInput
            name="title.ru"
            title="Название (ru)"
            placeholder="Название (ru)"
            control={control}
            error={errors.title?.ru}
          />
        </div>

        <div className="w-full">
          <CInput
            name="title.uz"
            title="Название (uz)"
            placeholder="Название (uz)"
            control={control}
            error={errors.title?.uz}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <CTextarea
            name="description.ru"
            title="Необходимые принадлежности (ru)"
            placeholder="Необходимые принадлежности (ru)"
            control={control}
            error={errors.description?.ru}
          />
        </div>

        <div className="w-full">
          <CTextarea
            name="description.uz"
            title="Необходимые принадлежности (uz)"
            placeholder="Необходимые принадлежности (uz)"
            control={control}
            error={errors.description?.uz}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
