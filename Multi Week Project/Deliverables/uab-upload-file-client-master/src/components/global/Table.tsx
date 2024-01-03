import { classNames } from "@/utils";

type ColumnConfig<Row> = {
  title: React.ReactNode;
  colName: string;
  formatter?: (value: any, data: Row) => React.ReactNode;
};

//type Row = any;

type TableProps<Row> = {
  columns: ColumnConfig<Row>[];
  rows: Row[];
  shadow?: boolean;
  containerClassNames?: string;
};

function Table(props: TableProps<any>) {
  const { columns, rows, shadow = true, containerClassNames } = props;

  const columnsJsx = (
    <tr>
      {columns.map((column) => {
        return (
          <th
            scope="col"
            className="px-6 py-3"
            key={`${column.colName}-${column.title}`}
          >
            {column.title}
          </th>
        );
      })}
    </tr>
  );

  const rowsJsx = rows.length ? (
    rows.map((row) => {
      return (
        <tr
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          key={row.id}
        >
          {columns.map((column) => {
            const value = row[column.colName];
            const formattedValue = column.formatter
              ? column.formatter(value, row)
              : value;
            return (
              <td
                className="px-6 py-4"
                key={`${column.colName}-${column.title}`}
              >
                {formattedValue}
              </td>
            );
          })}
        </tr>
      );
    })
  ) : (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td colSpan={columns.length} className="px-6 py-4 text-center">
        No Data
      </td>
    </tr>
  );

  return (
    <div
      className={classNames(
        "relative overflow-x-auto  sm:rounded-lg overflow-y-auto",
        shadow ? "shadow-md" : "",
        containerClassNames
      )}
    >
      <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {columnsJsx}
        </thead>
        <tbody>{rowsJsx}</tbody>
      </table>
    </div>
  );
}

export default Table;
