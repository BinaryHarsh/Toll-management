<template>
    <div class="card">
        <div class="card-body">
            <Datatable :data="transactions" :header="fields" :enable-items-per-page-dropdown="true"
                :checkbox-enabled="false">
                <template v-slot:id="{ row: transaction }">
                    {{ transaction.id }}
                </template>
                <template v-slot:shift="{ row: transaction }">
                    {{ transaction.shift }}
                </template>
                <template v-slot:created_at="{ row: transaction }">
                    {{ transaction.created_at }}
                </template>
                <template v-slot:tcName="{ row: transaction }">
                    {{
                        transaction.tcName
                    }}
                </template>
                <template v-slot:cashup_amount="{ row: transaction }">
                    {{ transaction.cashup_amount }}
                </template>
                <template v-slot:systemAmount="{ row: transaction }">
                    {{ transaction.systemAmount }}
                </template>
                <template v-slot:difference="{ row: transaction }">
                    {{ transaction.difference }}
                </template>
                <template v-slot:remark="{ row: transaction }">
                    {{ transaction.remark }}
                </template>
            </Datatable>
        </div>
        <!--end::Table container-->
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
            count: this.transactions.length,
            fields: [
                {
                    columnName: "CashUp Id",
                    columnLabel: "id",
                    sortEnabled: true,
                },
                {
                    columnName: "shift",
                    columnLabel: "shift",
                    sortEnabled: true,
                },
                {
                    columnName: "cashUp Date",
                    columnLabel: "created_at",
                    sortEnabled: true,
                },
                {
                    columnName: "tc name",
                    columnLabel: "tcName",
                    sortEnabled: true,
                },
                {
                    columnName: "cashup amount",
                    columnLabel: "cashup_amount",
                    sortEnabled: true,
                },
                {
                    columnName: "system amount",
                    columnLabel: "systemAmount",
                    sortEnabled: true,
                },
                {
                    columnName: "difference",
                    columnLabel: "difference",
                    sortEnabled: true,
                },
                {
                    columnName: "remark",
                    columnLabel: "remark",
                },
            ],
        };
    }
});
</script>