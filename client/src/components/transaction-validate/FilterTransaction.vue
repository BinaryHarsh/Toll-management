<template>
  <div class="row">
    <div class="row" :class="`page-title mb-3`">
      <div class="col-9">
        <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
          Transaction Validation
        </h1>
      </div>
    </div>
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
                <el-date-picker v-model="toDate" type="datetime" name="eventToDate" placeholder="Select date and time"
                  class="w-100" />
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
                <label class="fs-5 fw-semobold form-label mb-5">Transaction Id</label>
                <!--end::Label-->
              </div>
              <div class="col-7">
                <!--begin::Input-->
                <el-input v-model="transactionId" type="text" placeholder="Enter transaction id" size="medium" />
                <!--end::Input-->
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
                <el-input v-model="plateNum" type="text" placeholder="Enter plate number" name="eventLocation"
                  size="medium" />
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
                <label class="fs-5 fw-semobold form-label mb-5">Vehicle Class</label>
                <!--end::Label-->
              </div>
              <div class="col-7">
                <el-select v-model="vehicleClass">
                  <el-option key="All" label="All" value="All" />
                  <el-option v-for="item in vehicleClassMaster" :key="item.CLASS_NO" :label="item.CLASS_DESCRIPTION"
                    :value="item.CLASS_NO" />
                </el-select>
              </div>
            </div>
            <div class="fv-row mb-5">
              <div class="col d-flex justify-content-center">
                <button type="submit" class="btn btn-light-primary" @click="search">
                  <span class="indicator-label"> Search </span>
                </button>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="fv-row mb-5 row">
              <div class="col-5">
                <!--begin::Label-->
                <label class="fs-5 fw-semobold form-label mb-5">Payment Type</label>
                <!--end::Label-->
              </div>
              <div class="col-7">
                <el-select v-model="paymentType">
                  <el-option key="All" label="All" value="All" />
                  <el-option v-for="item in paymentMaster" :key="item.ID" :label="item.DESCRIPTION"
                    :value="item.PAYMENTTYPE" />
                </el-select>
              </div>
            </div>

            <div class="fv-row mb-5 row">
              <div class="col-5">
                <!--begin::Label-->
                <label class="fs-5 fw-semobold form-label mb-5">Abnormality</label>
                <!--end::Label-->
              </div>
              <div class="col-7">
                <el-select v-model="abnormalityType">
                  <el-option key="All" label="All" value="All" />
                  <el-option v-for="item in abnormality" :key="item" :label="item" :value="item" />
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
        </div>
      </div>
    </div>
    <div class="row p-5">
      <TransactionValidate />
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useMasterData } from "@/stores/common";
import TransactionValidate from "./TransactionValidate.vue";
import { useTransactionStore } from "../../stores/transaction.ts"
const store = useMasterData();
const TransactionStore = useTransactionStore();

export default defineComponent({
  name: "Generate Report",
  components: {
    TransactionValidate
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
      abnormalityType: "All",
      loading: false,
      laneMaster: store.getMasters.laneMaster,
      vehicleClassMaster: store.getMasters.vehicleClass,
      paymentMaster: store.getMasters.paymentTypeMaster,
      laneType: ["EN", "EX"],
      abnormality: ["OK", "NOT OK"],
    };
  },
  computed: {
    getpayload() {
      return TransactionStore.getpayload;
    },
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
          payload.plateNumber = this.plateNum;
          payload.lane = this.lane;
          payload.vehicleClass = this.vehicleClass;
          payload.laneType = this.selectedLaneType;
          payload.paymentType = this.paymentType;
          payload.abnormality = this.abnormalityType;
        }
        await TransactionStore.setFiltertransactionData(payload, 1)
      }
      catch (e) {
        Swal.fire({
          title: e.response.data.message,
          icon: "error",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 2000,
        });
      }

    }
  },
  mounted() {
    if (this.getpayload != null) {
      this.fromDate = this.getpayload.fromDate
      this.toDate = this.getpayload.toDate
      this.tagId = this.getpayload.tagId
      this.transactionId = this.getpayload.transactionId
      this.plateNum = this.getpayload.plateNumber
      this.lane = this.getpayload.lane
      this.vehicleClass = this.getpayload.vehicleClass
      this.selectedLaneType = this.getpayload.laneType
      this.paymentType = this.getpayload.paymentType
      this.abnormalityType = this.getpayload.abnormality
    }
  }
});
</script>
