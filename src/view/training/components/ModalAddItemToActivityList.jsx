import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import styles from '../../../styles';
import {Plus, XCircle} from 'phosphor-react-native';
import {Row} from '../../profile/components/style';
import {ButtonDefault, ContainerScroll, CustomText} from '../../style';
import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../../components/TrainingList/style';
import {readActivityListService} from '../../../service/activity';
import {useDispatch} from 'react-redux';
import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';

export default function ModalAddItemToActivityList({
  open,
  onClose,
  addItemToList,
}) {
  const DISPATCH = useDispatch();
  const [availableActivities, setAvailableActivities] = useState([]);
  const {t} = useTranslation();

  async function loadActivities() {
    DISPATCH(setLoading());
    await readActivityListService()
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setAvailableActivities(response.data);
      })
      .catch(err => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadActivities();
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
              {t('title_available_exercises')}
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
                    {activity.title.toUpperCase()}
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
