import { CCombobox, CInput, SlideoversFoot } from "core/components/shared";
import { updateService } from "core/services";
import { getAll } from "core/store/banner/banner.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { BannerPosition } from "core/utils/enums";
import { bannerPositions, bannerSizes } from "core/_data/datas";
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
};

export const EditBanner: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const { banner } = useAppSelector((state) => state.banners);

  const dispatch = useAppDispatch();

  const submit = async (data: FormData) => {
    return updateService(banner!.id, data, "banner").then(() => {
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
            defaultValue={banner?.name}
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
            defaultValue={banner?.size}
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
            defaultValue={banner?.price}
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
            defaultValue={banner?.index}
            placeholder="Ряд"
            error={errors["index"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CCombobox
            title="Позиция"
            name="position"
            control={control}
            defaultValue={banner?.position}
            items={bannerPositions}
            error={errors["position"]}
          />
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
