import { FilterIcon } from "@heroicons/react/solid";
import { LessonTbody } from "core/components/pages/lesson";
import { Table } from "core/components/pages/table";
import { CInput, CSearchSelect } from "core/components/shared";
import { useAppDispatch, useAppSelector } from "core/store/hooks";
import { getAll, setLessons } from "core/store/lesson/lesson.thunks";
import { LessonTableNames } from "core/_data/titles";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {}

export const Lessons: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const filter = useRef({});

  useEffect(() => {
    dispatch(getAll());

    return () => {
      dispatch(setLessons());
    };
  }, [dispatch]);

  const { count } = useAppSelector((state) => state.lessons);

  const getMore = (skip: number) => {
    return dispatch(getAll(skip, filter.current));
  };

  return (
    <>
      <Filter params={filter} setPage={setPage} />
      <Table
        tableNames={LessonTableNames}
        page={page}
        setPage={setPage}
        tBody={LessonTbody}
        getMore={getMore}
        count={count}
      />
    </>
  );
};

interface FilterProps {
  params: MutableRefObject<any>;
  setPage: (page: number) => void;
}

const Filter: React.FC<FilterProps> = ({ params, setPage }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const [filterOpen, setFilterOpen] = useState(false);

  const dispatch = useAppDispatch();

  const filter = (data: any) => {
    params.current = { ...data };

    dispatch(getAll(0, params.current)).then(() => {
      setPage(1);
    });
  };

  return (
    <>
      {filterOpen ? (
        <form
          className="relative grid justify-between items-end grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-2"
          onSubmit={handleSubmit(filter)}
        >
          <div className="col-span-full flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-2/12">
              <CInput
                name="title"
                required={false}
                control={control}
                title="Название"
                error={errors["title"]}
              />
            </div>

            <div className="w-full sm:w-2/12">
              <CSearchSelect
                name="categoryId"
                required={false}
                control={control}
                title="Тематика"
                index="categories"
                error={errors["categoryId"]}
              />
            </div>

            <div className="w-full sm:w-2/12">
              <CSearchSelect
                name="materialId"
                required={false}
                control={control}
                title="Материал"
                index="materials"
                error={errors["materialId"]}
              />
            </div>
          </div>

          <div className="col-span-full mt-2 flex justify-end">
            <button
              type="button"
              className="transition duration-300 ease-in-out rounded-3xl mr-3 py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setFilterOpen(false)}
            >
              Закрыть
            </button>
            <button
              type="submit"
              className="transition duration-300 ease-in-out rounded-3xl inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              Фильтровать
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-end">
          <span
            className="flex items-center gap-3 bg-white p-1 cursor-pointer rounded-full text-gray-400 hover:text-gray-500"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <span>Фильтр</span>
            <FilterIcon className="h-6 w-6" aria-hidden="true" />
          </span>
        </div>
      )}
    </>
  );
};
