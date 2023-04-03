import {Text, View} from 'react-native';
import styles from '../styles';

export default function Button({title, type}) {
  return (
    <View
      style={[
        styles.paddingStyle.py_1,
        styles.alignment.justifyContent.center,
        styles.alignment.alignItems.center,
        styles.main.borderRadiusDefault,
        type === 0 && styles.colors.backgroundColor.red_1,
        type === 1 && styles.colors.backgroundColor.green_1,
      ]}>
      <Text
        style={[
          styles.colors.textColor.white_1,
          styles.font.weight.medium,
          styles.font.size.size_18,
        ]}>
        {title}
      </Text>
    </View>
  );
}
