<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <input v-model="text" class="input-filter" placeholder="Global Search" />

    <!-- FILTERS START -->
    <label v-for="field in filterFields" :key="field.id">
      {{ field.label }}
      <input v-model="field.value" class="input-filter" />
    </label>
    <!-- FILTERS END -->

    <NcpTable
      :headers="headers"
      :items="items"
      :search="text"
      :filterFields="filterFields"
      :filterableItems="filterableItems"
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
          {{ item.address.houseNo }}
        </td>
        <td>
          {{ item.address.street }}
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn style="padding: 0" color="primary" dark v-on="on">
                hover
              </v-btn>
            </template>
            <span>
              {{ item.address.streetPrefix }} {{ item.address.street }}
            </span>
          </v-tooltip>
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

import { makeData, headersPerson } from "@/components/makeData";

import NcpTable from "@/components/NcpTable.vue"; // @ is an alias to /src
import { FilterField, IFilterablePerson } from "@/components/types";

const FILTER_FIELDS: Readonly<Readonly<FilterField>[]> = [
  {
    id: "firstName",
    label: "First Name",
    value: "",
  },
  {
    id: "lastName",
    label: "Last Name",
    value: "",
  },
  {
    id: "status",
    label: "Status",
    value: "",
  },
];

@Component({
  components: {
    NcpTable: NcpTable,
  },
})
export default class HomeView extends Vue {
  public headers = headersPerson;
  public items = makeData(20);
  public text = "";

  public filterFields: FilterField[] = FILTER_FIELDS.slice();

  get filterableItems(): IFilterablePerson[] {
    return this.items.map((row) => {
      return {
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        age: row.age,
        visits: row.visits,
        street: row.address.street,
        houseNo: row?.address?.houseNo || "",
        progress: row.progress,
        status: row.status,
      };
    });
  }
}
</script>

<style scoped>
input {
  border: 1px solid black;
}
.input-filter {
  border: 1px lightgray solid;
  width: 250px;
  padding: 8px 16px;
}
</style>
