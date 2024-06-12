<template>
  <div>
    <div class="row g-5 g-xl-8 mb-4">
      <div class="col-6">
        <div class="card" :class="widgetClasses" style="height: 441px">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card">
                  <!--begin::Table container-->
                  <div class="responsive">
                    <div class="p-20">
                      <img src="../../../public/media/ImageNotFound.png" class="image ps-5" width="500" height="300" />
                    </div>
                  </div>
                  <!--end::Table-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-6">
        <div class="card" :class="widgetClasses" style="height: 441px">
          <div class="card-header border-0">
            <h4 class="card fw-bold text-dark pt-8">Lane Details</h4>
          </div>
          <div class="card-body pt-2">
            <div>
              <!--begin::Item-->
              <div class="row pb-2 ps-2">
                <div class="col-6">
                  <div class="d-flex align-items-center mb-8">
                    <!--begin::Bullet-->
                    <span class="bullet bullet-vertical bg-primary h-40px"></span>
                    <!--end::Bullet-->

                    <!--begin::Description-->
                    <div class="flex-grow-1 mx-5">
                      <a class="text-gray-800 fw-bold fs-6">Lane Name </a>

                      <span class="text-muted fw-bold d-block">{{
                        laneDetails.LANE_NAME
                      }}</span>
                    </div>
                    <!--end::Description-->
                  </div>
                </div>
                <div class="col-6">
                  <div class="d-flex align-items-center mb-8">
                    <!--begin::Bullet-->
                    <span class="bullet bullet-vertical bg-primary h-40px"></span>
                    <!--end::Bullet-->

                    <!--begin::Description-->
                    <div class="flex-grow-1 mx-5">
                      <a class="text-gray-800 fw-bold fs-6">Lane Type</a>

                      <span class="text-muted fw-bold d-block">{{
                        laneDetails.LANE_TYPE
                      }}</span>
                    </div>
                    <!--end::Description-->
                  </div>
                </div>
              </div>
              <div class="row pb-2 ps-2">
                <div class="col-6">
                  <div class="d-flex align-items-center mb-8">
                    <!--begin::Bullet-->
                    <span class="bullet bullet-vertical bg-primary h-40px"></span>
                    <!--end::Bullet-->

                    <!--begin::Description-->
                    <div class="flex-grow-1 mx-5">
                      <a class="text-gray-800 fw-bold fs-6">Lane Direction</a>

                      <span class="text-muted fw-bold d-block">
                        {{ laneDetails.LANE_DIR }}
                      </span>
                    </div>
                    <!--end::Description-->
                  </div>
                </div>
                <div class="col-6">
                  <div class="d-flex align-items-center mb-8">
                    <!--begin::Bullet-->
                    <span class="bullet bullet-vertical bg-primary h-40px"></span>
                    <!--end::Bullet-->

                    <!--begin::Description-->
                    <div class="flex-grow-1 mx-5">
                      <a class="text-gray-800 fw-bold fs-6">Lane IP</a>

                      <span class="text-muted fw-bold d-block">{{
                        laneDetails.LANE_IP
                      }}</span>
                    </div>
                    <!--end::Description-->
                  </div>
                </div>
              </div>
              <div class="row pb-2 ps-2">
                <div class="col-6">
                  <div class="d-flex align-items-center mb-8">
                    <!--begin::Bullet-->
                    <span class="bullet bullet-vertical bg-primary h-40px"></span>
                    <!--end::Bullet-->

                    <!--begin::Description-->
                    <div class="flex-grow-1 mx-5">
                      <a class="text-gray-800 fw-bold fs-6">Plaza Code</a>

                      <span class="text-muted fw-bold d-block">
                        {{ laneDetails.PLAZA_CODE }}
                      </span>
                    </div>
                    <!--end::Description-->
                  </div>
                </div>
                <div class="col-6">
                  <div class="d-flex align-items-center mb-8">
                    <!--begin::Bullet-->
                    <span class="bullet bullet-vertical bg-primary h-40px"></span>
                    <!--end::Bullet-->

                    <!--begin::Description-->
                    <div class="flex-grow-1 mx-5">
                      <a class="text-gray-800 fw-bold fs-6">Status</a>
                      <div>
                        <span class="badge badge-light-success" v-if="laneDetails.STATUS === true">Activate</span>

                        <span class="badge badge-light-danger" v-else>Deactivate</span>
                      </div>
                    </div>
                    <!--end::Description-->
                  </div>
                </div>
              </div>
              <div class="row pb-2 ps-2">
                <div class="col-6">
                  <div class="d-flex align-items-center mb-8">
                    <!--begin::Bullet-->
                    <span class="bullet bullet-vertical bg-primary h-40px"></span>
                    <!--end::Bullet-->

                    <!--begin::Description-->
                    <div class="flex-grow-1 mx-5">
                      <a class="text-gray-800 fw-bold fs-6">Created At</a>

                      <span class="text-muted fw-bold d-block">
                        {{ createdAt }}
                      </span>
                    </div>
                    <!--end::Description-->
                  </div>
                </div>
                <div class="col-6">
                  <div class="d-flex align-items-center mb-8">
                    <!--begin::Bullet-->
                    <span class="bullet bullet-vertical bg-primary h-40px"></span>
                    <!--end::Bullet-->

                    <!--begin::Description-->
                    <div class="flex-grow-1 mx-5">
                      <a class="text-gray-800 fw-bold fs-6">Updated At</a>

                      <span class="text-muted fw-bold d-block">{{
                        updatedAt
                      }}</span>
                    </div>
                    <!--end::Description-->
                  </div>
                </div>
              </div>
              <div class="row pb-2 ps-2">
                <div class="col-6">
                  <div class="d-flex align-items-center mb-8">
                    <!--begin::Bullet-->
                    <span class="bullet bullet-vertical bg-primary h-40px"></span>
                    <!--end::Bullet-->

                    <!--begin::Description-->
                    <div class="flex-grow-1 mx-5">
                      <a class="text-gray-800 fw-bold fs-6">Updated By </a>

                      <span class="text-muted fw-bold d-block">
                        {{ laneDetails.UPDATE_BY }}
                      </span>
                    </div>
                    <!--end::Description-->
                  </div>
                </div>
                <div class="col-6">
                  <div class="d-flex align-items-center mb-8">
                    <!--begin::Bullet-->
                    <span class="bullet bullet-vertical bg-primary h-40px"></span>
                    <!--end::Bullet-->

                    <!--begin::Description-->
                    <div class="flex-grow-1 mx-5">
                      <a class="text-gray-800 fw-bold fs-6">Operator Name</a>

                      <span class="text-muted fw-bold d-block">{{
                        laneDetails.updated_User?.first_name
                      }}</span>
                    </div>
                    <!--end::Description-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-5 g-xl-8 mb-4 ms-1 me-1">
      <div class="card" :class="widgetClasses">
        <!--begin::Header-->
        <div class="card-header border-0">
          <h4 class="card fw-bold text-dark pt-8">Device Details</h4>
        </div>
        <!--end::Header-->

        <!--begin::Body-->
        <div class="card-body pt-5" v-if="deviceLength != 0" v-for="item of laneDetails.ALL_DEVICE" :key="item.id">
          <!--begin::Item-->
          <div class="d-flex align-items-center mt-4">
            <!--begin::Symbol-->
            <div class="symbol symbol-50px me-5" v-if="item.STATUS === true">
              <span class="symbol-label">
                <KTIcon icon-name="abstract-26" icon-class="text-success fs-2x" />
              </span>
            </div>
            <div class="symbol symbol-50px me-5" v-else>
              <span class="symbol-label">
                <KTIcon icon-name="abstract-26" icon-class="text-danger fs-2x" />
              </span>
            </div>
            <!--end::Symbol-->

            <div class="col-3">
              <div class="d-flex flex-column">
                <a class="text-dark fs-6 fw-bold">Device ID: {{ item.ID }} </a>

                <span class="text-muted fw-semobold">{{
                  item.DEVICE_NAME
                }}</span>
              </div>
            </div>

            <div class="col-2">
              <div class="mx-10">
                <span class="text-muted fw-bold">Port: {{ item.PORT }}</span>
              </div>
            </div>
            <div class="col-2">
              <div class="mx-10">
                <span class="text-muted fw-bold">Type: {{ item.TYPE }}</span>
              </div>
            </div>
            <div class="col-3">
              <div class="mx-10">
                <span class="text-muted fw-bold">Device URL: {{ item.DEVICE_URL }}</span>
              </div>
            </div>

            <div class="col-2 float-end">
              <div>
                <a class="btn btn-sm btn-light-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_view_device"
                  @click="viewDevice(item)"><i class="bi bi-eye-fill"></i>View
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="d-flex justify-content-center mt-4 mb-8">
            <h6 class="text-gray-800 fw-bold fs-6">No Devices Found</h6>
          </div>
        </div>
        <!--end::Body-->
      </div>
    </div>
  </div>
  <ViewDeviceDetails :deviceDetails="deviceDetails"></ViewDeviceDetails>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ViewDeviceDetails from "@/components/lanes/ViewDeviceDetails.vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { useRoute } from "vue-router";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";

export default defineComponent({
  name: "kt-widget-11",
  components: {
    VueEasyLightbox,
    ViewDeviceDetails,
  },

  props: {
    widgetClasses: String,
  },
  data() {
    return {
      laneDetails: {} as any,
      createdAt: "",
      updatedAt: "",
      deviceDetails: {} as any,
      deviceLength: 0,
    };
  },
  methods: {
    async allLaneDetails() {
      const route = useRoute();
      const id = route.query.laneid;
      const res = await axios.get(
        `${BASE_URL}${API_ROUTES.LANE.GET_LANE_BY_ID}?laneid=${id}`
      );
      for (let i = 0; i < res.data.data.length; i++) {
        this.laneDetails = res.data.data[i];
      }
      this.deviceLength = Object.keys(this.laneDetails.ALL_DEVICE).length;

      this.createdAt = new Date(this.laneDetails.CREATED_AT).toLocaleString(
        "en-GB",
        {
          timeZone: "UTC",
        }
      );
      this.updatedAt = new Date(this.laneDetails.UPDATED_AT).toLocaleString(
        "en-GB",
        {
          timeZone: "UTC",
        }
      );
    },
    viewDevice(item) {
      this.deviceDetails = item;
    },
  },
  mounted() {
    return this.allLaneDetails();
  },
});
</script>
