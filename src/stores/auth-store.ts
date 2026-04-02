import type { UserType } from '@/types/user';
import { useMutation } from '@pinia/colada';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { STORAGE_KEYS } from '@/constants';
import { alovaInstance } from '@/utils';

export interface LoginBody {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = useLocalStorage(STORAGE_KEYS.ACCESS_TOKEN_KEY, '');

  const loginMutation = useMutation({
    mutation: async (body: LoginBody) => {
      const response = await alovaInstance.Post<{ access_token: string; user: UserType }>('sessions', body);
      accessToken.value = response.access_token;
      return response.user;
    },
  });

  function signOut() {
    accessToken.value = '';
  }

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    loginMutation,
    signOut,
    accessToken,
  };
});
