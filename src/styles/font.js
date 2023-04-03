import {StyleSheet} from 'react-native';

const size = StyleSheet.create({
  size_14: {
    fontSize: 14,
  },
  size_16: {
    fontSize: 16,
  },
  size_18: {
    fontSize: 18,
  },
  size_20: {
    fontSize: 20,
  },
  size_22: {
    fontSize: 22,
  },
  size_24: {
    fontSize: 24,
  },
  size_28: {
    fontSize: 28,
  },
  size_42: {
    fontSize: 42,
  },
});

const weight = StyleSheet.create({
  regular: {
    fontFamily: 'HindVadodara-Regular',
  },
  medium: {
    fontFamily: 'HindVadodara-Medium',
  },
  semiBold: {
    fontFamily: 'HindVadodara-SemiBold',
  },
  bold: {
    fontFamily: 'HindVadodara-Bold',
    lineHeight: 40,
  },
});

export default {size, weight};
