import axiosClient from 'services/axiosClient';

export const getToken = {
  requestApi(params) {
    const url = `/auth/login/zalo`;
    return axiosClient.get(url, { params });
  },
};

export const logout = {
  requestApi(params) {
    const url = `/auth/logout`;
    return axiosClient.get(url, { params });
  },
};

export const getProfile = {
  requestApi(params) {
    const url = `/users/me`;
    return axiosClient.get(url, { params });
  },
};

export const userActivate = {
  requestApi(email, params) {
    const url = `/activate/request?email=${email}`;
    return axiosClient.get(url, { params });
  },
};

export const userConfirm = {
  requestApi(code, params) {
    const url = `/activate/confirm?code=${code}`;
    return axiosClient.get(url, { params });
  },
};
