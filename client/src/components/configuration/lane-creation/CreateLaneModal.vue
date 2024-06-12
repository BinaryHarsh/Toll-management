<template>
  <div
    class="modal fade"
    id="kt_modal_create_lane"
    ref="newTargetModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded">
        <div class="modal-header pb-0 border-0">
          <h2>Create New Lane</h2>
        </div>
        <hr />

        <el-form>
          <div class="modal-body py-10 px-lg-17">
            <el-form id="kt_modal_new_target_form" class="form">
              <div class="row g-9 mb-8">
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Lane Name</label
                  >
                  <!--<input type="text" class="form-control" name="laneName" v-model="formData.laneName" disabled />-->
                  <div class="align-items-center">
                    <el-form-item prop="laneName">
                      <select
                        class="form-select"
                        placeholder="Select.."
                        v-model="formData.laneName"
                      >
                        <option v-for="item of laneNumber">
                          LANE{{ item }}
                        </option>
                      </select>
                    </el-form-item>
                  </div>
                </div>

                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Lane Type</label
                  >
                  <div class="align-items-center">
                    <el-form-item prop="laneType">
                      <select class="form-select" v-model="formData.laneType">
                        <option>EN</option>
                        <option>EX</option>
                      </select>
                    </el-form-item>
                  </div>
                </div>
              </div>

              <div class="row g-9 mb-8">
                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2">Lane IP</label>

                  <div class="align-items-center">
                    <el-form-item prop="laneIP">
                      <el-input
                        type="text"
                        placeholder="Enter Lane IP"
                        v-model="formData.laneIp"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>

                <div class="col-md-6 fv-row">
                  <label class="required fs-6 fw-semobold mb-2"
                    >Lane Direction</label
                  >

                  <div class="align-items-center">
                    <el-form-item prop="laneDirection">
                      <select class="form-select" v-model="formData.laneDir">
                        <option>LHS</option>
                        <option>RHS</option>
                      </select>
                    </el-form-item>
                  </div>
                </div>
              </div>

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
                  class="btn btn-lg btn-primary"
                  type="submit"
                  @click="createNewLane()"
                >
                  <span class="indicator-label"> Create Lane </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
              </div>
            </el-form>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
const updated_by = useAuthStore();

export default defineComponent({
  data() {
    return {
      formData: {
        laneName: "",
        laneIp: "",
        laneType: "",
        laneDir: "",
        update_by: "",
      },
      laneNumber: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
      ],
    };
  },

  methods: {
    async createNewLane() {
      const body = {
        LANE_NAME: this.formData.laneName,
        LANE_TYPE: this.formData.laneType,
        LANE_IP: this.formData.laneIp,
        LANE_DIR: this.formData.laneDir,
        UPDATE_BY: this.formData.update_by,
      };
      try {
        console.log(body);
        const res = await axios.post(
          `${BASE_URL}${API_ROUTES.LANE.CREATE_LANE}`,
          body
        );
        console.log(res.data);
        Swal.fire({
          title: "Lane Created!",

          icon: "success",

          showCancelButton: false,

          showConfirmButton: false,

          timer: 2000,
        })
        .then(() => {
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
    this.formData.update_by = updated_by.user.info.id;
  },
});
</script>

<style lang="scss">
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}
</style>
