import { MinusIcon } from "@heroicons/react/solid";
import { IEpisode } from "interfaces/interfaces";
import { useEffect, useState } from "react";
import {
  createService,
  filesUpload,
  removeEpisode,
  removeService,
  updateEpisode,
  updateMovieFile,
} from "services";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getOne } from "store/movie/movie.thunks";
import { classNames, formatData, Toast } from "utils";
import { CDropzone } from "../CDropzone";
import { Spinner } from "../Loader";

interface Props {
  cols?: number;
}

export const Seasons: React.FC<Props> = ({ cols = 4 }) => {
  const { token } = useAppSelector((state) => state.global);
  const { movie } = useAppSelector((state) => state.movies);

  const [selectedSeason, setSelectedSeason] = useState<number | undefined>(
    undefined
  );
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (movie?.seasons.length !== 0) {
      setSelectedSeason(movie?.seasons.find((x) => x.season === 1)?.id);
    }
  }, [movie]);

  useEffect(() => {
    if (selectedSeason !== 0) {
      setEpisodes(
        movie!.seasons.find((x) => x.id === selectedSeason)?.episodes || []
      );
    }
  }, [selectedSeason]);

  const addSeason = () => {
    return createService(
      { movieId: movie!.id, season: movie!.seasons.length + 1 },
      "season"
    )
      .then(() => dispatch(getOne(movie!.id)))
      .catch((e) => Toast.error(e));
  };

  const removeSeason = (id: number) => () => {
    removeService(id, "season")
      .then(() => {
        dispatch(getOne(movie!.id));
        Toast.success("Успешно удален");
      })
      .catch((e) => Toast.error(e));
  };

  const episodeUpdate = (id: number, episode: number) => {
    if (id && episode) {
      updateEpisode(id, { episode })
        .then((episode) => {
          const _episodes = episodes.map((x) => {
            if (x.id === episode.id) return episode;
            return x;
          });

          setEpisodes(_episodes);
          Toast.success("Успешно обновлен");
        })
        .catch((e) => Toast.error(e));
    }
  };

  const episodeRemove = (id: number) => () => {
    removeEpisode(id)
      .then(() => {
        const _episodes = episodes.filter((x) => x.id !== id);
        setEpisodes(_episodes);
        Toast.success("Успешно обновлен");
      })
      .catch((e) => Toast.error(e));
  };

  return (
    <>
      <nav className="flex space-x-4" aria-label="Tabs">
        {movie?.seasons.map((season) => (
          <div
            key={season.id}
            className={classNames(
              season.id === selectedSeason
                ? "bg-gray-100 text-black"
                : "text-gray-500 hover:text-black",
              "px-3 py-0.5 font-medium text-sm rounded-xs cursor-pointer flex items-center"
            )}
            onClick={() => setSelectedSeason(season.id)}
          >
            <span className="ml-3">{season.season} Сезон</span>

            <button
              className={classNames(
                "px-3 py-0.5 font-medium text-sm rounded-xs cursor-pointer"
              )}
              onClick={removeSeason(season.id)}
            >
              <MinusIcon className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ))}
        <button
          className={classNames(
            "px-3 py-0.5 font-medium text-sm rounded-xs cursor-pointer"
          )}
          onClick={addSeason}
        >
          Добавить сезон
        </button>
      </nav>

      <div className={`mt-5 grid grid-cols-${cols} justify-between gap-4`}>
        {episodes.map((episode) => {
          const filePath = `${process.env.REACT_APP_API_HOST}${episode.file.url}`;

          return (
            <div
              key={episode.id}
              className="col-span-1 flex justify-between flex-col gap-2"
            >
              <video
                src={filePath}
                preload="none"
                className="h-36 w-full object-cover rounded-sm bg-gray-400"
                controls
              />

              <div className="flex gap-3">
                <input
                  defaultValue={episode.episode}
                  onChange={(e) => {
                    episodeUpdate(episode.id, +e.target.value);
                  }}
                  min={0}
                  type="number"
                  className="mt-1 w-full rounded-sm border bg-white py-1 px-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />

                <button
                  className={classNames(
                    "px-3 py-0.5 font-medium text-sm rounded-xs cursor-pointer"
                  )}
                  onClick={episodeRemove(episode.id)}
                >
                  <MinusIcon className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          );
        })}

        {!!selectedSeason && (
          <div className="col-span-1">
            <CDropzone
              setEpisodes={setEpisodes}
              episodes={episodes}
              seasonId={selectedSeason}
            />
          </div>
        )}
      </div>
    </>
  );
};

export const FileManager: React.FC<Props> = ({ cols = 4 }) => {
  const { token } = useAppSelector((state) => state.global);
  const { movie } = useAppSelector((state) => state.movies);

  const [selectedQuality, setSelectedQuality] = useState("cd");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const movieFileUpdate = async (
    type: "cdId" | "hdId" | "fullHDId" | "uHDId",
    file?: File
  ) => {
    if (file) {
      Toast.info(`Загрузка файла на сервер`);
      setLoading(true);
      const fileId = (await filesUpload(formatData({ files: [file] })))[0].id;

      if (typeof fileId === "number") {
        await updateMovieFile(movie!.id, { [type]: fileId })
          .then(() => {
            Toast.success("Загрузка завершена");
            dispatch(getOne(movie!.id));
          })
          .catch((e) => Toast.error(e));
      }

      setLoading(false);
    }
  };

  return (
    <>
      <nav className="flex space-x-4" aria-label="Tabs">
        {["cd", "hd", "fullHD", "uHD"].map((quality) => (
          <div
            key={quality}
            className={classNames(
              quality === selectedQuality
                ? "bg-gray-100 text-black"
                : "text-gray-500 hover:text-black",
              "px-3 py-0.5 font-medium text-sm rounded-xs cursor-pointer flex items-center"
            )}
            onClick={() => setSelectedQuality(quality)}
          >
            <span className="ml-3">{quality.toUpperCase()}</span>
          </div>
        ))}
      </nav>

      <div
        className={classNames(
          selectedQuality === "cd" ? "" : "hidden",
          `mt-5 grid grid-cols-${cols} justify-between gap-4`
        )}
      >
        <div className="col-span-1 flex justify-between flex-col gap-2">
          <video
            src={
              movie?.file?.cd
                ? `${process.env.REACT_APP_API_HOST}${movie.file.cd?.url}`
                : ""
            }
            preload="metadata"
            className="h-36 w-full object-cover rounded-sm bg-gray-400"
            controls
          />

          <div className="flex justify-between items-center">
            <label
              htmlFor={`upload-cd`}
              className="block text-sm font-medium text-gray-700 cursor-pointer"
            >
              {!movie?.file?.cd ? "Загрузить" : "Перезагрузить"}
            </label>

            {loading && <Spinner size={8} />}
          </div>

          <div className="flex gap-3">
            <input
              id={`upload-cd`}
              type="file"
              accept="video/*"
              disabled={loading}
              hidden
              onChange={(e) =>
                movieFileUpdate("cdId", (e.target?.files || [])[0])
              }
            />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          selectedQuality === "hd" ? "" : "hidden",
          `mt-5 grid grid-cols-${cols} justify-between gap-4`
        )}
      >
        <div className="col-span-1 flex justify-between flex-col gap-2">
          <video
            src={
              movie?.file?.hd
                ? `${process.env.REACT_APP_API_HOST}${movie.file.hd?.url}`
                : ""
            }
            preload="metadata"
            className="h-36 w-full object-cover rounded-sm bg-gray-400"
            controls
          />

          <div className="flex justify-between items-center">
            <label
              htmlFor={`upload-hd`}
              className="block text-sm font-medium text-gray-700 cursor-pointer"
            >
              {!movie?.file?.hd ? "Загрузить" : "Перезагрузить"}
            </label>

            {loading && <Spinner size={8} />}
          </div>

          <div className="flex gap-3">
            <input
              id={`upload-hd`}
              type="file"
              accept="video/*"
              disabled={loading}
              hidden
              onChange={(e) =>
                movieFileUpdate("hdId", (e.target?.files || [])[0])
              }
            />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          selectedQuality === "fullHD" ? "" : "hidden",
          `mt-5 grid grid-cols-${cols} justify-between gap-4`
        )}
      >
        <div className="col-span-1 flex justify-between flex-col gap-2">
          <video
            src={
              movie?.file?.fullHD
                ? `${process.env.REACT_APP_API_HOST}${movie.file.fullHD?.url}`
                : ""
            }
            preload="metadata"
            className="h-36 w-full object-cover rounded-sm bg-gray-400"
            controls
          />

          <div className="flex justify-between items-center">
            <label
              htmlFor={`upload-fullHD`}
              className="block text-sm font-medium text-gray-700 cursor-pointer"
            >
              {!movie?.file?.fullHD ? "Загрузить" : "Перезагрузить"}
            </label>

            {loading && <Spinner size={8} />}
          </div>

          <div className="flex gap-3">
            <input
              id={`upload-fullHD`}
              type="file"
              accept="video/*"
              disabled={loading}
              hidden
              onChange={(e) =>
                movieFileUpdate("fullHDId", (e.target?.files || [])[0])
              }
            />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          selectedQuality === "uHD" ? "" : "hidden",
          `mt-5 grid grid-cols-${cols} justify-between gap-4`
        )}
      >
        <div className="col-span-1 flex justify-between flex-col gap-2">
          <video
            src={
              movie?.file?.uHD
                ? `${process.env.REACT_APP_API_HOST}${movie.file.uHD?.url}`
                : ""
            }
            preload="metadata"
            className="h-36 w-full object-cover rounded-sm bg-gray-400"
            controls
          />

          <div className="flex justify-between items-center">
            <label
              htmlFor={`upload-uHD`}
              className="block text-sm font-medium text-gray-700 cursor-pointer"
            >
              {!movie?.file?.uHD ? "Загрузить" : "Перезагрузить"}
            </label>

            {loading && <Spinner size={8} />}
          </div>

          <div className="flex gap-3">
            <input
              id={`upload-uHD`}
              type="file"
              accept="video/*"
              disabled={loading}
              hidden
              onChange={(e) =>
                movieFileUpdate("uHDId", (e.target?.files || [])[0])
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
