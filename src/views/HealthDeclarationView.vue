<script setup>
import ProgressBar from '@/components/ProgressBar.vue';
import healthIcon from '/healthIcon.svg'
import data_country from '@/assets/dataCountry.json';
import { inject, ref, onMounted } from 'vue';
import { useRouter } from "vue-router";


const router = useRouter();
const count = inject('globalCount');

const prev_countries_visited = ref([]);
const option_country = ref([]);

onMounted(() => {
  option_country.value = data_country.map(c => ({
    name: c.country,
    code: c.symbol
  }));
  count.value = 2;
});

const previousClicked = () => {
  router.push("/new/trip-&-accomodation-information")
}

const onSubmit = (event) => {
  event.preventDefault()
  console.log('Selected countries:', prev_countries_visited.value)
  router.push("/new/success");
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

        <div class="form-section">
          <div class="card-header">
            <img :src="healthIcon" alt="Health icon">
            <h2 class="card-title">Health Declaration</h2>
          </div>
          <hr class="card-divider">

          <div class="health-description">
            <p>
              Passengers travelling to and entering Thailand have to be vaccinated with the vaccines approved by
              Thailand or by the World Health Organization (WHO) or other vaccines as allowed by the Ministry of
              Public Health of Thailand.
            </p>
            <p>
              Please list the name of the countries/territories where you stayed within two weeks before arrival.
            </p>
          </div>

          <form @submit.prevent="onSubmit">
            <div class="form-field">
              <label class="form-label">Countries/Territories Visited (Past 2 weeks)</label>
              <MultiSelect v-model="prev_countries_visited" :options="option_country" optionLabel="name"
                optionValue="code" filter placeholder="Select Countries" :maxSelectedLabels="3" />
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
  </div>
</template>

<style scoped>
/* Component-specific styles only if needed */
</style>
