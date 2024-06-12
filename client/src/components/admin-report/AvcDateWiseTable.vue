<template>
    <div class="row" :class="`page-title mb-3`">
        <div class="card">
            <div class="card-body">
                <Datatable :data="transactions" :header="fields" :enable-items-per-page-dropdown="true"
                    :checkbox-enabled="false">
                    <template v-slot:Day="{ row: transaction }">
                        {{ transaction.Day }}
                    </template>
                    <template v-slot:LANE01="{ row: transaction }">
                        {{ transaction.LANE01 }}
                    </template>
                    <template v-slot:LANE02="{ row: transaction }">
                        {{ transaction.LANE02 }}
                    </template>
                    <template v-slot:LANE03="{ row: transaction }">
                        {{ transaction.LANE03 }}
                    </template>
                    <template v-slot:LANE04="{ row: transaction }">
                        {{ transaction.LANE04 }}
                    </template>
                    <template v-slot:LANE05="{ row: transaction }">
                        {{ transaction.LANE05 }}
                    </template>
                    <template v-slot:LANE06="{ row: transaction }">
                        {{ transaction.LANE06 }}
                    </template>
                    <template v-slot:LANE07="{ row: transaction }">
                        {{ transaction.LANE07 }}
                    </template>
                    <template v-slot:LANE08="{ row: transaction }">
                        {{ transaction.LANE08 }}
                    </template>
                    <template v-slot:LANE09="{ row: transaction }">
                        {{ transaction.LANE09 }}
                    </template>
                    <template v-slot:LANE10="{ row: transaction }">
                        {{ transaction.LANE10 }}
                    </template>
                </Datatable>
                <!--end::Table container-->
            </div>
            <!--begin::Body-->
        </div>
        <!--end::Tables Widget 11-->
    </div>
</template>
  
<script>
import { defineComponent, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
export default defineComponent({
    name: "kt-widget-11",
    components: {
        Datatable
    },
    props: {
        widgetClasses: String,
        transactions: Array
    },

    data() {
        return {
            fields: [
                {
                    columnName: "Date",
                    columnLabel: "Day",
                    sortEnabled: true,
                },
                {
                    columnName: "LANE01",
                    columnLabel: "LANE01",
                    sortEnabled: true,
                },
                {
                    columnName: "LANE02",
                    columnLabel: "LANE02",
                    sortEnabled: true,
                },
                {
                    columnName: "LANE03",
                    columnLabel: "LANE03",
                    sortEnabled: true,
                },
                {
                    columnName: "LANE04",
                    columnLabel: "LANE04",
                    sortEnabled: true,
                },
                {
                    columnName: "LANE05",
                    columnLabel: "LANE05",
                    sortEnabled: true,
                },
                {
                    columnName: "LANE06",
                    columnLabel: "LANE06",
                    sortEnabled: true,
                },
                {
                    columnName: "LANE07",
                    columnLabel: "LANE07",
                    sortEnabled: true,
                },
                {
                    columnName: "LANE08",
                    columnLabel: "LANE08",
                    sortEnabled: true,
                },
                {
                    columnName: "LANE09",
                    columnLabel: "LANE09",
                    sortEnabled: true,
                },
                {
                    columnName: "LANE10",
                    columnLabel: "LANE10",
                    sortEnabled: true,
                }
            ],
        };
    },
});
</script>
  