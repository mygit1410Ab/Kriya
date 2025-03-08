import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../../screens/SplashScreen';
import LogIn from '../../screens/LogIn';
import SignUp from '../../screens/SignUp';
// import ForgotPassword from '../../screens/ForgotPassword';
// import BottomTabNavigation from '../bottomTabNavigation/BottomTabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from '../../screens/Intro';
import WelcomeScreen from '../../screens/WelcomeScreen';
import BottomTabNavigation from '../bottomTabNavigation/BottomTabNavigation';
import AddTaskScreen from '../../screens/AddTaskScreen';
import UpDateTask from '../../screens/UpDateTask';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [initialRouteName, setInitialRouteName] = React.useState(null); // null indicates no route is set yet
  const [isSplashVisible, setIsSplashVisible] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        // console.log('value===>', value);
        if (value !== null) {
          setInitialRouteName('BottomTabNavigation');
        } else {
          setInitialRouteName('Intro');
        }
      } catch (e) {
        console.log('Error reading auth data:', e);
        setInitialRouteName('Intro');
      }
    };

    // Fetch async data and show splash for 3 seconds
    fetchData();

    const splashTimeout = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => clearTimeout(splashTimeout); // Clear timeout if component unmounts
  }, []);

  if (isSplashVisible) {
    // Show Splash Screen for 3 seconds
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
        <Stack.Screen name="UpDateTask" component={UpDateTask} />
        {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
