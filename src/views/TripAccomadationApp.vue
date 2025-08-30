<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import ProgressBar from '@/components/ProgressBar.vue';
import data_country from '@/assets/dataCountry.json';
import data_months from '@/assets/dataDate.json';
import SearchDropdown from '@/components/SearchDropdown.vue';
import tripIcon from '/worldIcon.svg';
import buildingIcon from '/buildingIcon.svg';

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
  count.value = 1;
});

const onSubmit = (event) => {
  const form = event.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  if (!selected_country.value) {
    alert("Please select a country");
    return;
  }
  router.push("/arrival-card/health-declaration");
};

const previousClicked = () => {
  router.push("/arrival-card/personal-information")
}

</script>

<template>
  <header>
    <Navbar /> Arrival Card > Add Arrival Card
  </header>
  <div class="container-TA">
    <ProgressBar />
    <form @submit.prevent="onSubmit">
      <div class="detail-container-TA">
        <div class="image"> <img :src="tripIcon">
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
            <Select v-model="selected_country" :options="option_country" optionLabel="country"
              placeholder="Select a Country" :filter="true" filterBy="country" class="custom-select" />
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
              <input type="text" v-model="purpose_other" class="form-control other-input" placeholder="Please specify"
                :disabled="purpose_of_travel !== 'Others'" />
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
                <option v-for="option in getTransportOptions(mode_of_travel)" :key="option" :value="option"
                  v-show="option !== 'Select'"> {{ option }}
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
            <label><span class="asterisk">*</span>Date of Departure</label>
            <div class="dob-container"> <select v-model="selected_year_of_departure" class="dob-select">
                <option disabled value="">yyyy</option>
                <option v-for="option in option_year" :key="option.value" :value="option.value">{{
                  option.name }} </option>
              </select>
              <select v-model="selected_month_of_departure" class="dob-select">
                <option disabled value="">mm</option>
                <option v-for="option in option_month" :key="option.value" :value="option.value">{{
                  option.name }} </option>
              </select>
              <select v-model="selected_day_of_departure" class="dob-select">
                <option disabled value="">dd</option>
                <option v-for="option in option_day" :key="option.value" :value="option.value">{{
                  option.name }}
                </option>
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
                <option v-for="option in getTransportOptions(dep_mode_of_travel)" :key="option" :value="option"
                  v-show="option !== 'Select'"> {{ option }} </option>
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
          <img :src="buildingIcon">
          <h1 class="title">Accommodation Information</h1>
        </div>
        <hr class="line">
        <div class="details">
          <div class="detail-forms">
            <label><span class="asterisk">*</span>Type of Accommodation in Thailand</label>
            <div class="flex-row">
              <select v-model="type_of_accommodation" class="form-control" required>
                <option disabled value="">Select type</option>
                <option>Hotels</option>
                <option>Resorts</option>
                <option>Motels</option>
                <option>Hostels</option>
                <option>Others</option>
              </select> <input type="text" v-model="type_other" class="form-control other-input"
                placeholder="Please specify" :disabled="type_of_accommodation !== 'Others'" />
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
            <input type="text" v-model="sub_district" class="form-control" placeholder="Enter Sub-District" />
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
      <div class="button-container-ta">
        <button type="button" class="btn-previous-ta" @click="previousClicked()">Previous</button>
        <button type="submit" class="btn-continue-ta">Continue</button>
      </div>
    </form>
  </div>
</template>

<style>
* {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.container-TA {
  height: calc(140vh - 20px);
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

/* Fixed PrimeVue Select Styling */
.custom-select {
  width: 100%;
  box-sizing: border-box;
}

/* Main select container */
.p-select {
  display: inline-flex;
  cursor: pointer;
  position: relative;
  user-select: none;
  background: #ffffff;
  border: 1px solid #d1d5db;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  border-radius: 4px;
  min-height: 40px;
  width: 100%;
}

.p-select:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: 0 0 0 1px rgb(27, 108, 163);
  border-color: rgb(27, 108, 163);
}

/* Select label (placeholder and selected text) */
.p-select .p-select-label {
  background: transparent;
  border: 0 none;
  cursor: pointer;
  display: block;
  font-size: 12px;
  padding: 8px 12px;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  width: 100%;
  text-overflow: ellipsis;
  color: #374151;
  outline: 0 none;
}

.p-select .p-select-label.p-placeholder {
  color: #9ca3af;
}

/* Dropdown arrow */
.p-select .p-select-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: transparent;
  color: #6b7280;
  width: 40px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

/* Options panel */
.p-select-overlay {
  background: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 100%;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  margin-top: 2px;
}

/* Options list */
.p-select-overlay .p-select-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  max-height: 200px;
  overflow-y: auto;
}

/* Individual option */
.p-select-overlay .p-select-option {
  cursor: pointer;
  font-weight: normal;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 12px;
  color: #374151;
  user-select: none;
}

.p-select-overlay .p-select-option:hover {
  background: rgba(27, 108, 163, 0.1);
}

.p-select-overlay .p-select-option.p-selected {
  background: rgba(27, 108, 163, 0.2);
  color: rgb(27, 108, 163);
}

/* Filter input */
.p-select-overlay .p-select-filter-container {
  position: relative;
  margin: 8px;
}

.p-select-overlay .p-select-filter-container .p-select-filter {
  width: 100%;
  padding: 8px 12px;
  font-size: 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #ffffff;
  color: #374151;
}

.p-select-overlay .p-select-filter-container .p-select-filter:focus {
  outline: 0 none;
  box-shadow: 0 0 0 1px rgb(27, 108, 163);
  border-color: rgb(27, 108, 163);
}

/* Empty message */
.p-select-overlay .p-select-empty-message {
  padding: 8px 12px;
  font-size: 12px;
  color: #9ca3af;
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
  gap: 30px;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
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

.button-container-ta {
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  gap: 75vw;
}

.btn-continue-ta,
.btn-previous-ta {
  padding: 5px 10px;
  border-radius: 20px;
  color: #ffffff;
  background-color: rgb(27, 108, 163);
  border: none;
  font-size: 12px;
  height: 40px;
  width: 150px;
  margin-top: 20px;
}
</style>
