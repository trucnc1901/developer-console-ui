import axiosClient from 'services/axiosClient';

const { REACT_APP_MINIAP_BASE_API } = process.env;

export const getToken = {
  requestApi(auth, params) {
    const url = `${REACT_APP_MINIAP_BASE_API}/auth/login/zalo?auth_code=${auth}`;
    return axiosClient.get(url, { params });
  },
};

export const logout = {
  requestApi(params) {
    const url = `${REACT_APP_MINIAP_BASE_API}/auth/logout`;
    return axiosClient.get(url, { params });
  },
};

export const getProfile = {
  requestApi(params) {
    const url = `${REACT_APP_MINIAP_BASE_API}/users/me`;
    return axiosClient.get(url, { params });
  },
};

export const userActivate = {
  requestApi(email, params) {
    const url = `${REACT_APP_MINIAP_BASE_API}/activate/request?email=${email}`;
    return axiosClient.get(url, { params });
  },
};

export const userConfirm = {
  requestApi(code, params) {
    const url = `${REACT_APP_MINIAP_BASE_API}/activate/confirm?code=${code}`;
    return axiosClient.get(url, { params });
  },
};
