import {
  TableOptionsResolved,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  FilterFn,
  SortingFn,
  sortingFns,
} from "@tanstack/table-core";
import { compareItems, rankItem } from "@tanstack/match-sorter-utils";

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export const defaultOptions: TableOptionsResolved<any> = {
  columns: [],
  data: [],
  state: {}, // Dummy state
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onStateChange: () => {}, // noop
  filterFns: {
    fuzzy: fuzzyFilter,
  },
  renderFallbackValue: null,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  globalFilterFn: fuzzyFilter,
  // getSortedRowModel: getSortedRowModel(),
  // getPaginationRowModel: getPaginationRowModel(),
  // getFacetedRowModel: getFacetedRowModel(),
  // getFacetedUniqueValues: getFacetedUniqueValues(),
  // getFacetedMinMaxValues: getFacetedMinMaxValues(),
  debugTable: true,
  debugHeaders: true,
  debugColumns: false,
};

export function createTableDefaultOptions<S>(
  options?: Partial<TableOptionsResolved<S>>
) {
  return {
    ...defaultOptions,
    ...options,
  } as TableOptionsResolved<S>;
}
