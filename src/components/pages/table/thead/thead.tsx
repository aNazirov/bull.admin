import { THead } from "@utils/enums";
import React from "react";

interface Props {
  tableNames: string[];
}

export const Thead: React.FC<Props> = ({ tableNames }) => {
  return (
    <thead>
      <tr>
        {tableNames.map((name, i) => {
          if (name === THead.edit) {
            return (
              <th key={name + i} scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            );
          }

          return (
            <th
              key={name + i}
              scope="col"
              className="px-6 py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider"
            >
              {name}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
