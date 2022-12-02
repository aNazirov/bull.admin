import { CInput, SlideoversFoot } from "core/components/shared";
import { createService } from "core/services/index";
import { getAll } from "core/store/chain/chain.thunks";
import { useAppDispatch } from "core/store/hooks";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  price: number;
  active: string;
};

export const CreateChain: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return createService(
      { ...data, active: data["active"] ? JSON.parse(data["active"]) : false },
      "chain/type"
    ).then(() => {
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
          <CInput
            title="Активный"
            name="active"
            type="checkbox"
            control={control}
            className=" "
            placeholder="Активный"
            error={errors["active"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
