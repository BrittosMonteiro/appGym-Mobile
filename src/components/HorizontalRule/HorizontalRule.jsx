import {StyleSheet, View} from 'react-native';

export default function HorizontalRule({color}) {
  return (
    <View
      style={{
        borderBottomColor: `${color}` || '#fefefe',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '100%',
      }}
    />
  );
}
