import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import styles from '../../../styles';
import HorizontalRule from '../../../components/HorizontalRule';
import PlanItems from './planItems';
import {CaretDown, CaretUp} from 'phosphor-react-native';

export default function Plan({plan}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [planStatusTitle, setPlanStatusTitle] = useState('');
  const [planStatusColor, setPlanStatusColor] = useState('');
  const [expand, setExpand] = useState(false);

  const planStatus = [
    {
      title: 'ATIVO',
      color: styles.colors.backgroundColor.green_1,
    },
    {
      title: 'EXPIRADO',
      color: styles.colors.backgroundColor.red_1,
    },
  ];

  function compareDates() {
    const today = new Date().getTime();
    const formatedDate = new Date(userSession.planValidDate).getTime();

    if (today <= formatedDate) {
      setPlanStatusTitle(planStatus[0].title);
      setPlanStatusColor(planStatus[0].color);
    } else {
      if (today > formatedDate) {
        setPlanStatusTitle(planStatus[1].title);
        setPlanStatusColor(planStatus[1].color);
      }
    }
  }

  useEffect(() => {
    compareDates();
  }, [userSession.planValidDate]);

  return (
    <>
      <View style={[styles.main.column, styles.gapStyle.gap_3]}>
        <View
          style={[
            styles.main.row,
            styles.alignment.justifyContent.space_between,
            styles.alignment.alignItems.center,
          ]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_20,
              styles.font.weight.medium,
            ]}>
            PLANO
          </Text>

          <Pressable onPress={() => setExpand(!expand)}>
            {expand ? (
              <CaretDown
                color={styles.colors.textColor.white_1.color}
                weight="bold"
                size={24}
              />
            ) : (
              <CaretUp
                color={styles.colors.textColor.white_1.color}
                weight="bold"
                size={24}
              />
            )}
          </Pressable>
        </View>

        {expand && (
          <React.Fragment>
            <View
              style={[
                styles.main.row,
                styles.alignment.justifyContent.space_between,
                styles.alignment.alignItems.flex_start,
              ]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.medium,
                ]}>
                {plan.title}
              </Text>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.medium,
                ]}>
                R$ {plan.price.toString().replace('.', ',')}
              </Text>
            </View>

            <View
              style={[
                styles.main.row,
                styles.alignment.justifyContent.space_between,
                styles.alignment.alignItems.flex_start,
              ]}>
              <Text
                style={[
                  styles.font.size.size_16,
                  styles.font.weight.medium,
                  styles.colors.textColor.white_1,
                  styles.font.weight.medium,
                  styles.main.borderRadiusDefault,
                  styles.paddingStyle.px_1,
                  planStatusColor,
                ]}>
                {planStatusTitle}
              </Text>
              {userSession.planValidDate && (
                <Text
                  style={[
                    styles.colors.textColor.white_2,
                    styles.font.size.size_16,
                    styles.font.weight.regular,
                  ]}>
                  VÁLIDO ATÉ:{' '}
                  {new Date(userSession.planValidDate).toLocaleDateString()}
                </Text>
              )}
            </View>

            <PlanItems
              isIncluded={plan.isIncluded}
              notIncluded={plan.notIncluded}
            />
          </React.Fragment>
        )}
      </View>
      <HorizontalRule />
    </>
  );
}