import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Pressable, ScrollView, Text, View} from 'react-native';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header';
import HorizontalRule from '../../components/HorizontalRule';
import Button from '../../components/Button';
import styles from '../../styles';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {PencilSimple} from 'phosphor-react-native';
import {readActivityByIdService} from '../../service/activity';
import {readActivityHistoryByIdService} from '../../service/activityHistory';

export default function TrainingDetail({navigation, route}) {
  const {idActivity} = route.params;
  const dispatch = useDispatch();
  const [activity, setActivity] = useState([]);
  const [activityHistory, setActivityHistory] = useState('');

  async function loadActivity() {
    await readActivityByIdService(idActivity)
      .then(responseFind => {
        if (responseFind) {
          return responseFind.json();
        }
      })
      .then(response => {
        setActivity(response.data);
      })
      .catch(err => {});
  }

  async function loadActivityHistory() {
    await readActivityHistoryByIdService({idActivity})
      .then(responseFind => {
        if (responseFind) {
          return responseFind.json();
        }
      })
      .then(response => {
        setActivityHistory(response.data);
      })
      .catch(err => {});
  }

  useEffect(() => {
    loadActivity();
    loadActivityHistory();
  }, []);

  function deleteActivity() {
    dispatch(setLoading());

    setTimeout(() => {
      dispatch(unsetLoading());
      navigation.goBack();
    }, 1000);
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadActivityHistory();
    });
  }, [navigation]);

  return (
    <ViewDefault>
      <Header title={'DESCRIÇÃO'} navigation={navigation} />
      <View
        style={[
          styles.main.column,
          styles.gapStyle.gap_5,
          styles.paddingStyle.px_3,
          {
            flex: 1,
          },
        ]}>
        <View
          style={[
            styles.main.row,
            styles.alignment.justifyContent.space_between,
            styles.alignment.alignItems.center,
          ]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_28,
              styles.font.weight.semiBold,
            ]}>
            {activity.title}
          </Text>
          <Pressable
            onPress={() => navigation.navigate('ManageActivity', {idActivity})}>
            <PencilSimple
              weight="bold"
              color={styles.colors.textColor.white_1.color}
            />
          </Pressable>
        </View>

        {activityHistory.qty > 0 && (
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
              TREINOS REALIZADOS: {activityHistory.qty}
            </Text>
            <Text
              style={[
                styles.font.size.size_16,
                styles.font.weight.medium,
                styles.colors.textColor.white_2,
              ]}>
              ÚLTIMO TREINO:{' '}
              {new Date(activityHistory.last).toLocaleDateString()}
            </Text>
          </View>
        )}

        {activity?.items ? (
          <ScrollView
            contentContainerStyle={[styles.main.column, styles.gapStyle.gap_3]}
            showsVerticalScrollIndicator={false}>
            {activity.items.map((activity, index) => (
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
                      {`${activity.time} minutos`}
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
                      {`Carga: ${activity.load}kg`}
                    </Text>
                  )}
                </View>
                {index < activity.length - 1 && (
                  <HorizontalRule
                    color={styles.border.color.orange_1.borderColor}
                  />
                )}
              </React.Fragment>
            ))}
            <Pressable
              onPress={() =>
                navigation.navigate('ActivityCurrent', {activity, idActivity})
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
