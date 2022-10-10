import { ArchiveIcon, PencilIcon } from "@heroicons/react/solid";
import { PrivateComponent, SlideOvers } from "core/components/shared";
import { MDelete } from "core/components/shared/MDelete";
import { removeService } from "core/services/global.service";
import { setActer } from "core/store/acter/acter.thunks";
import { getAll } from "core/store/genre/genre.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { AppContext } from "core/utils/contexts";
import { RoleType, SlideoverModes } from "core/utils/enums";
import { classNames } from "core/utils/index";
import { defaultAvatar } from "core/_data/datas";
import { CreateActer } from "pages/acter/create";
import { EditActer } from "pages/acter/edit";
import { useContext, useState } from "react";

interface Props {
  path: string[];
}

export const ActerTbody: React.FC<Props> = ({ path }) => {
  const { acter, acters } = useAppSelector((state) => state.acters);
  const { setOpen, setMode } = useContext(AppContext);

  const [dOPen, setDOpen] = useState(false);

  const dispatch = useAppDispatch();
  const accessRoles = [RoleType.Admin];
  const access = path.length < 2;

  const handleDelete = () => {
    removeService(acter!.id, "acter").then(() => {
      dispatch(getAll());
      dispatch(setActer());
    });
  };

  const close = () => {
    setOpen(false);
    setMode(SlideoverModes.none);
    dispatch(setActer());
  };

  return (
    <>
      <tbody>
        {acters.map((x, idx) => (
          <tr
            key={x.id}
            className={classNames(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
          >
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
              <span className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={
                    x.avatar
                      ? `${process.env.REACT_APP_API_HOST}${x.avatar?.url}`
                      : defaultAvatar
                  }
                  alt={x.avatar?.name}
                />
              </span>
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
              {x.name}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
              {x.slug}
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
                          dispatch(setActer(x));
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
                          dispatch(setActer(x));
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
        {acter && (
          <MDelete
            handleDelete={handleDelete}
            open={dOPen}
            setOpen={setDOpen}
            data={{ id: acter.id, name: acter.name }}
          />
        )}
      </PrivateComponent>

      <PrivateComponent operation={accessRoles}>
        {access && (
          <SlideOvers
            title={acter?.name || "Актер"}
            close={close}
            Edit={EditActer}
            Create={CreateActer}
          />
        )}
      </PrivateComponent>
    </>
  );
};
