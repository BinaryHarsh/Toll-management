<template>
  <div :class="`page-title d-flex flex-stack flex-wrap mb-5`">
    <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
      Shift Management
    </h1>
    <button type="button" class="btn btn-sm btn-primary align-items-end create" data-bs-toggle="modal"
      data-bs-target="#kt_modal_create_shift">
      <KTIcon icon-name="plus" icon-class="fs-2" />Create New Shift
    </button>
  </div>

  <div :class="widgetClasses" class="card">
    <div class="card-body pt-0">
      <Datatable :data="shifts" :header="fields" :enable-items-per-page-dropdown="true" :checkbox-enabled="false"
        checkbox-label="id">
        <template v-slot:id="{ row: shift }">
          {{ shift.id }}
        </template>
        <template v-slot:shift_name="{ row: shift }">
          {{ shift.shift_name }}
        </template>
        <template v-slot:shift_start_time="{ row: shift }">
          {{ shift.shift_start_time }}
        </template>
        <template v-slot:shift_end_time="{ row: shift }">
          {{ shift.shift_end_time }}
        </template>
        <template v-slot:action="{ row: shift }">
          <a class="btn btn-sm btn-info" data-bs-toggle="modal" data-bs-target="#kt_modal_modify_package"
            @click="editShift(shift)"><i class="bi bi-pen"></i>
          </a>

          <a class="btn btn-sm btn-danger mx-2" @click="deleteShift(shift.id)"><i class="bi bi-trash"></i>
          </a>
        </template>
      </Datatable>
    </div>
  </div>
  <CreateShiftModal @loadShifts="getShifts"></CreateShiftModal>
  <EditShiftModal :shiftData="selectedShift" @loadShifts="getShifts"></EditShiftModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreateShiftModal from "@/components/shift-management/CreateShiftModal.vue";
import EditShiftModal from "@/components/shift-management/EditShiftModal.vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
import swal from "sweetalert2";

export default defineComponent({
  name: "kt-widget-11",
  components: {
    CreateShiftModal,
    EditShiftModal,
    Datatable,
  },
  props: {
    widgetClasses: String,
  },
  data() {
    return {
      shifts: [],
      selectedShift: {},
      fields: [
        {
          columnName: "Id",
          columnLabel: "id",
          sortEnabled: true,
          columnWidth: 105,
        },
        {
          columnName: "Shift Name",
          columnLabel: "shift_name",
          sortEnabled: true,
          columnWidth: 175,
        },
        {
          columnName: "Start Time",
          columnLabel: "shift_start_time",
          sortEnabled: true,
          columnWidth: 175,
        },
        {
          columnName: "End Shift",
          columnLabel: "shift_end_time",
          sortEnabled: true,
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
  methods: {
    editShift(item) {
      this.selectedShift = item;
      (window as any).$("#kt_modal_edit_shift").modal("show");
    },
    async getShifts() {
      try {
        const res = await axios.get(`${BASE_URL}${API_ROUTES.SHIFT.GET_SHIFT}`);
        this.shifts = res.data.data.allShifts;
      } catch (e: any) {
        swal.fire({
          text: e.response.data.message as string,
          icon: "error",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
    async deleteShift(id) {
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
                `${BASE_URL}${API_ROUTES.SHIFT.DELETE_SHIFT}${id}`
              );

              swal.fire({
                title: "Shift Deleted!",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1000,
              });
              await this.getShifts();
            } catch (e: any) {
              swal.fire({
                title: e.response.data.message as string,
                icon: "error",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          }
        });
    },
  },
  async mounted() {
    await this.getShifts();
  },
});
</script>
