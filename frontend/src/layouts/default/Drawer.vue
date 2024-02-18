<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="rail"
    permanent
    @click="rail = false"
  >
    <template v-if="isLoggedIn">
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/lego/3.jpg"
        :title="user.username"
        nav
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          prepend-icon="mdi-home-city"
          title="Alunos"
          @click="navigateTo('/alunos')"
        ></v-list-item>
        <v-list-item
          v-if="isLoggedIn"
          prepend-icon="mdi-logout"
          title="Logout"
          @click="logout"
        ></v-list-item>
      </v-list>
    </template>

    <template v-else>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/lego/1.jpg"
        title="Realize o Login"
        nav
      >
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>
      <v-list-item @click="navigateTo('/login')" nav>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item prepend-icon="mdi-login" title="Login"></v-list-item>
        </v-list>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const drawer = ref(true);
const rail = ref(true);

const isLoggedIn = ref(false);

const user = ref({
  username: "Eduardo Cappellotto",
});

const router = useRouter();

const login = () => {
  isLoggedIn.value = true;
};

const logout = () => {
  isLoggedIn.value = false;
};

const navigateTo = (path: string) => {
  router.push(path);
};
</script>
