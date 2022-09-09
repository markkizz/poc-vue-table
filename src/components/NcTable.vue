<template>
  <v-data-table
    v-model="selectedItems"
    :headers="tableAdapter.headers"
    :items="currentView"
  >
    <template v-if="$scopedSlots['headers']" #headers="props">
      <slot name="headers" v-bind="props" />
    </template>
    <template #items="props">
      <slot name="items" v-bind="props" />
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue, Watch } from "vue-property-decorator";
import { ITableAdapter } from "./ITableAdapter";

@Component
export default class NcTable<TDataItem = unknown> extends Vue {
  @VModel({ type: Array, default: () => [] })
  selectedItems!: TDataItem[];

  @Prop() public tableAdapter!: ITableAdapter<TDataItem>;
  @Prop() public searchText!: string;

  currentView: TDataItem[] = [];

  async created() {
    this.tableAdapter.on("currentViewSet", (data: TDataItem[]) => {
      this.currentView = [...data];
    });
    await this.tableAdapter.initialize();
  }

  @Watch("searchText")
  public onSearchTextChanged() {
    this.tableAdapter.fullTextSearch(this.searchText);
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
