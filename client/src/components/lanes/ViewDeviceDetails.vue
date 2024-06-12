<template>
  <div class="modal fade" id="kt_modal_view_device" ref="addDeviceModalRef" tabindex="-1" aria-hidden="true"
    data-bs-backdrop="static" data-bs-keyboard="false">
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-550px">
      <!--begin::Modal content-->
      <div class="modal-content text-muted mt-1 fw-bold fs-6">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_device_header">
          <!--begin::Modal title-->
          <h3>View Device Details</h3>
          <!--end::Modal title-->
          <div id="kt_modal_add_device_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form :model="formData" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_device_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_vsds" data-kt-scroll-wrappers="#kt_modal_add_device_scroll"
              data-kt-scroll-offset="300px">
              <!--begin::row-->
              <div class="row mt-4">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-bold">Device ID</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <label class="fw-semobold">{{ deviceDetails.ID }}</label>
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>
              <!--end::Input group-->

              <!--begin::row-->
              <div class="row mt-4">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-bold">Device Name</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <label class="fw-semobold">{{
                    deviceDetails.DEVICE_NAME
                  }}</label>

                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <!--begin::row-->
              <div class="row mt-4">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-bold">Device IP</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <label class="fw-semobold">{{
                    deviceDetails.DEVICE_IP
                  }}</label>
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-4">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-bold">Device Port</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <label class="fw-semobold">{{ deviceDetails.PORT }}</label>
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-4">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-bold">Device URL</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <label class="fw-semobold">{{
                    deviceDetails.DEVICE_URL
                  }}</label>
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>
              <div class="row mt-4">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-bold">Device Description</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <label class="fw-semobold">{{
                    deviceDetails.DESCRIPTION
                  }}</label>
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-4">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-bold">Device Type</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <label class="fw-semobold">{{ deviceDetails.TYPE }}</label>
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-4">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-bold">Status</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <span class="badge badge-light-success" v-if="deviceDetails.STATUS === true">Activate</span>

                  <span class="badge badge-light-danger" v-else>Deactivate</span>
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-4">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-bold">Created At</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <label class="fw-semobold">{{
                    new Date(deviceDetails.CREATED_AT).toLocaleString("en-GB", {
                      timeZone: "UTC",
                    })
                  }}</label>
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-4">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-bold">Updated At</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <label class="fw-semobold">{{
                    new Date(deviceDetails.UPDATED_AT).toLocaleString("en-GB", {
                      timeZone: "UTC",
                    })
                  }}</label>
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->

          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "add-device-modal",
  components: {},
  props: { deviceData: Object as any, deviceDetails: Object as any },
  data() {
    return {
      loading: false,
      formData: {} as any,
    };
  },
  watch: {
    deviceData: function () {
      this.formData = this.deviceData;
      return this.formData;
    },
  },
  methods: {},
});
</script>
