import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomSafeView from '../components/coustomView/CoustomSafeView';
import BackArrowBtn from '../components/Buttons/BackArrowBtn';
import {strings} from '../utils/string';
import textStyle from '../utils/fontStyles';
import {useNavigation} from '@react-navigation/native';
import CoustomButton from '../components/Buttons/CoustomButton';
import {Height} from '../utils/globalwinSize';

const WelcomeScreen = () => {
  const navigate = useNavigation();
  const backBtnHandler = () => {
    navigate.goBack();
  };
  const loginHandler = () => {
    navigate.navigate('LogIn');
  };
  const signUpHandler = () => {
    navigate.navigate('SignUp');
  };
  return (
    <CustomSafeView>
      <View style={styles.mainCard}>
        <BackArrowBtn onPress={backBtnHandler} />
        <View style={styles.detailsCard}>
          <Text style={textStyle.headerLarge}>
            {strings.welcomeScreen.header}
          </Text>
          <Text
            style={[textStyle.paragraph, {textAlign: 'center', fontSize: 18}]}>
            {strings.welcomeScreen.details}
          </Text>
        </View>
        <View style={styles.btnCard}>
          <CoustomButton
            backgroundColor={'#8875FF'}
            title={'LOGIN'}
            onPress={loginHandler}
            width={'90%'}
            height={Height * 0.06}
            borderRadius={5}
          />
          <CoustomButton
            backgroundColor={'#000'}
            title={'CREATE ACCOUNT'}
            onPress={signUpHandler}
            width={'90%'}
            height={Height * 0.06}
            borderRadius={5}
            borderColor={'#8875FF'}
            borderWidth={2}
          />
        </View>
      </View>
    </CustomSafeView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    // backgroundColor: 'red',
    padding: '3%',
    paddingVertical: '5%',
  },
  detailsCard: {
    width: '100%',
    padding: 30,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  btnCard: {
    gap: 30,
    alignItems: 'center',
    marginTop: Height * 0.45,
  },
});
