import {StyleSheet} from 'react-native';
import Colors from './color';

export const textStyle = StyleSheet.create({
  // Header styles
  headerLarge: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF', // Primary text color
    marginBottom: 10,
  },
  headerMedium: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  headerSmall: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 6,
  },

  // Subheader styles
  subHeaderLarge: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: 8,
  },
  subHeaderSmall: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
    marginBottom: 6,
  },

  // Paragraph styles
  paragraph: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.white,
    lineHeight: 20,
    marginBottom: 10,
  },
  paragraphBold: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
    lineHeight: 20,
    marginBottom: 10,
  },
  paragraphItalic: {
    fontSize: 14,
    fontStyle: 'italic',
    color: Colors.white,
    lineHeight: 20,
    marginBottom: 10,
  },

  // Caption styles
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.white,
    lineHeight: 16,
    marginBottom: 4,
  },
  captionBold: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
    lineHeight: 16,
    marginBottom: 4,
  },

  // Link styles
  link: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007BFF', // Typical link color
    textDecorationLine: 'underline',
  },

  // Button text styles
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },
  buttonTextSecondary: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
  },

  // Overline style
  overline: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  // Error text styles
  errorText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.error, // Typical error color
    marginBottom: 6,
  },
});

export default textStyle;
