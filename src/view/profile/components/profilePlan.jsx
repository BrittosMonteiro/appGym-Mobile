import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import HorizontalRule from '../../../components/HorizontalRule';
import styles from '../../../styles';
import {useSelector} from 'react-redux';

export default function Plan({plan}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [planStatusTitle, setPlanStatusTitle] = useState('');
  const [planStatusColor, setPlanStatusColor] = useState('');

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
      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <View
          style={[
            styles.main.row,
            styles.alignment.justifyContent.space_between,
            styles.alignment.alignItems.flex_start,
          ]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_20,
              styles.font.weight.medium,
            ]}>
            PLANO
          </Text>
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
        </View>

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
      <HorizontalRule />
    </>
  );
}
