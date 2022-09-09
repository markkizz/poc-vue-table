import Emitter from "@/utils/Emitter";
import {
  ITableAdapter,
  ITableFilter,
  ITableHeader,
} from "@/adapters/abstracts/ITableAdapter";

export abstract class BaseTableAdapter<
    TDataItem extends Record<string, unknown>
  >
  extends Emitter
  implements ITableAdapter<TDataItem>
{
  abstract conditionalFilter(
    filters: ITableFilter<TDataItem>[]
  ): void | Promise<void>;

  public readonly headers: ITableHeader<TDataItem>[] = [];
  public currentView: TDataItem[] = [];
  public initialView: TDataItem[] = [];

  initialize() {
    this.setCurrentView(this.initialView);
  }

  fullTextSearch(keyword: string): void {
    const allowedFields = this.headers.filter((header) => header.filterable);
    const result = this.initialView.filter((item) => {
      return allowedFields.reduce((previous: boolean, current) => {
        const currentValue = item[current.key];
        return (
          previous ||
          (current.identifier
            ? current
                .identifier(item)
                .toLowerCase()
                .includes(keyword.toLowerCase())
            : !["object", "undefined", "null"].includes(typeof currentValue)
            ? String(currentValue)
                ?.toLowerCase()
                ?.includes(keyword.toLowerCase()) || false
            : false)
        );
      }, false);
    });
    this.setCurrentView(result);
  }

  setCurrentView(data: TDataItem[]) {
    this.currentView = [...data];
    this.emit("currentViewSet", this.currentView);
  }
}
