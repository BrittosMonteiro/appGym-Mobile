import React, {useEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';

import styles from '../../../styles';
import {TrashSimple} from 'phosphor-react-native';

export default function ManageActivityItem({
  activity,
  deleteItemFromList,
  index,
}) {
  console.log(activity);
  const [load, setLoad] = useState('');
  const [machine, setMachine] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [series, setSeries] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (activity) {
      setLoad(activity.load);
      setMachine(activity.machine);
      setRepetitions(activity.repetitions);
      setSeries(activity.series);
      setTime(activity.time);
    }
  }, []);

  return (
    <View style={[styles.main.column, styles.gapStyle.gap_3]}>
      <Text
        style={[
          styles.font.size.size_18,
          styles.font.weight.medium,
          styles.colors.textColor.white_1,
        ]}>
        {activity.title}
      </Text>
      <View
        style={[
          styles.main.row,
          styles.alignment.alignItems.flex_start,
          styles.alignment.justifyContent.space_between,
          styles.gapStyle.gap_3,
        ]}>
        <View style={[styles.main.column, styles.gapStyle.gap_1, {flex: 1}]}>
          <Text
            style={[
              styles.font.size.size_16,
              styles.font.weight.regular,
              styles.colors.textColor.white_1,
            ]}>
            CARGA
          </Text>
          <TextInput
            style={[
              styles.font.size.size_18,
              styles.font.weight.regular,
              styles.colors.textColor.white_1,
              styles.colors.backgroundColor.dark_3,
              styles.paddingStyle.py_1,
              styles.paddingStyle.px_2,
            ]}
            placeholder="CARGA EM KG"
            placeholderTextColor={styles.colors.textColor.gray_1.color}
            keyboardType="numeric"
            defaultValue={load}
            onChangeText={text => setLoad(text)}
          />
        </View>

        <View style={[styles.main.column, styles.gapStyle.gap_1, {flex: 1}]}>
          <Text
            style={[
              styles.font.size.size_16,
              styles.font.weight.regular,
              styles.colors.textColor.white_1,
            ]}>
            MÁQUINA
          </Text>
          <TextInput
            style={[
              styles.font.size.size_18,
              styles.font.weight.regular,
              styles.colors.textColor.white_1,
              styles.colors.backgroundColor.dark_3,
              styles.paddingStyle.py_1,
              styles.paddingStyle.px_2,
            ]}
            placeholder="MÁQUINA"
            placeholderTextColor={styles.colors.textColor.gray_1.color}
            keyboardType="numeric"
            defaultValue={machine}
            onChangeText={text => setMachine(text)}
          />
        </View>
      </View>

      <View
        style={[
          styles.main.row,
          styles.alignment.alignItems.flex_start,
          styles.alignment.justifyContent.space_between,
          styles.gapStyle.gap_3,
        ]}>
        <View style={[styles.main.column, styles.gapStyle.gap_1, {flex: 1}]}>
          <Text
            style={[
              styles.font.size.size_16,
              styles.font.weight.regular,
              styles.colors.textColor.white_1,
            ]}>
            REPETIÇÕES
          </Text>
          <TextInput
            style={[
              styles.font.size.size_18,
              styles.font.weight.regular,
              styles.colors.textColor.white_1,
              styles.colors.backgroundColor.dark_3,
              styles.paddingStyle.py_1,
              styles.paddingStyle.px_2,
            ]}
            placeholder="REPETIÇÕES"
            placeholderTextColor={styles.colors.textColor.gray_1.color}
            keyboardType="numeric"
            defaultValue={repetitions}
            onChangeText={text => setRepetitions(text)}
          />
        </View>

        <View style={[styles.main.column, styles.gapStyle.gap_1, {flex: 1}]}>
          <Text
            style={[
              styles.font.size.size_16,
              styles.font.weight.regular,
              styles.colors.textColor.white_1,
            ]}>
            SÉRIES
          </Text>
          <TextInput
            style={[
              styles.font.size.size_18,
              styles.font.weight.regular,
              styles.colors.textColor.white_1,
              styles.colors.backgroundColor.dark_3,
              styles.paddingStyle.py_1,
              styles.paddingStyle.px_2,
            ]}
            placeholder="SÉRIES"
            placeholderTextColor={styles.colors.textColor.gray_1.color}
            keyboardType="numeric"
            defaultValue={series}
            onChangeText={text => setSeries(text)}
          />
        </View>
      </View>

      <View
        style={[
          styles.main.row,
          styles.alignment.alignItems.flex_end,
          styles.alignment.justifyContent.space_between,
          styles.gapStyle.gap_3,
        ]}>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.font.size.size_16,
              styles.font.weight.regular,
              styles.colors.textColor.white_1,
            ]}>
            TEMPO
          </Text>
          <TextInput
            style={[
              styles.font.size.size_18,
              styles.font.weight.regular,
              styles.colors.textColor.white_1,
              styles.colors.backgroundColor.dark_3,
              styles.paddingStyle.py_1,
              styles.paddingStyle.px_2,
            ]}
            placeholder="TEMPO EM MINUTOS"
            placeholderTextColor={styles.colors.textColor.gray_1.color}
            keyboardType="numeric"
            defaultValue={time}
            onChangeText={text => setTime(text)}
          />
        </View>
        <Pressable
          onPress={() => {
            deleteItemFromList(index);
          }}>
          <TrashSimple
            color={styles.colors.textColor.red_1.color}
            size={28}
            weight="bold"
          />
        </Pressable>
      </View>
    </View>
  );
}