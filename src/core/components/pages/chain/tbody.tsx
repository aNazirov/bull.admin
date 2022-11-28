import {
  ArchiveIcon,
  CheckIcon,
  MinusIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { PrivateComponent, SlideOvers } from "core/components/shared";
import { MDelete } from "core/components/shared/MDelete";
import { removeService } from "core/services/global.service";
import { getAll, setChain } from "core/store/chain/chain.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { AppContext } from "core/utils/contexts";
import { RoleType, SlideoverModes } from "core/utils/enums";
import { classNames } from "core/utils/index";
import { CreateChain } from "pages/chain/create";
import { EditChain } from "pages/chain/edit";
import { useContext, useState } from "react";

interface Props {
  path: string[];
}

export const ChainTbody: React.FC<Props> = ({ path }) => {
  const { chain, chains } = useAppSelector((state) => state.chains);
  const { setOpen, setMode } = useContext(AppContext);

  const [dOPen, setDOpen] = useState(false);

  const dispatch = useAppDispatch();
  const accessRoles = [RoleType.Admin];
  const access = path.length < 2;

  const handleDelete = () => {
    removeService(chain!.id, "chain").then(() => {
      dispatch(getAll());
      dispatch(setChain());
    });
  };

  const close = () => {
    setOpen(false);
    setMode(SlideoverModes.none);
    dispatch(setChain());
  };

  return (
    <>
      <tbody>
        {chains.map((x, idx) => (
          <tr
            key={x.id}
            className={classNames(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
          >
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
              {x.price}
            </td>
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">
              {x.active ? (
                <CheckIcon className="h-6 w-6" />
              ) : (
                <MinusIcon className="h-6 w-6" />
              )}
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
                          dispatch(setChain(x));
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
                          dispatch(setChain(x));
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
        {chain && (
          <MDelete
            handleDelete={handleDelete}
            open={dOPen}
            setOpen={setDOpen}
            data={{ id: chain.id, name: "" }}
          />
        )}
      </PrivateComponent>

      <PrivateComponent operation={accessRoles}>
        {access && (
          <SlideOvers
            title={"Цепочка"}
            close={close}
            Edit={EditChain}
            Create={CreateChain}
          />
        )}
      </PrivateComponent>
    </>
  );
};
