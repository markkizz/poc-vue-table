import { FilterField } from "../types";

export class CoreTable<
  TDataRow extends Record<string, unknown> = Record<string, unknown>
> {
  private _filterableDataRows: TDataRow[];

  constructor(private _originalFilterableDataRows: TDataRow[]) {
    this._filterableDataRows = _originalFilterableDataRows.slice();
  }

  private initialDataBeforeFilter() {
    this._filterableDataRows = this._originalFilterableDataRows.slice();
  }

  public globalSearch(keyword: string) {
    keyword = keyword.trim();
    this.initialDataBeforeFilter();

    if (!keyword) return this;

    if (this._filterableDataRows.length === 0) {
      this._filterableDataRows = [];
      return this;
    }

    const keys = Object.keys(this._filterableDataRows[0]) as (keyof TDataRow)[];
    const lowerCaseText = keyword.toLocaleLowerCase();

    console.log("before search", keyword, this._filterableDataRows);

    const resultSearch = this._filterableDataRows.filter((columns) => {
      const includeConditions = keys.map((key) => {
        const dataCell = columns[key];

        if (typeof dataCell === "string") {
          // TODO: Try to do by RegExp
          return dataCell.toLocaleLowerCase().includes(lowerCaseText);
        } else if (typeof dataCell === "number") {
          return dataCell.toString() === lowerCaseText;
          // } else if (typeof currentData === 'object') {
          //
        } else {
          return false;
        }
      });

      return includeConditions.some((x) => x);
    });

    this._filterableDataRows = resultSearch;

    return this;
  }

  public filterItems(filterableFields: Omit<FilterField, "label">[]) {
    this.initialDataBeforeFilter();
    // this._dataRows.filter(row => {
    // return row.
    // })
    console.log("filterableFields", filterableFields);
    return this;
  }

  public build() {
    return this._filterableDataRows;
  }
}
