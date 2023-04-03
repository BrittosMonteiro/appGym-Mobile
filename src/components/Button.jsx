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
        type === 0 && {
          borderColor: '#EB5757',
          borderWidth: 2,
        },
        type === 1 && {
          borderColor: '#27AE60',
          borderWidth: 2,
        },
      ]}>
      <Text
        style={[
          styles.font.weight.medium,
          styles.font.size.size_18,
          type === 0 && {
            color: '#EB5757',
          },
          type === 1 && {
            color: '#27AE60',
          },
        ]}>
        {title}
      </Text>
    </View>
  );
}
