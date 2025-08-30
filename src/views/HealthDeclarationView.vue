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
  <header>
    Arrival Card > Add Arrival Card
  </header>
  <div class="container">
    <ProgressBar />
    <div class="detail-container">
      <div class="image">
        <img :src="healthIcon" />
        <h1 class="title">Health Declaration</h1>
      </div>
      <hr class="line" />
      <p class="text-hd">
        Passengers travelling to and entering Thailand have to be vaccinated with the vaccines approved by
        Thailand or by the World Health Organization (WHO) or other vaccines as allowed by the Ministry of
        Public Health of Thailand.
      </p>
      <br />
      <p class="text-hd">
        Please list the name of the countries/territories where you stayed within two weeks before arrival.
      </p>
      <form @submit.prevent="onSubmit">
        <div class="card flex justify-center">
          <MultiSelect v-model="prev_countries_visited" :options="option_country" optionLabel="name" optionValue="code"
            filter placeholder="Select Countries" :maxSelectedLabels="3" class="w-full md:w-80" />
        </div>
        <div class="button-container-hd">
          <button type="button" class="btn-previous-hd" @click="previousClicked()">Previous</button>
          <button type="submit" class="btn-continue-hd">Continue</button>
        </div>
      </form>
    </div>
  </div>
</template>


<style>
* {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

.container {
  height: calc(100vh - 60px);
  width: calc(100vw - 20px);
  margin: 10px;
  box-shadow: 0 0 10px #51575a;
}

.detail-container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 70vh;
  margin: 0;
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

.image {
  display: flex;
  align-items: center;
}

.text-hd {
  color: #51575a;
  font-size: 15px;
  margin-bottom: 20px;
}

.card .p-multiselect {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-height: 40px;
  padding: 0.25rem 0.5rem;
}

.p-multiselect-label {
  color: #999;
  font-style: italic;
  margin: 0;
  line-height: 1.5;
  display: inline-block;
}


.p-multiselect-panel {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  padding: 0.5rem 0;
}


.p-multiselect-token {
  background-color: #1B6CA3;
  color: white;
  border-radius: 0.25rem;
  padding: 2px 6px;
  margin-right: 4px;
  font-size: 13px;
  margin-right: 4px;
  margin-bottom: 2px;
}

.p-multiselect-item:hover {
  background-color: rgba(27, 108, 163, 0.1);
  cursor: pointer;
}

.p-multiselect-filter-container input {
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 4px 8px;
  font-size: 14px;
}

.button-container-hd {
  display: flex;
  justify-content: flex-start;
  gap: 75vw;
}

.btn-continue-hd,
.btn-previous-hd {
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
