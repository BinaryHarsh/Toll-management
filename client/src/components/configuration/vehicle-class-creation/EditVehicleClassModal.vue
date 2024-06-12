<template>
  <div
    class="modal fade"
    id="kt_modal_edit_vehicle"
    ref="newTargetModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded">
        <div class="modal-header pb-0 border-0">
          <h1>Edit Vehicle Class</h1>
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <hr />
        <div class="modal-body">
          <el-form
            id=" kt_modal_new_target_form"
            @submit.prevent="saveVehicleDetails()"
          >
            <div class="row g-9 mb-8">
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2"
                  >Vehicle Class</label
                >

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="formData.CLASS_NO"
                      type="text"
                    ></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2"
                  >Description</label
                >

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="formData.CLASS_DESCRIPTION"
                      type="text"
                    ></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2">Anpr Class</label>

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="formData.ANPR_CLASS"
                      type="text"
                    ></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2">Tag Class</label>

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="formData.TAG_CLASS"
                      type="text"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2"
                  >Selection Key</label
                >

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input v-model="formData.SEL_KEY" type="text"></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2"
                  >Allowed Speed</label
                >

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="formData.ALLOWED_SPEED"
                      type="text"
                    ></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2">Image Url</label>

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input v-model="formData.IMAGE" type="text"></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2">Status</label>

                <div class="position-relative align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="formData.CLASS_STATUS"
                      type="text"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>

            <div class="text-center">
              <button
                type="reset"
                id="kt_modal_new_target_cancel"
                class="btn btn-light me-3"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>

              <button
                :data-kt-indicator="loading ? 'on' : null"
                class="btn btn-lg btn-primary"
                type="submit"
              >
                <span v-if="!loading" class="indicator-label"> Save </span>
                <span v-if="loading" class="indicator-progress">
                  Please wait...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
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
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { API_ROUTES } from "@/constants/Config";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "new-target-modal",
  components: {},
  props: {
    vehicleData: Object,
  },
  data() {
    return {
      loading: false,
      formData: {} as any,
    };
  },
  watch: {
    vehicleData: function () {
      this.formData = this.vehicleData;
    },
  },
  methods: {
    async saveVehicleDetails() {
      try {
        const payload = {
          description: this.formData.CLASS_DESCRIPTION,
          selectionKey: this.formData.SEL_KEY,
          allowedSpeed: this.formData.ALLOWED_SPEED,
          anprClass: this.formData.ANPR_CLASS,
          imageUrl: this.formData.IMAGE,
          tagClass: this.formData.TAG_CLASS,
          classStatus: true,
        };

        await ApiService.post(
          `${API_ROUTES.VEHICLE.UPDATE_VEHICLE}${this.formData.CLASS_NO}`,
          payload
        );
        this.$emit("submit", JSON.stringify(this.formData));
        this.formData = {};

        this.$emit("loadVehicles");

        Swal.fire({
          title: "Vehicle Class Updated!",
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
