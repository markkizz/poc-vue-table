<template>
  <div class="home">
    <input
      v-model="textSearch"
      class="input-filter"
      placeholder="Global Search"
    />

    <PersonTable :searchText="textSearch" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import PersonTable from "@/components/PersonTable.vue";

@Component({
  components: {
    PersonTable: PersonTable,
  },
})
export default class TestView extends Vue {
  public textSearch = "";
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

.v-btn::v-deep {
  min-width: fit-content;
  display: inline-block;
  padding: 0.25rem !important;
  border-radius: 9999px;
  width: 1rem;
  height: 1rem;
}
.v-btn__content::v-deep {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
