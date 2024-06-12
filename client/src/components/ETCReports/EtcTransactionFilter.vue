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
                                <label class="fs-5 fw-semobold form-label mb-5">Tag Id</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <!--begin::Input-->
                                <el-input v-model="tagId" type="text" placeholder="Enter tag id" size="medium" />
                                <!--end::Input-->
                            </div>
                        </div>
                        <div class="fv-row mb-5 row">
                            <div class="col-5">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Tag Class</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <el-select v-model="vehicleClass">
                                    <el-option key="All" label="All" value="All" />
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="fv-row mb-5 row">
                            <div class="col-5">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Plate Number</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <!--begin::Input-->
                                <el-input v-model="plateNum" type="text" placeholder="Enter plate number"
                                    name="eventLocation" size="medium" />
                                <!--end::Input-->
                            </div>
                        </div>

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
                                <label class="fs-5 fw-semobold form-label mb-5">Toll Class</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <el-select v-model="vehicleClass">
                                    <el-option key="All" label="All" value="All" />
                                    <el-option v-for="item in vehicleClassMaster" :key="item.CLASS_NO"
                                        :label="item.CLASS_DESCRIPTION" :value="item.CLASS_NO" />
                                </el-select>
                            </div>
                        </div>
                        <div class="fv-row mb-5 row">
                            <div class="col-5">
                                <!--begin::Label-->
                                <label class="fs-5 fw-semobold form-label mb-5">Compare CCH</label>
                                <!--end::Label-->
                            </div>
                            <div class="col-7">
                                <div class="form-check form-check-custom form-check-success form-check-solid">
                                    <input class="form-check-input" type="checkbox" value="" />
                                </div>
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
                                <button type="submit" class="btn btn-light-primary" @click="search">
                                    <span class="indicator-label"> Re-Proccess CCH </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from "vue";
import { useMasterData } from "@/stores/common";
import { useadminStore } from "../../stores/report"
import { useAuthStore } from "@/stores/auth";
import Loader from "@/layouts/Loader.vue";
const store = useMasterData();
const reportStore = useadminStore();
const userAuthStore = useAuthStore();

export default defineComponent({
    name: "Generate Report",
    components: {
        Loader,
    },
    data() {
        return {
            fromDate: null,
            toDate: null,
            tagId: "",
            transactionId: "",
            plateNum: "",
            lane: "All",
            vehicleClass: "All",
            selectedLaneType: "All",
            paymentType: "All",
            loading: false,
            laneMaster: store.getMasters.laneMaster,
            vehicleClassMaster: store.getMasters.vehicleClass,
            paymentMaster: store.getMasters.paymentTypeMaster,
            paymentSubType: 'All',
            loader: false
        };
    },
});
</script>
  