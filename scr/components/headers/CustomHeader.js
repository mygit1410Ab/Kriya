import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import textStyle from '../../utils/fontStyles';
import {Height, Width} from '../../utils/globalwinSize';
import CustomSafeView from '../coustomView/CoustomSafeView';
import {images} from '../../utils/images';
import {endPoint} from '../../services/userApi/Api';
import {logOutService} from '../../services/servicesCall/servicesCall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Loader from '../loader/Loader';

const CustomHeader = () => {
  const api = endPoint.auth.logout;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const logOutHandler = async () => {
    const value = await AsyncStorage.getItem('refreshToken');
    if (value) {
      const data = {refreshToken: value};
      const res = await logOutService({api, data, setLoading, navigation});
      console.log(res);
    }
  };

  return (
    <CustomSafeView>
      <View style={styles.headerContainer}>
        <Image
          source={images.header.logo}
          resizeMode="contain"
          style={styles.logoStyle}
        />
        <Text style={[textStyle.headerLarge, {marginBottom: 0}]}>KriYa</Text>
        <TouchableOpacity onPress={logOutHandler} style={styles.logoutCard}>
          <Image
            source={images.header.logOut}
            resizeMode="contain"
            style={styles.logoutBtn}
          />
        </TouchableOpacity>
      </View>
      {loading && <Loader visible={loading} />}
    </CustomSafeView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'gray',
    height: Height * 0.08,
    shadowColor: '#FFF',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  logoStyle: {
    height: Height * 0.15,
    width: Width * 0.15,
  },
  logoutBtn: {
    height: Height * 0.07,
    width: Width * 0.07,
    tintColor: '#FFF',
  },
  logoutCard: {
    // borderWidth: 1,
    // borderColor: '#FFF',
    padding: 10,
    right: '5%',
    position: 'absolute',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
