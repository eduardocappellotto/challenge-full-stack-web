<template>
  <v-app>
    <Drawer />

    <v-container>
      <AppBar />
      <View />
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from "./default/AppBar.vue";
import View from "./default/View.vue";
import Drawer from "./default/Drawer.vue";
import { ref } from "vue";

const drawer = ref(true);
const rail = ref(true);
</script>
 