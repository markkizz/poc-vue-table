<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <input v-model="text" />
    <NcpTable :headers="headers" :items="items" :search="text">
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

import { makeData, Person, headersPerson } from "@/components/makeData";

import NcpTable from "@/components/NcpTable.vue"; // @ is an alias to /src

@Component({
  components: {
    NcpTable: NcpTable,
  },
})
export default class HomeView extends Vue {
  public headers = headersPerson;
  public items = makeData(20);
  public text = "";
}
</script>
