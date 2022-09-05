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
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { CoreTable } from "./Table/CoreTable";
import { FilterField, IColumnHeaders, IFilterablePerson } from "./types";

@Component
export default class NcpTable extends Vue {
  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  private setTableItems() {
    return this.items;
  }

  @Prop() public headers!: IColumnHeaders[];

  @Prop({ type: Array, default: () => [] })
  public items!: Record<string, unknown>[]; // v-data-table="items"

  @Prop() public search!: string;

  @Prop({ type: Array, default: () => [] })
  public filterFields!: Omit<FilterField, "label">[];

  @Prop({ type: Array, default: () => [] })
  public filterableItems!: IFilterablePerson[];

  private _coreTable: CoreTable<Record<string, unknown>> | null = null;

  public searchable: string[] = [];

  public created() {
    console.log("onmounted");
    // this._coreTable = new CoreTable(this.items);
    this._coreTable = new CoreTable(
      this.filterableItems as unknown as Record<string, unknown>[]
    );
  }

  get actualItems() {
    if (!this._coreTable) return this.items;

    const hasAtLeastOneFilter = this.filterFields
      .filter((field) => field.value)
      .some((field) => !!String(field.value)?.trim() || !!field.value);

    if (hasAtLeastOneFilter) {
      this._coreTable?.filterItems([]);
    }
    const searchedResult = this._coreTable?.globalSearch(this.search).build();
    const mappingData: { [key: string]: unknown } = {};
    searchedResult.forEach((item) => {
      mappingData[(item as { id: string }).id] = item;
    });
    return this.items.filter((item) => {
      return mappingData[(item as { id: string }).id];
    });
    // FOR Building Items with Path
    // return this._coreTable?.globalSearch(this.search).build();
  }

  // set actualItems(values: Record<string, unknown>[]) {
  //   this.$emit("setTableItems", values);
  // }

  private mappedIdByPath() {
    return {};
  }

  @Watch("items", { deep: true })
  onItemsChanged() {
    console.log(this.items);
  }

  // @Watch("search")
  // public onSearch() {
  //   const targetSearch = this.searchable.map((target) => ({
  //     id: target,
  //     value: this.search,
  //   }));
  //   this._coreTable?.filters(targetSearch);
  //   this.actualItems = this._coreTable?.globalSearch(this.search) || [];
  // }
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
