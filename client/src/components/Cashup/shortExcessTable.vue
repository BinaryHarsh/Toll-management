<template>
    <div class="card">
        <div class="card-body">
            <Datatable :data="transactions" :header="fields" :enable-items-per-page-dropdown="true"
                :checkbox-enabled="false">
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
                <template v-slot:short="{ row: transaction }">
                    {{ transaction.short }}
                </template>
                <template v-slot:Excess="{ row: transaction }">
                    {{ transaction.Excess }}
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
                    columnName: "short",
                    columnLabel: "short",
                    sortEnabled: true,
                },
                {
                    columnName: "Excess",
                    columnLabel: "Excess",
                },
            ],
        };
    }
});
</script>
{
    "shift": "Morning",
    "tcName": "aasha4613",
    "cashup_amount": 2904,
    "created_at": "2023-11-17T16:11:15.000Z",
    "cashup_method": "collectorCashup",
    "Excess": 24
},