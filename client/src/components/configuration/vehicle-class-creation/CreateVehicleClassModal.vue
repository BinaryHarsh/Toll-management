<template>
  <div
    class="modal fade"
    id="kt_modal_create_vehicle_class"
    ref="newTargetModalRef"
    tabindex="-1"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content rounded">
        <div class="modal-header pb-0 border-0">
          <h2>Create New Vehicle Class</h2>
        </div>
        <hr />
        <div class="modal-body">
          <el-form
            id="kt_modal_new_target_form"
            ref="formRef"
            class="form"
            @submit.prevent="createNewVehicleClass()"
          >
            <div class="row g-9 mb-8">
              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2"
                  >Vehicle Class</label
                >

                <div class="align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="vehicleId"
                      type="text"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2"
                  >Description</label
                >

                <div class="align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="description"
                      type="text"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2">Anpr Class</label>

                <div class="align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="anprClass"
                      type="text"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2">Tag Class</label>

                <div class="align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="tagClass"
                      type="text"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </div>
              </div>

              <div class="col-md-6 fv-row">
                <label class="required fs-6 fw-semobold mb-2"
                  >Selection Key
                </label>

                <div class="align-items-center">
                  <el-form-item>
                    <el-select v-model="selectionKey" placeholder="Select....">
                      <el-option
                        v-for="item in key"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2"
                  >Allowed Speed</label
                >

                <div class="align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="allowedSpeed"
                      type="text"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                </div>
                <label class="required fs-6 fw-semobold mb-2">Image Url</label>

                <div class="align-items-center">
                  <el-form-item>
                    <el-input
                      v-model="imageUrl"
                      type="text"
                      placeholder=""
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

              <button class="btn btn-lg btn-primary" type="submit">
                <span class="indicator-label"> Create </span>
              </button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";

export default defineComponent({
  data() {
    return {
      newTargetModalRef: null,
      vehicleClass: ["VehicleClass"],
      key: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10"],
      vehicleId: null as any,
      description: null,
      selectionKey: null,
      allowedSpeed: null,
      anprClass: null,
      imageUrl: null,
      tagClass: null,
    };
  },
  methods: {
    async createNewVehicleClass() {
      const payload = {
        description: this.description,
        vehicleClass: parseInt(this.vehicleId),
        selectionKey: this.selectionKey,
        allowedSpeed: this.allowedSpeed,
        anprClass: this.anprClass,
        imageUrl: this.imageUrl,
        tagClass: this.tagClass,
      };
      console.log(payload);

      try {
        await axios.post(
          `${BASE_URL}${API_ROUTES.VEHICLE.CREATE_VEHICLE}`,
          payload
        );
        swal
          .fire({
            title: " Created!",
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 2000,
          })
          .then(() => {
            hideModal(this.$refs.newTargetModalRef as any);
          });
      } catch (error: any) {
        swal.fire({
          text: error.response.data.message,
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
</style>

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
