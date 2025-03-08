import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CoustomSafeView from '../components/coustomView/CoustomSafeView';
import Colors from '../utils/color';
import {strings} from '../utils/string';
import textStyle from '../utils/fontStyles';
import {Width} from '../utils/globalwinSize';
// import {images} from '../utils/images';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoustomButton from '../components/Buttons/CoustomButton';
import BackArrowBtn from '../components/Buttons/BackArrowBtn';
import CoustomTextInput from '../components/InputBox/CoustomTextInput';
import CoustomPasswordBox from '../components/InputBox/CoustomPasswordBox';
import EmailValidator from 'email-validator';
import {logInService} from '../services/servicesCall/servicesCall';
import {endPoint} from '../services/userApi/Api';
import Loader from '../components/loader/Loader';

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMess, setEmailErrMess] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrMess, setpasswordErrMess] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const backBtnHandler = () => {
    // BackHandler.exitApp();
    navigation.goBack();
  };
  const alreadyAccountHandler = () => {
    navigation.navigate('SignUp');
  };
  const logInValidation = () => {
    if (!email) {
      setEmailErr(true);
      setEmailErrMess('Email is required');
      return 'Email is required';
    }

    if (!EmailValidator.validate(email)) {
      setEmailErr(true);
      setEmailErrMess('Invalid email format');
      return 'Invalid email format';
    }

    if (!password) {
      setPasswordErr(true);
      setpasswordErrMess('Password is required');
      return 'Password is required';
    }

    logInHandler();
    return null; // No errors
  };

  const logInHandler = async () => {
    await logInService({
      endPoint: endPoint.auth.logIn,
      data: {
        email,
        password,
      },
      setLoading,
      navigation,
    });
  };

  const emailHandler = text => {
    setEmail(text.trim().toLowerCase());
  };
  const passwordHandler = text => {
    setPassword(text);
  };

  const emailFocusHandler = () => {
    setEmailErr(false);
    setEmailErrMess('');
  };
  const passwordFocusHandler = () => {
    setPasswordErr(false);
    setpasswordErrMess('');
  };

  return (
    <CoustomSafeView>
      <View style={styles.mainCard}>
        <BackArrowBtn onPress={backBtnHandler} />
        <Text
          style={[
            textStyle.headerLarge,
            {
              fontSize: Width * 0.1,
              marginTop: Width * 0.05,
              left: Width * 0.01,
            },
          ]}>
          {strings.logIn.header}
        </Text>
        <View style={styles.inputMainCard}>
          <CoustomTextInput
            onChangeText={emailHandler}
            placeHolder={'Enter Your Email'}
            lable={'Email:'}
            onErro={emailErr}
            errorMess={emailErrMess}
            onFocus={emailFocusHandler}
          />
          <CoustomPasswordBox
            onChangeText={passwordHandler}
            placeHolder={'Enter Your Password'}
            lable={'Password:'}
            onErro={passwordErr}
            errorMess={passwordErrMess}
            onFocus={passwordFocusHandler}
          />
          <View style={styles.forgotPassWordCard}>
            <Text style={[textStyle.paragraphItalic, {color: '#8875FF'}]}>
              Forgot your password?
            </Text>
          </View>
        </View>
        <View style={styles.btnCard}>
          <CoustomButton
            height={40}
            width={'90%'}
            borderRadius={8}
            title={'LOGIN'}
            onPress={logInValidation}
            backgroundColor={'#8875FF'}
          />
          <Text style={textStyle.paragraph}>
            {strings.logIn.goToSignUp}{' '}
            <Text
              onPress={alreadyAccountHandler}
              style={[textStyle.paragraphBold, {color: '#8875FF'}]}>
              {' Register'}
            </Text>
          </Text>
        </View>
        {loading && <Loader visible={loading} />}
      </View>
    </CoustomSafeView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    paddingHorizontal: '3%',
    paddingVertical: '4%',
  },
  inputMainCard: {
    // borderWidth: 1,
    // borderColor: '#FFF',
    gap: 10,
  },
  btnCard: {
    // borderWidth: 1,
    // borderColor: '#FFF',
    marginTop: '30%',
    // padding: '3%',
    alignItems: 'center',
    gap: 15,
  },
  forgotPassWordCard: {
    alignItems: 'flex-end',
  },
});
