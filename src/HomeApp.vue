<script setup>
import { ref } from 'vue'
import Dropdown from '@/components/DropdownApp.vue'
const languages = ref(['English', '日本語', 'Русский', '中国人', '한국인'])

</script>

<template>
  <div id="App">
    <header>
      <Navbar />
      <nav class="language">
        <Dropdown title="Language" :items="languages" />
      </nav>
    </header>
    <main>
      <div class="container">
        <div class="content">
          <h1 class="top">
            IMPORTANT NOTICE
          </h1>
          <h2 class="top">
            In accordance to Immigration Act, B.E. 2522
          </h2>
          <ol class="specifications">
            <li>All passengers must complete the Thailand Digital Arrival Card.</li>
            <li>If the alien stays in the Kingdom longer than 90 days, he/she must notify
              in writing the nearest Immigration Officer, concerning place of stay, as soon as possible upon expiration
              of 90 days. And required to do so every 90 days.</li>
            <li>Aliens are not allowed to work unless they are granted Work Permit.</li>
            <li>Foreigners are required to submit their arrival card information 3 days
              in advance of their arrival date in Thailand.</li>
          </ol>
        </div>

        <div class="buttons">
          <router-link to="/arrival-card/personal-information" custom v-slot="{ navigate }">
            <button @click="navigate" role="link" class="button-menu">
              <span class="button-title">Arrival Card</span>
              <span class="button-subtext">Provide your Thailand Digital Arrival Card details for your coming
                trip.</span>
            </button>
          </router-link>
          <button class="button-menu">
            <span class="button-title">Update Arrival Card</span>
            <span class="button-subtext">Make change to the Thailand Digital Arrival Card information.</span>
          </button>
        </div>

        <a href="https://tdac.immigration.go.th/manual/en/index.html" class="bottom-text">User's Guide</a>
        <p class="bottom-text">Copyright 2025 Project. All rights reserved.<br>Version 0.1</p>


      </div>
    </main>
  </div>
</template>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  display: grid;
  margin-left: 30px;
  margin-top: 10px;
  justify-content: center;
  width: 95vw;
  height: 70vh;
  box-shadow: 0 0 5px #1172A7;
}

.top {
  display: flex;
  justify-content: center;
  color: red;
  font-size: 18px;
  font-family: 'Arial', sans-serif;
  width: 100%;
  font-weight: 100;
}

.specifications {
  color: #0056b3;
  font-size: 16px;
  font-family: 'Arial', sans-serif;
  line-height: 1.2;
  margin-top: 10px;
  margin-left: 10vw;
  margin-right: 10vw;
}

.content {
  margin-top: 1rem;
}

.language {
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 200px;
  margin-top: 10vh;
  margin-bottom: 10vh;
}

.button-menu {
  background-color: #1172A7;
  border: none;
  border-radius: 0.5cm;
  padding: 25px 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  width: 500px;
  height: 100px;
  cursor: pointer;
  box-shadow: 0 1px 2px black;
  color: #FFF;
  transition: transform 0.2s;
}

.button-title {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 8px;
}

.button-subtext {
  font-size: 12px;
  font-weight: normal;
  line-height: 1.3;
}

.bottom-text {
  display: flex;
  justify-content: center;
  text-align: center;

}
</style>