<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import ProgressBar from '@/components/ProgressBar.vue';
import data_country from '@/assets/dataCountry.json';
import data_months from '@/assets/dataDate.json';
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
  router.push("/new/health-declaration");
};

const previousClicked = () => {
  router.push("/new/personal-information")
}
</script>

<template>
  <header class="app-header">
    Arrival Card > Add Arrival Card
  </header>

  <div class="app-container">
    <div class="page-container">
      <div class="content-wrapper">
        <div class="progress-container">
          <ProgressBar />
        </div>

        <form @submit.prevent="onSubmit">
          <!-- Trip Information Section -->
          <div class="form-section">
            <div class="card-header">
              <img :src="tripIcon" alt="Trip icon">
              <h2 class="card-title">Trip Information</h2>
            </div>
            <hr class="card-divider">

            <!-- Arrival Information -->
            <div class="form-section-title">Arrival Information</div>

            <div class="form-grid">
              <div class="form-field">
                <label class="form-label">Date of Arrival</label>
                <div class="date-inputs">
                  <select v-model="selected_year_of_arrival" class="form-select">
                    <option disabled value="">yyyy</option>
                    <option v-for="option in option_year" :key="option.value" :value="option.value">
                      {{ option.name }}
                    </option>
                  </select>
                  <select v-model="selected_month_of_arrival" class="form-select">
                    <option disabled value="">mm</option>
                    <option v-for="option in option_month" :key="option.value" :value="option.value">
                      {{ option.name }}
                    </option>
                  </select>
                  <select v-model="selected_day_of_arrival" class="form-select">
                    <option disabled value="">dd</option>
                    <option v-for="option in option_day" :key="option.value" :value="option.value">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Country/Territory where you Boarded</label>
                <PSelect v-model="selected_country" :options="option_country" optionLabel="country"
                  placeholder="Select a Country" :filter="true" filterBy="country" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Purpose of Travel</label>
                <div class="form-input-group">
                  <select v-model="purpose_of_travel" class="form-select" required>
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
                  <input type="text" v-model="purpose_other" class="form-input" placeholder="Please specify"
                    :disabled="purpose_of_travel !== 'Others'" />
                </div>
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Mode of Travel</label>
                <div class="radio-group">
                  <div class="radio-item">
                    <input type="radio" value="AIR" v-model="mode_of_travel" required />
                    <label>AIR</label>
                  </div>
                  <div class="radio-item">
                    <input type="radio" value="LAND" v-model="mode_of_travel" />
                    <label>LAND</label>
                  </div>
                  <div class="radio-item">
                    <input type="radio" value="SEA" v-model="mode_of_travel" />
                    <label>SEA</label>
                  </div>
                </div>
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Mode of Transport</label>
                <div class="form-input-group">
                  <select v-model="mode_of_transport" class="form-select" required>
                    <option disabled value="">Select</option>
                    <option v-for="option in getTransportOptions(mode_of_travel)" :key="option" :value="option"
                      v-show="option !== 'Select'">
                      {{ option }}
                    </option>
                  </select>
                  <input type="text" v-model="mode_of_transport_other" class="form-input" placeholder="Please specify"
                    :disabled="mode_of_transport !== 'Others'" />
                </div>
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Flight No./Vehicle No.</label>
                <input type="text" v-model="flight_no" class="form-input" required />
              </div>
            </div>

            <!-- Departure Information -->
            <div class="form-section-title">Departure Information</div>

            <div class="form-grid">
              <div class="form-field">
                <label class="form-label form-label-required">Date of Departure</label>
                <div class="date-inputs">
                  <select v-model="selected_year_of_departure" class="form-select">
                    <option disabled value="">yyyy</option>
                    <option v-for="option in option_year" :key="option.value" :value="option.value">
                      {{ option.name }}
                    </option>
                  </select>
                  <select v-model="selected_month_of_departure" class="form-select">
                    <option disabled value="">mm</option>
                    <option v-for="option in option_month" :key="option.value" :value="option.value">
                      {{ option.name }}
                    </option>
                  </select>
                  <select v-model="selected_day_of_departure" class="form-select">
                    <option disabled value="">dd</option>
                    <option v-for="option in option_day" :key="option.value" :value="option.value">
                      {{ option.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Mode of Travel</label>
                <div class="radio-group">
                  <div class="radio-item">
                    <input type="radio" value="AIR" v-model="dep_mode_of_travel" />
                    <label>AIR</label>
                  </div>
                  <div class="radio-item">
                    <input type="radio" value="LAND" v-model="dep_mode_of_travel" />
                    <label>LAND</label>
                  </div>
                  <div class="radio-item">
                    <input type="radio" value="SEA" v-model="dep_mode_of_travel" />
                    <label>SEA</label>
                  </div>
                </div>
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Mode of Transport</label>
                <div class="form-input-group">
                  <select v-model="dep_mode_of_transport" class="form-select">
                    <option disabled value="">Select</option>
                    <option v-for="option in getTransportOptions(dep_mode_of_travel)" :key="option" :value="option"
                      v-show="option !== 'Select'">
                      {{ option }}
                    </option>
                  </select>
                  <input type="text" v-model="dep_mode_of_transport_other" class="form-input"
                    placeholder="Please specify" :disabled="dep_mode_of_transport !== 'Others'" />
                </div>
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Flight No./Vehicle No.</label>
                <input type="text" v-model="dep_flight_no" class="form-input" />
              </div>
            </div>
          </div>

          <!-- Accommodation Information Section -->
          <div class="form-section">
            <div class="card-header">
              <img :src="buildingIcon" alt="Building icon">
              <h2 class="card-title">Accommodation Information</h2>
            </div>
            <hr class="card-divider">

            <div class="form-grid">
              <div class="form-field">
                <label class="form-label form-label-required">Type of Accommodation in Thailand</label>
                <div class="form-input-group">
                  <select v-model="type_of_accommodation" class="form-select" required>
                    <option disabled value="">Select type</option>
                    <option>Hotels</option>
                    <option>Resorts</option>
                    <option>Motels</option>
                    <option>Hostels</option>
                    <option>Others</option>
                  </select>
                  <input type="text" v-model="type_other" class="form-input" placeholder="Please specify"
                    :disabled="type_of_accommodation !== 'Others'" />
                </div>
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Province</label>
                <input type="text" v-model="province" class="form-input" placeholder="Enter Province" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">District. Area</label>
                <input type="text" v-model="district" class="form-input" placeholder="Enter District" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Sub-District/Sub-Area</label>
                <input type="text" v-model="sub_district" class="form-input" placeholder="Enter Sub-District" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Post Code</label>
                <input type="number" v-model="post_code" class="form-input" pattern="[0-9]{5}" />
              </div>

              <div class="form-field">
                <label class="form-label form-label-required">Address</label>
                <textarea v-model="address" placeholder="Add Address Here" class="form-textarea"></textarea>
              </div>
            </div>
          </div>

          <div class="btn-group">
            <button type="button" class="btn btn-secondary" @click="previousClicked()">
              Previous
            </button>
            <button type="submit" class="btn btn-primary">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles only if needed */
</style>
