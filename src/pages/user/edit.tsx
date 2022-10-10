import { CCombobox, CInput, SlideoversFoot } from "core/components/shared";
import { updateService } from "core/services/index";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll } from "core/store/user/user.thunks";
import { RoleType } from "core/utils/enums";
import { useForm } from "react-hook-form";

interface Props {
  close: () => void;
}

export const EditUser: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const { user: MainUser } = useAppSelector((state) => state.global);
  const { user } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();
  const roles = [
    MainUser?.role?.id === RoleType.Admin
      ? { id: RoleType.Moderator, title: "Модератор" }
      : {},
    { id: RoleType.User, title: "Пользователь" },
  ];

  const submit = async (data: any) => {
    return updateService(user!.id, { ...data }, "user").then(({ name }) => {
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
          defaultValue={user?.name}
          control={control}
          error={errors["name"]}
        />
      </div>

      <div className="mt-3 w-full">
        <CCombobox
          name="roleId"
          title="Роль"
          items={roles}
          defaultValue={user?.role?.id}
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
            defaultValue={user?.balance}
            type="number"
            control={control}
            error={errors["balance"]}
          />
        </div>
        <div className="w-full">
          <CInput
            name="ageRemark"
            title="Возрастное ограничение"
            required={false}
            defaultValue={user?.ageRemark}
            type="number"
            control={control}
            error={errors["ageRemark"]}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-full">
          <CInput
            name="email"
            title="Email"
            placeholder="Email"
            defaultValue={user?.contact?.email}
            control={control}
            error={errors["email"]}
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
