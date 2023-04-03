import {SafeAreaView, StatusBar, View} from 'react-native';
import styles from '../styles';
export default function ViewDefault(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#eee'} barStyle={'dark-content'} />
      <View
        style={[
          styles.colors.backgroundColor.white_2,
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
