import { API_ROUTES, BASE_URL } from '@/constants/Config';
import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"

export const useRoleStore = defineStore("role", {
  state: () => ({
    roles: [],
  }),
  getters: {
    getRoles(state) {
      return state.roles;
    }
  },
  actions: {
    async fetchRoles() {
      const res = await axios.get(`${BASE_URL}${API_ROUTES.ROLES.GET_ROLES}`);
      this.roles = res.data.data.allroles;
    }
  },
});

