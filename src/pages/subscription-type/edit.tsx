import { CInput, CTextarea, SlideoversFoot } from "core/components/shared";
import { ITranslate } from "core/interfaces";
import { updateService } from "core/services";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll } from "core/store/subscription-type/subscription-type.thunks";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  title: ITranslate;
  description: ITranslate;
  months: number;
  price: number;
};

export const EditSubscriptionType: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const { subscriptionType } = useAppSelector(
    (state) => state.subscriptionTypes
  );

  const dispatch = useAppDispatch();

  const submit = async (data: any) => {
    return updateService(subscriptionType!.id, data, "subscription-type").then(
      () => {
        dispatch(getAll());
        close();
      }
    );
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
            defaultValue={subscriptionType?.title.ru}
            loading={!subscriptionType}
            control={control}
            error={errors.title?.ru}
          />
        </div>

        <div className="w-full">
          <CInput
            name="title.uz"
            title="Название (uz)"
            placeholder="Название (uz)"
            defaultValue={subscriptionType?.title.uz}
            loading={!subscriptionType}
            control={control}
            error={errors.title?.uz}
          />
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="w-full">
          <CTextarea
            name="description.ru"
            title="Описание (ru)"
            placeholder="Описание (ru)"
            defaultValue={subscriptionType?.description?.ru}
            loading={!subscriptionType}
            control={control}
            error={errors.description?.ru}
          />
        </div>

        <div className="w-full">
          <CTextarea
            name="description.uz"
            title="Описание (uz)"
            placeholder="Описание (uz)"
            defaultValue={subscriptionType?.description?.uz}
            loading={!subscriptionType}
            control={control}
            error={errors.description?.uz}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="price"
            title="Цена"
            type="number"
            placeholder="0.00"
            defaultValue={subscriptionType?.price}
            loading={!subscriptionType}
            step={0.01}
            control={control}
            error={errors["price"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="months"
            title="Продолжительность"
            type="number"
            placeholder="1"
            defaultValue={subscriptionType?.months}
            loading={!subscriptionType}
            min={0}
            max={12}
            control={control}
            error={errors["months"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
