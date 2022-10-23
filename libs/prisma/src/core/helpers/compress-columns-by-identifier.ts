import { deepClone } from '@libs/lodash';

interface CompressDetail<Entity, CompressToColumn extends string, Column extends StringKeys<Entity>> {
  column: Column;
  columnAs?: string;
  compressTo: CompressToColumn;
}

type StringKeys<T> = Extract<keyof T, string>;

const createColumnsForCompression = <T, CompressToColumn extends string, Column extends StringKeys<T>>(
  compressDetails: CompressDetail<T, CompressToColumn, Column>[],
) => {
  return compressDetails.reduce((accumulator, { compressTo }) => {
    if (accumulator[compressTo]) {
      return accumulator;
    }

    accumulator[compressTo] = {};

    return accumulator;
  }, <Record<string, Record<string, unknown>>>{});
};

const setDataToCompressionColumns = <T, CompressToColumn extends string, Column extends StringKeys<T>>(
  row: T,
  compressDetails: CompressDetail<T, CompressToColumn, Column>[],
  columnsForCompression: Record<string, Record<string, unknown>>,
) => {
  const columnsForCompressionCopy = deepClone(columnsForCompression);

  return compressDetails.reduce((accumulator, { column, columnAs, compressTo }) => {
    accumulator[compressTo][columnAs || column] = row[column];

    return accumulator;
  }, columnsForCompressionCopy);
};

const isAllFieldsNullable = (compressedData: Record<string, unknown>) =>
  !Object.values(compressedData).some((value) => value !== null);

export function compressRowsByIdentifier<T, CompressToColumn extends string, Column extends StringKeys<T>>(
  rows: T[],
  compressDetails: CompressDetail<T, CompressToColumn, Column>[],
  identifier: keyof T,
): (Omit<T, Column> & Record<CompressToColumn, any[]>)[] {
  const columnsForCompression = createColumnsForCompression(compressDetails);

  const compressedRows = rows.reduce((compressedRows, row) => {
    const rowIdentifier = row[identifier];
    const existingCompressedRow = compressedRows.get(rowIdentifier);

    const compressedColumns = setDataToCompressionColumns(row, compressDetails, columnsForCompression);
    const compressedColumnsEntries = Object.entries(compressedColumns);

    if (existingCompressedRow) {
      compressedColumnsEntries.forEach(([column, compressedData]) => {
        if (!isAllFieldsNullable(compressedData)) {
          existingCompressedRow[column].push(compressedData);
        }
      });

      compressedRows.set(rowIdentifier, existingCompressedRow);

      return compressedRows;
    }

    compressDetails.forEach(({ column }) => {
      delete row[column];
    });

    const compressedColumnsInRow = compressedColumnsEntries.reduce((accumulator, [column, compressedData]) => {
      if (isAllFieldsNullable(compressedData)) {
        accumulator[column] = [];

        return accumulator;
      }

      accumulator[column] = [compressedData];

      return accumulator;
    }, {});

    const compressedRow = { ...row, ...compressedColumnsInRow };

    compressedRows.set(rowIdentifier, compressedRow);

    return compressedRows;
  }, new Map<T[keyof T], any>());

  return Array.from(compressedRows.values());
}
