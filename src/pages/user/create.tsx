import { CCombobox, CInput, SlideoversFoot } from "core/components/shared";
import { createService } from "core/services/index";
import { useAppDispatch } from "core/store/hooks";
import { getAll } from "core/store/user/user.thunks";
import { RoleType } from "core/utils/enums";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  roleId: number;
  balance: number;
  activeBefore: string;
  password: string;
};

export const CreateUser: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const roles = [{ id: RoleType.User, name: "Пользователь" }];

  const submit = async (data: FormData) => {
    return createService(data, "user").then(() => {
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
          name="name"
          title="Имя"
          placeholder="Имя"
          control={control}
          error={errors["name"]}
        />
      </div>

      <div className="mt-3 w-full">
        <CCombobox
          name="roleId"
          title="Роль"
          items={roles}
          control={control}
          error={errors["roleId"]}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="balance"
            title="Баланс"
            placeholder="Баланс"
            type="number"
            required={false}
            control={control}
            error={errors["balance"]}
          />
        </div>

        <div className="w-full">
          <CInput
            name="activeBefore"
            title="Оплачен до"
            placeholder="yyyy-mm-dd"
            type="date"
            control={control}
            error={errors["activeBefore"]}
            required={false}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
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
            name="phone"
            title="Номер телефона"
            placeholder="+*** ** *** ****"
            control={control}
            error={errors["phone"]}
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
        </div>
      </div>

      <SlideoversFoot close={close} disabled={isSubmitting} />
    </form>
  );
};
