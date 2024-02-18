<template>
  <h1>Edit student</h1>
</template>

<script lang="ts" setup>
import { definePage } from "vue-router/auto";

definePage({
  meta: {
    headerTitle: "Cadastro de Aluno",
    requiredAuth: true,
  },
});
</script>
