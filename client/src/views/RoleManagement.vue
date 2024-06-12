<template>
  <div :class="`page-title d-flex flex-stack flex-wrap mb-5`">
    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
      Role Management
    </h1>
    <button type="button" class="btn btn-sm btn-primary align-items-end create" @click="showCreateRoleModal">
      <KTIcon icon-name="plus" icon-class="fs-2" />Create New Role
    </button>
  </div>

  <div class="card">
    <div class="card-body pt-0">
      <Datatable :data="roles" :header="fields" :enable-items-per-page-dropdown="true" :checkbox-enabled="false"
        checkbox-label="id">
        <template v-slot:id="{ row: role }">
          {{ role.id }}
        </template>
        <template v-slot:role_name="{ row: role }">
          {{ role.role_name }}
        </template>
        <template v-slot:created_at="{ row: role }">
          {{
            new Date(role.created_at).toLocaleString("en-GB", {
              timeZone: "UTC",
            })
          }}
        </template>
        <template v-slot:updated_at="{ row: role }">
          {{
            new Date(role.updated_at).toLocaleString("en-GB", {
              timeZone: "UTC",
            })
          }}
        </template>
        <template v-slot:action="{ row: role }">
          <a class="btn btn-sm btn-primary mx-2" v-show="role.id != 1" @click="showPermissionsModal(role.modules)">
            <i class="bi bi-eye"></i> View Permissions
          </a>

          <a class="btn btn-sm btn-info mx-2" v-show="role.id != 1" @click="showEditRoleModal(role)"><i
              class="bi bi-pen"></i> Edit
          </a>

          <a class="btn btn-sm btn-danger mx-2" @click="deleteRole(role.id)" v-show="role.id != 1"><i
              class="bi bi-trash"></i> Delete
          </a>
        </template>
      </Datatable>
    </div>
  </div>
  <CreateRoleModal @submit="submitCreateRole"></CreateRoleModal>
  <ViewDetailModal :rolePermissions="rolePermissions"></ViewDetailModal>
  <EditRoleModal :selectedRole="selectedRole" @submit="submitEditRole"></EditRoleModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ViewDetailModal from "@/components/role-management/ViewPermissions.vue";
import CreateRoleModal from "@/components/role-management/CreateRoleModal.vue";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
import axios from "axios";
import EditRoleModal from "@/components/role-management/EditRoleModal.vue";
import swal from "sweetalert2";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "kt-widget-11",
  components: {
    ViewDetailModal,
    CreateRoleModal,
    EditRoleModal,
    Datatable,
  },
  data() {
    return {
      roles: [],
      selectedRole: {},
      rolePermissions: [],
      fields: [
        {
          columnName: "Role ID",
          columnLabel: "id",
          sortEnabled: true,
          columnWidth: 105,
        },
        {
          columnName: "Role Name",
          columnLabel: "role_name",
          columnWidth: 175,
        },
        {
          columnName: "Created At",
          columnLabel: "created_at",
          columnWidth: 175,
        },
        {
          columnName: "Updated At",
          columnLabel: "updated_at",
          columnWidth: 175,
        },
        {
          columnName: "Action",
          columnLabel: "action",
          columnWidth: 175,
        },
      ],
    };
  },
  async mounted() {
    await this.getRoles();
  },
  methods: {
    async showCreateRoleModal() {
      (window as any).$("#kt_modal_create_role").modal("show");
    },

    async showEditRoleModal(role) {
      this.selectedRole = role;
      (window as any).$("#kt_modal_edit_role").modal("show");
    },

    async showPermissionsModal(modules) {
      this.rolePermissions = modules;
      (window as any).$("#kt_modal_view_permission").modal("show");
    },

    async submitCreateRole(body) {
      try {
        const payload = JSON.parse(body);
        await axios.post(
          `${BASE_URL}${API_ROUTES.ROLES.CREATE_ROLE}`,
          payload
        );

        await this.getRoles();
        (window as any).$("#kt_modal_create_role").modal("hide");

        Swal.fire({
          title: 'Role Created!',
          text: 'Role created successfully',
          icon: 'success',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        })
      } catch (e: any) {
        Swal.fire({
          title: 'Oops! Something went wrong',
          text: (e.response) ? e.response.data.message : e,
          icon: 'error',
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
        })
      }
    },

    async submitEditRole(body) {
      try {
        const payload = JSON.parse(body);
        await axios.patch(
          `${BASE_URL}${API_ROUTES.ROLES.UPDATE_ROLES}${payload.id}`,
          payload
        );

        await this.getRoles();
        (window as any).$("#kt_modal_edit_role").modal("hide");

        Swal.fire({
          title: 'Role Updated!',
          text: 'Role updated successfully',
          icon: 'success',
          timer: 2000,
          showCancelButton: false,
          showConfirmButton: false,
        })
      } catch (e: any) {
        Swal.fire({
          title: 'Oops! Something went wrong',
          text: (e.response) ? e.response.data.message : e,
          icon: 'error',
          timer: 3000,
          showCancelButton: false,
          showConfirmButton: false,
        })
      }
    },

    deleteRole(roleId) {
      swal
        .fire({
          title: "Are you sure?",
          text: "",
          confirmButtonText: "Yes",
          denyButtonText: "No",
          showDenyButton: true,
          icon: "warning",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await axios.delete(
                `${BASE_URL}${API_ROUTES.ROLES.DELETE_ROLE}${roleId}`
              );

              Swal.fire({
                title: 'Role Deleted!',
                text: 'Role deleted successfully',
                icon: 'success',
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false,
              })

              await this.getRoles();
            } catch (e: any) {
              swal.fire({
                title: (e.response) ? e.response.data.message : e,
                icon: "error",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 3000,
              });
            }
          }
        });
    },

    async getRoles() {
      try {
        const res = await axios.get(`${BASE_URL}${API_ROUTES.ROLES.GET_ROLES}`);
        this.roles = res.data.data.allroles;
      } catch (e: any) {
        swal.fire({
          text: (e.response) ? e.response.data.message : e,
          icon: "error",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  }
});
</script>
