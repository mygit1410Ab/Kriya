import React, {lazy, Suspense, useCallback, memo} from 'react';
import {StyleSheet, ActivityIndicator, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {images} from '../../utils/images';
import {Height} from '../../utils/globalwinSize';
import CustomHeader from '../../components/headers/CustomHeader';
const HomeScreen = lazy(() => import('../../screens/HomeScreen'));
const Completed = lazy(() => import('../../screens/Completed'));

const Tab = createBottomTabNavigator();

const Loading = () => (
  <ActivityIndicator size="large" color="#DB3022" style={styles.loading} />
);

const BottomTabNavigation = memo(() => {
  const renderHomeIcon = useCallback(
    ({focused}) => (
      <Image
        source={images.bottomTab.home}
        style={[styles.iconImage, {tintColor: focused ? '#FFF' : 'gray'}]}
      />
    ),
    [],
  );

  const renderCompletedIcon = useCallback(
    ({focused}) => (
      <Image
        source={images.bottomTab.completed}
        style={[styles.iconImage, {tintColor: focused ? '#FFF' : 'gray'}]}
      />
    ),
    [],
  );

  return (
    <Suspense fallback={<Loading />}>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          header: () => <CustomHeader />,
          tabBarStyle: styles.tabContainer,
          tabBarActiveTintColor: '#FFF',
          tabBarLabelStyle: styles.labelStyle,
        }}
        initialRouteName="HomeScreen">
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: renderHomeIcon,
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Completed"
          component={Completed}
          options={{
            tabBarIcon: renderCompletedIcon,
            tabBarLabel: 'Completed',
          }}
        />
      </Tab.Navigator>
    </Suspense>
  );
});

export default BottomTabNavigation;

const styles = StyleSheet.create({
  tabContainer: {
    height: Height * 0.08,
    backgroundColor: '#000',
    // borderTopWidth: 1,
    // borderColor: '#FFF',
  },
  labelStyle: {
    fontSize: 13,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    height: 20,
    width: 20,
  },
});
