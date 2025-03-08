import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CompletedTaskList from '../components/list/CompletedTaskList';

const Completed = () => {
  return (
    <View style={styles.mainCard}>
      <CompletedTaskList />
    </View>
  );
};

export default Completed;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    // padding: '3%',
    paddingTop: '10%',
    backgroundColor: '#000',
  },
});
