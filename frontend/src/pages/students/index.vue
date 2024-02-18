<template>
  <v-container>
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="Search"
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="text-md-right">
        <v-btn color="primary" @click="createStudent">Create Student</v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="filteredStudents"
      :search="search"
      item-key="id"
    >
      <template v-slot:item.actions="{ item }">
        Editar <v-icon @click="editStudent(item)">mdi-pencil</v-icon> Excluir
        <v-icon @click="deleteStudent(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { definePage } from "vue-router/auto";

const search = ref("");
const router = useRouter();

definePage({
  meta: {
    headerTitle: "Consulta de Alunos",
    requiredAuth: true,
  },
});

const students = ref<Student[]>([
  { id: 1, name: "John Doe", age: 20 },
  { id: 2, name: "Jane Smith", age: 22 },
]);

const headers = [
  { text: "ID", value: "id" },
  { text: "Name", value: "name" },
  { text: "Age", value: "age" },
  { text: "Actions", value: "actions", sortable: false },
];

const filteredStudents = computed(() => {
  return students.value.filter((student) =>
    student.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const createStudent = () => {
  router.push("/create-student");
};

const editStudent = (student: Student) => {
  router.push(`/edit-student/${student.id}`);
};

const deleteStudent = (student: Student) => {
  const index = students.value.findIndex((s) => s.id === student.id);
  if (index !== -1) {
    students.value.splice(index, 1);
  }
};

interface Student {
  id: number;
  name: string;
  age: number;
}
</script>

 

 