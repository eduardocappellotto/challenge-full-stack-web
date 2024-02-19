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
          @click="navigateTo('/students')"
        ></v-list-item>
        <v-list-item
          v-if="isLoggedIn"
          prepend-icon="mdi-logout"
          title="Logout"
          @click="logoutFlux"
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
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from "../../store/app";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const store = useAppStore();
const { logout } = store;
const { isLoggedIn, user } = storeToRefs(store);

const drawer = ref(true);
const rail = ref(true);

const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
};

const logoutFlux = () => {
  logout();
  router.push("/login");
};
</script>
