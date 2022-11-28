import { CCombobox, CInput, SlideoversFoot } from "core/components/shared";
import { updateService } from "core/services";
import { getAll } from "core/store/context/context.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
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

export const EditContext: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const { context } = useAppSelector((state) => state.contexts);

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return updateService(context!.id, data, "context").then(() => {
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
            defaultValue={context?.name}
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
            defaultValue={context?.price}
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
            defaultValue={context?.priority}
            items={contextPriorities}
            error={errors["priority"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
