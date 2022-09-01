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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CoreTable } from "./Table/CoreTable";
import { IColumnHeaders } from "./types";

@Component
export default class NcpTable extends Vue {
  @Prop() public headers!: IColumnHeaders[];
  @Prop() public items!: Record<string, unknown>[];
  @Prop() public search!: string;
  @Prop() public filters!: { id: string; value: any }[];

  private _coreTable = new CoreTable([] as Record<string, unknown>[]);

  public searchable: string[] = [];

  get actualItems() {
    const values = this._coreTable.getValues();
    console.log(values);
    return values;
  }

  created() {
    this._coreTable = new CoreTable(this.items);
    this.searchable = this.headers
      .filter((header) => header.searchable)
      .map((header) => header.value);
    console.log("searchable on created", this.searchable);
  }

  @Watch("search")
  public onSearch() {
    const targetSearch = this.searchable.map((target) => ({
      id: target,
      value: this.search,
    }));
    this._coreTable.filters(targetSearch);
    this._coreTable.globalSearch(this.search);
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
