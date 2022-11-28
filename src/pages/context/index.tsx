import { ContextTbody } from "core/components/pages/context";
import { Table } from "core/components/pages/table";
import {
  getAll,
  setContext,
  setContexts,
} from "core/store/context/context.thunks";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { ContextTableNames } from "core/_data/titles";
import { useEffect, useRef, useState } from "react";

interface Props {}

export const Contexts: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const filter = useRef({});

  useEffect(() => {
    dispatch(getAll());

    return () => {
      dispatch(setContext());
      dispatch(setContexts());
    };
  }, [dispatch]);

  const { count } = useAppSelector((state) => state.contexts);

  const getMore = (skip: number) => {
    return dispatch(getAll(skip, filter.current));
  };

  return (
    <>
      <Table
        tableNames={ContextTableNames}
        page={page}
        setPage={setPage}
        tBody={ContextTbody}
        getMore={getMore}
        count={count}
      />
    </>
  );
};
