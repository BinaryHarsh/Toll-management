<template>
  <div class="modal fade" id="kt_modal_create_device" ref="addDeviceModalRef" tabindex="-1" aria-hidden="true"
    data-bs-backdrop="static" data-bs-keyboard="false">
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content text-muted mt-1 fw-bold fs-6">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_device_header">
          <!--begin::Modal title-->
          <h3>Create New Device</h3>
          <!--end::Modal title-->
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
              <div class="row">
                <div class="col-md-6">
                  <!--begin::Label-->

                  <label class="required fw-semobold">Device Name </label>

                  <!--end::Label-->
                </div>

                <!--begin::Input-->

                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceName" v-model="formData.deviceName"
                    placeholder="Enter Device Name" />

                  <!--end::Input-->
                </div>

                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->

                  <label class="required fw-semobold">Device IP</label>

                  <!--end::Label-->
                </div>

                <!--begin::Input-->

                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceIp" v-model="formData.deviceIp"
                    placeholder="Enter Device IP" />

                  <!--end::Input-->
                </div>

                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->

                  <label class="required fw-semobold">Device URL</label>

                  <!--end::Label-->
                </div>

                <!--begin::Input-->

                <div class="col-md-6">
                  <input type="text" class="form-control" name="laneIp" v-model="formData.url"
                    placeholder="Enter Device URL" />

                  <!--end::Input-->
                </div>

                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->

                  <label class="required fw-semobold">Description </label>

                  <!--end::Label-->
                </div>

                <!--begin::Input-->

                <div class="col-md-6">
                  <input type="text" class="form-control" name="deviceDes" v-model="formData.deviceDes"
                    placeholder="Enter Device Description" />

                  <!--end::Input-->
                </div>

                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->

                  <label class="required fw-semobold">Port</label>

                  <!--end::Label-->
                </div>

                <!--begin::Input-->

                <div class="col-md-6">
                  <input type="text" class="form-control" name="port" v-model="formData.port"
                    placeholder="Enter Port Number" />

                  <!--end::Input-->
                </div>

                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->

                  <label class="required fw-semobold">Type</label>

                  <!--end::Label-->
                </div>

                <!--begin::Input-->

                <div class="col-md-6">
                  <input type="text" class="form-control" name="type" v-model="formData.type"
                    placeholder="Enter Device Type" />

                  <!--end::Input-->
                </div>

                <!--end::row-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <div class="text-center mb-4">
            <button type="reset" data-bs-dismiss="modal" id="kt_modal_new_target_cancel" class="btn btn-light me-3">
              Cancel
            </button>

            <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary" type="submit">
              <span v-if="!loading" class="indicator-label"> Create Lane </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
          </div>
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "add-device-modal",
  components: {},
  props: {
    laneID: String,
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addDeviceModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      deviceName: "",
      deviceIp: "",
      url: "",
      deviceDes: "",
      port: "",
      type: "",
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate((valid: boolean) => {
        if (valid) {
          loading.value = true;

          setTimeout(() => {
            loading.value = false;

            Swal.fire({
              text: "Device has been created successfully!",
              icon: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              heightAuto: false,
              customClass: {
                confirmButton: "btn btn-primary",
              },
            }).then(() => {
              hideModal(addDeviceModalRef.value);
            });
          }, 2000);
        } else {
          Swal.fire({
            text: "Sorry, looks like there are some errors detected, please try again.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Ok, got it!",
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-primary",
            },
          });
          return false;
        }
      });
      emit(
        "submit",
        JSON.stringify({
          DEVICE_NAME: formData.value.deviceName,
          DEVICE_TYPE: formData.value.type,
          DEVICE_IP: formData.value.deviceIp,
          DESCRIPTION: formData.value.deviceDes,
          TYPE: formData.value.type,
          DEVICE_URL: formData.value.url,
          PORT: formData.value.port,
          LANE_ID: "",
        })
      );
    };

    return {
      formData,
      submit,
      formRef,
      loading,
      addDeviceModalRef,
      getAssetPath,
    };
  },
});
</script>
