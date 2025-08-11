<script setup>
import { ref } from 'vue'

const languages = ref(['English', 'French', 'Spanish'])
</script>

<template>
  <nav>
    <Dropdown title="Language" :items="languages" />
  </nav>
</template>

<style lang="css">


</style>