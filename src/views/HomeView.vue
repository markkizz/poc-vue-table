<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <v-text-field v-model="search" outline label="search" />
    <!-- <v-text-field v-model="firstNameSearch" outline label="input" /> -->
    <NcpTable
      :columns="columns"
      :items="items"
      :search="search"
      :filters="filters"
    >
      <template #items="{ item }">
        <td>
          {{ item.firstName }}
        </td>
        <td>
          {{ item.lastName }}
        </td>
        <td>
          {{ item.age }}
        </td>
        <td>
          {{ item.visits }}
        </td>
        <td>
          {{ item.progress }}
        </td>
        <td>
          {{ item.status }}
        </td>
      </template>
    </NcpTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import {
  makeData,
  Person,
  headersPerson,
  personColumns,
} from "@/components/makeData";

import NcpTable from "@/components/NcpTable.vue"; // @ is an alias to /src
import { ColumnFiltersState } from "@tanstack/table-core";

@Component({
  components: {
    NcpTable,
  },
})
export default class HomeView extends Vue {
  public headers = headersPerson;
  public items = makeData(20);
  public columns = personColumns;
  public search = "";
  public filterState: Record<string, string> = {};

  get filters() {
    const keys = Object.keys(this.filterState);
    return keys.map((key) => ({
      id: key,
      value: this.filterState[key],
    }));
  }

  public setFilter(key: string, value: string) {
    if (!value) {
      delete this.filterState[key];
      this.filterState = { ...this.filterState };
      return;
    }

    this.filterState = {
      ...this.filterState,
      [key]: value,
    };
  }

  get firstNameSearch() {
    return this.filterState.firstName || "";
  }

  set firstNameSearch(value: string) {
    this.setFilter("firstName", value);
  }
  // public filters: ColumnFiltersState = [
  //   {
  //     id: "firstName",
  //     value: "",
  //   },
  // ];

  // get firstNameSearch() {
  //   const filter = this.filters.find((filter) => filter.id === "firstName");
  //   // if (!filter) {
  //   //   this.filters.push({
  //   //     id: "firstName",
  //   //     value: "",
  //   //   });
  //   //   return "";
  //   // }
  //   return filter?.value || "";
  // }

  // set firstNameSearch(value) {
  //   this.filters = this.filters.map((filter) =>
  //     filter.id === "firstName" ? { ...filter, value: value || "" } : filter
  //   );
  //   console.log("set", value);
  // }
  // public setFirstNameSearch(value: string) {
  //   this.filters.map((filter) =>
  //     filter.id === "firstName" ? { ...filter, value } : filter
  //   );
  // }
}
</script>
