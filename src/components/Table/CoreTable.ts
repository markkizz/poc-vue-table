export class CoreTable<TData extends object[]> {
  private _items: TData;

  constructor(initialData: TData) {
    this._items = initialData;
  }

  private setValues(values: TData) {
    this._items = values;
  }

  public getValues() {
    return this._items;
  }

  public filters(targetData: { id: string; value: any }[]) {
    //
    // this.setValues(values)
  }
}
