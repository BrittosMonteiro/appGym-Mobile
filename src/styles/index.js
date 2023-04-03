import {StyleSheet} from 'react-native';
import paddingStyle from './padding';
import gapStyle from './gap';
import font from './font';
import colors from './colors';
import alignment from './alignment';

const main = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  borderRadiusDefault: {
    borderRadius: 4,
  },
  borderBottomLeftRadius_16: {
    borderBottomLeftRadius: 16,
  },
  borderBottomRightRadius_16: {
    borderBottomRightRadius: 16,
  },
});

export default {main, paddingStyle, gapStyle, font, colors, alignment};
