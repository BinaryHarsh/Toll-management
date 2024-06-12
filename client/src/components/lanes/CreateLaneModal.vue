<template>
  <div
    class="modal fade"
    id="kt_modal_create_lane"
    ref="addDeviceModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content text-muted mt-1 fw-bold fs-6">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_device_header">
          <!--begin::Modal title-->
          <h3>Create New Lane</h3>
          <!--end::Modal title-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form @submit.prevent="submit()" :model="formData" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_device_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_vsds"
              data-kt-scroll-wrappers="#kt_modal_add_device_scroll"
              data-kt-scroll-offset="300px"
            >
              <!--begin::row-->
              <div class="row">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="required fw-semobold">Lane Name</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-3">
                  <input
                    type="text"
                    class="form-control"
                    name="laneName"
                    v-model="formData.laneName"
                    disabled
                  />
                  <!--end::Input-->
                </div>
                <div class="col-md-3">
                  <select class="form-select" v-model="formData.laneNumber">
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                  </select>
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>
              <!--end::Input group-->

              <!--begin::row-->
              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="required fw-semobold">Lane Direction</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <select class="form-select" v-model="formData.laneDir">
                    <option value="RHS">RHS</option>
                    <option value="LHS">LHS</option>
                  </select>

                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <!--begin::row-->
              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="required fw-semobold">Lane IP</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    name="laneIp"
                    v-model="formData.laneIp"
                  />
                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>

              <div class="row mt-2">
                <div class="col-md-6">
                  <!--begin::Label-->
                  <label class="required fw-semobold">Lane Type</label>
                  <!--end::Label-->
                </div>

                <!--begin::Input-->
                <div class="col-md-6">
                  <select class="form-select" v-model="formData.laneType">
                    <option value="EN">EN</option>
                    <option value="EX">EX</option>
                  </select>

                  <!--end::Input-->
                </div>
                <!--end::row-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <div class="text-center mb-4">
            <button
              type="reset"
              data-bs-dismiss="modal"
              id="kt_modal_new_target_cancel"
              class="btn btn-light me-3"
            >
              Cancel
            </button>

            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label"> Create Lane </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
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
  props: { userData: String },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addDeviceModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref({
      laneName: "LANE",
      laneNumber: "",
      laneIp: "",
      laneType: "",
      laneDir: "",
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
              text: "Lane Created Successfully! ",
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
          LANE_NAME: formData.value.laneName.concat(formData.value.laneNumber),
          LANE_TYPE: formData.value.laneType,
          LANE_IP: formData.value.laneIp,
          LANE_DIR: formData.value.laneDir,
          UPDATE_BY: "",
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
