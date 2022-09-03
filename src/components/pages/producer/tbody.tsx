import { ArchiveIcon, PencilIcon } from "@heroicons/react/solid";
import { PrivateComponent, SlideOvers } from "components/shared";
import { MDelete } from "components/shared/MDelete";
import { CreateProducer } from "pages/producer/create";
import { EditProducer } from "pages/producer/edit";
import { useContext, useState } from "react";
import { removeService, Toast } from "services/global";
import { getAll } from "store/genre/genre.thunks";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setProducer } from "store/producer/producer.thunks";
import { AppContext } from "utils/contexts";
import { RoleType, SlideoverModes } from "utils/enums";
import { classNames } from "utils/index";
import { defaultAvatar } from "_data/datas";

interface Props {
  path: string[];
}

export const ProducerTbody: React.FC<Props> = ({ path }) => {
  const { token } = useAppSelector((state) => state.global);
  const { producer, producers } = useAppSelector((state) => state.producers);
  const { setOpen, setMode } = useContext(AppContext);

  const [dOPen, setDOpen] = useState(false);

  const dispatch = useAppDispatch();
  const accessRoles = [RoleType.Admin];
  const access = path.length < 2;

  const handleDelete = () => {
    removeService(producer!.id, "producer")
      .then(() => {
        Toast.success("producer deleted");
        dispatch(getAll());
        dispatch(setProducer());
      })
      .catch((e) => {
        Toast.error(e);
      });
  };

  const close = () => {
    setOpen(false);
    setMode(SlideoverModes.none);
    dispatch(setProducer());
  };

  return (
    <>
      <tbody>
        {producers.map((x, idx) => (
          <tr
            key={x.id}
            className={classNames(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
          >
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={
                    x.avatar?.url ? `${x.avatar?.url}/${token}` : defaultAvatar
                  }
                  alt={x.avatar?.name}
                />
              </div>
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
                          dispatch(setProducer(x));
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
                          dispatch(setProducer(x));
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
        {producer && (
          <MDelete
            handleDelete={handleDelete}
            open={dOPen}
            setOpen={setDOpen}
            data={{ id: producer.id, name: producer.name }}
          />
        )}
      </PrivateComponent>

      <PrivateComponent operation={accessRoles}>
        {access && (
          <SlideOvers
            title={producer?.name || "Актер"}
            close={close}
            Edit={EditProducer}
            Create={CreateProducer}
          />
        )}
      </PrivateComponent>
    </>
  );
};
