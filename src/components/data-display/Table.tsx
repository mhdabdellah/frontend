import React from "react";

interface Column {
  header: string;
  accessor: string;
  className?: string;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

const Table = <T,>({ columns, data, renderRow }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-gray-500 mt-4">
        <thead>
          <tr className="text-gray-500 text-sm">
            {columns.map((col) => (
              <th
                key={col.accessor}
                className={`px-4 py-2 rtl:text-right text-justify ${
                  col.className || ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="rtl:space-x-reverse">
          {data.map((item, index) => (
            <React.Fragment key={index}>{renderRow(item)}</React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;