<template>
    <div class="row">
        <div class="card h-md-100 border border-2 border-gray-300 border-hover mt-5">
            <div class="card-body">
                <div class="row">
                    <div class="col-4">
                        <div class="fv-row mb-5 row">
                            <!--begin::Label-->
                            <div class="col-5">
                                <label class="fs-5 fw-semobold form-label mb-5 ">From Date:</label>
                            </div>
                            <!--end::Label-->
                            <div class="col-7">
                                <el-date-picker v-model="fromDate" type="datetime" name="eventStartDate"
                                    placeholder="Select date and time" class=" w-100" />
                            </div>

                        </div>

                        <div class="fv-row mb-5 row">
                            <!--begin::Label-->
                            <div class="col-5">
                                <label class="fs-5 fw-semobold form-label mb-5">To Date:</label>
                            </div>
                            <div class="col-7">
                                <el-date-picker v-model="toDate" type="datetime" name="eventToDate"
                                    placeholder="Select date and time" class="w-100" />
                            </div>
                            <!--end::Input-->
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="fv-row mb-5 row">
                            <div class="col-5">
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
                            <div class="col-5">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Lane Type</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <el-select v-model="selectedLaneType">
                                    <el-option key="All" label="All" value="All" />
                                    <el-option v-for="item in laneType" :key="item" :label="item" :value="item" />
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="row fv-row">
                            <div class="text-center row">
                                <button type="submit" class="btn btn-light-success mb-2" @click="generateReports">
                                    <span class="indicator-label"> Generate Report </span>
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
        <div class="row p-6" style="margin-left:13px">
            <tableAvcReport :transactions="data" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMasterData } from "@/stores/common";
import { useAuthStore } from "@/stores/auth";
import Loader from "@/layouts/Loader.vue";
import tableAvcReport from "./tableAvcReport.vue";
import axios from "axios";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
import AvcDateWiseTableVue from "./AvcDateWiseTable.vue";
const userAuthStore = useAuthStore();
const store = useMasterData();

export default defineComponent({
    name: "Generate Report",

    components: {
        tableAvcReport,
        AvcDateWiseTableVue,
        Loader
    },
    data() {
        return {
            fromDate: null,
            toDate: null,
            lane: "All",
            selectedLaneType: "All",
            vehicleClass: "All",
            laneMaster: store.getMasters.laneMaster,
            vehicleClassMaster: store.getMasters.vehicleClass,
            laneType: ["EN", "EX"],
            data: [],
        };
    },
    methods: {
        async generateReports() {
            Swal.fire({
                title: "Report is generating...",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
            });

            const payload = new Object();
            try {
                if (this.fromDate != null && this.toDate != null) {
                    if (this.fromDate != null && this.toDate != null) {
                        payload.fromDate = this.fromDate
                        payload.toDate = this.toDate
                        payload.lane = this.lane;
                        payload.reportsId = [9];
                        payload.vehicleClass = this.vehicleClass;
                        payload.laneType = this.selectedLaneType;
                        payload.loginUser = userAuthStore.user.info.first_name + " " + userAuthStore.user.info.last_name;
                    }
                    await ApiService.post(`${API_ROUTES.admin_REPORT.GENERATE_REPORTS}`, {
                        ...payload,
                    });
                } else {
                    Swal.fire({
                        title: "Please select valid filter!",
                        icon: "warning",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            } catch (e) {
                Swal.fire({
                    title: e.response.data.message,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        },
        async search() {
            this.loader = true
            const payload = new Object();
            try {
                if (this.fromDate != null && this.toDate != null) {
                    payload.fromDate = this.fromDate
                    payload.toDate = this.toDate
                    payload.lane = this.lane;
                    payload.vehicleClass = this.vehicleClass;
                    payload.laneType = this.selectedLaneType;
                    payload.reportType = this.reportType
                }
                const res = await axios.post(`${BASE_URL}${API_ROUTES.admin_REPORT.AVC_TRANSACTION}`, {
                    ...payload,
                });
                this.data = res.data.data

            } catch (e) {
                Swal.fire({
                    title: e,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        },
    },

})
</script>