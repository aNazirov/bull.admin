import { ArchiveIcon, PencilIcon } from "@heroicons/react/solid";
import { PrivateComponent, SlideOvers } from "core/components/shared";
import { MDelete } from "core/components/shared/MDelete";
import { removeService } from "core/services/global.service";
import { getAll, setContext } from "core/store/context/context.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { AppContext } from "core/utils/contexts";
import { RoleType, SlideoverModes } from "core/utils/enums";
import { classNames } from "core/utils/index";
import { contextPriorities } from "core/_data/datas";
import { CreateContext } from "pages/context/create";
import { EditContext } from "pages/context/edit";
import { useContext, useState } from "react";

interface Props {
  path: string[];
}

export const ContextTbody: React.FC<Props> = ({ path }) => {
  const { context, contexts } = useAppSelector((state) => state.contexts);
  const { setOpen, setMode } = useContext(AppContext);

  const [dOPen, setDOpen] = useState(false);

  const dispatch = useAppDispatch();
  const accessRoles = [RoleType.Admin];
  const access = path.length < 2;

  const handleDelete = () => {
    removeService(context!.id, "context").then(() => {
      dispatch(getAll());
      dispatch(setContext());
    });
  };

  const close = () => {
    setOpen(false);
    setMode(SlideoverModes.none);
    dispatch(setContext());
  };

  return (
    <>
      <tbody>
        {contexts.map((x, idx) => (
          <tr
            key={x.id}
            className={classNames(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
          >
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
              {x.name}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
              {x.price}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
              {contextPriorities.find((y) => y.id === x.priority)?.title}
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
                          dispatch(setContext(x));
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
                          dispatch(setContext(x));
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
        {context && (
          <MDelete
            handleDelete={handleDelete}
            open={dOPen}
            setOpen={setDOpen}
            data={{ id: context.id, name: context.name }}
          />
        )}
      </PrivateComponent>

      <PrivateComponent operation={accessRoles}>
        {access && (
          <SlideOvers
            title={context?.name || "Контекст"}
            close={close}
            Edit={EditContext}
            Create={CreateContext}
          />
        )}
      </PrivateComponent>
    </>
  );
};
