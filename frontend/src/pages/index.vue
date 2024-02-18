<template>
  <v-container class="d-flex align-center justify-center">
    <Class />
  </v-container>
</template>

<script lang="ts" setup>
import { definePage } from "vue-router/auto";
definePage({
  meta: {
    headerTitle: "Dashboard",
    requiredAuth: true,
  },
});
</script>

<style scoped>
svg {
  max-width: 400px;
}
</style>
