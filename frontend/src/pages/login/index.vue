<template>
  <v-card class="mx-auto pa-8" max-width="640px">
    <v-container>
      <v-form @submit.prevent="loginUser">
        <v-text-field
          class="mb-4"
          v-model="username"
          name="username"
          label="Usuário"
          :error-messages="errors.username"
        ></v-text-field>
        <v-text-field
          class="mb-4"
          v-model="password"
          name="password"
          type="password"
          label="Senha"
          :error-messages="errors.password"
        ></v-text-field>
        <v-btn color="primary" type="submit">Entrar</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { validationSchema } from "./formValidation";
import { useSnackbarStore } from "../../store/snackbar";
import AuthService from "../../services/authService";
import { useRouter } from "vue-router";
import { definePage } from "vue-router/auto";
import { useAppStore } from "../../store/app";
import { jwtDecode } from "jwt-decode";
import { LoggedUser } from "@/types/user";

const router = useRouter();
const snackbar = useSnackbarStore();
const appStore = useAppStore();

const { handleSubmit, errors } = useForm({
  validationSchema,
});

definePage({
  meta: {
    headerTitle: "Login",
    requiredAuth: false,
  },
});

const { value: username } = useField("username");
const { value: password } = useField("password");

const loginUser = handleSubmit(async () => {
  try {
    const { token } = await AuthService.login({
      username: username.value,
      password: password.value,
    });

    const decodedToken = jwtDecode<LoggedUser>(token);

    if (decodedToken.role === "admin") {
      appStore.login(token, {
        username: decodedToken.username,
        role: decodedToken.role,
      });

      router.push("/");

      snackbar.show({
        message: "Login realizado com sucesso!",
        color: "success",
      });
    }

    if (decodedToken.role !== "admin") {
      snackbar.show({
        message: "Usuário não-autorizado.",
        color: "error",
      });
    }
  } catch (error) {
    snackbar.show({
      message: "Usuário/Senha Inválidos",
      color: "error",
    });
  }
});
</script>
