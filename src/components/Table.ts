import {
  Table,
  ColumnDef,
  ColumnFiltersState,
  createTable,
  getCoreRowModel,
  getFilteredRowModel,
  TableState,
  Updater,
  TableOptionsResolved,
  getPaginationRowModel,
} from "@tanstack/table-core";
import { Vue, Watch } from "vue-property-decorator";
import { createTableDefaultOptions } from "./TanstackTable";

export interface VueTable<TData> {
  tableRef: Table<TData>;
  tableState?: TableState;
  // filters?: ColumnFiltersState;
  // search?: string;
  // globalSearch?: string;
  onStateChange?(updater: Updater<TableState>): void;
  onColumnFiltersChange?(updater: Updater<ColumnFiltersState>): void;
  onGlobalFilterChange?(updater?: string): void;
}

// @Component
export abstract class VueTable<TData> extends Vue {
  private __tableState: TableState = {} as TableState;
  public tableRef = createTable<TData>(createTableDefaultOptions());

  public abstract items: TData[];
  public abstract columns: ColumnDef<TData, any>[];
  // public abstract filters: ColumnFiltersState;
  // protected abstract filters: FiltersTableState

  // private __tableFilters: ColumnFiltersState = [];
  // private __tableGlobalSearch = "";

  protected createTable() {
    this.__tableState = this.tableRef.initialState;
    // this.__tableState = {
    //   ...this.tableRef.initialState,
    //   columnFilters: this.__tableFilters,
    //   globalFilter: this.__tableGlobalSearch,
    // };
    this.tableRef.setOptions((prevOptions) => ({
      ...prevOptions,
      data: this.items,
      columns: this.columns,
      state: {
        ...this.__tableState,
        ...this.tableState,
      },
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onStateChange: (updater) => {
        const selfUpdater = this.setUpdatableRef(this.__tableState);
        selfUpdater(updater);
        this.onStateChange?.(updater);
      },
      onColumnFiltersChange: this.onColumnFiltersChange,
      onGlobalFilterChange: this.onGlobalFilterChange,
      // onStateChange: (updater) => {
      //   console.log("state change", updater);
      //   if (updater instanceof Function) {
      //     this.__tableState = updater(this.__tableState);
      //   } else {
      //     this.__tableState = updater;
      //   }
      //   this.onStateChange?.(updater);
      // },
      // onGlobalFilterChange: (updater) => {

      // }
    }));
  }

  @Watch("__tableState", { deep: true })
  @Watch("tableState", { deep: true })
  private setTableState(/* options: TableOptionsResolved<TData> */) {
    this.tableRef.setOptions((prevOptions) => ({
      ...prevOptions,
      state: {
        ...this.__tableState,
        ...this.tableState,
      },
    }));
  }

  public setUpdatableRef<TRef extends object>(ref: TRef) {
    return (updater: Updater<TRef>) => {
      ref = updater instanceof Function ? updater(ref) : updater;
      return ref;
    };
  }
}
