import "@tanstack/table-core";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    dataTestid?: string;
    align?: "left" | "center" | "right";
    sortable?: boolean;
    class?: string[] | string;
    width?: string;
  }
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
