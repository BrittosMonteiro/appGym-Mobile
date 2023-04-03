import React from 'react';
import {useDispatch} from 'react-redux';
import {Pressable, ScrollView, Text, View} from 'react-native';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header';
import HorizontalRule from '../../components/HorizontalRule';
import Button from '../../components/Button';
import styles from '../../styles';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function TrainingDetail({navigation}) {
  const dispatch = useDispatch();
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

  function deleteActivity() {
    dispatch(setLoading());

    setTimeout(() => {
      dispatch(unsetLoading());
      navigation.goBack();
    }, 1000);
  }

  return (
    <ViewDefault>
      <Header title={'TREINO'} navigation={navigation} />
      <View
        style={[
          styles.main.column,
          styles.gapStyle.gap_5,
          styles.paddingStyle.px_3,
          {
            height: '100%',
          },
        ]}>
        <View style={[styles.main.row, styles.alignment.justifyContent.center]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_28,
              styles.font.weight.semiBold,
            ]}>
            TREINO A
          </Text>
        </View>

        <View
          style={[
            styles.main.column,
            styles.gapStyle.gap_1,
            styles.colors.backgroundColor.dark_3,
            styles.paddingStyle.pa_1,
            {
              borderRadius: 4,
            },
          ]}>
          <Text
            style={[
              styles.font.size.size_16,
              styles.font.weight.medium,
              styles.colors.textColor.white_2,
            ]}>
            TREINOS REALIZADOS: 7
          </Text>
          <Text
            style={[
              styles.font.size.size_16,
              styles.font.weight.medium,
              styles.colors.textColor.white_2,
            ]}>
            ÚLTIMO TREINO: TER, 28 DE MARÇO DE 2023
          </Text>
        </View>

        {details.length > 0 ? (
          <ScrollView
            contentContainerStyle={[styles.main.column, styles.gapStyle.gap_3]}
            showsVerticalScrollIndicator={false}>
            {details.map((activity, index) => (
              <React.Fragment key={index}>
                <View style={[styles.main.column]}>
                  <Text
                    style={[
                      styles.font.size.size_20,
                      styles.font.weight.medium,
                      styles.colors.textColor.white_2,
                    ]}>
                    {activity.title}
                  </Text>

                  {activity.time && (
                    <Text
                      style={[
                        styles.font.size.size_16,
                        styles.font.weight.medium,
                        styles.colors.textColor.white_2,
                      ]}>
                      {activity.time}
                    </Text>
                  )}

                  {activity.machine && (
                    <Text
                      style={[
                        styles.font.size.size_16,
                        styles.font.weight.medium,
                        styles.colors.textColor.white_2,
                      ]}>
                      {`Máquina: ${activity.machine}`}
                    </Text>
                  )}

                  {activity.series && activity.repetitions && (
                    <Text
                      style={[
                        styles.font.size.size_16,
                        styles.font.weight.medium,
                        styles.colors.textColor.white_2,
                      ]}>
                      {`Séries & repetições: ${activity.series}x${activity.repetitions}`}
                    </Text>
                  )}

                  {activity.load && (
                    <Text
                      style={[
                        styles.font.size.size_16,
                        styles.font.weight.medium,
                        styles.colors.textColor.white_2,
                      ]}>
                      {`Carga: ${activity.load}`}
                    </Text>
                  )}
                </View>
                {index < details.length - 1 && (
                  <HorizontalRule color={'#F2C94C'} />
                )}
              </React.Fragment>
            ))}
            <Pressable
              onPress={() =>
                navigation.navigate('ActivityCurrent', {title: 'TREINO A'})
              }>
              <Button title={'IR PARA O TREINO'} type={1} />
            </Pressable>
            <Pressable onPress={() => deleteActivity()}>
              <Button title={'EXCLUIR'} type={0} />
            </Pressable>
          </ScrollView>
        ) : null}
      </View>
    </ViewDefault>
  );
}
