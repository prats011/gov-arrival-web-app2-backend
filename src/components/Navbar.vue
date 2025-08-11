<script setup>
import Dropdown from './Dropdown.vue';
import { ref } from 'vue'

const languages = ref(['en', 'fr', 'es'])
</script>

<template>
  <nav>
    <Dropdown title="Language" :items="languages" />
  </nav>
</template>

<style lang="css">


</style>