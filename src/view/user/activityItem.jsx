import {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {CheckSquare, Square} from 'phosphor-react-native';
import styles from '../../styles';

export default function ActivityItem({activity, isStopped}) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View
      style={[
        styles.main.row,
        styles.gapStyle.gap_1,
        styles.alignment.alignItems.flex_start,
      ]}>
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        {isChecked ? (
          <CheckSquare
            weight="bold"
            size={24}
            color={styles.colors.textColor.green_1.color}
          />
        ) : (
          <Square
            weight="bold"
            size={24}
            color={styles.colors.textColor.white_1.color}
          />
        )}
      </Pressable>
      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_20,
            styles.font.weight.medium,
          ]}>
          {activity.title}
        </Text>

        {activity.time && (
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            {activity.time}
          </Text>
        )}

        {activity.machine && (
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            {`Máquina: ${activity.machine}`}
          </Text>
        )}

        {activity.series && activity.repetitions && (
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            {`Séries & repetições: ${activity.series}x${activity.repetitions}`}
          </Text>
        )}

        {activity.load && (
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            {`Carga: ${activity.load}`}
          </Text>
        )}
      </View>
    </View>
  );
}
