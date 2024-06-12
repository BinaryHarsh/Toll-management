<template>
  <!--begin::Mixed Widget 14-->
  <div :class="widgetClasses" class="card theme-dark-bg-body" :style="`background-color: ${widgetColor}`"
    style="height:500px;">
    <!--begin::Body-->
    <div class="card-body d-flex flex-column">
      <div class="d-flex flex-column mb-7">
        <!--begin::Title-->
        <h3 class="card-title fw-bold text-dark">Plaza Previous Count </h3>
        <!--end::Title-->
      </div>
      <div v-if="loader">
        <Loader />
      </div>
      <div v-else id="chart">
        <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>

      <!--begin::Row-->
    </div>
  </div>
  <!--end::Mixed Widget 14-->
</template>

<script>
import { defineComponent } from "vue";
import { dashboardStats } from "../../stores/dashboard";
import Loader from "@/layouts/Loader.vue";
const dashboardStore = dashboardStats();

export default defineComponent({
  name: "widget-5",
  props: {
    widgetClasses: String,
    widgetColor: String,
  },
  components: { Loader },
  data() {
    return {
      loader: true,
      statistics: [],
      series: [{
        data: []
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
        }
      },

    }
  },


  computed: {
    getCountData() {
      return dashboardStore.getStatistics;
    },
  },
  watch: {
    getCountData: function () {
      this.loader = false;
      let data = this.getCountData
      this.chartOptions.xaxis.categories = data.getCount.date;
      this.series[0].data = data.getCount.countData;
    },
  },
});
</script>
