import AsyncStorage from '@react-native-async-storage/async-storage';
import {method} from '../methods/Method';
import {CommonActions} from '@react-navigation/native';

export const signUpService = async ({
  endPoint,
  data,
  setLoading,
  navigation,
}) => {
  try {
    setLoading(true);
    const res = await method.post(endPoint, data);
    console.log('Signup Success:', res);
    if (res.accessToken) {
      await AsyncStorage.setItem('token', res?.accessToken);
      await AsyncStorage.setItem('refreshToken', res?.refreshToken);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BottomTabNavigation'}],
        }),
      );
    }
  } catch (e) {
    console.log('Signup Error:', e.message);
  } finally {
    setLoading(false);
  }
};

export const logInService = async ({
  endPoint,
  data,
  setLoading,
  navigation,
}) => {
  try {
    setLoading(true);
    const res = await method.post(endPoint, data);
    console.log('logIn Success:', res);
    if (res.accessToken) {
      await AsyncStorage.setItem('token', res?.accessToken);
      await AsyncStorage.setItem('refreshToken', res?.refreshToken);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BottomTabNavigation'}],
        }),
      );
    }
  } catch (e) {
    console.log('logIn Error:', e.message);
  } finally {
    setLoading(false);
  }
};

export const getAllTeskService = async ({api}) => {
  console.log('endPoint', api);
  try {
    const res = await method.get(api);
    console.log('getAllTeskService Success:', res);
    return res;
  } catch (e) {
    console.log('getAllTeskService Error:', e.message);
  }
};
export const getUserService = async ({api}) => {
  console.log('endPoint', api);
  try {
    const res = await method.get(api);
    console.log('getUserService Success:', res);
    return res;
  } catch (e) {
    console.log('getUserService Error:', e.message);
  }
};

export const createTeskService = async ({
  api,
  data,
  setLoading,
  navigation,
}) => {
  console.log('===>', api, data, setLoading);
  try {
    setLoading(true);
    const res = await method.post(api, data);
    console.log('createTeskService', res);
    if (res) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BottomTabNavigation'}],
        }),
      );
    }
  } catch (e) {
    console.log('createTeskService', e.message);
  } finally {
    setLoading(false);
  }
};

export const updateTaskService = async ({api, data, navigation}) => {
  console.log('===>', api, data);
  try {
    const res = await method.put(api, data);
    console.log('createTeskService', res);
    if (res) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BottomTabNavigation'}],
        }),
      );
    }
  } catch (e) {
    console.log('createTeskService', e.message);
  }
};

export const compltedTaskService = async ({markCompleteApi, data}) => {
  console.log('===>', markCompleteApi, data);
  try {
    const res = await method.patch(markCompleteApi, data);
    console.log('compltedTaskService', res);
    return res;
    // if (res) {
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{name: 'BottomTabNavigation'}],
    //     }),
    //   );
    // }
  } catch (e) {
    console.log('compltedTaskService', e.message);
  }
};

export const deleteTaskService = async ({deleteApi}) => {
  console.log('===>', deleteApi);
  try {
    const res = await method.delete(deleteApi);
    console.log('createTeskService', res);
    return res;
    // if (res) {
    //   navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{name: 'BottomTabNavigation'}],
    //     }),
    //   );
    // }
  } catch (e) {
    console.log('createTeskService', e.message);
  }
};

export const logOutService = async ({api, data, setLoading, navigation}) => {
  console.log('===>', api, data);
  try {
    setLoading(true);
    const res = await method.post(api, data);
    console.log('createTeskService', res);
    if (res) {
      await AsyncStorage.clear();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Intro'}],
        }),
      );
    }
  } catch (e) {
    console.log('createTeskService', e.message);
  } finally {
    setLoading(false);
  }
};
