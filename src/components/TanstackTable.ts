import {
  TableOptionsResolved,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/table-core";

export const defaultOptions: TableOptionsResolved<any> = {
  columns: [],
  data: [],
  state: {}, // Dummy state
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onStateChange: () => {}, // noop
  renderFallbackValue: null,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
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

// import { Component, Vue } from "vue-property-decorator";

// @Component
// export class TanstackTable extends Vue {}
