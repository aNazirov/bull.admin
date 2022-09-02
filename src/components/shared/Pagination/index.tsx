import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

interface Props {
  activePage: number;
  changePage: (i: number) => void;
  count: number;
  take: number;
}

export const PaginationComponent: React.FC<Props> = ({
  changePage,
  activePage,
  count,
  take = 10,
}) => {
  const [showPages, setShowPage] = useState(window.innerWidth > 667 ? 10 : 4);

  useEffect(() => {
    window.addEventListener("resize", showPagesCount);
    return () => {
      window.removeEventListener("resize", showPagesCount);
    };
  }, [window.innerWidth]);

  const showPagesCount = () => {
    const width = window.innerWidth;

    if (width < 440) {
      setShowPage(3);
    }

    if (width > 440 && width < 800) {
      setShowPage(5);
    }

    if (width > 800 && width < 1200) {
      setShowPage(8);
    }

    if (width > 1200) {
      setShowPage(10);
    }
  };

  const pageChange = (i: number) => {
    changePage(i);
  };

  return (
    <div className="flex flex-none justify-center">
      <Pagination
        innerClass="relative z-0 inline-flex rounded-md shadow-sm -space-x-px mt-4 gap-1"
        itemClassPrev="relative inline-flex cursor-pointer items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-xs font-normal text-gray-500 hover:bg-gray-50"
        itemClassNext="relative inline-flex cursor-pointer items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-xs font-normal text-gray-500 hover:bg-gray-50"
        itemClassFirst="relative inline-flex cursor-pointer items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-xs font-normal text-gray-500 hover:bg-gray-50"
        itemClassLast="relative inline-flex cursor-pointer items-center px-4 py-2  rounded-md border border-gray-300 bg-white text-xs font-normal text-gray-500 hover:bg-gray-50"
        activeClass="z-10 bg-blue-50 cursor-pointer border-blue-500 text-blue-600 rounded-md relative inline-flex items-center px-4 py-2 border text-xs font-normal"
        itemClass="bg-white border-gray-300 cursor-pointer text-gray-500 hover:bg-gray-50 rounded-md relative inline-flex items-center px-4 py-2 border text-xs font-normal"
        totalItemsCount={count}
        onChange={pageChange}
        itemsCountPerPage={take}
        pageRangeDisplayed={showPages}
        activePage={activePage}
      />
    </div>
  );
};
