<template>
  <!--begin::Mixed Widget 14-->
  <div :class="widgetClasses" class="card theme-dark-bg-body" :style="`background-color: ${widgetColor}`"
    style="height:500px;">
    <!--begin::Body-->
    <div class="card-body d-flex flex-column">
      <div class="d-flex flex-column mb-7">
        <!--begin::Title-->
        <h3 class="card-title fw-bold text-dark">Plaza Cash Collection </h3>
        <!--end::Title-->
      </div>
      <div v-if="loader">
        <Loader />
      </div>
      <div v-else id="chart mt-6">
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
  name: "widget-14",
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
          height: 350,
          type: 'bar',
          events: {
            click: function (chart, w, e) {
              console.log(chart, w, e);
            }
          }
        },

        colors: ['#FF5733', '#33FF57', '#5733FF', '#33A3FF', '#FF33A3', '#A3FF33', '#FF3333'],
        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
          }
        },
        dataLabels: {
          enabled: true
        },
        legend: {
          show: true
        },
        xaxis: {
          categories: [],
          labels: {
            style: {

              colors: ['#FF5733', '#33FF57', '#5733FF', '#33A3FF', '#FF33A3', '#A3FF33', '#FF3333'],
              fontSize: '12px'
            }
          }
        }
      },

    }
  },

  computed: {
    getRevenuedata() {
      return dashboardStore.getStatistics;
    },
  },
  watch: {
    getRevenuedata: function () {
      this.loader = false;
      let data = this.getRevenuedata
      this.chartOptions.xaxis.categories[0] = [data.getRevenue.date[0]]
      this.chartOptions.xaxis.categories[1] = [data.getRevenue.date[1]]
      this.chartOptions.xaxis.categories[2] = [data.getRevenue.date[2]]
      this.chartOptions.xaxis.categories[3] = [data.getRevenue.date[3]]
      this.chartOptions.xaxis.categories[4] = [data.getRevenue.date[4]]
      this.chartOptions.xaxis.categories[5] = [data.getRevenue.date[5]]
      this.chartOptions.xaxis.categories[6] = [data.getRevenue.date[6]]
      this.series[0].data = data.getRevenue.cashdata;
    },
  },
});
</script>
