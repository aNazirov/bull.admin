import { ArchiveIcon, PencilIcon } from "@heroicons/react/solid";
import { CLink, PrivateComponent, SlideOvers } from "components/shared";
import { MDelete } from "components/shared/MDelete";
import { CreateUser } from "pages/user/create";
import { EditUser } from "pages/user/edit";
import { useContext, useState } from "react";
import { removeService, Toast } from "services/global";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAll, setUser } from "store/user/user.thunks";
import { AppContext } from "utils/contexts";
import { RoleType, SlideoverModes } from "utils/enums";
import { classNames } from "utils/index";

interface Props {
  path: string[];
}

export const UserTbody: React.FC<Props> = ({ path }) => {
  const { user, users } = useAppSelector((state) => state.users);
  const { setOpen, setMode } = useContext(AppContext);

  const [dOPen, setDOpen] = useState(false);

  const dispatch = useAppDispatch();
  const accessRoles = [RoleType.Admin];
  const access = path.length < 2;

  const handleDelete = () => {
    removeService(user!.id, "user")
      .then(() => {
        Toast.success("Жанр удален");
        dispatch(getAll());
        dispatch(setUser());
      })
      .catch((e) => {
        Toast.error(e);
      });
  };

  const close = () => {
    setOpen(false);
    setMode(SlideoverModes.none);
    dispatch(setUser());
  };

  return (
    <>
      <tbody>
        {users.map((x, idx) => (
          <tr
            key={x.id}
            className={classNames(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
          >
            <td className="relative px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
              <CLink
                to={`/users/show/${x.id}`}
                className="absolute top-0 w-full h-full cursor-pointer"
                state={{}}
              />
              {x.name}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
              {x.contact?.email}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
              {x.role?.title}
            </td>
            <td className="flex justify-end px-6 py-3.5 whitespace-nowrap text-right text-sm font-medium space-x-4">
              <PrivateComponent operation={accessRoles}>
                {access && (
                  <>
                    <PrivateComponent operation={accessRoles}>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(true);
                          setMode(SlideoverModes.edit);
                          dispatch(setUser(x));
                        }}
                        className="text-gray-600 hover:text-blue-900 cursor-pointer"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </span>
                    </PrivateComponent>
                    <PrivateComponent operation={accessRoles}>
                      {" "}
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setDOpen(true);
                          dispatch(setUser(x));
                        }}
                        className="text-gray-600 hover:text-blue-900 cursor-pointer"
                      >
                        <ArchiveIcon className="h-4 w-4" />
                      </span>
                    </PrivateComponent>
                  </>
                )}
              </PrivateComponent>
            </td>
          </tr>
        ))}
      </tbody>

      <PrivateComponent operation={accessRoles}>
        {user && (
          <MDelete
            handleDelete={handleDelete}
            open={dOPen}
            setOpen={setDOpen}
            data={{ id: user.id, name: user.name }}
          />
        )}
      </PrivateComponent>

      <PrivateComponent operation={accessRoles}>
        {access && (
          <SlideOvers
            title={user?.name || "Пользователь"}
            close={close}
            Edit={EditUser}
            Create={CreateUser}
          />
        )}
      </PrivateComponent>
    </>
  );
};
