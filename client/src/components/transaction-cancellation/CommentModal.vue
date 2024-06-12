<template>
  <div class="modal fade" id="kt_modal_comment" ref="addDeviceModalRef" tabindex="-1" aria-hidden="true"
    data-bs-backdrop="static" data-bs-keyboard="false">
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content text-muted mt-1 fw-bold fs-6">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_device_header">
          <!--begin::Modal title-->
          <h3>Cancel Transaction</h3>
          <!--end::Modal title-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form @submit.prevent="submit()" :rules="rules" :model="formData" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_device_scroll" data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_vsds" data-kt-scroll-wrappers="#kt_modal_add_device_scroll"
              data-kt-scroll-offset="300px">
              <div class="row">
                <div class="col-md-6">
                  <!--begin::Label-->

                  <label class="required fw-semobold">Comment </label>

                  <!--end::Label-->
                </div>

                <!--begin::Input-->

                <div class="col-md-6">
                  <textarea class="form-control" aria-label="With textarea" v-model="formData.comment"></textarea>

                  <!--end::Input-->
                </div>

                <!--end::row-->
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <div class="text-center mb-4">
            <button type="reset" data-bs-dismiss="modal" id="kt_modal_new_target_cancel" class="btn btn-light me-3">
              Cancel
            </button>

            <button :data-kt-indicator="loading ? 'on' : null" class="btn btn-lg btn-primary" type="submit">
              <span v-if="!loading" class="indicator-label">
                Cancell Payment
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
            </button>
          </div>
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, watch } from "vue";
import { hideModal } from "@/core/helpers/dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { API_ROUTES, BASE_URL } from "@/constants/Config";
interface NewAddressData {
  comment: string;
}

export default defineComponent({
  name: "add-device-modal",
  components: {},
  props: {
    data: String,
    userData: String,
  },
  setup(props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const addDeviceModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const formData = ref<NewAddressData>({
      comment: "",
    });
    const transactionId = ref(props.data);
    const userId = ref(props.userData);
    // watch(() => {
    //   transactionId.value = props.data;
    //   userId.value = props.userData;
    // });
    const rules = ref({
      comment: [
        {
          required: true,
          message: "Please write comment",
          trigger: "change",
        },
      ],
    });

    const submit = () => {
      if (!formRef.value) {
        return;
      }

      formRef.value.validate(async (valid: boolean) => {
        if (valid) {
          loading.value = true;

          try {
            const data = await axios.put(
              `${BASE_URL}${API_ROUTES.TRANSACTION_VALIDATE.CANCEL_TRANSACTION}`,
              {
                loginUser: userId.value,
                comment: formData.value.comment,
                transactionId: transactionId.value,
              }
            );

            loading.value = false;
            emit("loadLane");

            formData.value.comment = "";

            Swal.fire({
              title: "Cancel Transaction!",
              icon: "success",
              showCancelButton: false,
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              hideModal(addDeviceModalRef.value);
            });
          } catch (e: any) {
            Swal.fire({
              text: e.response.data.message as string,
              icon: "error",
              showCancelButton: false,
              showConfirmButton: false,
              timer: 3000,
            });
            loading.value = false;
          }
        }
      });
    };

    return {
      formData,
      submit,
      formRef,
      transactionId,
      rules,
      loading,
      addDeviceModalRef,
      getAssetPath,
    };
  },
});
</script>
