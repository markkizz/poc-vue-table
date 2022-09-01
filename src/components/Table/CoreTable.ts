export class CoreTable<TDataRow extends Record<string, unknown>> {
  private rows: TDataRow[];

  constructor(initialData: TDataRow[] = []) {
    this.rows = initialData;
  }

  private setValues(values: TDataRow[]) {
    this.rows = values;
  }

  public getValues() {
    return this.rows;
  }

  public filters(targetData: { id: string; value: any }[]) {
    //
    // this.setValues(values)
    // console.log(targetData);
  }

  public globalSearch(keyword: string) {
    if (!keyword) return this.rows;
    if (this.rows.length === 0) return [];

    const keys = Object.keys(this.rows[0]) as (keyof TDataRow)[];
    const lowerCaseText = keyword.toLocaleLowerCase();

    const result = this.rows.filter((columns) => {
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
    this.setValues(result);
    return result;
  }
}
