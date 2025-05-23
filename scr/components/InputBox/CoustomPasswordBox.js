import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import textStyle from '../../utils/fontStyles';
import {Height} from '../../utils/globalwinSize';
import {images} from '../../utils/images';

const CoustomPasswordBox = ({
  width,
  height,
  placeHolder,
  lable,
  onChangeText,
  onErro,
  errorMess,
  onFocus,
}) => {
  const [hide, setHide] = useState(true);

  const hideHandler = () => {
    console.log('pressed====>'); // Check if this logs
    setHide(prev => !prev); // Toggle between true/false
  };

  return (
    <View style={[styles.Card]}>
      <Text style={textStyle.headerSmall}>{lable}</Text>
      <View
        style={[styles.inputCard, {borderColor: onErro ? 'red' : '#979797'}]}>
        <TextInput
          style={[styles.inputStyle, textStyle.subHeaderSmall]}
          placeholder={placeHolder}
          placeholderTextColor={'#979797'}
          onChangeText={onChangeText}
          secureTextEntry={hide}
          onFocus={onFocus}
        />
        <TouchableOpacity style={styles.eyeCard} onPress={hideHandler}>
          <Image
            source={hide ? images.passWordCard.hide : images.passWordCard.show}
            style={styles.eyeStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {errorMess && <Text style={textStyle.errorText}>{errorMess}</Text>}
    </View>
  );
};

export default CoustomPasswordBox;

const styles = StyleSheet.create({
  inputCard: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 2,
    height: Height * 0.065,
    backgroundColor: '#535353',
    borderColor: '#979797',
    borderRadius: 5,
  },
  inputStyle: {
    // borderWidth: 2,
    // color: '#FFF',
    paddingHorizontal: 5,
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
    width: '80%',
    height: '100%',
  },
  eyeStyle: {
    height: 25,
    width: 25,
    tintColor: '#FFF',
    // borderWidth: 1,
    // borderColor: '#fff',
  },
  eyeCard: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
