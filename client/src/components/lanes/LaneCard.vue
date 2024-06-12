<template>
  <!--begin::Feeds Widget 1-->
  <div class="row">
    <div class="col-6">
      <div class="col-6">
        <h4 class="text-muted mt-5 ms-5">Left Hand Side</h4>
      </div>
      <div
        class="card mt-4 mb-4"
        :class="widgetClasses"
        v-for="item of lhsData"
        :key="item.id"
      >
        <!--begin::Body-->
        <div class="card-body pb-0">
          <!--begin::Header-->
          <div class="d-flex align-items-center">
            <!--begin::User-->
            <div class="d-flex align-items-center flex-grow-1">
              <div class="symbol symbol-45px me-5"></div>

              <!--begin::Info-->
              <div class="d-flex flex-column">
                <a class="text-gray-900 fs-6 fw-bold">{{ item.LANE_NAME }}</a>

                <span class="text-gray-400 fw-semobold"
                  >{{ item.LANE_TYPE }}
                </span>
              </div>
              <!--end::Info-->
            </div>

            <!--end::User-->

            <div class="">
              <button
                type="button"
                class="btn btn-secondary btn-sm mx-2"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="top-end"
                @click="viewDetails(item.LANE_ID)"
              >
                <i class="bi bi-eye-fill"></i>View
              </button>
            </div>
          </div>
          <!--end::Header-->

          <div class="col-12 d-flex mx-4 mb-4 pt-8">
            <div class="col-4">
              <span class="text-white-400 fw-semibold">Operator Name:</span>

              <span class="text-gray-400 fw-bold mx-4"></span>
            </div>
            <div class="col-5">
              <span class="text-white-400 fw-semibold">Last Trans:</span>

              <span class="text-gray-400 fw-bold mx-4">FASTag </span>
            </div>
            <div class="col-3">
              <span class="text-white-400 fw-semibold">Lane:</span>

              <span
                class="badge badge-light-success ms-2"
                v-if="item.STATUS === true"
                >Activate</span
              >

              <span class="badge badge-light-danger ms-2" v-else
                >Deactivate</span
              >
            </div>
          </div>

          <div class="separator"></div>

          <div class="col-12 d-flex m-4">
            <span class="text-white-400 fw-semibold">Devices:</span>
            <div
              class="flex flex-row"
              v-if="item.ALL_DEVICE.length !== 0"
              v-for="data of item.ALL_DEVICE"
              :key="data.id"
            >
              <span
                class="badge badge-light-success ms-4"
                v-if="data.STATUS === true"
                >{{ data.DEVICE_NAME }}</span
              >
              <span class="badge badge-light-danger ms-4" v-else>{{
                data.DEVICE_NAME
              }}</span>
            </div>
            <div v-else><span class="ps-2">No Devices Found</span></div>
          </div>
        </div>
        <!--end::Body-->
      </div>
    </div>

    <div class="col-6">
      <div class="col-6">
        <h4 class="text-muted mt-5 ms-5">Right Hand Side</h4>
      </div>
      <div
        class="card mt-4 mb-4"
        :class="widgetClasses"
        v-for="item of rhsData"
        :key="item.id"
      >
        <!--begin::Body-->
        <div class="card-body pb-0">
          <!--begin::Header-->
          <div class="d-flex align-items-center">
            <!--begin::User-->
            <div class="d-flex align-items-center flex-grow-1">
              <div class="symbol symbol-45px me-5"></div>

              <!--begin::Info-->
              <div class="d-flex flex-column">
                <a class="text-gray-900 fs-6 fw-bold">{{ item.LANE_NAME }}</a>

                <span class="text-gray-400 fw-semobold"
                  >{{ item.LANE_TYPE }}
                </span>
              </div>
              <!--end::Info-->
            </div>

            <!--end::User-->

            <div class="">
              <button
                type="button"
                class="btn btn-secondary btn-sm mx-2"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="top-end"
                @click="viewDetails(item.LANE_ID)"
              >
                <i class="bi bi-eye-fill"></i>View
              </button>
            </div>
          </div>

          <div class="col-12 d-flex mx-4 mb-4 pt-8">
            <div class="col-4">
              <span class="text-white-400 fw-semibold">Operator Name:</span>

              <span class="text-gray-400 fw-bold mx-4"> </span>
            </div>
            <div class="col-5">
              <span class="text-white-400 fw-semibold">Last Trans:</span>

              <span class="text-gray-400 fw-bold mx-4">FASTag </span>
            </div>
            <div class="col-3">
              <span class="text-white-400 fw-semibold">Lane:</span>

              <span
                class="badge badge-light-success ms-2"
                v-if="item.STATUS === true"
                >Activate</span
              >

              <span class="badge badge-light-danger ms-2" v-else
                >Deactivate</span
              >
            </div>
          </div>

          <div class="separator"></div>

          <div class="col-12 d-flex m-4">
            <span class="text-white-400 fw-semibold">Devices:</span>
            <div
              class="flex flex-row"
              v-if="item.ALL_DEVICE.length !== 0"
              v-for="data of item.ALL_DEVICE"
              :key="data.id"
            >
              <span
                class="badge badge-light-success ms-4"
                v-if="data.STATUS === true"
                >{{ data.DEVICE_NAME }}</span
              >
              <span class="badge badge-light-danger ms-4" v-else>{{
                data.DEVICE_NAME
              }}</span>
            </div>
            <div v-else><span class="ps-2">No Devices Found</span></div>
          </div>
        </div>
        <!--end::Body-->
      </div>
    </div>
  </div>

  <!--end::Feeds Widget 1-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    widgetClasses: String,
    laneData: Object,
  },
  data() {
    return {
      lhsData: [] as any,
      rhsData: [] as any,
      allData: {} as any,
    };
  },
  watch: {
    laneData: function () {
      this.allData = this.laneData;
      for (let i = 0; i < this.allData.length; i++) {
        if (this.allData[i].LANE_DIR === "LHS") {
          this.lhsData.push(this.allData[i]);
        } else {
          this.rhsData.push(this.allData[i]);
        }
      }
    },
  },
  methods: {
    viewDetails(body) {
      const id = body;
      this.$router.push(`/view-lane-details?laneid=${id}`);
    },
  },
  mounted() {},
});
</script>
