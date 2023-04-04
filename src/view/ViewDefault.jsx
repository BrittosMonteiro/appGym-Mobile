import {SafeAreaView, StatusBar, View} from 'react-native';
import styles from '../styles';
export default function ViewDefault(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={styles.colors.backgroundColor.dark_2.backgroundColor}
        barStyle={'light-content'}
      />
      <View
        style={[
          styles.colors.backgroundColor.dark_2,
          styles.gapStyle.gap_5,
          styles.paddingStyle.pb_3,
          {
            flex: 1,
          },
        ]}>
        {props.children}
      </View>
    </SafeAreaView>
  );
}
