<template>
  <v-data-table :headers="headers" :items="actualItems">
    <template v-if="$scopedSlots['headers']" #headers="props">
      <slot name="headers" v-bind="props" />
    </template>
    <template #items="props">
      <slot name="items" v-bind="props" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Watch } from "vue-property-decorator";
import { IColumnHeaders } from "./types";
import {
  ColumnDef,
  ColumnFiltersState,
  TableState,
  PaginationState,
} from "@tanstack/table-core";
import { VueTable } from "./Table";

@Component
export default class NcpTable<TData> extends VueTable<TData> {
  // @Prop() headers!: IColumnHeaders[];
  @Prop() public items!: TData[];
  @Prop() public columns!: ColumnDef<TData, any>[];
  @PropSync("filters", { default: () => [] })
  public filterSync!: ColumnFiltersState;
  @PropSync("search", { default: "" })
  public globalSearchSync!: string;

  public vTableState: TableState = {} as TableState;
  public pagination: PaginationState = {
    pageIndex: 0,
    pageSize: 10,
  };

  get headers(): IColumnHeaders[] {
    const tableColumns = this.tableRef.getAllColumns();
    return tableColumns.map((column) => ({
      id: column.columnDef.meta?.dataTestid,
      text: column.columnDef.header as string,
      value: column.id,
      ...column.columnDef.meta,
    }));
  }

  get actualItems() {
    return this.tableRef.getRowModel().rows.map((row) => row.original);
  }

  get tableState() {
    const options = {
      ...this.vTableState,
      // columnFilters: [],
      columnFilters: this.filterSync,
      globalFilter: this.globalSearchSync,
      pagination: this.pagination,
    } as TableState;

    return options;
  }

  mounted() {
    // trigger reactive
    this.vTableState = {} as TableState;
    this.createTable();
  }

  @Watch("tableState", { deep: true })
  public onTableStateChange() {
    console.log(this.tableRef.getAllColumns());
    console.log("table state", this.tableState);
    console.log("table internal", this.tableRef.getState());
    console.log("row", this.tableRef.getRowModel().rows);
  }

  public onStateChange = this.setUpdatableRef(this.vTableState);

  public onColumnFiltersChange = this.setUpdatableRef(this.filterSync);
  public onGlobalFilterChange(updater: string) {
    this.globalSearchSync = updater;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
