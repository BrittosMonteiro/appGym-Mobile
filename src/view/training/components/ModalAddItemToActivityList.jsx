import React, {useEffect, useState} from 'react';
import {Modal, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import styles from '../../../styles';
import {CaretLeft, Plus} from 'phosphor-react-native';
import {Column, Row} from '../../profile/components/style';
import {
  ButtonDefault,
  ContainerScroll,
  CustomText,
  InputDataDefault,
} from '../../style';
import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../../components/TrainingList/style';
import {readActivityListService} from '../../../service/activity';
import {useDispatch} from 'react-redux';
import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {
  setMessageError,
  setMessageOff,
} from '../../../store/actions/systemAction';

export default function ModalAddItemToActivityList({
  open,
  onClose,
  addItemToList,
}) {
  const DISPATCH = useDispatch();
  const [originalList, setOriginalList] = useState([]);
  const [availableActivities, setAvailableActivities] = useState([]);
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function loadActivities() {
    DISPATCH(setLoading());
    await readActivityListService()
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setOriginalList(response.data);
        setAvailableActivities(response.data);
      })
      .catch(() => {
        setMessage(['system_message_workout_could_not_load_list']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadActivities();
  }, []);

  function filterExercises(text) {
    setAvailableActivities(
      originalList.filter(
        exercises =>
          exercises.title.includes(text.toLowerCase()) ||
          exercises.title.includes(text.toUpperCase()),
      ),
    );
  }

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
              height: '100%',
            },
          ]}>
          <Row $align={'center'} $justifyContent={'space-between'}>
            <ButtonDefault onPress={() => onClose()}>
              <CaretLeft color={'#202020'} weight="regular" size={24} />
            </ButtonDefault>
            <CustomText $weight={'Medium'} $fontSize={18}>
              {t('title_available_exercises')}
            </CustomText>
          </Row>
          <ContainerScroll
            contentContainerStyle={{alignItems: 'flex-start', gap: 16}}>
            <InputDataDefault
              $padding={16}
              $bgColor={props => props.theme.colors.black_01}
              $color={props => props.theme.colors.white_02}
              placeholder={t('lbl_search')}
              keyboardType={'default'}
              inputMode={'text'}
              onChangeText={text => filterExercises(text)}
            />
            {availableActivities.map((activity, index) => (
              <React.Fragment key={index}>
                <ContainerListItem
                  onPress={() => {
                    addItemToList(activity);
                    onClose();
                  }}>
                  <Column $gap>
                    <CustomText $fontSize={14}>
                      {activity.group.toUpperCase()}
                    </CustomText>
                    <ContainerListItemTitle $color={'#202020'}>
                      {activity.title.toUpperCase()}
                    </ContainerListItemTitle>
                  </Column>
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
