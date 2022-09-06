import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { PageHead } from "components/pages/head";
import { SceletonForPage } from "components/shared";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getOne, setUser } from "store/user/user.thunks";
import { classNames, formatNumber } from "utils";
import { RoleType } from "utils/enums";
import { EditMovie } from "./edit";

interface Props {}

export const ShowUser: React.FC<Props> = () => {
  const { id } = useParams();

  const [showInfo, setShowInfo] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessRoles = [RoleType.Admin, RoleType.Moderator];

  useEffect(() => {
    if (id) {
      dispatch(getOne(+id));
    } else if (!id) {
      navigate("/users");
    }

    return () => {
      dispatch(setUser());
    };
  }, [dispatch, id, navigate]);

  const { user } = useAppSelector((state) => state.users);

  if (!user) {
    return <SceletonForPage />;
  }

  return (
    <div className="flex flex-col">
      <div className="bg-white">
        <PageHead
          title={user?.name}
          description={user?.role?.title}
          operation={accessRoles}
          Edit={EditMovie}
        />

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div>
            <div className="flex justify-between items-center text-lg font-medium text-black ">
              <div className="flex items-center gap-2 border-b-2 border-blue-600">
                Основная информация{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  {showInfo ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </span>
              </div>
            </div>

            <div
              className={classNames(
                showInfo ? "block" : "hidden",
                "mt-3 bg-gray-50 shadow-sm p-4 rounded-md"
              )}
            >
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">Email</div>
                  <div className="mt-1 text-sm text-gray-900">
                    {user?.contact?.email || "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Баланс
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {formatNumber(user?.balance || 0, "UZB")}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Возрастное ограничение
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {user.ageRemark || "----"}
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
