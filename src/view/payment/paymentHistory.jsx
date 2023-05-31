import React from 'react';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {Card, ContainerScroll, CustomText} from '../style';
import {Column, Row} from '../profile/components/style';
import {ContainerListItemTitle} from '../workout/components/style';

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
      <HorizontalRule />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 32}}>
        <CustomText>Histórico de pagamentos do seu plano</CustomText>
        <Card $black $fullWidth $padding>
          {paymentList.map((payment, index) => (
            <React.Fragment key={index}>
              <Column $gap>
                <Row $align={'center'} $justifyContent={'space-between'}>
                  <ContainerListItemTitle>
                    {payment.month}
                  </ContainerListItemTitle>
                  <CustomText
                    $color={'#fcf3f3'}
                    style={
                      payment.status && [
                        {
                          backgroundColor: '#219653',
                          borderRadius: 4,
                          paddingHorizontal: 8,
                        },
                      ]
                    }>
                    {payment.status ? 'PAGO' : 'ABERTO'}
                  </CustomText>
                </Row>
                <CustomText
                  $color={'#fcf3f3'}>{`R$ ${payment.total}`}</CustomText>
              </Column>
              {index < paymentList.length - 1 && (
                <HorizontalRule color={'#fcf3f3'} />
              )}
            </React.Fragment>
          ))}
        </Card>
      </ContainerScroll>
    </ViewDefault>
  );
}
