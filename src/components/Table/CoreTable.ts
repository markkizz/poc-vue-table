export class CoreTable<TData extends object[]> {
  private _items: TData;
  private defaultSort: {
    by: string;
    desc: boolean;
  };
  private defaultPaginate = {};

  constructor(initialData?: TData) {
    this._items = [] as TData;
  }

  public addItems(items: any) {
    return this;
  }

  public addPagination() {
    return this;
  }

  public filters(targetData: { path: string; value: any }[]) {
    return this;
  }

  public sort(by?: string, desc?: boolean) {
    return this;
  }

  public build() {
    return this._items;
  }
}
