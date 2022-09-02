<template>
  <v-data-table :headers="headers" :items="items">
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
  @Prop() public items!: Record<string, any | any[]>;
  @Prop() public search!: string;
  @Prop({ default: () => [] }) public filters!: { id: string; value: any }[];

  private _coreTable = new CoreTable([]);

  // public searchable: string[] = [];

  get actualItems() {
    const table = new CoreTable(this.items);
    const searchable = this.headers
      .filter((header) => header.searchable)
      .map((header) => ({ id: header.value, value: this.search }));
    // .map((header) => ({ id: "metadata.image_name", value: this.search }));
    const filterable = [...searchable, ...this.filters];
    const filted = table
      .addItems(this.items)
      .filters(filterable)
      .sort()
      .build();
    return filted;
  }

  created() {
    // this._coreTable = new CoreTable(this.items);
    // this.searchable = this.headers
    //   .filter((header) => header.searchable)
    //   .map((header) => header.value);
  }

  // @Watch("search")
  // public onSearch() {
  //   const targetSearch = this.searchable.map((target) => ({
  //     id: target,
  //     value: this.search,
  //   }));
  //   this._coreTable.filters(targetSearch);
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
