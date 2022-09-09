import {
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { PageHead } from "components/pages/head";
import { SceletonForPage } from "components/shared";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getOne, setMovie } from "store/movie/movie.thunks";
import { classNames } from "utils";
import { RoleType } from "utils/enums";
import { EditMovie } from "./edit";

interface Props {}

export const ShowMovie: React.FC<Props> = () => {
  const { id } = useParams();
  const { token } = useAppSelector((state) => state.global);

  const [showInfo, setShowInfo] = useState(true);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessRoles = [RoleType.Admin, RoleType.Moderator];

  useEffect(() => {
    if (id) {
      dispatch(getOne(+id));
    } else if (!id) {
      navigate("/movies");
    }

    return () => {
      dispatch(setMovie());
    };
  }, [dispatch, id, navigate]);

  const { movie } = useAppSelector((state) => state.movies);

  if (!movie) {
    return <SceletonForPage />;
  }

  return (
    <div className="flex flex-col">
      <div className="bg-white">
        <PageHead
          title={movie?.title}
          description={movie?.slug}
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
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">Жанры</div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.genres?.map((x) => x.title).join(", ") || "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Категории
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.categories?.map((x) => x.title).join(", ") || "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Актеры
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.acters?.map((x) => x.name).join(", ") || "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Продюсеры
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.producers?.map((x) => x.name).join(", ") || "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Страны
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.countries?.map((x) => x.title).join(", ") || "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">Imdb</div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie?.imdb || 0}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Рейтинг
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.rating || 0}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Возрастное ограничение
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.ageRemark || "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">Год</div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.year || "----"}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    По подписке
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.bySubscription ? (
                      <PlusIcon className="h-6 w-6 text-blue-500" />
                    ) : (
                      <MinusIcon className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Новинка
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.isNew ? (
                      <PlusIcon className="h-6 w-6" />
                    ) : (
                      <MinusIcon className="h-6 w-6" />
                    )}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Трейлер
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.treiler ? (
                      <a href={`/file/${token}/${movie.treiler.name}`} download>
                        Скачать
                      </a>
                    ) : (
                      "----"
                    )}
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <div className="text-sm font-medium text-gray-500">
                    Описание
                  </div>
                  <div className="mt-1 text-sm text-gray-900">
                    {movie.description || "----"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
