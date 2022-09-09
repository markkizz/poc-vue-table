<template>
  <NcTable :tableAdapter="tableAdapter" :searchText="searchText">
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
      <td>
        {{ item.houseNo }}
      </td>
      <td>
        {{ item.street }}
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn style="padding: 0" color="primary" dark v-on="on">
              ︖
            </v-btn>
          </template>
          <span>{{ item.streetPrefix }} {{ item.street }}</span>
        </v-tooltip>
      </td>
    </template>
  </NcTable>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import NcTable from "./NcTable.vue";
import { PersonTableAdapter } from "@/adapters/PersonTableAdapter";

@Component({
  components: {
    NcTable: NcTable,
  },
})
export default class PersonTable extends Vue {
  @Prop({ default: "" }) searchText!: string;

  tableAdapter!: PersonTableAdapter;

  created() {
    this.tableAdapter = new PersonTableAdapter();
  }
}
</script>
