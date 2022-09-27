import { IEpisode, IFile } from "core/interfaces";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { createEpisodes, filesUpload } from "core/services";
import { formatData, Toast } from "core/utils";
import { SceletonForDropzone } from "../Sceleton";

interface Props {
  seasonId: number;
  episodes: IEpisode[];
  setEpisodes: (episode: IEpisode[]) => void;
  maxFiles?: number;
}

export const CDropzone: React.FC<Props> = ({
  seasonId,
  episodes,
  setEpisodes,
  maxFiles,
}) => {
  const [loading, setLoading] = useState(false);

  const uploadFiles = async (data: File[]) => {
    if (!data.length) return;
    setLoading(true);
    await filesUpload(formatData({ files: data }))
      .then(async (_files) => {
        return createEpisodes({
          seasonId: seasonId,
          episodes: _files.map((x: IFile) => ({
            episode: episodes.length + 1,
            fileId: x.id,
          })),
        });
      })
      .then((_episodes) => setEpisodes([...episodes, ..._episodes]))
      .catch((e) => Toast.error(e))
      .finally(() => setLoading(false));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": ["*"],
    },
    maxFiles: maxFiles || 10,
    onDrop: uploadFiles,
  });

  return (
    <>
      <div className="mt-1 border-2 border-gray-300 relative border-dashed rounded-md px-6 pt-5 pb-10 flex justify-center">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-xs text-gray-500 h-5"></p>
          <div className="flex text-sm text-gray-600">
            <section
              className="container max-w-full"
              style={{ cursor: "pointer" }}
            >
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {!loading && (
                  <p className="w-full h-full flex items-end justify-center absolute bottom-5 left-0">
                    <span className="text-sm text-gray-500">
                      Перетащите файл(ы)
                    </span>
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {loading && <SceletonForDropzone />}
    </>
  );
};
