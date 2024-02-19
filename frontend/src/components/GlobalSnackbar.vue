<template>
  <v-snackbar
    location="top"
    v-model="snackbar.active"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
  >
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from "../store/snackbar";
import { defineComponent } from "vue";

const snackbar = useSnackbarStore();
</script>
