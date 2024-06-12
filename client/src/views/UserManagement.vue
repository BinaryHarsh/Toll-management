<template>
  <div :class="`page-title d-flex flex-stack flex-wrap mb-5`">
    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center">
      User Management
    </h1>
    <button type="button" class="btn btn-sm btn-primary align-items-end" data-bs-toggle="modal"
      data-bs-target="#kt_modal_create_user">
      <KTIcon icon-name="plus" icon-class="fs-2" />Create New User
    </button>
  </div>
  <div class="card mt-4">
    <div class="card-body pt-0">
      <Datatable :data="users" :header="fields" :enable-items-per-page-dropdown="false" :checkbox-enabled="false"
        checkbox-label="id">
        <template v-slot:id="{ row: user }">
          {{ user.id }}
        </template>
        <template v-slot:first_name="{ row: user }">
          {{ user.first_name }}
        </template>
        <template v-slot:last_name="{ row: user }">
          {{ user.last_name }}
        </template>
        <template v-slot:mobile_number="{ row: user }">
          {{ user.mobile_number }}
        </template>
        <template v-slot:username="{ row: user }">
          {{ user.admin_login?.username }}
        </template>
        <template v-slot:role_id="{ row: user }">
          {{ getRoleName(user.role_id) }}
        </template>
        <template v-slot:is_active="{ row: user }">
          <span :class="`badge fs-7 fw-bold ${getUserStatusStyle(user.admin_login?.is_active)}`">{{
            getUserStatusText(user.admin_login?.is_active) }}</span>
        </template>
        <template v-slot:action="{ row: user }">
          <a v-show="user.role_id !== 1 && currentUser.id != user.id" class="btn btn-sm btn-info"
            @click="showEditUserModal(user)"><i class="bi bi-pen"></i>
            Edit
          </a>

          <a v-show="user.role_id !== 1 && currentUser.id != user.id" class="btn btn-sm btn-danger mx-2"
            @click="deleteUser(user.id)"><i class="bi bi-trash"></i> Delete
          </a>
        </template>
      </Datatable>
    </div>
  </div>
  <CreateUserModal @submit="submitCreateUser"></CreateUserModal>
  <EditUserModal :userData="selectedUser" @submit="submitEditUser">
  </EditUserModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
import EditUserModal from "@/components/user-management/EditUserModal.vue";
import CreateUserModal from "@/components/user-management/CreateUserModal.vue";
import Swal from "sweetalert2";
import { useMasterData } from "@/stores/common";
import { useAuthStore } from "@/stores/auth";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";

export default defineComponent({
  name: "user-management",
  components: {
    EditUserModal,
    CreateUserModal,
    Datatable
  },
  data() {
    return {
      masters: useMasterData() as any,
      authStore: useAuthStore() as any,
      users: [],
      selectedUser: {},
      fields: [
        {
          columnName: "Id",
          columnLabel: "id",
          sortEnabled: true,
        },
        {
          columnName: "First Name",
          columnLabel: "first_name",
          sortEnabled: true,
        },
        {
          columnName: "Last Name",
          columnLabel: "last_name",
          sortEnabled: true,
        },
        {
          columnName: "Mobile Number",
          columnLabel: "mobile_number",
          sortEnabled: false,
        },
        {
          columnName: "Username",
          columnLabel: "username",
          sortEnabled: true,
        },
        {
          columnName: "Role",
          columnLabel: "role_id",
          sortEnabled: true,
        },
        {
          columnName: "Status",
          columnLabel: "is_active",
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
    roleMaster() {
      return this.masters.getMasters.roleMaster
    },
    shiftMaster() {
      return this.masters.getMasters.shiftMaster
    },
    currentUser() {
      return this.authStore.user.info
    }
  },

  async mounted() {
    await this.getAllUsers();
  },

  methods: {

    async showEditUserModal(item) {
      this.selectedUser = item;
      (window as any).$("#kt_modal_edit_user").modal("show");
    },

    async submitCreateUser(value) {
      try {
        const payload = JSON.parse(value);
        await axios.post(`${BASE_URL}${API_ROUTES.USERS.CREATE_USER}`, {
          ...payload,
          role_id: parseInt(payload.role_id),
          shift_id: parseInt(payload.shift_id),
        });

        (window as any).$("#kt_modal_create_user").modal("hide");

        Swal.fire({
          title: `User Created!`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })

        this.getAllUsers()
      } catch (e: any) {
        Swal.fire({
          title: `Ooops! Something went wrong`,
          text: e.response.data.message,
          icon: 'error',
          timer: 3000,
          showConfirmButton: false
        })
      }
    },

    async submitEditUser(body) {
      try {
        const payload = JSON.parse(body);
        await axios.patch(
          `${BASE_URL}${API_ROUTES.USERS.UPDATE_USER}${payload.id}`,
          payload
        );
        (window as any).$("#kt_modal_edit_role").modal("hide");

        Swal.fire({
          title: `User Updated!`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })

        this.getAllUsers()
      } catch (e: any) {
        Swal.fire({
          title: `Ooops! Something went wrong`,
          text: e.response.data.message,
          icon: 'error',
          timer: 3000,
          showConfirmButton: false
        })
      }
    },

    async deleteUser(userId) {

      Swal.fire({
        title: "Are you sure?",
        text: "",
        confirmButtonText: "Yes",
        denyButtonText: "No",
        showDenyButton: true,
        icon: "warning",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(
              `${BASE_URL}${API_ROUTES.USERS.DELETE_USER}${userId}`
            );

            Swal.fire({
              title: `User Deleted!`,
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            })

            this.getAllUsers()
          } catch (e: any) {
            Swal.fire({
              title: e.response.data.message,
              icon: "error",
              showCancelButton: false,
              showConfirmButton: false,
              timer: 3000,
            });
          }
        }
      });
    },

    async getAllUsers() {
      try {
        const res = await axios.get(
          `${BASE_URL}${API_ROUTES.USERS.GET_USERS}`
        );
        this.users = res.data.data.getusers;
      } catch (e: any) {
        Swal.fire({
          title: `Ooops! Something went wrong`,
          text: e.response.data.message,
          icon: 'error',
          timer: 3000,
          showConfirmButton: false
        })
      }
    },

    getRoleName(roleId) {
      return this.roleMaster.find(r => r.id == roleId).role_name;
    },

    getUserStatusStyle(status) {
      switch (status) {
        case true:
          return 'badge-light-success'

        default:
          return 'badge-light-danger'
      }
    },

    getUserStatusText(status) {
      switch (status) {
        case true:
          return 'Active'

        default:
          return 'Suspended'
      }
    }
  },
});
</script>