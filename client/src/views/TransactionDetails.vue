<template>
  <DetailsTransaction></DetailsTransaction>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DetailsTransaction from "@/components/transaction-validate/DetailsTransaction.vue";

export default defineComponent({
  name: "widgets-tables",
  components: {
    DetailsTransaction,
  },
});
</script>
