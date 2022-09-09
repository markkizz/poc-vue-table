import { IEmitter } from "@/utils/Emitter";

export interface ITableHeader<TDataItem> {
  id: string;
  text: string;
  key: keyof TDataItem;
  align?: "left" | "center" | "right";
  filterable?: boolean;
  identifier?: (item: TDataItem) => string;
}

export interface ITableFilterCondition {
  operator: string;
  value: string;
}

export interface ITableFilter<TDataItem> {
  key: keyof TDataItem;
  conditions: ITableFilterCondition[];
}

export interface ITableAdapter<TDataItem> extends IEmitter {
  headers: ITableHeader<TDataItem>[];

  currentView: TDataItem[];

  fullTextSearch(keyword: string): Promise<void> | void;
  conditionalFilter(filters: ITableFilter<TDataItem>[]): Promise<void> | void;
  initialize(): Promise<void> | void;
}
