import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {use} from 'react';
import textStyle from '../../utils/fontStyles';
import SmallBtn from '../Buttons/SmallBtn';
import {useNavigation} from '@react-navigation/native';
import {
  compltedTaskService,
  deleteTaskService,
} from '../../services/servicesCall/servicesCall';
import {endPoint} from '../../services/userApi/Api';
import {images} from '../../utils/images';

const TeskCard = ({item, onRefresh}) => {
  const navigation = useNavigation();
  const deleteApi = `${endPoint.management.deleteTaskById}${item?._id}`;
  let status = item?.status === 'pending' ? 'completed' : 'pending';
  const markCompleteApi = `${endPoint.management.markCompleted}${item?._id}/status`;

  const editHandler = () => {
    navigation.navigate('UpDateTask', {
      _id: item?._id,
      title: item?.title,
      description: item?.description,
    });
  };

  const deleteAlert = () => {
    Alert.alert('DELETING TASK', 'Are you sure you want to detlet this task.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => deleteHandler(),
      },
    ]);
  };

  const completedAlert = () => {
    Alert.alert(
      `${status.toUpperCase()} TASK`,
      `Are you sure you want to mark ${status} this task.`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => completeHandler(),
        },
      ],
    );
  };
  const deleteHandler = async () => {
    console.log('deleteApi====>', deleteApi);
    const res = await deleteTaskService({deleteApi});
    if (res) {
      onRefresh();
    }
  };

  const completeHandler = async () => {
    console.log('markCompleteApi===>', markCompleteApi);
    const data = {status: status};
    const res = await compltedTaskService({markCompleteApi, data});
    if (res) {
      onRefresh();
    }
  };

  const headerColor = '#000';
  console.log('item====>', item);
  return (
    <View style={styles.cardView}>
      <View style={styles.headerCard}>
        <Text
          style={[
            textStyle.headerSmall,
            {
              color: headerColor,
            },
          ]}>
          {item?.title.length > 20
            ? item?.title.slice(0, 19) + '...'
            : item?.title}
        </Text>
        <View style={styles.smallBtnCard}>
          <SmallBtn
            onPress={editHandler}
            tintColor={'#8875FF'}
            source={images.taskCard.pencil}
          />
          <SmallBtn
            onPress={deleteAlert}
            tintColor={'#8875FF'}
            source={images.taskCard.delete}
          />
          <SmallBtn
            onPress={completedAlert}
            source={
              item?.status !== 'pending'
                ? images.taskCard.completed
                : images.taskCard.pending
            }
          />
        </View>
      </View>
      <Text style={[textStyle.paragraph, {color: headerColor}]}>
        {item?.description.length > 30
          ? item?.description.slice(0, 29) + '...'
          : item?.description}
      </Text>
    </View>
  );
};

export default TeskCard;

const styles = StyleSheet.create({
  cardView: {
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#FFFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallBtnCard: {
    flexDirection: 'row',
    gap: 15,
  },
});
