import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CustomSafeView from '../components/coustomView/CoustomSafeView';
import {strings} from '../utils/string';
import textStyle from '../utils/fontStyles';
import BackArrowBtn from '../components/Buttons/BackArrowBtn';
import {useNavigation} from '@react-navigation/native';
import {images} from '../utils/images';
import {Height, Width} from '../utils/globalwinSize';
import {endPoint} from '../services/userApi/Api';
import {createTeskService} from '../services/servicesCall/servicesCall';
import Loader from '../components/loader/Loader';

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const headerTextcolor = '#8687E7';
  const api = endPoint?.management?.createTask;
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const backHandler = () => {
    navigation.goBack();
  };

  const validation = () => {
    if (!title.trim()) {
      Alert.alert(
        'Title cannot be empty',
        'Please enter the title before save.',
      );
      return;
    }

    if (!description.trim()) {
      Alert.alert(
        'Description cannot be empty',
        'Please enter the description  before save.',
      );
      return;
    }
    saveTaskHandler();
  };

  const saveTaskHandler = async () => {
    const res = await createTeskService({
      api,
      data: {
        title,
        description,
      },
      setLoading,
      navigation,
    });
    console.log('res===>', res);
  };

  return (
    <CustomSafeView>
      <View style={styles.mainCard}>
        <View style={styles.headerCard}>
          <BackArrowBtn onPress={backHandler} />
          <View style={styles.headertextCard}>
            <Text style={[textStyle.headerMedium, {color: headerTextcolor}]}>
              {strings.addTaskScreen.header}
            </Text>
          </View>
        </View>
        <View style={styles.titleCard}>
          <TextInput
            style={[styles.titleInputStyle, textStyle.headerSmall]}
            multiline={true}
            placeholder="Title:"
            placeholderTextColor={'gray'}
            onChangeText={text => setTitle(text.trim())}
          />
        </View>
        <View style={styles.descriptionCard}>
          <TextInput
            style={[
              styles.descriptionInput,
              textStyle.paragraph,
              // {paddingVertical: 20, lineHeight: 24},
            ]}
            multiline={true}
            placeholder="Note:"
            placeholderTextColor={'gray'}
            autoFocus={true}
            onChangeText={text => setDescription(text.trim())}
          />
        </View>
        <TouchableOpacity onPress={validation} style={styles.saveBtnCard}>
          <Image
            resizeMode="contain"
            source={images.addTaskScreen}
            style={styles.addStyle}
          />
        </TouchableOpacity>
        {loading && (
          <View style={styles.loaderCard}>
            <Loader visible={loading} />
          </View>
        )}
      </View>
    </CustomSafeView>
  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    alignItems: 'center',
  },
  headerCard: {
    // borderWidth: 1,
    height: '8%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    paddingHorizontal: '3%',
  },
  titleCard: {
    // borderColor: '#FFF',
    // borderWidth: 1,
    width: '100%',
    // padding: '3%',
    alignItems: 'center',
  },
  titleInputStyle: {
    // borderWidth: 1,
    // borderColor: '#FFF',
    width: '90%',
    marginTop: '3%',
  },
  descriptionInput: {
    // borderWidth: 1,
    // borderColor: '#FFF',
    // flex: 0.98,
    width: '90%',
    color: '#FFF',
  },
  descriptionCard: {
    // borderWidth: 1,
    // borderColor: '#FFF',
    width: '90%',
    paddingHorizontal: '3%',
  },
  headertextCard: {
    flex: 1,
    alignItems: 'center',
  },
  saveBtnCard: {
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
  addStyle: {
    height: 50,
    width: 50,
    tintColor: '#FFF',
  },
  loaderCard: {
    flex: 1,
    position: 'absolute',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    height: Height * 0.8,
    width: Width * 1,
  },
});
