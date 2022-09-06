import { FilterIcon } from "@heroicons/react/solid";
import { MovieTbody } from "components/pages/movie";
import { Table } from "components/pages/table";
import { CInput, CSearchSelect } from "components/shared";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAll, setMovies } from "store/movie/movie.thunks";
import { MovieTableNames } from "_data/titles";

interface Props {}

export const Movies: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const filter = useRef({});

  useEffect(() => {
    dispatch(getAll());

    return () => {
      dispatch(setMovies());
    };
  }, [dispatch]);

  const { count } = useAppSelector((state) => state.acters);

  const getMore = (skip: number) => {
    dispatch(getAll(skip, filter.current));
  };

  return (
    <>
      <Filter params={filter} setPage={setPage} />
      <Table
        tableNames={MovieTableNames}
        page={page}
        setPage={setPage}
        tBody={MovieTbody}
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

    dispatch(getAll(0, params)).then(() => {
      setPage(1);
    });
  };

  // @IsOptional()
  // @IsNumber()
  // @Min(0)
  // @Max(10)
  // imdb?: number;

  // @IsOptional()
  // @IsNumber()
  // @Min(0)
  // @Max(10)
  // rating?: number;

  // @IsOptional()
  // @IsNumber()
  // @Min(0)
  // @Max(100)
  // ageRemark?: number;

  // @IsOptional()
  // @IsNumber()
  // @Min(1900)
  // @Max(2030)
  // year?: number;

  // @IsOptional()
  // @IsNumber()
  // genreId?: number;

  // @IsOptional()
  // @IsNumber()
  // countryId?: number;

  // @IsOptional()
  // @IsNumber()
  // acterId?: number;

  // @IsOptional()
  // @IsNumber()
  // categoryId?: number;

  // @IsOptional()
  // @IsNumber()
  // producerId?: number[];

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
              <CInput
                name="slug"
                required={false}
                control={control}
                title="Slug"
                error={errors["slug"]}
              />
            </div>

            <div className="w-full sm:w-2/12">
              <CSearchSelect
                name="genreId"
                required={false}
                control={control}
                title="Жанр"
                index="genres"
                error={errors["genreId"]}
              />
            </div>

            <div className="w-full sm:w-1/12">
              <CSearchSelect
                name="countryId"
                required={false}
                control={control}
                title="Страна"
                index="countries"
                error={errors["countryId"]}
              />
            </div>

            <div className="w-full sm:w-1/12">
              <CInput
                name="imdb"
                required={false}
                control={control}
                title="Imdb"
                type="number"
                min={0}
                max={10}
                error={errors["imdb"]}
              />
            </div>

            <div className="w-full sm:w-1/12">
              <CInput
                name="rating"
                required={false}
                control={control}
                title="Рейтинг"
                min={0}
                max={10}
                error={errors["rating"]}
              />
            </div>

            <div className="w-full sm:w-1/12">
              <CInput
                name="ageRemark"
                required={false}
                control={control}
                title="Воз-ое огран."
                min={0}
                max={100}
                error={errors["ageRemark"]}
              />
            </div>

            <div className="w-full sm:w-1/12">
              <CInput
                name="year"
                required={false}
                control={control}
                title="Год"
                min={1900}
                max={2030}
                defaultValue={2022}
                error={errors["year"]}
              />
            </div>
          </div>

          <div className="col-span-full flex flex-col sm:flex-row gap-3">
            <div className="w-full sm:w-2/12">
              <CSearchSelect
                name="acterId"
                required={false}
                control={control}
                title="Актер"
                index="acters"
                error={errors["acterId"]}
              />
            </div>

            <div className="w-full sm:w-2/12">
              <CSearchSelect
                name="categoryId"
                required={false}
                control={control}
                title="Категория"
                index="categories"
                error={errors["categoryId"]}
              />
            </div>

            <div className="w-full sm:w-2/12">
              <CSearchSelect
                name="producerId"
                required={false}
                control={control}
                title="Продюсер"
                index="producers"
                error={errors["producerId"]}
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
              className="transition duration-300 ease-in-out rounded-3xl inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
