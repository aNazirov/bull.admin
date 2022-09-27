import { CCombobox, CInput, SlideoversFoot } from "core/components/shared";
import { useForm } from "react-hook-form";
import { createService, Toast } from "core/services/index";
import { getAll } from "core/store/user/user.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { RoleType } from "core/utils/enums";

interface Props {
  close: () => void;
}

export const CreateUser: React.FC<Props> = ({ close }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();
  const { user } = useAppSelector((state) => state.global);

  const dispatch = useAppDispatch();
  const roles = [
    user?.role?.id === RoleType.Admin
      ? { id: RoleType.Moderator, title: "Модератор" }
      : {},
    { id: RoleType.User, title: "Пользователь" },
  ];

  const submit = async (data: any) => {
    Toast.info(`Создание пользователя`);

    return createService(
      {
        ...data,
      },
      "user"
    )
      .then(({ title }) => {
        Toast.success(`${title} создан`);
        dispatch(getAll());
        close();
      })
      .catch((e) => {
        Toast.error(e);
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
            control={control}
            error={errors["balance"]}
          />
        </div>
        <div className="w-full">
          <CInput
            name="ageRemark"
            title="Возрастное ограничение"
            required={false}
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
