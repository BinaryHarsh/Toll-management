<template>
  <div class="modal fade" id="kt_modal_edit_device" ref="addDeviceModalRef" tabindex="-1" aria-hidden="true"
    data-bs-backdrop="static" data-bs-keyboard="false">
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content text-muted mt-1 fw-bold fs-6">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_device_header">
          <!--begin::Modal title-->
          <h3>Edit Device Details</h3>
          <!--end::Modal title-->
          <div id="kt_modal_add_device_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_device_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_vsds" data-kt-scroll-wrappers="#kt_modal_add_device_scroll"
              data-kt-scroll-offset="300px">
              <!--begin::row-->
              <div class="row">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-semobold">Device ID</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceId" v-model="formData.ID" disabled />
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>
              <!--end::Input group-->

              <!--begin::row-->
              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-semobold">Device Name</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceName" v-model="formData.DEVICE_NAME" />

                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <!--begin::row-->
              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-semobold">Device IP</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceIp" v-model="formData.DEVICE_IP" />
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-semobold">Device Port</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input type="text" class="form-control" name="devicePort" v-model="formData.PORT" />
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-semobold">Device URL</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceUrl" v-model="formData.DEVICE_URL" />
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>
              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-semobold">Device Description</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceUrl" v-model="formData.DESCRIPTION" />
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-semobold">Device Type</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceType" v-model="formData.TYPE" />
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-semobold">Status</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceStatus" v-model="formData.STATUS" />
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-semobold">Created At</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceUrl" disabled v-model="formData.CREATED_AT" />
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="fw-semobold">Updated At</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceUrl" disabled v-model="formData.UPDATED_AT" />
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary" type="submit">
              <KTIcon icon-name="rocket" icon-class="fs-1" />
              <span v-if="!loading" class="indicator-label"> SAVE </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";

export default defineComponent({
  name: "add-device-modal",
  components: {},
  props: { deviceData: Object as any },
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
  methods: {
    async submit() {
      const body = { STATUS: this.formData.STATUS };
      try {
        await axios.put(
          `${BASE_URL}${API_ROUTES.DEVICE.UPDATE_DEVICE}?id=${this.formData.ID}`,
          this.formData
        );
        await axios.put(
          `${BASE_URL}${API_ROUTES.DEVICE.UPDATE_STATUS}?id=${this.formData.ID}`,
          body
        );
        this.$emit("submit", JSON.stringify(this.formData));
        this.formData = {};

        this.$emit("loadShifts");

        Swal.fire({
          title: "Device Updated!",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          hideModal((this.$refs.addDeviceModalRef as HTMLElement));
        });
      } catch (e: any) {
        Swal.fire({
          text: e.response.data.message as string,
          icon: "error",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  },
});
</script>
