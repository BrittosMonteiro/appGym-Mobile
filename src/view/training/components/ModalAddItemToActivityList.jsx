import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';

import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import styles from '../../../styles';
import {Plus, XCircle} from 'phosphor-react-native';
import {Row} from '../../profile/components/style';
import {ButtonDefault, ContainerScroll, CustomText} from '../../style';
import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../../components/TrainingList/style';

export default function ModalAddItemToActivityList({
  open,
  onClose,
  addItemToList,
}) {
  const [availableActivities, setAvailableActivities] = useState([]);

  const ACTIVITIES_LIST = [
    {
      id: 1,
      title: 'ESTEIRA',
    },
    {
      id: 2,
      title: 'SUPINO',
    },
    {
      id: 3,
      title: 'CRUCIFIXO',
    },
    {
      id: 4,
      title: 'TRICEPS',
    },
    {
      id: 5,
      title: 'ELEVAÇÃO LATERAL',
    },
    {
      id: 6,
      title: 'REMADA',
    },
    {
      id: 7,
      title: 'ROTAÇÃO DE TRONCO',
    },
    {
      id: 8,
      title: 'ROSCA',
    },
    {
      id: 9,
      title: 'EXTENSÃO DE TRONCO',
    },
    {
      id: 10,
      title: 'LEG PRESS',
    },
    {
      id: 10,
      title: 'EXTENSÃO DE JOELHOS',
    },
    {
      id: 11,
      title: 'FLEXÃO DE JOELHOS',
    },
    {
      id: 12,
      title: 'ABDUÇÃO DE QUADRIL',
    },
    {
      id: 13,
      title: 'ADUÇÃO DE QUADRIL',
    },
    {
      id: 14,
      title: 'EXTENSÃO DE QUADRIL',
    },
    {
      id: 15,
      title: 'ABDOMINAL',
    },
    {
      id: 16,
      title: 'ALONGAMENTO',
    },
    {
      id: 17,
      title: 'PULL UP',
    },
    {
      id: 18,
      title: 'DIP',
    },
  ];

  useEffect(() => {
    setAvailableActivities(ACTIVITIES_LIST);
  }, []);

  return (
    <Modal animationType="fade" visible={open} transparent={true}>
      <View
        style={[
          styles.alignment.alignItems.center,
          styles.alignment.justifyContent.center,
          styles.paddingStyle.pa_3,
          {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        ]}>
        <View
          style={[
            styles.colors.backgroundColor.white_1,
            styles.main.column,
            styles.paddingStyle.pa_3,
            styles.main.borderRadiusDefault,
            styles.gapStyle.gap_5,
            {
              width: '100%',
              maxWidth: 400,
              height: '100%',
              maxHeight: 600,
            },
          ]}>
          <Row $align={'center'} $justifyContent={'space-between'}>
            <CustomText $weight={'Medium'} $fontSize={18}>
              ATIVIDADES DISPONÍVEIS
            </CustomText>
            <ButtonDefault onPress={() => onClose()}>
              <XCircle color={'#EB5757'} weight="regular" size={28} />
            </ButtonDefault>
          </Row>
          <ContainerScroll
            contentContainerStyle={{alignItems: 'flex-start', gap: 24}}>
            {availableActivities.map((activity, index) => (
              <React.Fragment key={index}>
                <ContainerListItem
                  onPress={() => {
                    addItemToList(activity);
                    onClose();
                  }}>
                  <ContainerListItemTitle $color={'#202020'}>
                    {activity.title}
                  </ContainerListItemTitle>
                  <Plus weight="regular" size={24} color={'#202020'} />
                </ContainerListItem>
                {index < availableActivities.length - 1 && (
                  <HorizontalRule color={'#202020'} />
                )}
              </React.Fragment>
            ))}
          </ContainerScroll>
        </View>
      </View>
    </Modal>
  );
}
