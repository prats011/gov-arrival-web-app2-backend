<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import ProgressBar from '@/components/ProgressBar.vue';
import worldIcon from '@/assets/images/worldIcon.png';
import accomadationIcon from '@/assets/images/accomadationIcon.png';
import data_country from '@/assets/dataCountry.json';
import data_months from '@/assets/dataDate.json';
import SearchDropdown from '@/components/SearchDropdown.vue';

const option_month = ref([]);
const option_day = ref([]);
const option_year = ref([]);

const selected_year_of_arrival = ref('');
const selected_month_of_arrival = ref('');
const selected_day_of_arrival = ref('');

const selected_year_of_departure = ref('');
const selected_month_of_departure = ref('');
const selected_day_of_departure = ref('');

const selected_country = ref('');
const purpose_of_travel = ref('');
const purpose_other = ref('');
const mode_of_travel = ref('');
const mode_of_transport = ref('');
const mode_of_transport_other = ref('');
const flight_no = ref('');
const dep_mode_of_travel = ref('');
const dep_mode_of_transport = ref('');
const dep_mode_of_transport_other = ref('');
const type_of_accommodation = ref('');
const type_other = ref('');
const province = ref('');
const district = ref('');
const sub_district = ref('');
const post_code = ref('');
const address = ref('');
const router = useRouter();

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

const count = inject('globalCount', ref(0));
console.log("The value of count: ", count.value);

onMounted(() => {
    option_month.value = data_months.months;
    option_day.value = data_months.days;
    option_year.value = data_months.years;
    option_country.value = data_country.map(c => ({
        country: `${c.symbol}: ${c.country}`,
        symbol: c.symbol,
        cities: c.cities
    }));
});

const onSubmit = (event) => {
    const form = event.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    continueClicked();
    router.push("/arrival-card/health-declaration");
};

const continueClicked = () => {
    count.value++;
    console.log("The value of count: ", count.value);
};
</script>

<template>
    <header>
        <Navbar /> Arrival Card > Add Arrival Card
    </header>
    <div class="container-TA">
        <ProgressBar />
        <form @submit.prevent="onSubmit">
            <div class="detail-container-TA">
                <div class="image"> <img :src="worldIcon">
                    <h1 class="title">Trip Information</h1>
                </div>
                <hr class="line">
                <div class="details">
                    <p class="text">Arrival Information</p><br>
                    <div class="detail-forms"> <label>Date of Arrival</label>
                        <div class="dob-container"> <select v-model="selected_year_of_arrival" class="dob-select">
                                <option disabled value="">yyyy</option>
                                <option v-for="option in option_year" :key="option.value" :value="option.value">{{
                                    option.name }}
                                </option>
                            </select> <select v-model="selected_month_of_arrival" class="dob-select">
                                <option disabled value="">mm</option>
                                <option v-for="option in option_month" :key="option.value" :value="option.value">{{
                                    option.name }}
                                </option>
                            </select> <select v-model="selected_day_of_arrival" class="dob-select">
                                <option disabled value="">dd</option>
                                <option v-for="option in option_day" :key="option.value" :value="option.value">{{
                                    option.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="detail-forms"> <label><span class="asterisk">*</span>Country/Territory where you
                            Boarded</label>
                        <Select v-model="selected_country" :options="option_country"
                            optionLabel="country" placeholder="Select a Country" :filter="true" filterBy="country"  class="countrySelect"/>
                    </div>
                    <div class="detail-forms"> <label><span class="asterisk">*</span>Purpose of Travel</label>
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
                    <div class="detail-forms"> <label><span class="asterisk">*</span>Mode of Travel</label>
                        <div class="radio-group">
                            <label><input type="radio" value="AIR" v-model="mode_of_travel" required /> AIR</label>
                            <label><input type="radio" value="LAND" v-model="mode_of_travel" /> LAND</label>
                            <label><input type="radio" value="SEA" v-model="mode_of_travel" /> SEA</label>
                        </div>
                    </div>
                    <div class="detail-forms"> <label><span class="asterisk">*</span>Mode of Transport</label>
                        <div class="flex-row">
                            <select v-model="mode_of_transport" class="form-control" required>
                                <option disabled value="">Select</option>
                                <option v-for="option in getTransportOptions(mode_of_travel)" :key="option"
                                    :value="option" v-show="option !== 'Select'"> {{ option }}
                                </option>
                            </select>
                            <input type="text" v-model="mode_of_transport_other" class="form-control other-input"
                                placeholder="Please specify" :disabled="mode_of_transport !== 'Others'" />
                        </div>
                    </div>
                    <div class="detail-forms"> <label><span class="asterisk">*</span>Flight No./Vehicle No.</label>
                        <input type="text" v-model="flight_no" class="form-control" required />
                    </div>
                    <p class="text">Departure Information</p><br>
                    <div class="detail-forms"> <label><span class="asterisk">*</span>Date of Departure</label>
                        <div class="dob-container"> <select v-model="selected_year_of_departure" class="dob-select">
                                <option disabled value="">yyyy</option>
                                <option v-for="option in option_year" :key="option.value" :value="option.value">{{
                                    option.name }} </option>
                            </select> <select v-model="selected_month_of_departure" class="dob-select">
                                <option disabled value="">mm</option>
                                <option v-for="option in option_month" :key="option.value" :value="option.value">{{
                                    option.name }} </option>
                            </select> <select v-model="selected_day_of_departure" class="dob-select">
                                <option disabled value="">dd</option>
                                <option v-for="option in option_day" :key="option.value" :value="option.value">{{
                                    option.name }} </option>
                            </select>
                        </div>
                    </div>
                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Mode of Travel</label>
                        <div class="radio-group">
                            <label><input type="radio" value="AIR" v-model="dep_mode_of_travel" /> AIR</label>
                            <label><input type="radio" value="LAND" v-model="dep_mode_of_travel" /> LAND</label>
                            <label><input type="radio" value="SEA" v-model="dep_mode_of_travel" /> SEA</label>
                        </div>
                    </div>
                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Mode of Transport</label>
                        <div class="flex-row">
                            <select v-model="dep_mode_of_transport" class="form-control">
                                <option disabled value="">Select</option>
                                <option v-for="option in getTransportOptions(dep_mode_of_travel)" :key="option"
                                    :value="option" v-show="option !== 'Select'"> {{ option }} </option>
                            </select>
                            <input type="text" v-model="dep_mode_of_transport_other" class="form-control other-input"
                                placeholder="Please specify" :disabled="dep_mode_of_transport !== 'Others'" />
                        </div>
                    </div>
                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Flight No./Vehicle No.</label>
                        <input type="text" v-model="dep_flight_no" class="form-control" />
                    </div>
                </div>
                <div class="image">
                    <img :src="accomadationIcon">
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
                            </select> <input type="text" v-model="type_other" class="form-control other-input"
                                placeholder="Please specify" :disabled="type_of_accomadation !== 'Others'" />
                        </div>
                    </div>
                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Province</label>
                        <input type="text" v-model="province" class="form-control" placeholder="Enter Province" />
                    </div>
                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>District. Area</label>
                        <input type="text" v-model="district" class="form-control" placeholder="Enter District" />
                    </div>
                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Sub-District/Sub-Area</label>
                        <input type="text" v-model="sub_district" class="form-control"
                            placeholder="Enter Sub-District" />
                    </div>
                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Post Code</label>
                        <input type="number" v-model="post_code" class="form-control" pattern="[0-9]{5}" />
                    </div>
                    <div class="detail-forms">
                        <label><span class="asterisk">*</span>Address</label>
                        <textarea v-model="address" placeholder="Add Address Here" class="form-control"></textarea>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <button type="button" class="btn-prev">Previous</button>
                <button type="submit" class="btn-continue">Continue</button>
            </div>
        </form>
    </div>
</template>


<style scoped>
* {
    margin: 0;
    font-family: 'Arial', sans-serif;
}

.container-TA {
    height: calc(150vh - 20px);
    width: calc(100vw - 20px);
    margin: 10px;
    box-shadow: 0 0 10px #51575a;
}

.detail-container-TA {
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: auto;
    width: 95vw;
    padding: 10px;
    box-shadow: 0 0 1px #51575a;
    border-radius: 1rem;
    margin-left: 20px;
}

.title {
    font-size: 15px;
    color: rgb(27, 108, 163);
    font-weight: 300;
    margin-top: 5px;
    padding: 0;
}

.dob-container {
    display: flex;
    gap: 10px;
    width: 100%;
}

.dob-select {
    flex: 1;
    border-radius: 2rem;
    text-align: center;
    height: 5vh;
    font-size: 13px;
    color: #000000;
    background: transparent;
    outline: none;
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
    height: 100%;
}

.detail-forms label {
    font-size: 12px;
    color: rgb(27, 108, 163);
    font-weight: 500;
    min-width: 160px;
    white-space: wrap;
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

.countrySelect {
    width: 100%;
    box-sizing: border-box;
    max-height: 40px;
}

.countrySelect :deep(.p-select-label) {
    font-size: 12px !important;
}

.countrySelect :deep(.p-select-items-wrapper .p-select-item) {
    font-size: 8px !important;
}

.countrySelect :deep(.p-select-filter-container input) {
    font-size: 8px !important;
}

.countrySelect :deep(.p-select-overlay) {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%;
  z-index: 1000;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-top: 2px;
  max-height: 200px;
  overflow-y: auto;
}

.countrySelect :deep(.p-select-dropdown .p-select-dropdown-icon) {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s;
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
    gap: 40px;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
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

.button-container {
    display: flex;
    flex-direction: row;
    gap: 75vw;
    align-items: center;
    padding: 20px;
}

.btn-continue {
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    width: 140px;
    height: 40px;
    cursor: pointer;
    padding: 0;
    margin: 0;
}

.btn-prev {
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 500;
    width: 140px;
    height: 40px;
    cursor: pointer;
    margin-top: 10px;
    margin: 0;
}
</style>