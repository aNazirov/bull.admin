import { CInput, SlideoversFoot } from "core/components/shared";
import { updateService } from "core/services";
import { getAll } from "core/store/chain/chain.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  price: number;
  active: string;
};

export const EditChain: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const { chain } = useAppSelector((state) => state.chains);

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return updateService(
      chain!.id,
      { ...data, active: data["active"] ? JSON.parse(data["active"]) : false },
      "chain"
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
            defaultValue={chain?.price}
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
            defaultValue={chain?.active}
            defaultChecked={chain?.active}
            control={control}
            required={false}
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
