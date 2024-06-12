<template>
    <div class="container">
        <div class="row">
            <div class="col-4">
                <div class="card  border border-2 border-gray-300 border-hover mt-5">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-4">
                                Demonination
                            </div>
                            <div class="col-1">
                                <p>
                                    *
                                </p>
                            </div>
                            <div class="col-4">
                                Quantity
                            </div>
                            <div class="col-3 text-center">
                                Amount
                            </div>
                        </div>
                        <div v-for="(value, index) in denomination" class="row" :key="value.DENOM_NO">
                            <div class="col-4">
                                <p>
                                    {{ value.DENOM_VALUE }}
                                </p>
                            </div>
                            <div class="col-1">
                                <p>
                                    *
                                </p>
                            </div>
                            <div class="col-4">
                                <el-input type="text" @change="quantitChange(index)" v-model="quantity[index]"
                                    name="eventLocation" size="small" placeholder="0" />
                            </div>
                            <div class="col-3 text-center">
                                <el-input type="text"
                                    :value="(quantity[index] * value.DENOM_VALUE) ? (quantity[index] * value.DENOM_VALUE) : 0"
                                    name="eventLocation" size="small" disabled />
                            </div>
                        </div>
                        <hr />
                        <div class="row">
                            <div class="col-7">Sub Total</div>
                            <div class="col-3">{{ subTotal }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card  border border-2 border-gray-300 border-hover mt-5">
                    <div class="card-body">
                        <div class="row mt-2">
                            <div class="col-5">
                                <label>Collector</label>
                            </div>
                            <div class="col-5">
                                <el-select v-model="collecterName" filterable>
                                    <el-option v-for="item in collector" :key="item" :label="item.username"
                                        :value="item.id" />
                                </el-select>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-5">
                                <label>Date</label>
                            </div>
                            <div class="col-5">
                                <el-date-picker v-model="time" type="datetime" name="eventStartDate"
                                    placeholder="Select date" class=" w-100" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-5">
                                <label>Shift</label>
                            </div>
                            <div class="col-5">
                                <el-select v-model="shift">
                                    <el-option key="1" label="Morning" value="Morning" />
                                    <el-option key="2" label="Evening" value="Evening" />
                                    <el-option key="3" label="Night" value="Night" />
                                </el-select>
                            </div>
                        </div>
                        <div class="row mt-6">
                            <div class="col-5">
                                <label>UPI</label>
                            </div>
                            <div class="col-5">
                                <el-input type="text" name="eventLocation" size="small" v-model="upi" placeholder="0" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-5">
                                <label>CARD</label>
                            </div>
                            <div class="col-5">
                                <el-input type="text" name="eventLocation" size="small" v-model="card" placeholder="0" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-5">
                                <label>DD</label>
                            </div>
                            <div class="col-5">
                                <el-input type="text" name="eventLocation" size="small" v-model="dd" placeholder="0" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-5">
                                <label>RTGS</label>
                            </div>
                            <div class="col-5">
                                <el-input type="text" name="eventLocation" size="small" v-model="rtgs" placeholder="0" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-5">
                                <label>WALLET</label>
                            </div>
                            <div class="col-5">
                                <el-input type="text" name="eventLocation" size="small" v-model="wallet" placeholder="0" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-5">
                                <label>CHEQUE</label>
                            </div>
                            <div class="col-5">
                                <el-input type="text" name="eventLocation" size="small" v-model="cheque" placeholder="0" />
                            </div>
                        </div>
                        <br>
                        <hr style="margin-top:18px">
                        <div class="row ">
                            <div class="col-5">
                                <label> Total </label>
                            </div>
                            <div class="col-5">
                                <el-input type="text" name="eventLocation" size="small" v-model="total" disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-4">
                <div class="card  border border-2 border-gray-300 border-hover mt-5">
                    <div class="card-body ">
                        <div class=" row mt-6">
                            <button type="submit" class="btn btn-light-primary mb-3" @click="Calculate">
                                <span class="indicator-label"> Calculate </span>
                            </button>
                            <button type="submit" class="btn btn-light-primary mb-3" @click="submit">
                                <span class="indicator-label"> Submit </span>
                            </button>
                            <button type="submit" class="btn btn-light-danger mb-3" @click="Reset">
                                <span class="indicator-label"> Reset </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { API_ROUTES, BASE_URL } from "@/constants/Config";
import axios from "axios";
import { useMasterData } from "@/stores/common";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from "@/stores/auth";
const store = useMasterData();
const userAuthStore = useAuthStore();
export default defineComponent({
    data() {
        return {
            denomination: null,
            quantity: [],
            time: "",
            collector: null,
            collecterName: null,
            shift: null,
            upi: null,
            card: null,
            dd: null,
            rtgs: null,
            wallet: null,
            cheque: null,
            total: 0
        }
    },
    computed: {
        subTotal() {
            let total = 0;
            for (let i = 0; i < this.quantity.length; i++) {
                if (this.quantity[i]) {
                    let value = this.quantity[i] * this.denomination[i].DENOM_VALUE;
                    total += value;
                    this.denomination[i].total = value;
                    this.denomination[i].quantity = this.quantity[i];
                }
            }
            return total;
        },
    },
    watch: {
        quantity: {
            handler(newQuantity) {
                // Recalculate subTotal when quantity changes
                this.$nextTick(() => {
                    this.subTotal = this.quantity.reduce((acc, quantity, index) => {
                        return acc + quantity * this.denomination[index].DENOM_VALUE;
                    }, 0);
                });
            },
            deep: true,
        },
    },
    methods: {
        Calculate() {
            this.total = +this.upi + +this.card + +this.dd + +this.rtgs + +this.wallet + +this.cheque + +this.subTotal
        },
        submit() {
            const payload = {
                denomination: this.denomination,
                time: this.time,
                tcID: this.collecterName,
                roleID: userAuthStore.user.permissions.role_id,
                shift: this.shift,
                upi: this.upi,
                card: this.card,
                dd: this.dd,
                rtgs: this.rtgs,
                wallet: this.wallet,
                cheque: this.cheque,
                cashierID: userAuthStore.user.info.id,
                cashupMethod: 'midCashup',
                total: this.total
            }
            axios.post(`${BASE_URL}${API_ROUTES.CASHUP.CREATECASHUP}`, { ...payload }).then((res) => {
                this.denomination = res.data.data;
                Swal.fire({
                    title: "Mid CashUp Complete",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000,
                });
            }).catch(error => {
                Swal.fire({
                    title: error,
                    icon: "error",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000,
                });
            });

        },
        Reset() {
            this.quantity = [],
                this.time = "",
                this.collecterName = null,
                this.shift = null,
                this.upi = 0,
                this.card = 0,
                this.dd = 0,
                this.rtgs = 0,
                this.wallet = 0,
                this.cheque = 0,
                this.total = 0
        }
    },
    mounted() {
        const masterData = store.getMasters;
        this.collector = masterData.getCollector;
        axios.get(`${BASE_URL}${API_ROUTES.CASHUP.GETDENOMENATIONS}`).then((res) => {
            this.denomination = res.data.data;
        }).catch(error => {
            console.log(error);
        });
    }
})
</script>
