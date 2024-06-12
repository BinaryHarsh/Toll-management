<template>
  <div
    class="modal fade"
    id="kt_modal_create_lane_device"
    ref="newTargetModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded">
        <div class="modal-header pb-0 border-0">
          <h2>Lane Device Config</h2>
        </div>
        <hr />
        <div class="modal-body">
          <el-form id="kt_modal_new_target_form" class="form">
            <div class="row g-9 mb-8">
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Lane Name</label>
                <div class="align-items-center">
                  <el-form-item prop="laneName">
                    <select class="form-select" v-model="formData.LANE_ID">
                      <option v-for="item in laneName" :value="item.LANE_ID">
                        {{ item.LANE_NAME }}
                      </option>
                    </select>
                  </el-form-item>
                </div>
              </div>
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2"
                  >Device Name</label
                >
                <div class="align-items-center">
                  <el-form-item prop="deviceName">
                    <el-input
                      type="text"
                      placeholder="Enter Device Name"
                      v-model="formData.DEVICE_NAME"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>

            <div class="row g-9 mb-8">
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Device IP</label>
                <div class="align-items-center">
                  <el-form-item prop="deviceIP">
                    <el-input
                      type="text"
                      placeholder="Enter Device IP"
                      v-model="formData.DEVICE_IP"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2"
                  >Device Type</label
                >

                <div class="align-items-center">
                  <el-form-item prop="deviceType">
                    <el-input
                      type="text"
                      placeholder="Enter Device Type"
                      v-model="formData.DEVICE_TYPE"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2"
                  >Port or Baud</label
                >
                <div class="align-items-center">
                  <el-form-item prop="portOrBaud">
                    <el-input
                      type="text"
                      placeholder="Enter Port"
                      v-model="formData.PORT"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Device URL</label>
                <div class="align-items-center">
                  <el-form-item prop="deviceURL">
                    <el-input
                      type="text"
                      placeholder="Enter Device URL"
                      v-model="formData.DEVICE_URL"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2"
                  >Description</label
                >
                <div class="align-items-center">
                  <el-form-item prop="deviceDescription">
                    <el-input
                      type="text"
                      placeholder="Enter Device Description"
                      v-model="formData.DEVICE_DESCRIPTION"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div class="text-center">
              <button
                type="reset"
                data-bs-dismiss="modal"
                id="kt_modal_new_target_cancel"
                class="btn btn-light me-3"
              >
                Cancel
              </button>

              <button
                class="btn btn-lg btn-primary"
                type="submit"
                @click="createLaneDeviceConfig()"
              >
                <span class="indicator-label"> Create Lane Device </span>
              </button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useMasterData } from "@/stores/common";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";

const masterStore = useMasterData();

export default defineComponent({
  name: "new-target-modal",
  data() {
    return {
      formData: {
        LANE_ID: "",
        DEVICE_NAME: "",
        DEVICE_IP: "",
        DEVICE_URL: "",
        DEVICE_DESCRIPTION: "",
        PORT: "",
        DEVICE_TYPE: "",
      },
      laneName: <any>[],
      selectedLaneName: "",
    };
  },
  methods: {
    async createLaneDeviceConfig() {
      const body = {
        LANE_ID: this.formData.LANE_ID,
        DEVICE_NAME: this.formData.DEVICE_NAME,
        DEVICE_IP: this.formData.DEVICE_IP,
        TYPE: this.formData.DEVICE_TYPE,
        PORT: this.formData.PORT,
        DEVICE_URL: this.formData.DEVICE_URL,
        DESCRIPTION: this.formData.DEVICE_DESCRIPTION,
      };
      try {
        const res = await axios.post(
          `${BASE_URL}${API_ROUTES.DEVICE.CREATE_DEVICE}`,
          body
        );
        console.log(res.data.data);
        Swal.fire({
          title: "Device Config Created!",

          icon: "success",

          showCancelButton: false,

          showConfirmButton: false,

          timer: 2000,
        }).then(() => {
          hideModal(this.$refs.newTargetModalRef as any);
        });
      } catch (error: any) {
        Swal.fire({
          text: error.response.data.message,

          icon: "error",

          showCancelButton: false,

          showConfirmButton: false,

          timer: 3000,
        });
      }
    },
  },
  mounted() {
    this.laneName = masterStore.getMasters.laneMaster;
  },
});
</script>

<style lang="scss">
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>
