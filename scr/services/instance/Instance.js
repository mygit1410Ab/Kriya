import axios from 'axios';
import {base_URL} from '../URL/Base_URL';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: base_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axios.post(`${base_URL}/refresh-token`, {
      refreshToken,
    });

    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;

    await AsyncStorage.setItem('token', newAccessToken);
    await AsyncStorage.setItem('refreshToken', newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        Snackbar.show({
          text: 'Session expired. Please log in again.',
          duration: Snackbar.LENGTH_SHORT,
        });

        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('refreshToken');

        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
      console.log('API Response Error:', error.response.data);
      Snackbar.show({
        text: error.response.data.message || 'Something went wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default instance;
