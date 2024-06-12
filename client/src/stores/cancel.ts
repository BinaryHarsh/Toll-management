import { API_ROUTES, BASE_URL } from "@/constants/Config";
import { defineStore } from 'pinia';
import axios from "axios";
export const useCancellation = defineStore({
    id: 'Cancellation',
    state: () => ({
        FiltertransactionForCancel: {},
        payload: {},
        LANE_TRANS_ID: null
    }),
    getters: {
        getFiltertransactionForCancel(state) {
            return state.FiltertransactionForCancel;
        },
        getpayload(state) {
            return state.payload
        },
        getLaneTransactionId(state) {
            return state.LANE_TRANS_ID
        }
    },
    actions: {
        async setTransactionForCancelData(payload, page) {
            this.payload = payload
            const res = await axios.post(
                `${BASE_URL}${API_ROUTES.TRANSACTION_VALIDATE.GET_TRANSACTION_FOR_CANCEL}/${page}`,
                payload
            );
            this.FiltertransactionForCancel = res.data.data;
        },
        setLaneTransactionId(payload) {
            this.LANE_TRANS_ID = payload
        }
    }
});