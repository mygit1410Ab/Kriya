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
import {useNavigation, useRoute} from '@react-navigation/native';
import {images} from '../utils/images';
import {Height, Width} from '../utils/globalwinSize';
import {endPoint} from '../services/userApi/Api';
import {updateTaskService} from '../services/servicesCall/servicesCall';
import Loader from '../components/loader/Loader';

const UpdateTask = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const _id = route?.params?._id;
  const headerTextColor = '#8687E7';
  const api = `${endPoint?.management?.upDateTask}/${_id}`;

  const [title, setTitle] = useState(route.params?.title || '');
  const [description, setDescription] = useState(
    route.params?.description || '',
  );
  const [loading, setLoading] = useState(false);

  const backHandler = () => navigation.goBack();

  const validateAndSave = () => {
    if (!title.trim()) {
      Alert.alert('Title Required', 'Please enter a title before saving.');
      return;
    }
    if (!description.trim()) {
      Alert.alert(
        'Description Required',
        'Please enter a description before saving.',
      );
      return;
    }
    saveTaskHandler();
  };

  const saveTaskHandler = async () => {
    try {
      setLoading(true);
      const response = await updateTaskService({
        api,
        data: {title, description},
        navigation,
      });
      console.log('Response:', response);
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'Failed to save task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeView>
      <View style={styles.mainCard}>
        <View style={styles.headerCard}>
          <BackArrowBtn onPress={backHandler} />
          <View style={styles.headerTextCard}>
            <Text style={[textStyle.headerMedium, {color: headerTextColor}]}>
              {strings.upDateTaskScreen.header}
            </Text>
          </View>
        </View>

        <View style={styles.titleCard}>
          <TextInput
            style={[styles.titleInputStyle, textStyle.headerSmall]}
            multiline
            placeholder="Title"
            placeholderTextColor="gray"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.descriptionCard}>
          <TextInput
            style={[styles.descriptionInput, textStyle.paragraph]}
            multiline
            placeholder="Note"
            placeholderTextColor="gray"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <TouchableOpacity onPress={validateAndSave} style={styles.saveBtnCard}>
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

export default UpdateTask;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    alignItems: 'center',
  },
  headerCard: {
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
    width: '100%',
    alignItems: 'center',
  },
  titleInputStyle: {
    width: '90%',
    marginTop: '3%',
  },
  descriptionCard: {
    width: '90%',
    paddingHorizontal: '3%',
  },
  descriptionInput: {
    width: '90%',
    color: '#FFF',
  },
  headerTextCard: {
    flex: 1,
    alignItems: 'center',
  },
  saveBtnCard: {
    position: 'absolute',
    alignSelf: 'flex-end',
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
