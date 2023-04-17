import {Text, View} from 'react-native';

import styles from '../../../styles';

export default function PlanItemsList({icon, list, title}) {
  return (
    <View style={[styles.main.column, styles.gapStyle.gap_1]}>
      <Text
        style={[
          styles.colors.textColor.white_1,
          styles.font.size.size_20,
          styles.font.weight.medium,
        ]}>
        {title}
      </Text>
      <View style={[styles.main.column]}>
        {list.map((item, index) => (
          <View
            key={index}
            style={[
              styles.main.row,
              styles.gapStyle.gap_1,
              styles.alignment.alignItems.center,
            ]}>
            {icon}
            <Text
              style={[
                styles.font.size.size_18,
                styles.font.weight.regular,
                styles.colors.textColor.white_1,
              ]}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
