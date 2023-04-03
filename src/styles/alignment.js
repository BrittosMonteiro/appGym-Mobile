import {StyleSheet} from 'react-native';

const alignItems = StyleSheet.create({
  baseline: {
    alignItems: 'baseline',
  },
  center: {
    alignItems: 'center',
  },
  flex_end: {
    alignItems: 'flex-end',
  },
  flex_start: {
    alignItems: 'flex-start',
  },
  stretch: {
    alignItems: 'stretch',
  },
});

const justifyContent = StyleSheet.create({
  jc_center: {},
  center: {
    justifyContent: 'center',
  },
  flex_end: {
    justifyContent: 'flex-end',
  },
  flex_start: {
    justifyContent: 'flex-start',
  },
  space_around: {
    justifyContent: 'space-around',
  },
  space_between: {
    justifyContent: 'space-between',
  },
  space_evenly: {
    justifyContent: 'space-evenly',
  },
});

export default {alignItems, justifyContent};
