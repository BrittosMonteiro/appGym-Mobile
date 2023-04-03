import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule';
import styles from '../../styles';
import Button from '../../components/Button';

export default function TrainingDetail({navigation}) {
  const details = [
    {
      id: 1,
      load: null,
      machine: null,
      repetitions: null,
      series: null,
      time: '5 minutos',
      title: 'ESTEIRA',
    },
    {
      id: 2,
      load: 23,
      machine: 37,
      repetitions: 12,
      series: 3,
      time: null,
      title: 'SUPINO RETO - HALTER',
    },
  ];
  return (
    <ViewDefault>
      <Header title={'TREINO A'} navigation={navigation} />
      <View
        style={[
          styles.main.column,
          styles.gapStyle.gap_5,
          styles.paddingStyle.px_3,
          {
            height: '100%',
          },
        ]}>
        {/* <View style={[styles.main.row, styles.alignment.justifyContent.center]}>
          <Text
            style={[
              styles.colors.textColor.dark_2,
              styles.font.size.size_28,
              styles.font.weight.semiBold,
            ]}>
            TREINO A
          </Text>
        </View> */}

        <View
          style={[
            styles.main.column,
            styles.gapStyle.gap_1,
            styles.colors.backgroundColor.dark_2,
            styles.paddingStyle.pa_1,
            {
              borderRadius: 4,
            },
          ]}>
          <Text
            style={[
              styles.font.size.size_16,
              styles.font.weight.medium,
              styles.colors.textColor.white_1,
            ]}>
            TREINOS REALIZADOS: 7
          </Text>
          <Text
            style={[
              styles.font.size.size_16,
              styles.font.weight.medium,
              styles.colors.textColor.white_1,
            ]}>
            ÚLTIMO TREINO: TER, 28 DE MARÇO DE 2023
          </Text>
        </View>

        {details.length > 0 ? (
          <ScrollView
            contentContainerStyle={[styles.main.column, styles.gapStyle.gap_3]}>
            {details.map((activity, index) => (
              <React.Fragment key={index}>
                <View style={[styles.main.column]}>
                  <Text
                    style={[
                      styles.font.size.size_20,
                      styles.font.weight.medium,
                      styles.colors.textColor.dark_2,
                    ]}>
                    {activity.title}
                  </Text>

                  {activity.time && (
                    <Text
                      style={[
                        styles.font.size.size_16,
                        styles.font.weight.medium,
                        styles.colors.textColor.dark_3,
                      ]}>
                      {activity.time}
                    </Text>
                  )}

                  {activity.machine && (
                    <Text
                      style={[
                        styles.font.size.size_16,
                        styles.font.weight.medium,
                        styles.colors.textColor.dark_3,
                      ]}>
                      {`Máquina: ${activity.machine}`}
                    </Text>
                  )}

                  {activity.series && activity.repetitions && (
                    <Text
                      style={[
                        styles.font.size.size_16,
                        styles.font.weight.medium,
                        styles.colors.textColor.dark_3,
                      ]}>
                      {`Séries & repetições: ${activity.series}x${activity.repetitions}`}
                    </Text>
                  )}

                  {activity.load && (
                    <Text
                      style={[
                        styles.font.size.size_16,
                        styles.font.weight.medium,
                        styles.colors.textColor.dark_3,
                      ]}>
                      {`Carga: ${activity.load}`}
                    </Text>
                  )}
                </View>
                {index < details.length - 1 && (
                  <HorizontalRule color={'#ff6500'} />
                )}
              </React.Fragment>
            ))}
            <Pressable
              onPress={() =>
                navigation.navigate('ActivityCurrent', {title: 'TREINO A'})
              }>
              <Button title={'IR PARA O TREINO'} type={1} />
            </Pressable>
            <Pressable>
              <Button title={'EXCLUIR'} type={0} />
            </Pressable>
          </ScrollView>
        ) : null}
      </View>
    </ViewDefault>
  );
}
