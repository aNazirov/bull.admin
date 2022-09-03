import { ArchiveIcon, PencilIcon } from "@heroicons/react/solid";
import { PrivateComponent, SlideOvers } from "components/shared";
import { MDelete } from "components/shared/MDelete";
import { CreateGenre } from "pages/genre/create";
import { EditGenre } from "pages/genre/edit";
import { useContext, useState } from "react";
import { removeService, Toast } from "services/global";
import { getAll, setGenre } from "store/genre/genre.thunks";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { AppContext } from "utils/contexts";
import { RoleType, SlideoverModes } from "utils/enums";
import { classNames } from "utils/index";

interface Props {
  path: string[];
}

export const GenreTbody: React.FC<Props> = ({ path }) => {
  const { genre, genres } = useAppSelector((state) => state.genres);
  const { setOpen, setMode } = useContext(AppContext);

  const [dOPen, setDOpen] = useState(false);

  const dispatch = useAppDispatch();
  const accessRoles = [RoleType.Admin];
  const access = path.length < 2;

  const handleDelete = () => {
    removeService(genre!.id, "genre")
      .then(() => {
        Toast.success("genre deleted");
        dispatch(getAll());
        dispatch(setGenre());
      })
      .catch((e) => {
        Toast.error(e);
      });
  };

  const close = () => {
    setOpen(false);
    setMode(SlideoverModes.none);
    dispatch(setGenre());
  };

  return (
    <>
      <tbody>
        {genres.map((x, idx) => (
          <tr
            key={x.id}
            className={classNames(idx % 2 === 0 ? "bg-white" : "bg-gray-50")}
          >
            <td className="px-6 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">
              {x.title}
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
                          dispatch(setGenre(x));
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
                          dispatch(setGenre(x));
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
        {genre && (
          <MDelete
            handleDelete={handleDelete}
            open={dOPen}
            setOpen={setDOpen}
            data={{ id: genre.id, name: genre.title }}
          />
        )}
      </PrivateComponent>

      <PrivateComponent operation={accessRoles}>
        {access && (
          <SlideOvers
            title={genre?.title || "genre"}
            close={close}
            Edit={EditGenre}
            Create={CreateGenre}
          />
        )}
      </PrivateComponent>
    </>
  );
};
