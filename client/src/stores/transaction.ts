import { API_ROUTES, BASE_URL } from "@/constants/Config";
import { defineStore } from 'pinia';
import axios from "axios";

export const useTransactionStore = defineStore({
  id: "transaction",
  state: () => ({
    Filtertransaction: {},
    payload: {}
  }),
  getters: {
    getFiltertransaction(state) {
      return state.Filtertransaction;
    },
    getpayload(state) {
      return state.payload
    }
  },
  actions: {
    async setFiltertransactionData(payload, page) {
      this.payload = payload
      const res = await axios.post(
        `${BASE_URL}${API_ROUTES.TRANSACTION_VALIDATE.GET_TRANSACTION}?page=${page}`,
        payload
      );
      this.Filtertransaction = res.data.data;
    },
  }
});
