<template>
    <div class="modal fade" id="kt_modal_create_vehicle_class" ref="newTargetModalRef" tabindex="-1" aria-hidden="true"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded">
                <div class="modal-header pb-0 border-0">
                    <h2>Create New Fare Creation</h2>
                </div>
                <hr />
                <div class="modal-body">
                    <el-form id="kt_modal_new_target_form" ref="formRef" class="form"
                        @submit.prevent="createNewVehicleClass()">
                        <div class="row g-9 mb-8">
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Plaza Entry</label>

                                <div class="align-items-center">
                                    <el-form-item>
                                        <el-input v-model="plazaEntry" type="text"
                                            placeholder="Enter Entry Plaza Code"></el-input>
                                    </el-form-item>
                                </div>
                                <label class="required fs-6 fw-semobold mb-2">Plaza Exit</label>

                                <div class="align-items-center">
                                    <el-form-item>
                                        <el-input v-model="plazaExit" type="text"
                                            placeholder="Enter Exit Plaza Code"></el-input>
                                    </el-form-item>
                                </div>
                                <label class="required fs-6 fw-semobold mb-2">Toll Fare</label>

                                <div class="align-items-center">
                                    <el-form-item>
                                        <el-input v-model="tollFare" type="text" placeholder="Enter Toll Fare"></el-input>
                                    </el-form-item>
                                </div>
                            </div>

                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Active Date</label>

                                <div class="align-items-center">
                                    <el-form-item>
                                        <el-date-picker type="datetime" name="eventStartDate"
                                            placeholder="Select date and time" v-model="activeDate" class=" w-100" />
                                    </el-form-item>
                                </div>
                                <label class="required fs-6 fw-semobold mb-2">Vehicle Class</label>

                                <div class="align-items-center">
                                    <el-form-item>
                                        <el-select v-model="vehicleClass">
                                            <el-option v-for="item in vehicleClassMaster" :key="item.CLASS_NO"
                                                :label="item.CLASS_DESCRIPTION" :value="item.CLASS_NO" />
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>

                        <div class="text-center">
                            <button type="reset" data-bs-dismiss="modal" id="kt_modal_new_target_cancel"
                                class="btn btn-light me-3">
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
import { useMasterData } from "@/stores/common";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
const store = useMasterData();
export default defineComponent({
    data() {
        return {
            newTargetModalRef: null,
            plazaEntry: null,
            plazaExit: null,
            vehicleClass: null,
            overWightFare: 0,
            activeDate: null,
            tollFare: null,
            vehicleClassMaster: store.getMasters.vehicleClass,
        };
    },
    methods: {
        async createNewVehicleClass() {
            const payload = {
                plazaEntry: this.plazaEntry,
                plazaExit: this.plazaExit,
                vehicleClass: this.vehicleClass,
                overWightFare: 0,
                activeDate: this.activeDate,
                tollFare: this.tollFare
            };
            try {
                await axios.post(
                    `${BASE_URL}${API_ROUTES.FARE.CREATE_FARE}`,
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
        }
    },
}
);
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
  