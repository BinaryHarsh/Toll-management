<template>
    <div class="row">
        <div class="card h-md-100 border border-2 border-gray-300 border-hover mt-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-4">
                        <div class="fv-row mb-5 row">
                            <!--begin::Label-->
                            <label class="fs-5 fw-semobold form-label mb-5 col-3">From:</label>
                            <!--end::Label-->
                            <div class="col-7">
                                <!--begin::Input-->
                                <el-date-picker v-model="fromDate" type="datetime" :teleported="false" name="eventStartDate"
                                    placeholder="Select date and time" class="col-7" />
                                <!--end::Input-->
                            </div>
                        </div>

                        <div class="fv-row mb-5 row">
                            <!--begin::Label-->
                            <label class="fs-5 fw-semobold form-label mb-5 col-3">To:</label>
                            <!--end::Label-->
                            <div class="col-7">
                                <!--begin::Input-->
                                <el-date-picker v-model="toDate" type="datetime" :teleported="false" name="eventToDate"
                                    placeholder="Select date and time" />
                                <!--end::Input-->
                            </div>

                        </div>

                        <div class="fv-row mb-5 row">
                            <div class="col-3">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-3">Tag Id</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <!--begin::Input-->
                                <el-input v-model="tagId" type="text" placeholder="Enter tag id" size="medium" />
                                <!--end::Input-->
                            </div>
                        </div>
                    </div>
                    <div class="col-4 ">
                        <div class="fv-row mb-5 row">
                            <div class="col-4">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Plate Number</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <!--begin::Input-->
                                <el-input v-model="plateNumber" type="text" placeholder="Enter plate number"
                                    name="eventLocation" size="medium" />
                                <!--end::Input-->
                            </div>
                        </div>

                        <div class="fv-row mb-5 row">
                            <div class="col-4">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Lane</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <el-select v-model="lane">
                                    <el-option key="All" label="All" value="All" />
                                    <el-option v-for="item in laneMaster" :key="item.LANE_ID" :label="item.LANE_NAME"
                                        :value="item.LANE_NAME" />
                                </el-select>
                            </div>
                        </div>


                        <div class="fv-row mb-5 row">
                            <div class="col-4">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Comment</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <el-select v-model="Comment">
                                    <el-option key="select" label="----Select Comment----" value="Select" />
                                    <el-option v-for="item in laneType" :key="item" :label="item" :value="item" />
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="row fv-row">
                            <div class="fv-row mb-5 row">
                                <div class="col-5">
                                    <!--begin::Label-->
                                    <label class="fs-5 fw-semobold form-label mb-5">Transaction Id</label>
                                    <!--end::Label-->
                                </div>
                                <div class="col-7">
                                    <!--begin::Input-->
                                    <el-input v-model="transactionId" type="text" placeholder="Enter transaction id"
                                        size="medium" />
                                    <!--end::Input-->
                                </div>
                            </div>
                            <div class="text-center row">
                                <button type="submit" class="btn btn-light-success mb-2" @click="cancelTransaction">
                                    <span class="indicator-label">Cancel Transaction</span>
                                </button>
                                <button type="submit" class="btn btn-light-primary" @click="search">
                                    <span class="indicator-label"> Search </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row p-6" style="margin-left:14px">
            <Widget1 />
        </div>
    </div>
</template>
<script>
import { defineComponent, handleError } from "vue";
import { useMasterData } from "@/stores/common";
import Swal from "sweetalert2";
import { useCancellation } from "@/stores/cancel";
import { useAuthStore } from "@/stores/auth";
import Widget1 from "./Widget1.vue";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
const cancellationStore = useCancellation();
const userAuthStore = useAuthStore();

const store = useMasterData();

export default defineComponent({
    name: "Generate Report",

    components: {
        Widget1
    },
    data() {
        return {
            fromDate: null,
            toDate: null,
            tagId: "",
            transactionId: "",
            plateNumber: "",
            lane: "All",
            Comment: "Select",
            loading: false,
            LANE_TRANS_ID: null,
            laneMaster: store.getMasters.laneMaster,
            laneType: ['TEST RECEIPT', 'TC MISTAKE', 'VEHICLE NUMBER MISTAKE', 'WRONG VEHICLE CLASS', 'PRINTER ISSUE'],
        };
    },
    computed: {
        getLaneTransactionId() {
            return cancellationStore.getLaneTransactionId;
        }
    },
    watch: {
        getLaneTransactionId: {
            handler(newvalue, oldvalue) {
                this.LANE_TRANS_ID = newvalue
            }
        }
    },
    methods: {
        async search() {
            try {
                const payload = new Object();
                if (this.fromDate != null && this.toDate != null) {
                    payload.fromDate = this.fromDate
                    payload.toDate = this.toDate
                    payload.tagId = this.tagId;
                    payload.transactionId = this.transactionId;
                    payload.plateNumber = this.plateNumber;
                    payload.lane = this.lane;
                }
                await cancellationStore.setTransactionForCancelData(payload, 1)
            }
            catch (e) {
                Swal.fire({
                    title: e,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }

        },
        async cancelTransaction() {
            try {
                await axios.put(`${BASE_URL}${API_ROUTES.TRANSACTION_VALIDATE.CANCEL_TRANSACTION}`, {
                    loginUser: userAuthStore.user.info.first_name + " " + userAuthStore.user.info.last_name, comment: this.Comment, transactionId: this.LANE_TRANS_ID
                })

                Swal.fire({
                    title: "Cancelled Successfully",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000,
                });

            }
            catch (e) {
                Swal.fire({
                    title: e,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
        }

    },
    mounted() {
        const payload = cancellationStore.getpayload;
        if (payload != null) {
            this.fromDate = payload.fromDate,
                this.toDate = payload.toDate,
                this.tagId = payload.tagId,
                this.transactionId = payload.transactionId,
                this.plateNumber = payload.plateNumber,
                this.lane = payload.lane
        }
        this.LANE_TRANS_ID
    }
});
</script>
  