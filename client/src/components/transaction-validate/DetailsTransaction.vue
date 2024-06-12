<template>
  <!--begin::Tables Widget 11-->
  <div class="row mt-4 mb-5">
    <div class="d-flex flex-stack flex-wrap mb-5">
      <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
        Transaction Details
      </h1>
      <button type="button" class="btn btn-sm btn-primary align-items-end create" @click="goToTransactionListPage()">
        <i class="bi bi-arrow-left"></i>Back
      </button>
    </div>
    <!--card1-->
    <div class="col-xl-4">
      <div :class="widgetClasses" class="card">
        <!--begin::Body-->
        <div class="card-body h-550px p-5">
          <!--begin::Table container-->
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-12 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Transaction ID</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="transactionID">
                      <el-input v-model="transactionDetails.LANE_TRANS_ID" name="transactionID" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
                <div class="col-12 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Passage Time</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="passageTime">
                      <el-input v-model="transactionDetails.PASSAGE_TIME" name="passageTime" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Payment Type</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="paymentType">
                      <el-input v-model="opPaymentType" name="paymentType" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Payment Sub-Type</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="paymentSubtype">
                      <el-input v-model="opPaymentSubType" name="paymentSubtype" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Operator Class</label>

                  <!--begin::Input-->

                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="operatorClass">
                      <el-input name="operatorClass" disabled v-model="opVehicleClass"></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Operator Plate</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="operatorPlate">
                      <el-input v-model="opPlate" name="operatorPlate" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Operator Comment</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="operatorComment">
                      <el-input v-model="transactionDetails.OPERATOR_COMMENT" name="operatorComment" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">AVC Class</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="avcClass">
                      <el-input v-model="opAvcClass" name="avcClass" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Op Fee</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="opFee">
                      <el-input v-model="opFee" name="opFee" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Operator Name</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="operatorName">
                      <el-input v-model="transactionDetails.OPERATOR_ID" name="operatorName" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Bar Code/S.Card</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="barCode">
                      <el-input v-model="transactionDetails.CATEGORY" name="barCode" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
                <div class="col-md-6 fv-row">
                  <label class="fs-6 fw-semobold mb-2">Abnormal</label>

                  <!--begin::Input-->
                  <div class="position-relative align-items-center">
                    <!--begin::Datepicker-->
                    <el-form-item prop="abnormal">
                      <el-input v-model="transactionDetails.ABNORMALITY" name="abnormal" disabled></el-input>
                    </el-form-item>
                    <!--end::Datepicker-->
                  </div>
                  <!--end::Input-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--begin::Body-->
      </div>
    </div>
    <!-- end card1 -->

    <!-- card2 -->
    <div class="col-xl-4">
      <div :class="widgetClasses" class="card">
        <div class="card-body h-550px">
          <!--begin::Body-->
          <!--begin::Table container-->
          <el-form>
            <div class="row mb-3">
              <div class="col-6 fv-row mb-3">
                <label class="fs-6 fw-semobold mb-2">Reviewer</label>
                <!--end::Label-->

                <!--begin::Input-->
                <input type="text" class="form-control form-control-sm" name="reviewer" disabled v-model="reviewerName" />
                <!--end::Input-->
              </div>

              <div class="col-6 fv-row mb-3">
                <label class="fs-6 fw-semobold mb-2">RE Plate</label>
                <!--end::Label-->

                <!--begin::Input-->
                <input type="text" class="form-control form-control-sm" name="replate"
                  v-model="transactionDetails.VEH_PLATE" />
                <!--end::Input-->
              </div>

              <div class="col-12 fv-row mb-3">
                <label class="fs-6 fw-semobold mb-2">Reviewer Class</label>

                <!--begin::Input-->
                <div class="position-relative align-items-center">
                  <select class="form-select form-select-sm" as="select"
                    v-model="transactionDetails.REVEH_CLASS_DESCRIPTION" @change="reviewerChangeVehicleClass($event)">
                    <option v-for="vehicle in vehicleClass" :key="vehicle.CLASS_NO" :value="vehicle.CLASS_DESCRIPTION">
                      {{ vehicle.CLASS_DESCRIPTION }}
                    </option>
                  </select>
                  <!--end::Datepicker-->
                </div>
                <!--end::Input-->
              </div>

              <div class="col-md-6 fv-row mb-3">
                <label class="fs-6 fw-semobold mb-2">Re Payment Type</label>

                <!--begin::Input-->
                <div class="position-relative align-items-center">
                  <!--begin::Datepicker-->
                  <select name="Pay Type" class="form-select form-select-sm" as="select"
                    v-model="transactionDetails.PAY_DESCRIPTION">
                    <option v-for="payment in paymentType" :key="payment.id" :value="payment.DESCRIPTION">
                      {{ payment.DESCRIPTION }}
                    </option>
                  </select>
                  <!--end::Datepicker-->
                </div>
                <!--end::Input-->
              </div>

              <div class="col-md-6 fv-row mb-3">
                <label class="fs-6 fw-semobold mb-2">Re Payment Sub-Type</label>

                <!--begin::Input-->
                <div class="position-relative align-items-center">
                  <select class="form-select form-select-sm" as="select" v-model="transactionDetails.PAYSUB_DESCRIPTION">
                    <option v-for="paymentSub in paymentSubType" :key="paymentSub.id" :value="paymentSub.DESCRIPTION">
                      {{ paymentSub.DESCRIPTION }}
                    </option>
                  </select>
                </div>
                <!--end::Input-->
              </div>

              <div class="col-md-6 fv-row mb-3">
                <label class="fs-6 fw-semobold mb-2">Reviewer Fee</label>
                <!--end::Label-->

                <!--begin::Input-->
                <input type="text" class="form-control form-control-sm" name="replate" disabled
                  v-model="transactionDetails.RE_VEH_FEE" />
                <!--end::Input-->
              </div>

              <div class="col-md-6 fv-row mb-3">
                <label class="fs-6 fw-semobold mb-2">Weight</label>
                <!--end::Label-->

                <!--begin::Input-->
                <input type="text" class="form-control form-control-sm" name="replate"
                  v-model="transactionDetails.WEIGHT" />
                <!--end::Input-->
              </div>

              <div class="col-12 fv-row">
                <label class="fs-6 fw-semobold mb-1">RE Comment</label>
                <!--end::Label-->

                <!--begin::Input-->
                <textarea type="text" class="form-control form-control-sm" name="recomment"
                  v-model="transactionDetails.RE_COMMENT" />

                <!--end::Input-->
              </div>
            </div>
            <div class="row mt-5">
              <div class="col-md-4">
                <div class="row">
                  <button class="btn btn-sm btn-light-primary float-center" @click="previousClick">
                    <i class="bi bi-arrow-left fs-8"></i>
                    <span class="fs-8">Previous</span>
                  </button>
                </div>
              </div>

              <div class="col-md-4">
                <div class="row ms-2">
                  <button class="btn btn-sm btn-light-success float-center" @click="validateAndSave" type="button">
                    <!-- <i class="bi bi-check fs-8"></i> -->
                    <span class="fs-8">Validate & Save</span>
                  </button>
                </div>
              </div>
              <div class="col-md-4">
                <div class="row ms-2">
                  <button class="btn btn-sm btn-light-primary float-center" @click="nextClick" type="button">
                    <span class="fs-8">Next </span><i class="bi bi-arrow-right fs-8"></i>
                  </button>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <!--begin::Body-->
      </div>
    </div>

    <!-- Card3  -->
    <div class="col-xl-4">
      <div :class="widgetClasses" class="card">
        <!--begin::Body-->
        <div class="card-body">
          <!--begin::Table container-->
          <div class="row">
            <!-- imgs -->
            <div class="col-md-12">
              <div class="card">
                <div v-for="(src, index) in imgs" :key="index">
                  <!--begin::Tap pane-->
                  <div>
                    <!--begin::Table container-->
                    <div class="responsive">
                      <div class="">
                        <div :key="index" class="pic" @click="() => showImg(index)">
                          <img :src="src" class="image m-3" style="float: ; cursor: pointer" width="350" />
                        </div>
                      </div>
                    </div>
                    <!--end::Table-->
                  </div>
                  <!--end::Tap pane-->
                </div>
                <vue-easy-lightbox :visible="visibleRef" :imgs="imgs[0]" @hide="onHide"></vue-easy-lightbox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--begin::Body-->
    </div>
  </div>
  <!--end::Tables Widget 11-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { useTransactionStore } from "@/stores/transaction";
import { useMasterData } from "@/stores/common";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const store = useMasterData();
const userAuthStore = useAuthStore();
const TransactionStore = useTransactionStore();

interface FilterTransactionData {
  transactions: any[];

}

export default defineComponent({
  name: "kt-widget-11",
  components: {
    VueEasyLightbox,
  },

  props: {
    widgetClasses: String,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const visibleRef = ref(false);
    const indexRef = ref(0);
    const transactionDetails = ref<any>([]);
    let vehicleClass = ref<any>([]);
    let paymentType = ref<any>([]);
    let paymentSubType = ref<any>([]);
    let transactionId = ref<any>("");
    let opPaymentType = ref<any>();
    let opPaymentSubType = ref<any>();
    let opVehicleClass = ref<any>();
    let opPlate = ref<any>();
    let opAvcClass = ref<any>();
    let opFee = ref<any>();
    let reviewer = ref<any>();
    let reviewerName = ref<any>();
    let reviewerUsername = ref<any>();
    let transactions = ref<any>([]);

    const reviewerVehClass = ref<any>();

    let imgs = ref(["media/TollCarimg.jpg"])

    const showImg = (index) => {
      indexRef.value = index;
      visibleRef.value = true;
    };
    const onHide = () => (visibleRef.value = false);

    const goToTransactionListPage = () => {
      router.push("/transactions");
    };

    // <!-- next click -->
    const nextClick = async () => {
      transactionDetails.value = "";
      const index = transactions._value.findIndex((element) => element.LANE_TRANS_ID == transactionId)
      transactionId = transactions._value[index + 1].LANE_TRANS_ID;

      if (index == transactions._value.length - 2) {
        Swal.fire({
          title: "This is last Transaction",
          icon: "warning",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      }
      router.push(`/transactions/${transactionId}`);
      await getTransactionById();
    };

    // Previous click
    const previousClick = async () => {
      transactionDetails.value = "";
      const index = transactions._value.findIndex((element) => element.LANE_TRANS_ID == transactionId)
      transactionId = transactions._value[index - 1].LANE_TRANS_ID;

      if (index === 1) {
        Swal.fire({
          title: "This is First Transaction",
          icon: "warning",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      }


      router.push(`/transactions/${transactionId}`);
      await getTransactionById();
    };

    // previous and next logic
    const transactionStore = useTransactionStore();

    const reviewerChangeVehicleClass = async (event) => {
      const Reclass = event.target.value.split('')
      console.log(Reclass[0])
      const fee = await axios.get(
        `${BASE_URL}${API_ROUTES.FARE.GET_FARE_BY_RE_VEH_CLASS}?ReVehClassName=${Reclass[0]}`
      );
      // find changed vehicle class
      const selectedClass = vehicleClass.value.find(
        (className) => className.CLASS_DESCRIPTION === event.target.value
      );
      reviewerVehClass.value = selectedClass.CLASS_NO;
      if (transactionDetails.value.PAY_DESCRIPTION == "FASTag") {
        transactionDetails.value.RE_VEH_FEE = fee.data.data.TOLL_FARE;
      }
      if (transactionDetails.value.PAY_DESCRIPTION == "Cash") {
        transactionDetails.value.RE_VEH_FEE = fee.data.data.TOLL_FARE * 2;
      }
    };
    const imgUrl = computed(() => {
      const dateObject = new Date(transactionDetails.value.PASSAGE_TIME);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      return `http://103.158.148.19:3002/${year}/${month}/${day}/${transactionDetails.value.LANE_TRANS_ID}_F.jpg`;
    });

    watch(imgs, async (newValue, oldValue) => {
      console.log(oldValue)
      console.log(newValue)
    })

    const getTransactionById = async () => {
      const res = await axios.get(
        `${BASE_URL}${API_ROUTES.TRANSACTION_VALIDATE.GET_TRANSACTION_BY_ID}${transactionId}`
      );
      transactionDetails.value = res.data.data.transaction;
      imgs.value[0] = imgUrl.value;

      opPaymentType.value = transactionDetails.value.PAY_DESCRIPTION;
      opPaymentSubType.value = transactionDetails.value.PAYSUB_DESCRIPTION;
      opVehicleClass.value = transactionDetails.value.VEH_CLASS_DESCRIPTION;
      opPlate.value = transactionDetails.value.VEH_PLATE;
      opAvcClass.value = transactionDetails.value.AVC_CLASS_DESCRIPTION;
      opFee.value = transactionDetails.value.TOTAL_FARE;
    };

    const validateAndSave = async () => {
      try {
        const rePaymentSubType = paymentSubType.value.find((element) => element.DESCRIPTION === transactionDetails.value.PAYSUB_DESCRIPTION);
        const rePaymentType = paymentType.value.find((element) => element.DESCRIPTION === transactionDetails.value.PAY_DESCRIPTION);
        const reVehClass = vehicleClass.value.find((element) => element.CLASS_DESCRIPTION === transactionDetails.value.REVEH_CLASS_DESCRIPTION);

        let payload = {
          transId: transactionId,
          reviewerFee: transactionDetails.value.RE_VEH_FEE,
          reviewerComment: transactionDetails.value.RE_COMMENT,
          reviewerId: reviewerUsername.value,
          reviewerClass: reVehClass.CLASS_NO,
          rePaymentType: rePaymentType.PAYMENTTYPE,
          rePaymentSubType: rePaymentSubType.PAYMENTSUBTYPE
        };
        console.log(payload)
        await axios.put(
          `${BASE_URL}${API_ROUTES.TRANSACTION_VALIDATE.VALIDATE_TRANSACTION}`,
          payload
        );
        Swal.fire({
          title: "Transaction Validate",
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1000,
        });
        await nextClick();
      } catch (e: any) {
        Swal.fire({
          title: e.response.data.message,
          icon: "error",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    };

    onMounted(async () => {
      const masterData = <any>store.getMasters;
      paymentType.value = masterData.paymentTypeMaster;
      paymentSubType.value = masterData.subPaymentTypeMaster;
      vehicleClass.value = masterData.vehicleClass;
      transactionId = <any>route.params.id;
      reviewer = userAuthStore.user.info;
      reviewerName.value =
        userAuthStore.user.info.first_name +
        " " +
        userAuthStore.user.info.last_name;
      reviewerUsername.value = userAuthStore.user.info.username;
      await getTransactionById();
      transactions.value = (TransactionStore.getFiltertransaction as FilterTransactionData).transactions;
    });

    return {
      ref,
      getAssetPath,
      imgs,
      validateAndSave,
      visibleRef,
      indexRef,
      onHide,
      showImg,
      transactionDetails,
      goToTransactionListPage,
      transactionStore,
      nextClick,
      previousClick,
      paymentType,
      paymentSubType,
      transactionId,
      getTransactionById,
      vehicleClass,
      opPaymentType,
      opPaymentSubType,
      opVehicleClass,
      opPlate,
      opAvcClass,
      opFee,
      reviewerChangeVehicleClass,
      reviewer,
      reviewerName,
      reviewerUsername,
      imgUrl
    };
  },
});
</script>
