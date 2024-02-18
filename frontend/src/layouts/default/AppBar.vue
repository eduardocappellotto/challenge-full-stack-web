<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <div class="d-flex justify-center">
        <span class="ma-auto">{{ route.meta.headerTitle }}</span>
      </div>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const titleTexts = {
  "/login": "Login",
  dashboard: "Dashboard",
};

const routeName = route.path || "";
</script>

<style scoped>
</style>
