import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomSafeView from '../components/coustomView/CoustomSafeView';
import textStyle from '../utils/fontStyles';
import Tasklist from '../components/list/Tasklist';
import {images} from '../utils/images';
import {Height} from '../utils/globalwinSize';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const addTaskHandler = () => {
    navigation.navigate('AddTaskScreen');
  };

  return (
    <View style={styles.mainCard}>
      <Tasklist />
      <TouchableOpacity onPress={addTaskHandler} style={styles.addBtnCard}>
        <Image
          resizeMode="contain"
          source={images.homeScreen}
          style={styles.addStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    // padding: '3%',
    paddingTop: '10%',
    backgroundColor: '#000',
  },
  addBtnCard: {
    borderWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    alignSelf: 'flex-end',
    // height: '50%',
    // width: '10%',
    backgroundColor: '#8687E7',
    bottom: '3%',
    right: '3%',
    borderRadius: Height * 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  addStyle: {height: 50, width: 50},
});
