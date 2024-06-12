<template>
  <div class="modal fade" id="kt_modal_edit_vehicle" ref="newTargetModalRef" tabindex="-1" aria-hidden="true"
    data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded">
        <div class="modal-header pb-0 border-0">
          <h1>Edit Fare</h1>
          <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <hr />
        <div class="modal-body">
          <el-form id=" kt_modal_new_target_form" @submit.prevent="saveVehicleDetails()">
            <div class="row g-9 mb-8">
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Plaza Entry</label>

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input v-model="formData.PLAZA_ENTRY" type="text"></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2">Plaza Exit</label>

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input v-model="formData.PLAZA_EXIT" type="text"></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2">Toll Fare</label>

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input v-model="formData.TOLL_FARE" type="text"></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2">Active Date</label>

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-date-picker v-model="formData.ACTIVE_DATE" type="datetime" name="eventStartDate"
                      placeholder="Select date and time" class=" w-100" />
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2">Vehicle Class</label>

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-select v-model="formData.VEH_CLASS">
                      <el-option v-for="item in vehicleClassMaster" :key="item.CLASS_NO" :label="item.CLASS_DESCRIPTION"
                        :value="item.CLASS_NO" />
                    </el-select>
                  </el-form-item>
                </div>
              </div>
            </div>

            <div class="text-center">
              <button type="reset" id="kt_modal_new_target_cancel" class="btn btn-light me-3" data-bs-dismiss="modal">
                Cancel
              </button>

              <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary" type="submit">
                <span v-if="!loading" class="indicator-label"> Save </span>
                <span v-if="loading" class="indicator-progress">
                  Please wait...
                  <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                </span>
              </button>
            </div>
          </el-form>
          <!--end:Form-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMasterData } from "@/stores/common";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { API_ROUTES } from "@/constants/Config";
import ApiService from "@/core/services/ApiService";
const store = useMasterData();
export default defineComponent({
  name: "new-target-modal",
  components: {},
  props: {
    fareData: Object,
  },
  data() {
    return {
      loading: false,
      formData: {} as any,
      vehicleClassMaster: store.getMasters.vehicleClass,
    };
  },
  watch: {
    fareData: function () {
      this.formData = this.fareData;
    },
  },
  methods: {
    async saveVehicleDetails() {
      try {
        const payload = {
          plazaEntry: this.formData.PLAZA_ENTRY,
          plazaExit: this.formData.PLAZA_EXIT,
          vehicleClass: this.formData.VEH_CLASS,
          overWightFare: 0,
          activeDate: this.formData.ACTIVE_DATE,
          tollFare: this.formData.TOLL_FARE
        };
        
        await ApiService.put(
          `${API_ROUTES.FARE.UPDATE_FARE}${this.formData.FARE_ID}`,
          payload
        );
        this.$emit("submit", JSON.stringify(this.formData));
        this.formData = {};

        this.$emit("loadVehicles");

        Swal.fire({
          title: "Fare Updated!",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          hideModal(this.$refs.newTargetModalRef as HTMLElement);
        });
      } catch (e: any) {
        Swal.fire({
          text: e.response.data.message,
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

<style lang="scss">
.override-styles {
  z-index: 99999 !important;
  pointer-events: initial;
}

.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
