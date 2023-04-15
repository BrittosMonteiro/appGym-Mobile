import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import Button from '../../components/Button';
import HorizontalRule from '../../components/HorizontalRule';
import {CaretRight} from 'phosphor-react-native';
import {readPlanListService} from '../../service/plan';
import {useSelector} from 'react-redux';

export default function PlanList({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [planList, setPlanList] = useState([]);

  async function loadPlans() {
    await readPlanListService(userSession.id)
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

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadPlans();
    });
  }, [navigation]);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'PLANOS'} />
      <ScrollView
        contentContainerStyle={[
          styles.main.column,
          styles.paddingStyle.px_3,
          styles.gapStyle.gap_5,
        ]}>
        <Text
          style={[
            styles.font.size.size_18,
            styles.font.weight.regular,
            styles.colors.textColor.white_2,
          ]}>
          Lista de planos cadastrados
        </Text>
        <View style={[styles.main.row]}>
          <Pressable
            onPress={() => navigation.navigate('PlanManagement', {id: null})}>
            <Button title={'ADICIONAR'} type={2} />
          </Pressable>
        </View>
        {planList.length > 0 ? (
          <View style={[styles.main.column, styles.gapStyle.gap_3]}>
            {planList.map((plan, index) => (
              <React.Fragment key={index}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('PlanManagement', {id: plan.idPlan})
                  }
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
                  <CaretRight
                    color={styles.colors.textColor.white_1.color}
                    weight={'bold'}
                    size={28}
                  />
                </Pressable>
                {index < planList.length - 1 && (
                  <HorizontalRule
                    color={styles.border.color.orange_1.borderColor}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        ) : (
          ''
        )}
      </ScrollView>
    </ViewDefault>
  );
}
