<template>
  <div>
    <el-form :model="formData" ref="formRef">
      <div class="row g-5 g-8">
        <div :class="widgetClasses" class="card">
          <div class="col-12 text-muted mt-1 fw-bold fs-6">
            <div class="row">
              <div class="col-6 mt-4 ms-2">
                <h5>Lane Details</h5>
              </div>
              <div class="col-6 text-end">
                <button
                  id="toggle-filter"
                  class="edit btn btn-primary btn-sm lh-1"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  data-bs-dismiss="click"
                  data-bs-trigger="hover"
                  @click="updateLane(data.LANE_ID)"
                >
                  <i class="bi bi-check-circle"></i>Update
                </button>
              </div>
            </div>
            <hr style="border-top: 1px solid rgb(67, 67, 67)" />
            <div class="row">
              <div class="col-6">
                <div class="row m-4">
                  <div class="col-6">
                    <!--begin::Label-->
                    <label class="fw-semobold">Lane Name</label>
                    <!--end::Label-->
                  </div>

                  <!--begin::Input-->
                  <div class="col-6">
                    <input
                      type="text"
                      class="form-control form-control form-control-sm"
                      placeholder=""
                      name="laneName"
                      v-model="data.LANE_NAME"
                    />
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::row-->
                <div class="row m-4">
                  <div class="col-6">
                    <!--begin::Label-->
                    <label class="fw-semobold">Lane Type</label>
                    <!--end::Label-->
                  </div>

                  <!--begin::Input-->
                  <div class="col-6">
                    <input
                      type="text"
                      class="form-control form-control form-control-sm"
                      placeholder=""
                      name="laneType"
                      v-model="data.LANE_TYPE"
                    />
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::row-->
                <div class="row m-4">
                  <div class="col-6">
                    <!--begin::Label-->
                    <label class="fw-semobold">Lane IP</label>
                    <!--end::Label-->
                  </div>

                  <!--begin::Input-->
                  <div class="col-6">
                    <input
                      type="text"
                      class="form-control form-control form-control-sm"
                      placeholder=""
                      name="laneIP"
                      v-model="data.LANE_IP"
                    />
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::row-->
                <div class="row m-4">
                  <div class="col-6">
                    <!--begin::Label-->
                    <label class="fw-semobold">Lane Direction</label>
                    <!--end::Label-->
                  </div>

                  <!--begin::Input-->
                  <div class="col-6">
                    <input
                      type="text"
                      class="form-control form-control form-control-sm"
                      placeholder=""
                      name="laneDir"
                      v-model="data.LANE_DIR"
                    />
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::row-->
                <div class="row m-4">
                  <div class="col-6">
                    <!--begin::Label-->
                    <label class="fw-semobold">Lane Status</label>
                    <!--end::Label-->
                  </div>

                  <!--begin::Input-->
                  <div class="col-6">
                    <input
                      type="text"
                      class="form-control form-control form-control-sm"
                      placeholder=""
                      name="laneStatus"
                      v-model="data.STATUS"
                    />
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::row-->
              </div>
              <div class="col-6">
                <div class="row m-4">
                  <div class="col-6">
                    <!--begin::Label-->
                    <label class="fw-semobold">Lane Id</label>
                    <!--end::Label-->
                  </div>

                  <!--begin::Input-->
                  <div class="col-6">
                    <input
                      type="text"
                      class="form-control form-control form-control-sm"
                      placeholder=""
                      name="laneId"
                      v-model="data.LANE_ID"
                      disabled
                    />
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::row-->
                <div class="row m-4">
                  <div class="col-6">
                    <!--begin::Label-->
                    <label class="fw-semobold">Plaza Code</label>
                    <!--end::Label-->
                  </div>

                  <div class="col-6 text-center">
                    <input
                      type="text"
                      class="form-control form-control form-control-sm"
                      placeholder=""
                      name="plazaCode"
                      v-model="data.PLAZA_CODE"
                      disabled
                    />
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::row-->
                <div class="row m-4">
                  <div class="col-6">
                    <!--begin::Label-->
                    <label class="fw-semobold">Created At</label>
                    <!--end::Label-->
                  </div>

                  <!--begin::Input-->
                  <div class="col-6">
                    <input
                      type="text"
                      class="form-control form-control form-control-sm"
                      placeholder=""
                      name="createdAt"
                      v-model="createdAt"
                      disabled
                    />
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::row-->
                <div class="row m-4">
                  <div class="col-6">
                    <!--begin::Label-->
                    <label class="fw-semobold">Updated At</label>
                    <!--end::Label-->
                  </div>

                  <!--begin::Input-->
                  <div class="col-6 text-center">
                    <input
                      type="text"
                      class="form-control form-control form-control-sm"
                      placeholder=""
                      name="updatedAt"
                      v-model="updatedAt"
                      disabled
                    />
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::row-->
                <div class="row m-4">
                  <div class="col-6">
                    <!--begin::Label-->
                    <label class="fw-semobold">User Id</label>
                    <!--end::Label-->
                  </div>

                  <!--begin::Input-->
                  <div class="col-6 text-center">
                    <input
                      type="text"
                      class="form-control form-control form-control-sm"
                      placeholder=""
                      name="updateBy"
                      v-model="data.UPDATE_BY"
                      disabled
                    />
                    <!--end::Input-->
                  </div>
                </div>
                <!--end::row-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>

    <div class="row mt-6 mb-4">
      <div :class="widgetClasses" class="card">
        <div class="row">
          <div class="col-6 mt-4 ms-2">
            <h5>Device Details</h5>
          </div>
          <div class="col-6 text-end">
            <button
              id="toggle-filter"
              type="button"
              class="btn btn-sm btn-primary align-items-end create"
              data-bs-toggle="modal"
              data-bs-target="#kt_modal_create_device"
              @click="createDevice(data.LANE_ID)"
            >
              <i class="bi bi-plus fs-4"></i>Create New Device
            </button>
          </div>
        </div>
        <hr style="border-top: 1px solid rgb(67, 67, 67)" />
        <div class="card-body pt-0">
          <Datatable
            :data="allDevice"
            :header="fields"
            :enable-items-per-page-dropdown="true"
            :checkbox-enabled="false"
            checkbox-label="id"
          >
            <template v-slot:id="{ row: allDevice }">
              {{ allDevice.ID }}
            </template>
            <template v-slot:device_name="{ row: allDevice }">
              {{ allDevice.DEVICE_NAME }}
            </template>
            <template v-slot:device_ip="{ row: allDevice }">
              {{ allDevice.DEVICE_IP }}
            </template>
            <template v-slot:device_port="{ row: allDevice }">
              {{ allDevice.PORT }}
            </template>
            <template v-slot:action="{ row: allDevice }">
              <a
                class="btn btn-sm btn-info"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_edit_device"
                @click="editDevice(allDevice)"
                ><i class="bi bi-pen"></i>
              </a>

              <a
                class="btn btn-sm btn-danger mx-2"
                @click="deleteDevice(allDevice.ID)"
                ><i class="bi bi-trash"></i>
              </a>
              <!--begin::Menu-->
              <!--end::Menu-->
            </template>
          </Datatable>
        </div>
      </div>
    </div>
  </div>
  <EditDevice :deviceData="selectedDevice"></EditDevice>
  <CreateDevice :laneID="id" @submit="handleEmit"></CreateDevice>
</template>
<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
import swal from "sweetalert2";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import EditDevice from "@/components/lanes/EditDeviceModal.vue";
import CreateDevice from "@/components/lanes/CreateDeviceModal.vue";

export default defineComponent({
  name: "main-dashboard",
  components: { Datatable, EditDevice, CreateDevice },
  data() {
    return {
      isEdit: true,
      formData: [],
      data: {},
      selectedDevice: {},
      allDevice: [],
      id: "",
      createdAt: "",
      updatedAt: "",
      fields: [
        {
          columnName: "Id",
          columnLabel: "id",
          sortEnabled: true,
          columnWidth: 105,
        },
        {
          columnName: "Device Name",
          columnLabel: "device_name",
          sortEnabled: true,
          columnWidth: 175,
        },
        {
          columnName: "Device IP",
          columnLabel: "device_ip",
          sortEnabled: true,
          columnWidth: 175,
        },
        {
          columnName: "Device Port",
          columnLabel: "device_port",
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
    allData() {
      for (let i = 0; i < this.formData.length; i++) {
        this.data = this.formData[i];
      }

      for (let j = 0; j < this.data.ALL_DEVICE.length; j++) {
        this.allDevice.push(this.data.ALL_DEVICE[j]);
      }

      this.createdAt = new Date(this.data.CREATED_AT).toLocaleString("en-GB", {
        timeZone: "UTC",
      });
      this.updatedAt = new Date(this.data.UPDATED_AT).toLocaleString("en-GB", {
        timeZone: "UTC",
      });
    },
    async updateLane(item) {
      event.preventDefault();
      const id = item;
      var payload = {
        LANE_NAME: this.data.LANE_NAME,
        LANE_TYPE: this.data.LANE_TYPE,
        LANE_IP: this.data.LANE_IP,
        LANE_DIR: this.data.LANE_DIR,
        UPDATE_BY: this.data.UPDATE_BY,
      };
      const body = { STATUS: this.data.STATUS };
      swal
        .fire({
          title: "Are you sure?",
          text: "Want to update",
          confirmButtonText: "Yes",
          denyButtonText: "No",
          showDenyButton: true,
          icon: "warning",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await axios.put(
                `${BASE_URL}${API_ROUTES.LANE.UPDATE_LANE}?laneid=${id}`,
                payload
              );
              await axios.put(
                `${BASE_URL}${API_ROUTES.LANE.UPDATE_LANE_STATUS}?laneid=${id}`,
                body
              );

              swal.fire({
                title: "Updated Successful",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1000,
              });
              await this.allData();
            } catch (e) {
              swal.fire({
                title: e.response.data.message,
                icon: "error",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          }
        });
    },
    createDevice(item) {
      this.id = item;
    },
    async handleEmit(item) {
      const body = JSON.parse(item);
      body.LANE_ID = this.id;

      const res = await axios.post(
        `${BASE_URL}${API_ROUTES.DEVICE.CREATE_DEVICE}`,
        body
      );
    },
    async deleteDevice(item) {
      const id = item;
      swal
        .fire({
          title: "Are you sure?",
          text: "Want to delete",
          confirmButtonText: "Yes",
          denyButtonText: "No",
          showDenyButton: true,
          icon: "warning",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await axios.delete(
                `${BASE_URL}${API_ROUTES.DEVICE.DELETE_DEVICE}?id=${id}`
              );

              swal.fire({
                title: "Deleted Successful",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1000,
              });
            } catch (e) {
              swal.fire({
                title: e.response.data.message,
                icon: "error",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000,
              });
            }
          }
        });
    },

    editDevice(item) {
      this.selectedDevice = item;
      item.CREATED_AT = new Date(item.CREATED_AT).toLocaleString("en-GB", {
        timeZone: "UTC",
      });
      item.UPDATED_AT = new Date(item.UPDATED_AT).toLocaleString("en-GB", {
        timeZone: "UTC",
      });
    },
  },

  async mounted() {
    const route = useRoute();
    const id = route.query.laneid;

    const res = await axios.get(
      `${BASE_URL}${API_ROUTES.LANE.GET_LANE_BY_ID}?laneid=${id}`
    );
    this.formData = res.data.data;
    return this.allData();
    return this.handleEmit();
  },
});
</script>
<style scoped>
.edit {
  position: absolute;
  top: 15px;
  right: 30px;
}

.create {
  position: absolute;
  top: 10px;
  right: 30px;
}
</style>
