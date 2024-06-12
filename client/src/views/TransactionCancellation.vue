<template>
  <div>
    <div :class="`page-title d-flex flex-stack flex-wrap mb-5`">
      <h2 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
        Transaction-cancellation
      </h2>
    </div>

    <cancelFrom />

  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import cancelFrom from "@/components/transaction-cancellation/cancelFrom.vue";
export default defineComponent({
  name: "main-dashboard",
  components: { cancelFrom }

});
</script>
