import {Pressable, Text, View} from 'react-native';
import styles from '../styles';

export default function Tab({changeTab, selectedTab, tabList}) {
  return (
    <View style={[styles.main.row, styles.gapStyle.gap_3]}>
      {tabList.map((item, index) => (
        <Pressable
          onPress={() => changeTab(index)}
          key={index}
          style={[
            selectedTab === index && [styles.colors.backgroundColor.dark_3],
            styles.paddingStyle.pa_1,
            styles.alignment.alignItems.center,
            styles.main.borderRadiusDefault,
            {flex: 1},
          ]}>
          <Text
            style={[
              styles.font.size.size_20,
              styles.font.weight.medium,
              styles.colors.textColor.white_1,
            ]}>
            {item.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
