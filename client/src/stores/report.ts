import { API_ROUTES, BASE_URL } from "@/constants/Config";
import { defineStore } from 'pinia';
import axios from "axios";
export const useadminStore = defineStore({
  id: 'admintransaction',
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
        `${BASE_URL}${API_ROUTES.admin_REPORT.FILTER_REPORT}/${page}`,
        payload
      );
      this.Filtertransaction = res.data;
      console.log(this.Filtertransaction)
    },
  }
});