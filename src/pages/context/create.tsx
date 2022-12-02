import { CCombobox, CInput, SlideoversFoot } from "core/components/shared";
import { createService } from "core/services/index";
import { getAll } from "core/store/context/context.thunks";
import { useAppDispatch } from "core/store/hooks";
import { ContextPriority } from "core/utils/enums";
import { contextPriorities } from "core/_data/datas";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  name: string;
  price: number;
  priority: ContextPriority;
};

export const CreateContext: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return createService(data, "context/type").then(() => {
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
      <div className="flex mt-3 gap-3">
        <div className="w-full">
          <CInput
            name="name"
            title="Название"
            placeholder="Название"
            control={control}
            error={errors.name}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            title="Цена"
            name="price"
            type="number"
            control={control}
            placeholder="Цена"
            error={errors["price"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CCombobox
            title="Приоритет"
            name="priority"
            control={control}
            items={contextPriorities}
            error={errors["priority"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
