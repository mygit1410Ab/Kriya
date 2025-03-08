import React from 'react';
import {StatusBar} from 'react-native';
import Navigation from './scr/navigation/stackNavigation/Navigation';
import Tasklist from './scr/components/list/Tasklist';

if (__DEV__) {
  require('./ReactotronConfig');
}
const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'light-content'}
      />
      <Navigation />
      {/* <Tasklist /> */}
    </>
  );
};

export default App;
