import { ChainTbody } from "core/components/pages/chain";
import { Table } from "core/components/pages/table";
import { getAll, setChain, setChains } from "core/store/chain/chain.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { ChainTableNames } from "core/_data/titles";
import { useEffect, useRef, useState } from "react";

interface Props {}

export const Chains: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const filter = useRef({});

  useEffect(() => {
    dispatch(getAll());

    return () => {
      dispatch(setChain());
      dispatch(setChains());
    };
  }, [dispatch]);

  const { count } = useAppSelector((state) => state.chains);

  const getMore = (skip: number) => {
    return dispatch(getAll(skip, filter.current));
  };

  return (
    <>
      <Table
        tableNames={ChainTableNames}
        page={page}
        setPage={setPage}
        tBody={ChainTbody}
        getMore={getMore}
        count={count}
      />
    </>
  );
};
