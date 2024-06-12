<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <button id="toggle-filter" class="filter btn btn-light-primary mx-2 lh-1" data-bs-toggle="tooltip"
          data-bs-placement="left" data-bs-dismiss="click" data-bs-trigger="hover" disabled>
          <i class="bi bi-patch-exclamation"></i>Total Count -
          {{ totalTransCount }}
        </button>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-body">
        <Datatable :data="transactions" :header="fields" :enable-items-per-page-dropdown="true" :checkbox-enabled="false">
          <template v-slot:LANE_TRANS_ID="{ row: transaction }">
            {{ transaction.LANE_TRANS_ID }}
          </template>
          <template v-slot:LANE_ID="{ row: transaction }">
            {{ transaction.LANE_ID }}
          </template>
          <template v-slot:VEH_PLATE="{ row: transaction }">
            {{ transaction.VEH_PLATE }}
          </template>
          <template v-slot:PASSAGE_TIME="{ row: transaction }">
            {{
              transaction.PASSAGE_TIME
            }}
          </template>
          <template v-slot:VEH_CLASS_DESCRIPTION="{ row: transaction }">
            {{ transaction.VEH_CLASS_DESCRIPTION }}
          </template>
          <template v-slot:PAY_DESCRIPTION="{ row: transaction }">
            {{ transaction.PAY_DESCRIPTION }}
          </template>
          <template v-slot:RE_STATUS="{ row: transaction }">
            <span v-if="transaction.RE_STATUS === true" class="badge badge-light-success">Validate</span>
            <span v-else class="badge badge-light-warning">Non Validate</span>
          </template>
          <template v-slot:action="{ row: transaction }">
            <a class="btn btn-sm btn-light-primary mx-2" @click="TransactionDetails(transaction.LANE_TRANS_ID)">View
              Details
            </a>
            <!--begin::Menu-->
            <!--end::Menu-->
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

<script>
import { defineComponent } from "vue";
import TransactionDetails from "@/components/transaction-validate/DetailsTransaction.vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { useTransactionStore } from "../../stores/transaction.ts"
const TransactionStore = useTransactionStore();

export default defineComponent({
  name: "kt-widget-11",
  components: {
    TransactionDetails,
    Datatable,
  },
  data() {
    return {
      transactions: [],
      page: 1,
      pageCount: null,
      totalTransCount: null,
      payload: null,
      fields: [
        {
          columnName: "Txn Id",
          columnLabel: "LANE_TRANS_ID",
          sortEnabled: true,
        },
        {
          columnName: "Lane Id",
          columnLabel: "LANE_ID",
          sortEnabled: true,
        },
        {
          columnName: "Vehicle No",
          columnLabel: "VEH_PLATE",
          sortEnabled: true,
        },
        {
          columnName: "Passage Time",
          columnLabel: "PASSAGE_TIME",
          sortEnabled: true,
        },
        {
          columnName: "Vehicle Class",
          columnLabel: "VEH_CLASS_DESCRIPTION",
          sortEnabled: true,
        },
        {
          columnName: "Payment",
          columnLabel: "PAY_DESCRIPTION",
          sortEnabled: true,
        },
        {
          columnName: "RE Status",
          columnLabel: "RE_STATUS",
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
      return TransactionStore.getFiltertransaction;
    },
    getpayload() {
      return TransactionStore.getpayload;
    },
  },

  watch: {
    getFiltertransaction: {
      handler(newVal, oldVal) {
        // React to changes in getFiltertransaction
        this.payload = this.getpayload;
        this.totalTransCount = newVal.totalCount;
        this.pageCount = newVal.totalPages;
        this.transactions = newVal.transactions;
      },
      deep: true, // Enable deep watching if necessary
    },
  },
  methods: {
    TransactionDetails(id) {
      this.$router.push(`/transactions/${id}`);
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
      await TransactionStore.setFiltertransactionData(payload, page)
    }
  },
  mounted() {
    if (!this.getFiltertransaction) {
      this.fetchTransactions();
    }
    this.payload = this.getpayload;
    this.totalTransCount = this.getFiltertransaction.totalCount;
    this.pageCount = this.getFiltertransaction.totalPages;
    this.transactions = this.getFiltertransaction.transactions;
  }
});
</script>