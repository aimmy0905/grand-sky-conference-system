import type { AlovaGenerics } from 'alova';
import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import { isEmpty, snakeCase } from 'lodash-es';
import qs from 'qs';
import router from '@/router';
import { useAuthStore } from '@/stores/auth-store';
import decoder from './decoder';

async function handleSuccess(response: AlovaGenerics['Response']) {
  const headers = response.headers;
  const data = await response.json().catch(() => response.text());

  // 跟进项目情况，自行处理返回数据格式
  const result: any = {
    data,
    isResponse: true,
    meta: {},
    status: response.status,
    headers,
  };

  headers.forEach((v: string, k: string) => {
    if (/^x-/i.test(k)) {
      const key = snakeCase(k.replace(/^x-/i, ''));
      result.meta[key] = decoder(v);
    }
  });

  return result;
}

async function handleError(response: any) {
  const err: any = new Error(response.message || 'Network Error');

  if (response.status) {
    try {
      const data = await response.json();
      const { error_message, messages, error: errorMsg, code } = data;
      err.message = error_message || messages || errorMsg || err.message;
      err.code = code;
      err.data = data;
    } catch (e: any) {
      err.message = e?.message || 'Network Error';
    }

    err.status = response.status;

    if (response.status === 401) {
      const authStore = useAuthStore();
      authStore.signOut();
      goToLogin();
      throw err;
    }
  }

  showError(err);
  throw err;
}

const alovaInstance = createAlova({
  baseURL: '/app_api/v1',
  timeout: 30000,
  requestAdapter: adapterFetch(),
  beforeRequest(method) {
    method.config.headers = method.config.headers || {};
    method.config.headers['Content-Type'] = 'application/json';

    if (!method.config.headers.Authorization) {
      const authStore = useAuthStore();
      method.config.headers.Authorization = authStore.accessToken;
    }

    if (!isEmpty(method.config.params)) {
      const queryString = qs.stringify(method.config.params, { arrayFormat: 'brackets' });
      const separator = method.url.includes('?') ? '&' : '?';
      method.url += separator + queryString;
      // Remove params after converting to query string
      delete (method.config as any).params;
    }
  },
  responded: {
    onSuccess: async (response) => {
      if (response.status >= 200 && response.status < 300) {
        return handleSuccess(response);
      }
      return handleError(response);
    },
    onError: handleError,
  },
});

function goToLogin() {
  if (router.currentRoute.value.name !== 'login') {
    router.replace({ name: 'login' });
  }
}

function showError(err: { message: string; [key: string]: any }) {
  // TODO 显示错误信息
  // Toast.fail('Request error');
  console.error(err);
}

export { alovaInstance };
