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
                        <div class="fv-row mb-5 row">
                            <div class="col-5">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Report Type</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <el-select v-model="reportType" @change="clearTable">
                                    <el-option key="1" label="Shift-Collection-Report" value="Shift-Collection-Report" />
                                    <el-option key="2" label="Short-Excess-Report" value="Short-Excess-Report" />
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="fv-row mb-5 row">
                            <div class="col-5">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Collector</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <el-select v-model="collecterID" filterable>
                                    <el-option key="All" label="All" value="All" />
                                    <el-option v-for="item in collector" :key="item" :label="item.username"
                                        :value="item.id" />
                                </el-select>
                            </div>
                        </div>
                        <div class="fv-row mb-5 row">
                            <div class="col-5">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Cashier</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <el-select v-model="cashierID" filterable>
                                    <el-option key="All" label="All" value="All" />
                                    <el-option v-for="item in cashier" :key="item" :label="item.username"
                                        :value="item.id" />
                                </el-select>
                            </div>
                        </div>
                        <div class="fv-row mb-5 row">
                            <div class="col-5">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Shift</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <el-select v-model="shift">
                                    <el-option key="All" label="All" value="All" />
                                    <el-option key="1" label="Morning" value="Morning" />
                                    <el-option key="2" label="Evening" value="Evening" />
                                    <el-option key="3" label="Night" value="Night" />
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
                                <button type="submit" class="btn btn-light-primary mb-2" @click="search">
                                    <span class="indicator-label"> Search </span>
                                </button>
                                <button type="submit" class="btn btn-light-danger" @click="search">
                                    <span class="indicator-label"> Reset </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="reportType == 'Shift-Collection-Report'" class="row p-6" style="margin-left:14px">
            <collectionTable :transactions="data" />
        </div>
        <div v-else class="row p-6" style="margin-left:14px">
            <shortExcessTable :transactions="data" />
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMasterData } from "@/stores/common";
import Loader from "@/layouts/Loader.vue";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";
const store = useMasterData();
const userAuthStore = useAuthStore();
import collectionTable from "./collectionTable.vue";
import shortExcessTable from "./shortExcessTable.vue";

export default defineComponent({
    name: "Generate Report",

    components: {
        collectionTable,
        shortExcessTable,
        Loader
    },
    data() {
        return {
            fromDate: null,
            toDate: null,
            collector: null,
            cashier: null,
            shift: 'All',
            collecterID: 'All',
            cashierID: 'All',
            reportType: 'Shift-Collection-Report',
            data: []
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
                        payload.collecterID = this.collecterID;
                        payload.reportsId = [10];
                        payload.shift = this.shift;
                        payload.cashierID = this.cashierID;
                        payload.loginUser = userAuthStore.user.info.first_name + " " + userAuthStore.user.info.last_name;
                    }
                    if (this.reportType === "Shift-Collection-Report") {
                        payload.reportsId = [10];
                    }
                    else {
                        payload.reportsId = [11];
                    }
                    console.log('here')
                    await axios.post(`${API_ROUTES.admin_REPORT.GENERATE_REPORTS}`, {
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
            const payload = new Object();
            try {
                if (this.fromDate != null && this.toDate != null) {
                    payload.fromDate = this.fromDate
                    payload.toDate = this.toDate
                    payload.collecterID = this.collecterID;
                    payload.reportType = this.reportType;
                    payload.shift = this.shift;
                    payload.cashierID = this.cashierID;
                }
                const res = await axios.post(`${BASE_URL}${API_ROUTES.CASHUP.GETCASHUPDATA}`, {
                    ...payload,
                });
                this.data = res.data.data
                console.log(this.data)
                this.loader = false;

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
        clearTable() {
            this.data = [];
        }
    },
    mounted() {
        const masterData = store.getMasters;
        this.collector = masterData.getCollector;
        this.cashier = masterData.getCashier;
    }
})
</script>