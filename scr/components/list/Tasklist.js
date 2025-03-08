import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import {Width} from '../../utils/globalwinSize';
import ListHeaderComponent from '../headers/ListHeaderComponent';
import ListFooterComponent from '../headers/ListFooterComponent';
import ListEmptyComponent from '../headers/ListEmptyComponent';
import {getAllTeskService} from '../../services/servicesCall/servicesCall';
import {endPoint} from '../../services/userApi/Api';
import TaskCard from '../card/TaskCard';

const Tasklist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const api = useMemo(() => endPoint.management.getAllTask, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await getAllTeskService({api});
    if (res) {
      setData(res);
    }
    setLoading(false);
  }, [api]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const res = await getAllTeskService({api});
    if (res) {
      setData(res);
    }
    setRefreshing(false);
  }, [api]);

  const renderItem = useCallback(
    ({item}) => <TaskCard item={item} onRefresh={onRefresh} />,
    [onRefresh],
  );

  return (
    <FlatList
      data={data.reverse()}
      keyExtractor={item => item._id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listCard}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={<ListFooterComponent data={data} />}
      ListEmptyComponent={ListEmptyComponent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['grey']}
          progressBackgroundColor={'black'}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  listCard: {
    flexGrow: 1,
    width: Width * 0.9,
  },
});

export default Tasklist;
