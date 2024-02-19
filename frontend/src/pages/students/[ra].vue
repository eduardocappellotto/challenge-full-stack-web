<template>
  <v-card class="pa-8 mx-auto" max-width="640px">
    <v-container>
      <v-form @submit.prevent="saveStudent">
        <v-row>
          <v-col class="pa-0" cols="12">
            <label for="name">Nome</label>
            <v-text-field
              class="mt-1"
              single-line
              v-model="name"
              :error-messages="errors.name"
              id="name"
              placeholder="Informe o nome completo"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col class="pa-0" cols="12">
            <label for="email">E-mail</label>
            <v-text-field
              class="mt-1"
              single-line
              id="email"
              v-model="email"
              :error-messages="errors.email"
              label="Email"
              placeholder="Informe apenas um e-mail"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col class="pa-0" cols="12">
            <label for="RA">RA</label>
            <v-text-field
              :disabled="!isNewStudent"
              class="mt-1"
              single-line
              v-model="ra"
              id="RA"
              :error-messages="errors.ra"
              placeholder="Informe o registro acadêmico"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col class="pa-0" cols="12">
            <label for="cpf">CPF</label>
            <v-text-field
              class="mt-1"
              :disabled="!isNewStudent"
              id="cpf"
              single-line
              placeholder="Informe o número do documento"
              v-model="cpf"
              :error-messages="errors.cpf"
              label="CPF"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <div class="d-flex justify-end w-100">
            <v-btn
              class="ma-2"
              color="primary"
              @click="router.push('/students')"
              >Cancelar</v-btn
            >
            <v-btn class="ma-2" color="secondary" type="submit">Salvar</v-btn>
          </div>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import studentService from "../../services/studentService";
import { definePage } from "vue-router/auto";
import { useField, useForm } from "vee-validate";
import { validationSchema } from "./formValidation";
import { useSnackbarStore } from "../../store/snackbar";

interface Student {
  ra: string;
  name: string;
  email: string;
  cpf: string;
}

definePage({
  meta: {
    headerTitle: "Cadastro de Aluno",
    requiredAuth: true,
  },
});

const router = useRouter();
const snackbar = useSnackbarStore();

const registroAcademico = router.currentRoute.value.params.ra as string;
const isNewStudent = registroAcademico === "new";

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: ra } = useField<string>("ra");
const { value: name } = useField<string>("name");
const { value: email } = useField<string>("email");
const { value: cpf } = useField<string>("cpf");

onMounted(async () => {
  if (!isNewStudent) {
    try {
      const fetchedStudent = await studentService.listByRA(registroAcademico);

      ra.value = fetchedStudent.ra;
      cpf.value = fetchedStudent.cpf;
      name.value = fetchedStudent.name;
      email.value = fetchedStudent.email;
    } catch (error) {
      console.error("Error fetching student", error);
    }
  }
});

const saveStudent = handleSubmit(async () => {
  try {
    if (isNewStudent) {
      await studentService.createStudent({
        ra: ra.value,
        cpf: cpf.value,
        name: name.value,
        email: email.value,
      });

      snackbar.show({
        message: "Aluno salvo com sucesso!",
        color: "success",
      });
    } else {
      await studentService.update(ra.value, {
        ra: ra.value,
        cpf: cpf.value,
        name: name.value,
        email: email.value,
      });

      snackbar.show({
        message: "Aluno atualizado com sucesso!",
        color: "success",
      });
    }
    router.push("/dashboard");
  } catch (error) {
    console.error("Error saving student", error);
  }
});
</script>
