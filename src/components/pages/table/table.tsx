import { PaginationComponent } from "@components/shared/Pagination";
import { SceletonForTable } from "@components/shared/Sceleton";
import { AppContext } from "@utils/contexts";
import { SlideoverModes } from "@utils/enums";
import React, {
  JSXElementConstructor,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import { Thead } from "./thead";

interface Props {
  tableNames: string[];
  getMore: (page: number) => void;
  count: number;
  page: number;
  setPage: (page: number) => void;
  take?: number;
  tBody: JSXElementConstructor<any>;
}

export const Table: React.FC<Props> = ({
  tableNames,
  tBody: Tbody,
  getMore,
  count,
  page,
  setPage,
  take = 10,
}) => {
  const { setMode, setOpen } = useContext(AppContext);
  const { state, pathname }: any = useLocation();

  const [loading, setLoading] = useState(false);
  const [path] = useState(pathname.split("/").filter((x: string) => x));
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state?.edit) {
      setMode(SlideoverModes.edit);
      setOpen(true);
    }

    if (state?.create) {
      setMode(SlideoverModes.create);
      setOpen(true);
    }
  }, []);

  const changePage = async (_page: number) => {
    if (_page === page) return;

    setLoading(true);
    // setLoading(true);

    const _skip = take * (_page - 1);
    setPage(_page);
    
    await getMore(_skip);

    setLoading(false);
  };

  const Pagination = count ? (
    <PaginationComponent
      activePage={page}
      changePage={changePage}
      count={count}
      take={take}
    />
  ) : null;

  return (
    <>
      <div className="flex flex-col flex-1 h-full justify-between">
        <div className="overflow-y-auto flex-1">
          <table className="w-full divide-y divide-gray-200 rounded-md">
            <Thead tableNames={tableNames} />
            {loading ? (
              <SceletonForTable columns={tableNames} />
            ) : (
              <Tbody path={path} />
            )}
          </table>
        </div>

        {Pagination}
      </div>
    </>
  );
};
