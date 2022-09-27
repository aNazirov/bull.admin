export const SceletonForPage: React.FC = () => {
  return <div className="animate-pulse bg-gray-300 grow rounded-sm" />;
};

interface Props {
  columns: string[];
}

const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const SceletonForTable: React.FC<Props> = ({ columns }) => {
  return (
    <tbody>
      {rows.map((id, idx) => (
        <tr
          key={id}
          className={`${
            idx % 2 === 0 ? "bg-gray-200" : "bg-gray-300"
          } animate-pulse`}
        >
          {columns.map((column) => (
            <td
              key={column}
              className="px-6 h-10 py-4 whitespace-nowrap text-sm text-gray-500"
            ></td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export const SceletonForDropzone: React.FC = () => {
  return (
    <aside className="overflow-hidden grid grid-cols-span sm:grid-cols-3 gap-2 p-4 justify-center items-center flex-col ">
      <div className="col-span-1 animate-pulse flex justify-between items-center">
        <span className="h-6 w-6 flex-none rounded-full bg-gray-500" />
        <span className="h-6 w-full ml-3 rounded-md flex-auto truncate bg-gray-500" />
      </div>
      <div className="col-span-1 animate-pulse flex justify-between items-center">
        <span className="h-6 w-6 flex-none rounded-full bg-gray-500" />
        <span className="h-6 w-full ml-3 rounded-md flex-auto truncate bg-gray-500" />
      </div>
      <div className="col-span-1 animate-pulse flex justify-between items-center">
        <span className="h-6 w-6 flex-none rounded-full bg-gray-500" />
        <span className="h-6 w-full ml-3 rounded-md flex-auto truncate bg-gray-500" />
      </div>
    </aside>
  );
};

export const SceletonForInput: React.FC = () => {
  return (
    <div className="mt-2 flex animate-pulse flex-row items-center h-full justify-center space-x-5">
      <div className="w-full bg-gray-300 h-6 rounded-md " />
    </div>
  );
};

export const SceletonForTextarea: React.FC = () => {
  return (
    <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
      <div className="w-full bg-gray-300 h-12 rounded-md " />
    </div>
  );
};
