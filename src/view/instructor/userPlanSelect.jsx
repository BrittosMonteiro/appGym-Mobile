import React, {useEffect, useState} from 'react';
import {LogBox, Pressable, ScrollView, Text, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import {useDispatch, useSelector} from 'react-redux';
import {readPlanListService} from '../../service/plan';
import {CaretRight, Check, Circle, X} from 'phosphor-react-native';
import HorizontalRule from '../../components/HorizontalRule';
import Button from '../../components/Button';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {createGymUser} from '../../service/user';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function UserPlanSelect({navigation, route}) {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const {user} = route.params;
  const [planList, setPlanList] = useState([]);
  const [idPlan, setIdPlan] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  async function loadPlans() {
    await readPlanListService(userSession.idGym)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setPlanList(response.data);
      })
      .catch(err => {});
  }

  async function createUser() {
    dispatch(setLoading());
    if (!idPlan) {
      console.log('Escolha um plano');
      dispatch(unsetLoading());
      return;
    }

    const data = {...user, idPlan};

    await createGymUser(data)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          navigation.navigate('Users');
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'SELECIONAR UM PLANO'} />
      <View
        style={[
          styles.main.column,
          styles.gapStyle.gap_5,
          styles.paddingStyle.px_3,
          {flex: 1},
        ]}>
        <Text
          style={[
            styles.font.size.size_18,
            styles.font.weight.regular,
            styles.colors.textColor.white_2,
          ]}>
          Selecionar um plano para{' '}
          <Text style={[styles.font.weight.medium]}>
            {user.name.split(' ')[0]}
          </Text>
          :
        </Text>

        {planList.length > 0 ? (
          <ScrollView
            contentContainerStyle={[styles.main.column, styles.gapStyle.gap_1]}>
            {planList.map((plan, index) => (
              <React.Fragment key={index}>
                <Pressable
                  onPress={() => {
                    setIdPlan(plan.idPlan);
                    setSelectedPlan(plan);
                  }}
                  style={[
                    styles.main.row,
                    styles.alignment.justifyContent.space_between,
                  ]}>
                  <Text
                    style={[
                      styles.font.weight.medium,
                      styles.font.size.size_20,
                      styles.colors.textColor.white_2,
                    ]}>
                    {plan.title}
                  </Text>
                  <Circle
                    weight={idPlan === plan.idPlan ? 'fill' : 'bold'}
                    size={24}
                    color={styles.colors.textColor.white_1.color}
                  />
                </Pressable>
                {(index < planList.length - 1 || selectedPlan) && (
                  <HorizontalRule
                    color={styles.border.color.orange_1.borderColor}
                  />
                )}
                <></>
              </React.Fragment>
            ))}
            {selectedPlan && (
              <View
                style={[
                  styles.main.column,
                  styles.gapStyle.gap_3,
                  styles.colors.backgroundColor.dark_3,
                  styles.main.borderRadiusDefault,
                  styles.paddingStyle.pa_1,
                ]}>
                <Text
                  style={[
                    styles.font.size.size_20,
                    styles.font.weight.medium,
                    styles.colors.textColor.white_2,
                  ]}>
                  PLANO SELECIONADO: {selectedPlan.title}
                </Text>
                <View style={[styles.main.column, styles.gapStyle.gap_3]}>
                  {selectedPlan.description && (
                    <Text
                      style={[
                        styles.font.size.size_18,
                        styles.font.weight.regular,
                        styles.colors.textColor.white_2,
                      ]}>
                      {selectedPlan.description}
                    </Text>
                  )}

                  <View style={[styles.main.column, styles.gapStyle.gap_1]}>
                    <Text
                      style={[
                        styles.colors.textColor.white_1,
                        styles.font.size.size_16,
                        styles.font.weight.regular,
                      ]}>
                      ITENS INCLUSOS
                    </Text>

                    <View style={[styles.main.column, styles.gapStyle.gap_1]}>
                      {selectedPlan.isIncluded.length > 0 ? (
                        <>
                          {selectedPlan.isIncluded.map((item, index) => (
                            <View
                              key={index}
                              style={[
                                styles.main.row,
                                styles.alignment.alignItems.center,
                                styles.gapStyle.gap_1,
                              ]}>
                              <Check
                                color={styles.colors.textColor.green_1.color}
                                weight="fill"
                                size={24}
                              />
                              <Text
                                key={index}
                                style={[
                                  styles.colors.textColor.white_1,
                                  styles.font.size.size_18,
                                  styles.font.weight.medium,
                                ]}>
                                {item.title}
                              </Text>
                            </View>
                          ))}
                        </>
                      ) : (
                        <Text
                          style={[
                            styles.colors.textColor.white_1,
                            styles.font.size.size_18,
                            styles.font.weight.medium,
                          ]}>
                          NENHUM ITEM
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={[styles.main.column, styles.gapStyle.gap_1]}>
                    <Text
                      style={[
                        styles.colors.textColor.white_1,
                        styles.font.size.size_16,
                        styles.font.weight.regular,
                      ]}>
                      ITENS NÃO INCLUSOS
                    </Text>

                    <View style={[styles.main.column, styles.gapStyle.gap_1]}>
                      {selectedPlan.notIncluded.length > 0 ? (
                        <>
                          {selectedPlan.notIncluded.map((item, index) => (
                            <View
                              key={index}
                              style={[
                                styles.main.row,
                                styles.alignment.alignItems.center,
                                styles.gapStyle.gap_1,
                              ]}>
                              <X
                                color={styles.colors.textColor.red_1.color}
                                weight="fill"
                                size={24}
                              />
                              <Text
                                key={index}
                                style={[
                                  styles.colors.textColor.white_1,
                                  styles.font.size.size_18,
                                  styles.font.weight.medium,
                                ]}>
                                {item.title}
                              </Text>
                            </View>
                          ))}
                        </>
                      ) : (
                        <Text
                          style={[
                            styles.colors.textColor.white_1,
                            styles.font.size.size_18,
                            styles.font.weight.medium,
                          ]}>
                          NENHUM ITEM
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        ) : (
          ''
        )}
        <Pressable onPress={() => createUser()}>
          <Button title={'CONCLUIR'} type={1} />
        </Pressable>
      </View>
    </ViewDefault>
  );
}
