import { CCombobox, CInput, SlideoversFoot } from "core/components/shared";
import { createService } from "core/services/index";
import { getAll } from "core/store/banner/banner.thunks";
import { useAppDispatch } from "core/store/hooks";
import { BannerComponent, BannerPosition } from "core/utils/enums";
import {
  bannerComponents,
  bannerPositions,
  bannerSizes,
} from "core/_data/datas";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  name: string;
  size: string;
  price: number;
  index?: number;
  position: BannerPosition;
  component: BannerComponent;
};

export const CreateBanner: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return createService(data, "banner/type").then(() => {
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
          <CCombobox
            title="Размер"
            name="size"
            control={control}
            items={bannerSizes}
            error={errors["position"]}
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
          <CInput
            title="Ряд"
            name="index"
            type="number"
            control={control}
            placeholder="Ряд"
            error={errors["index"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CCombobox
            title="Раздел"
            name="component"
            control={control}
            items={bannerComponents}
            error={errors["component"]}
          />
        </div>

        <div className="w-full">
          <CCombobox
            title="Позиция"
            name="position"
            control={control}
            items={bannerPositions}
            error={errors["position"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
