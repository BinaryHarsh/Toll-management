<template>
  <FilterTransaction></FilterTransaction>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import FilterTransaction from "@/components/transaction-validate/FilterTransaction.vue";

export default defineComponent({
  name: "widgets-tables",
  components: {
    FilterTransaction,
  },
});
</script>
