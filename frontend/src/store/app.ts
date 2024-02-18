import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAppStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(localStorage.getItem('accessToken'));
  const user = ref<{ username: string; role: string } | null>({
    username: "",
    role: ""
  });

  const isLoggedIn = computed(() => !!accessToken.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  if (accessToken.value) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  }

  const login = (token: string, userInfo: { username: string; role: string }) => {
    accessToken.value = token;
    user.value = userInfo;
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  const logout = () => {
    accessToken.value = null;
    user.value = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  return {
    accessToken,
    user,
    isLoggedIn,
    isAdmin,
    login,
    logout
  };
});
