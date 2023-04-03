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
      <Pressable onPress={() => setIsChecked(!isChecked)} disabled={isStopped}>
        {isChecked ? (
          <CheckSquare weight="bold" size={24} color="#27AE60" />
        ) : (
          <Square
            weight="bold"
            size={24}
            color="#1e1e1e"
            style={isStopped && {opacity: 0.25}}
          />
        )}
      </Pressable>
      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.dark_2,
            styles.font.size.size_20,
            styles.font.weight.medium,
          ]}>
          {activity.title}
        </Text>

        {activity.time && (
          <Text
            style={[
              styles.colors.textColor.dark_3,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            {activity.time}
          </Text>
        )}

        {activity.machine && (
          <Text
            style={[
              styles.colors.textColor.dark_3,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            {`Máquina: ${activity.machine}`}
          </Text>
        )}

        {activity.series && activity.repetitions && (
          <Text
            style={[
              styles.colors.textColor.dark_3,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            {`Séries & repetições: ${activity.series}x${activity.repetitions}`}
          </Text>
        )}

        {activity.load && (
          <Text
            style={[
              styles.colors.textColor.dark_3,
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
