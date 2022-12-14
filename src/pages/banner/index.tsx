import { BannerTbody } from "core/components/pages/banner";
import { Table } from "core/components/pages/table";
import { getAll, setBanner, setBanners } from "core/store/banner/banner.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { BannerTableNames } from "core/_data/titles";
import { useEffect, useRef, useState } from "react";

interface Props {}

export const Banners: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const filter = useRef({});

  useEffect(() => {
    dispatch(getAll());

    return () => {
      dispatch(setBanner());
      dispatch(setBanners());
    };
  }, [dispatch]);

  const { count } = useAppSelector((state) => state.banners);

  const getMore = (skip: number) => {
    return dispatch(getAll(skip, filter.current));
  };

  return (
    <>
      <Table
        tableNames={BannerTableNames}
        page={page}
        setPage={setPage}
        tBody={BannerTbody}
        getMore={getMore}
        count={count}
      />
    </>
  );
};
