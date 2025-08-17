<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import ProgressBar from '@/components/ProgressBar.vue';
import infoIcon from '@/assets/images/infoIcon.png';
import data_country from '@/assets/dataCountry.json';

const date_of_arrival = ref('');
const selected_country = ref('');
const purpose_of_travel = ref('');
const purpose_other = ref('');
const mode_of_travel = ref('');
const mode_of_transport = ref('');
const mode_of_transport_other = ref('');
const flight_no = ref('');
const date_of_departure = ref('');
const dep_mode_of_travel = ref('');
const dep_mode_of_transport = ref('');
const dep_mode_of_transport_other = ref('');
const type_of_accomadation = ref('')
const type_other = ref('')
const province = ref('')
const district = ref('')
const sub_district = ref('')
const post_code = ref('')
const address = ref('')
const router = useRouter();


// Transport options based on travel mode
const getTransportOptions = (travelMode) => {
    switch (travelMode) {
        case 'AIR':
            return ['Commercial Flight', 'Private/Cargo Airline', 'Others'];
        case 'LAND':
            return ['Car', 'Train', 'Others'];
        case 'SEA':
            return ['Cruise', 'Commercial Vessel', 'Others'];
        default:
            return ['Select'];
    }
};

const dep_flight_no = ref('');
const option_country = ref([]);

const count = inject('globalCount');
console.log("The value of count: ", count.value);

onMounted(() => {
    option_country.value = data_country;
});

const onSubmit = (event) => {
  const form = event.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  continueClicked();
  router.push("/arrival-card");
};

const continueClicked = () => {
  count.value++;
  console.log("The value of count: ", count.value);
}



</script>

<template>
    <header>
        <Navbar />
    </header>
    <div class="container">
        <ProgressBar />
        <form @submit.prevent="onSubmit">
            <div class="detail-container">
                <div class="image">
                    <img :src="infoIcon">
                    <h1 class="title">Trip Information</h1>
                </div>
                <hr class="line">
                <div class="details">
                    <p class="text">Arrival Information</p><br>

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Date of Arrival</label>
                        <input type="date" v-model="date_of_arrival" class="form-control" required />
                    </div>

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Country/Territory where you Boarded</label>
                        <select v-model="selected_country" class="form-control" required>
                            <option disabled value="">Select or enter</option>
                            <option v-for="option in option_country" :key="option.symbol" :value="option.country">
                                {{ option.symbol }}: {{ option.country }}
                            </option>
                        </select>
                    </div>

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Purpose of Travel</label>
                        <div class="flex-row">
                            <select v-model="purpose_of_travel" class="form-control" required>
                                <option disabled value="">Select purpose</option>
                                <option>Holiday</option>
                                <option>Meeting</option>
                                <option>Sports</option>
                                <option>Business</option>
                                <option>Incentive</option>
                                <option>Medical & Wellness</option>
                                <option>Convention</option>
                                <option>Employment</option>
                                <option>Exhibition</option>
                                <option>Education</option>
                                <option>Others</option>
                            </select>
                            <input type="text" v-model="purpose_other" class="form-control other-input"
                                placeholder="Please specify" :disabled="purpose_of_travel !== 'Others'" />
                        </div>
                    </div>

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Mode of Travel</label>
                        <div class="radio-group">
                            <label><input type="radio" value="AIR" v-model="mode_of_travel" required /> AIR</label>
                            <label><input type="radio" value="LAND" v-model="mode_of_travel" /> LAND</label>
                            <label><input type="radio" value="SEA" v-model="mode_of_travel" /> SEA</label>
                        </div>
                    </div>

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Mode of Transport</label>
                        <div class="flex-row">
                            <select v-model="mode_of_transport" class="form-control" required>
                                <option disabled value="">Select</option>
                                <option v-for="option in getTransportOptions(mode_of_travel)" :key="option"
                                    :value="option" v-show="option !== 'Select'">
                                    {{ option }}
                                </option>
                            </select>
                            <input type="text" v-model="mode_of_transport_other" class="form-control other-input"
                                placeholder="Please specify" :disabled="mode_of_transport !== 'Others'" />
                        </div>
                    </div>

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Flight No./Vehicle No.</label>
                        <input type="text" v-model="flight_no" class="form-control" required />
                    </div>

                    <p class="text">Departure Information</p><br>

                    <div class="detail-forms">
                        <label>Date of Departure</label>
                        <input type="date" v-model="date_of_departure" class="form-control" />
                    </div>

                    <div class="detail-forms">
                        <label>Mode of Travel</label>
                        <div class="radio-group">
                            <label><input type="radio" value="AIR" v-model="dep_mode_of_travel" /> AIR</label>
                            <label><input type="radio" value="LAND" v-model="dep_mode_of_travel" /> LAND</label>
                            <label><input type="radio" value="SEA" v-model="dep_mode_of_travel" /> SEA</label>
                        </div>
                    </div>

                    <div class="detail-forms">
                        <label>Mode of Transport</label>
                        <div class="flex-row">
                            <select v-model="dep_mode_of_transport" class="form-control">
                                <option disabled value="">Select</option>
                                <option v-for="option in getTransportOptions(dep_mode_of_travel)" :key="option"
                                    :value="option" v-show="option !== 'Select'">
                                    {{ option }}
                                </option>
                            </select>
                            <input type="text" v-model="dep_mode_of_transport_other" class="form-control other-input"
                                placeholder="Please specify" :disabled="dep_mode_of_transport !== 'Others'" />
                        </div>
                    </div>

                    <div class="detail-forms">
                        <label>Flight No./Vehicle No.</label>
                        <input type="text" v-model="dep_flight_no" class="form-control" />
                    </div>

                </div>
                <div class="image">
                    <img :src="infoIcon">
                    <h1 class="title">Accommodation Information</h1>
                </div>
                <hr class="line">
                <div class="details">

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Type of Accommodation in Thailand</label>
                        <div class="flex-row">
                            <select v-model="type_of_accomadation" class="form-control" required>
                                <option disabled value="">Select type</option>
                                <option>Hotels</option>
                                <option>Resorts</option>
                                <option>Motels</option>
                                <option>Hostels</option>
                                <option>Others</option>
                            </select>
                            <input type="text" v-model="type_other" class="form-control other-input"
                                placeholder="Please specify" :disabled="type_of_accomadation !== 'Others'" />
                        </div>
                    </div>

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Province</label>
                        <div class="flex-row">
                            <select v-model="province" class="form-control" required>
                                <option disabled value="">Select Province</option>
                                <option>Province 1</option>
                                <option>Province 2</option>
                                <option>Province 3</option>
                                <option>Province 3</option>
                                <option>Province 4</option>
                            </select>
                        </div>
                    </div>

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>District. Area</label>
                        <div class="flex-row">
                            <select v-model="district" class="form-control" required>
                                <option disabled value="">Select District</option>
                                <option>District 1</option>
                                <option>District 2</option>
                                <option>District 3</option>
                                <option>District 4</option>
                                <option>District 5</option>
                            </select>
                        </div>
                    </div>
                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Sub-District/Sub-Area</label>
                        <div class="flex-row">
                            <select v-model="sub_district" class="form-control" required>
                                <option disabled value="">Select Sub-District</option>
                                <option>Sub-District 1</option>
                                <option>Sub-District 2</option>
                                <option>Sub-District 3</option>
                                <option>Sub-District 4</option>
                                <option>Sub-District 5</option>
                            </select>
                        </div>
                    </div>

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Post Code</label>
                        <input type="number" v-model="post_code" class="form-control" pattern="[0-9]{5}"></input>
                    </div>

                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Address</label>
                        <textarea v-model="address" placeholder="add Address Here" class="form-control"></textarea>
                    </div>

                </div>
                <button type="submit" class="btn-continue">Continue</button>
            </div>
        </form>
    </div>
</template>

<style>
* {
    margin: 0;
    font-family: 'Arial', sans-serif;
}

.container {
    height: calc(150vh - 20px);;
    width: calc(100vw - 20px);
    margin: 10px;
    box-shadow: 0 0 10px #51575a;
}

.detail-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: auto;
    margin-top: -10%;
    width: 95vw;
    padding: 10px;
    box-shadow: 0 0 1px #51575a;
    border-radius: 1rem;
}

.title {
    font-size: 15px;
    color: rgb(27, 108, 163);
    font-weight: 300;
    margin-top: 5px;
    padding: 0;
}

.text {
    font-size: 13px;
    color: rgb(27, 108, 163);
    font-weight: 300;
    margin-top: 5px;
    padding: 0;
}

.image {
    display: flex;
    align-items: center;
}

.image img {
    width: 40px;
}

.line {
    margin: 15px 0 10px 0;
    background-color: rgb(27, 108, 163);
    border: none;
    padding: 0.1px;
}

.details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 40px;
    padding: 20px;
    align-items: start;
}

.detail-forms {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
}

.detail-forms label {
    font-size: 12px;
    color: rgb(27, 108, 163);
    font-weight: 500;
    min-width: 160px;
}

.form-control {
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 12px;
    color: #374151;
    background-color: #ffffff;
    width: 100%;
    box-sizing: border-box;
}

.form-control:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
}

.flex-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
}

.other-input {
    margin-top: 4px;
}

.radio-group {
    display: flex;
    gap: 20px;
    align-items: center;
    flex-wrap: wrap;
}

.radio-group label {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: auto;
    font-size: 12px;
    color: rgb(27, 108, 163);
    font-weight: 500;
}

.asterisk {
    color: red;
}

.btn-continue {
  padding: 5px 10px;
  border-radius: 20px;
  color: #ffffff;
  background-color: rgb(27, 108, 163);
  border: none;
  margin-top: -1mm;
  font-size: 12px;
  margin-left: auto;
  display: block;
}
</style>