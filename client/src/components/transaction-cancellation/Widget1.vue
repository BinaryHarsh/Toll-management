<template>
  <div class="row" :class="`page-title mb-3`">
    <div class="col-3 mb-3">
      <FilterTransaction @filterTransaction="fetchTransactions" :payData="payment" class="mx-2"></FilterTransaction>
      <button id="toggle-filter" class="filter btn btn-light-primary mx-2 lh-1" data-bs-toggle="tooltip"
        data-bs-placement="left" data-bs-dismiss="click" data-bs-trigger="hover" disabled>
        <i class="bi bi-patch-exclamation"></i>Total Count -
        {{ totalTransCount }}
      </button>
    </div>
    <div class="col-8 mb-3" v-if="LANE_TRANS_ID != null">
      <button id="toggle-filter" class="filter btn btn-light-primary mx-2 lh-1" data-bs-toggle="tooltip"
        data-bs-placement="left" data-bs-dismiss="click" data-bs-trigger="hover" disabled>
        Selected Transaction ID :- {{ LANE_TRANS_ID }}
      </button>
    </div>
    <div class="card">
      <div class="card-body">
        <Datatable :data="transactions" :header="fields" :enable-items-per-page-dropdown="true" :checkbox-enabled="false"
          checkbox-label="id">
          <template v-slot:LANE_TRANS_ID="{ row: transactions }">
            {{ transactions.LANE_TRANS_ID }}
          </template>
          <template v-slot:LANE_ID="{ row: transactions }">
            {{ transactions.LANE_ID }}
          </template>
          <template v-slot:VEH_PLATE="{ row: transactions }">
            {{ transactions.VEH_PLATE }}
          </template>
          <template v-slot:PASSAGE_TIME="{ row: transactions }">
            {{
              new Date(transactions.PASSAGE_TIME).toLocaleString(
                "en-GB",
                {
                  timeZone: "UTC",
                }
              )
            }}
          </template>
          <template v-slot:VEH_CLASS_DESCRIPTION="{ row: transactions }">
            {{ transactions.VEH_CLASS_DESCRIPTION }}
          </template>
          <template v-slot:PAY_DESCRIPTION="{ row: transactions }">
            {{ transactions.PAY_DESCRIPTION }}
          </template>
          <template v-slot:PAYSUB_DESCRIPTION="{ row: transactions }">
            {{ transactions.PAYSUB_DESCRIPTION }}
          </template>
          <template v-slot:ABNORMALITY="{ row: transactions }">
            {{ transactions.ABNORMALITY }}
          </template>
          <template v-slot:action="{ row: transactions }">
            <div class="form-check form-check-custom form-check-solid">
              <input class="form-check-input" type="radio" checked value="1"
                @click="setLaneId(transactions.LANE_TRANS_ID)" name="option2" />
            </div>
          </template>
        </Datatable>
        <div class="">
          <ul class="nav float-end">
            <li class="nav-item float-end">
              <button
                class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-success active fw-bold px-4 me-1"
                data-bs-toggle="tab" disabled>
                Total Pages - {{ pageCount }}
              </button>
            </li>
            <li class="nav-item float-end">
              <a class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary active fw-bold px-4 me-1"
                data-bs-toggle="tab" @click="prevPage" :disabled="page === 1">Pre</a>
            </li>
            <li class="mt-2 ms-2 me-2">
              <a>{{ page }}</a>
            </li>

            <li class="nav-item">
              <a class="nav-link btn btn-sm btn-color-muted btn-active btn-active-light-primary fw-bold px-4"
                data-bs-toggle="tab" @click="nextPage">Next</a>
            </li>
          </ul>
        </div>
        <!--end::Table container-->
      </div>
      <!--begin::Body-->
    </div>
    <!--end::Tables Widget 11-->
  </div>
</template>

<script >
import { defineComponent } from "vue";

import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import CommentModal from "@/components/transaction-cancellation/CommentModal.vue";
import { useCancellation } from "@/stores/cancel";
const cancellationStore = useCancellation();


export default defineComponent({
  name: "kt-widget-11",
  components: {
    Datatable,
    CommentModal,
  },
  props: {
    widgetClasses: String,
    transactionData: Object,
  },

  data() {
    return {
      transactions: [],
      page: 1,
      pageCount: null,
      totalTransCount: null,
      payload: null,
      LANE_TRANS_ID: null,
      redioBox: "",
      fields: [
        {
          columnName: "TXN ID",
          columnLabel: "LANE_TRANS_ID",
          sortEnabled: true,
        },
        {
          columnName: "LANE ID",
          columnLabel: "LANE_ID",
          sortEnabled: true,
        },
        {
          columnName: "VEHICLE NO",
          columnLabel: "VEH_PLATE",
          sortEnabled: true,
        },
        {
          columnName: "PASSAGE TIME",
          columnLabel: "PASSAGE_TIME",
          sortEnabled: true,
        },
        {
          columnName: "VEHICLE CLASS",
          columnLabel: "VEH_CLASS_DESCRIPTION",
          sortEnabled: true,
        },
        {
          columnName: "PAYMENT TYPE",
          columnLabel: "PAY_DESCRIPTION",
          sortEnabled: true,
        },
        {
          columnName: "PAYMENT SUBTYPE",
          columnLabel: "PAYSUB_DESCRIPTION",
          sortEnabled: true,
        },
        {
          columnName: "ABNORMALITY",
          columnLabel: "ABNORMALITY",
          sortEnabled: true,
        },
        {
          columnName: "Action",
          columnLabel: "action",
        },
      ],
    };
  },
  computed: {
    getFiltertransaction() {
      return cancellationStore.getFiltertransactionForCancel;
    },
    getpayload() {
      return cancellationStore.getpayload;
    },
  },

  watch: {
    getFiltertransaction: {
      handler(newVal, oldVal) {
        this.totalTransCount = newVal.totalCount;
        this.pageCount = newVal.totalPages;
        this.transactions = newVal.data;
        this.LANE_TRANS_ID = null
      },
      deep: true, // Enable deep watching if necessary
    },
    getpayload: {
      handler(newVal, oldVal) {
        this.payload = newVal;
      }
    }
  },
  methods: {
    TransactionDetails(id) {
      this.$router.push(`/reports/${id}`);
    },
    nextPage() {
      this.page++;
      this.fetchTransactions(this.payload, this.page);
    },
    prevPage() {
      if (this.page != 1) {
        this.page--;
        this.fetchTransactions(this.payload, this.page);
      }
    },
    async fetchTransactions(payload, page) {
      await cancellationStore.setTransactionForCancelData(payload, page)
    },
    setLaneId(id) {
      this.LANE_TRANS_ID = id
      cancellationStore.setLaneTransactionId(id);
    }
  },

  mounted() {
    this.payload = this.getpayload;
    this.totalTransCount = this.getFiltertransaction.totalCount;
    this.pageCount = this.getFiltertransaction.totalPages
    this.transactions = this.getFiltertransaction.data
  }
});
</script>
