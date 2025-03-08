import React, {useRef, useState} from 'react';
import {
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import CoustomSafeView from '../components/coustomView/CoustomSafeView.js';
import textStyle from '../utils/fontStyles.js';
import {Height, Width} from '../utils/globalwinSize.js';
import {images} from '../utils/images.js';
import {strings} from '../utils/string.js';
import Navigation from '../navigation/stackNavigation/Navigation.js';
import {useNavigation} from '@react-navigation/native';

const Intro = () => {
  const navigation = useNavigation();
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    if (currentPage < 2) {
      pagerRef.current.setPage(currentPage + 1);
    } else {
      // console.log(' BackHandler');
      navigation.navigate('WelcomeScreen');
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      pagerRef.current.setPage(currentPage - 1);
    } else {
      // console.log(' BackHandler.exitApp()');
      BackHandler.exitApp();
    }
  };

  const handleSkip = () => {
    pagerRef.current.setPage(2); // Skip to the last page
  };

  const IntroModal = ({path, header, detail}) => {
    return (
      <View style={styles.introModalMainCard}>
        <TouchableOpacity style={styles.skipBtnStyle} onPress={handleSkip}>
          <Text style={[textStyle.caption, {color: '#8875FF', fontSize: 15}]}>
            Skip
          </Text>
        </TouchableOpacity>
        <Image source={path} resizeMode="contain" style={styles.imageStyle} />
        <View style={styles.dotCard}>
          {[0, 1, 2].map(index => (
            <View
              key={index}
              style={[
                styles.dotStyle,
                {backgroundColor: currentPage === index ? '#FFF' : 'gray'},
              ]}
            />
          ))}
        </View>
        <View style={styles.detailsCard}>
          <Text style={textStyle.headerMedium}>{header}</Text>
          <Text
            style={[textStyle.paragraph, {textAlign: 'center', fontSize: 18}]}>
            {detail}
          </Text>
        </View>
        <View style={styles.btnCard}>
          <TouchableOpacity
            style={[styles.nextStyle, {backgroundColor: '#000'}]}
            onPress={goToPreviousPage}
            // disabled={currentPage === 0}
          >
            <Text
              style={[textStyle.paragraph, {marginBottom: 0, color: 'gray'}]}>
              BACK
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextStyle}
            onPress={goToNextPage}
            // disabled={currentPage === 2}
          >
            <Text style={[textStyle.paragraph, {marginBottom: 0}]}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <CoustomSafeView>
      <View style={styles.mainCard}>
        <PagerView
          ref={pagerRef}
          scrollEnabled={true}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={e => handlePageChange(e.nativeEvent.position)}>
          <View key="1">
            <IntroModal
              header={strings.intro.intr1.header}
              detail={strings.intro.intr1.details}
              path={images.intro.intro1}
            />
          </View>
          <View key="2">
            <IntroModal
              header={strings.intro.intr2.header}
              detail={strings.intro.intr2.details}
              path={images.intro.intro2}
            />
          </View>
          <View key="3">
            <IntroModal
              header={strings.intro.intr3.header}
              detail={strings.intro.intr3.details}
              path={images.intro.intro3}
            />
          </View>
        </PagerView>
      </View>
    </CoustomSafeView>
  );
};

export default Intro;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    paddingHorizontal: '3%',
    paddingVertical: '4%',
  },
  pagerView: {
    flex: 1,
  },
  introModalMainCard: {
    flex: 1,
    alignItems: 'center',
  },
  imageStyle: {
    height: Height * 0.5,
    width: Width * 0.5,
  },
  skipBtnStyle: {
    borderWidth: 1,
    borderColor: '#8875FF',
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  dotCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  dotStyle: {
    width: 20,
    height: 4,
    borderRadius: 5,
  },
  detailsCard: {
    marginTop: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
    gap: 10,
  },
  btnCard: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    marginTop: Height * 0.15,
  },
  nextStyle: {
    backgroundColor: '#8875FF',
    height: Height * 0.05,
    width: Width * 0.3,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
