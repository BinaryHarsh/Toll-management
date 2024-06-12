<template>
    <div class="modal fade" id="kt_modal_edit_lane" ref="newTargetModalRef" tabindex="-1" aria-hidden="true"
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
                    <el-form id=" kt_modal_new_target_form" @submit.prevent="saveLaneDetails()">
                        <div class="row g-9 mb-8">
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Lane Name</label>
                                <div class="align-items-center">
                                    <el-form-item>
                                        <el-input type="text" v-model="formData.LANE_NAME" disabled></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Lane Type</label>
                                <div class="align-items-center">
                                    <el-form-item>
                                        <el-input type="text" placeholder="Enter Device Name"
                                            v-model="formData.LANE_TYPE"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>

                        <div class="row g-9 mb-8">
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Lane IP</label>
                                <div class="align-items-center">
                                    <el-form-item prop="deviceIP">
                                        <el-input type="text" placeholder="Enter Device IP"
                                            v-model="formData.LANE_IP"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="col-md-6 fv-row">
                                <label class="required fs-6 fw-semobold mb-2">Lane Directory</label>

                                <div class="align-items-center">
                                    <el-form-item prop="deviceType">
                                        <el-input type="text" placeholder="Enter Device Type"
                                            v-model="formData.LANE_DIR"></el-input>
                                    </el-form-item>
                                </div>
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
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";

const updated_by = useAuthStore();

export default defineComponent({
    name: "new-target-modal",
    components: {},
    props: {
        laneData: Object,
    },
    data() {
        return {
            loading: false,
            formData: {} as any,
            laneName: [],
            update_by: ""
        };
    },
    watch: {
        laneData: function () {
            this.formData = this.laneData;
            console.log(this.formData);
        },
    },
    methods: {
        async saveLaneDetails() {
            try {
                const payload = {
                    "LANE_NAME": this.formData.LANE_NAME,
                    "LANE_TYPE": this.formData.LANE_TYPE,
                    "LANE_IP": this.formData.LANE_IP,
                    "LANE_DIR": this.formData.LANE_DIR,
                    "UPDATE_BY": this.update_by,
                }
                // this.laneName = masterStore.getMasters.laneMaster;
                // for (let i in this.laneName) {
                //     const lane_id = i.LANE_ID
                // }
                await axios.put(
                    `${BASE_URL}${API_ROUTES.LANE.UPDATE_LANE}?laneid=${this.formData.LANE_ID}`,
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
    mounted() {
        this.update_by = updated_by.user.info.id
    }
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
  