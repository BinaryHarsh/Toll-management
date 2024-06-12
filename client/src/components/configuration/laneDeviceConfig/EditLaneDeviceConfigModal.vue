<template>
    <div class="modal fade" id="kt_modal_edit_lane_device" ref="newTargetModalRef" tabindex="-1" aria-hidden="true"
        data-bs-backdrop="static" data-bs-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded">
                <div class="modal-header pb-0 border-0">
                    <h1>Edit Shift</h1>
                    <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                        <KTIcon icon-name="cross" icon-class="fs-1" />
                    </div>
                </div>
                <hr />
                <div class="modal-body">
                    <el-form id=" kt_modal_new_target_form" @submit.prevent="saveDeviceDetails()">
                        <div class="row g-9 mb-8">
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Lane No</label>
                                <div class="align-items-center">
                                    <el-form-item>
                                        <el-input type="text" v-model="formData.LANE_ID" disabled></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Device Name</label>
                                <div class="align-items-center">
                                    <el-form-item>
                                        <el-input type="text" placeholder="Enter Device Name" v-model="formData.DEVICE_NAME"
                                            disabled></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>

                        <div class="row g-9 mb-8">
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Device IP</label>
                                <div class="align-items-center">
                                    <el-form-item prop="deviceIP">
                                        <el-input type="text" placeholder="Enter Device IP"
                                            v-model="formData.DEVICE_IP"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Device Type</label>

                                <div class="align-items-center">
                                    <el-form-item prop="deviceType">
                                        <el-input type="text" placeholder="Enter Device Type"
                                            v-model="formData.TYPE"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>

                        <div class="row g-9 mb-8">
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Port or Baud</label>
                                <div class="align-items-center">
                                    <el-form-item prop="portOrBaud">
                                        <el-input type="text" placeholder="Enter Port" v-model="formData.PORT"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Device URL</label>
                                <div class="align-items-center">
                                    <el-form-item prop="deviceURL">
                                        <el-input type="text" placeholder="Enter Device URL"
                                            v-model="formData.DEVICE_URL"></el-input>
                                    </el-form-item>
                                </div>
                            </div>

                        </div>

                        <div class="col-md-6 fv-row">
                            <label class="required fs-6 fw-semobold mb-2">Description</label>
                            <div class="align-items-center">
                                <el-form-item prop="deviceDescription">
                                    <el-input type="text" placeholder="Enter Device Description"
                                        v-model="formData.DESCRIPTION"></el-input>
                                </el-form-item>
                            </div>
                        </div>

                        <div class="text-center">
                            <button type="button" id="kt_modal_new_target_cancel" class="btn btn-light me-3"
                                data-bs-dismiss="modal">
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
import { defineComponent, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";

export default defineComponent({
    name: "new-target-modal",
    components: {},
    props: {
        deviceData: Object,
    },
    data() {
        return {
            loading: false,
            formData: {} as any,
        };
    },
    watch: {
        deviceData: function () {
            this.formData = this.deviceData;
            console.log(this.formData);
        },
    },
    methods: {
        async saveDeviceDetails() {
            try {
                const payload = {
                    "LANE_ID": this.formData.LANE_ID,
                    "DEVICE_NAME": this.formData.DEVICE_NAME,
                    "DEVICE_IP": this.formData.DEVICE_IP,
                    "DEVICE_URL": this.formData.DEVICE_URL,
                    "DESCRIPTION": this.formData.DESCRIPTION,
                    "PORT": this.formData.PORT,
                    "TYPE": this.formData.TYPE,

                }
                await axios.put(
                    `${BASE_URL}${API_ROUTES.DEVICE.UPDATE_DEVICE}?id=${this.formData.ID}`,
                    payload
                );
                this.$emit("submit", JSON.stringify(this.formData));
                //this.formData = {};

                Swal.fire({
                    title: "Lane Device Updated!",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1000,
                }).then(() => {
                    hideModal((this.$refs.newTargetModalRef as HTMLElement));
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
  