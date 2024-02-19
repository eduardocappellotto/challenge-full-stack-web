<template>
  <v-container>
    <v-row class="mb-4 align-start">
      <v-col class="d-flex align-start flex-wrap" cols="12" md="8">
        <v-text-field v-model="search" label="Search" outlined dense>
          <template #append
            ><v-btn class="ma-2" outlined color="secondary" @click="filterData"
              >Pesquisar</v-btn
            >
          </template>
        </v-text-field>
      </v-col>
      <v-col class="d-flex align-start flex-wrap" cols="12" md="4">
        <v-btn class="ma-2" color="primary" @click="createStudent"
          >Cadastrar Aluno</v-btn
        >
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="students"
      item-key="ra"
      :items-per-page="itemsPerPage"
      :page="currentPage"
      :total-items="totalStudents"
      :server-items-length="totalStudents"
      @update:page="fetchStudents"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn class="ma-2" color="secondary" @click="editStudent(item)"
          >Editar</v-btn
        >

        <v-btn class="mx-a" color="primary" @click="dialogDelete = true"
          >Excluir</v-btn
        >

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Confirmar Exclusão</v-card-title>
            <v-card-text>
              Tem certeza de que deseja excluir este aluno?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="tertiary" text @click="dialogDelete = false"
                >Cancelar</v-btn
              >
              <v-btn color="error" text @click="confirmDelete(item)"
                >Confirmar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { definePage } from "vue-router/auto";
import studentService from "../../services/studentService";
import { useSnackbarStore } from "../../store/snackbar";

definePage({
  meta: {
    headerTitle: "Dashboard",
    requiredAuth: true,
  },
});

const search = ref("");
const router = useRouter();
const snackbar = useSnackbarStore();

const headers = [
  { title: "Registro Acadêmico", value: "ra" },
  { title: "Nome", value: "name" },
  { title: "CPF", value: "cpf" },
  { title: "Ações", value: "actions", sortable: false, align: "center" },
];

const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalStudents = ref(0);
const students = ref<Student[]>([]);
const dialogDelete = ref(false);

const fetchStudents = async () => {
  try {
    const response = await studentService.list(
      currentPage.value,
      itemsPerPage.value,
      search.value
    );
    students.value = response;
    totalStudents.value = response.length;
  } catch (error) {
    console.error("Error fetching students", error);
  }
};

const createStudent = () => {
  router.push("/students/new");
};

const editStudent = (student: Student) => {
  router.push(`/students/${student.ra}`);
};

const confirmDelete = async (student: Student) => {
  try {
    await studentService.delete(student.ra);
    const index = students.value.findIndex((s) => s.ra === student.ra);
    if (index !== -1) {
      students.value.splice(index, 1);
    }
    dialogDelete.value = false;
    snackbar.show({
      message: "Estudante excluído com sucesso!",
      color: "success",
    });
    fetchStudents();
  } catch (error) {
    snackbar.show({
      message: "Erro ao excluir estudante",
      color: "error",
    });
  }
};

const filterData = () => {
  currentPage.value = 1;
  fetchStudents();
};

fetchStudents();

interface Student {
  ra: string;
  name: string;
  email: string;
  cpf: string;
}
</script>
