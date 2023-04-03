import React from 'react';
import {Text, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule';
import styles from '../../styles';

export default function PaymentHistory({navigation}) {
  const paymentList = [
    {
      id: 1,
      month: 'JANEIRO',
      total: 143.97,
      status: 1,
    },
    {
      id: 1,
      month: 'FEVEREIRO',
      total: 143.97,
      status: 1,
    },
    {
      id: 1,
      month: 'MARÇO',
      total: 143.97,
      status: 1,
    },
    {
      id: 1,
      month: 'ABRIL',
      total: 143.97,
      status: 0,
    },
  ];
  return (
    <ViewDefault>
      <Header navigation={navigation} title={'PAGAMENTO'} />
      <View
        style={[
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
          Histórico de pagamentos do seu plano
        </Text>
        {paymentList.map((payment, index) => (
          <React.Fragment key={index}>
            <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
              <View
                style={[
                  styles.main.row,
                  styles.alignment.justifyContent.space_between,
                ]}>
                <Text
                  style={[
                    styles.font.size.size_16,
                    styles.font.weight.medium,
                    styles.colors.textColor.white_2,
                  ]}>
                  {payment.month}
                </Text>
                <Text
                  style={[
                    styles.font.size.size_14,
                    styles.font.weight.medium,
                    styles.colors.textColor.white_2,
                    payment.status && [
                      styles.colors.backgroundColor.green_1,
                      styles.font.weight.medium,
                      styles.main.borderRadiusDefault,
                      styles.paddingStyle.px_1,
                    ],
                  ]}>
                  {payment.status ? 'PAGO' : 'ABERTO'}
                </Text>
              </View>
              <Text
                style={[
                  styles.font.size.size_18,
                  styles.font.weight.medium,
                  styles.colors.textColor.white_2,
                ]}>
                {`R$ ${payment.total}`}
              </Text>
            </View>
            {index < paymentList.length - 1 && (
              <HorizontalRule color={'#F2C24C'} />
            )}
          </React.Fragment>
        ))}
      </View>
    </ViewDefault>
  );
}
