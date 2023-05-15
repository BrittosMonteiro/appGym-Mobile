import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {Column, Label, Row} from '../../profile/components/style';
import {ButtonDefault, ContainerTitle, CustomText} from '../../style';
import {PencilSimple, Trash} from 'phosphor-react-native';
import ModalSetActivityDefinitions from './ModalSetActivityDefinitions';

export default function ManageActivityItem({
  activity,
  deleteItemFromList,
  index,
  updateTraining,
}) {
  const [openModal, setOpenModal] = useState(false);
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <Column $gap>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <CustomText $color="#fcf3f3" $fontSize={18} $weight="Medium">
            {activity.title.toUpperCase()}
          </CustomText>
          <Row $align={'center'} $justifyContent={'space-between'}>
            <ButtonDefault $noPadding onPress={() => setOpenModal(true)}>
              <PencilSimple color="#fcf3f3" weight="regular" size={24} />
            </ButtonDefault>
            <ButtonDefault $noPadding onPress={() => deleteItemFromList(index)}>
              <Trash color="#EB5757" weight="regular" size={24} />
            </ButtonDefault>
          </Row>
        </Row>
        <Row $align={'center'} $justifyContent={'space-between'}>
          {activity.machine && (
            <Label>{`${t('lbl_machine')}: ${activity.machine}`}</Label>
          )}
        </Row>
        <Row $align={'center'} $justifyContent={'flex-start'}>
          {activity.series && (
            <Label>{`${t('lbl_series')}: ${activity.series}`}</Label>
          )}
          {activity.repetitions && (
            <Label>{`${t('lbl_repetitions')}: ${activity.repetitions}`}</Label>
          )}
          {activity.load && (
            <Label>{`${t('lbl_load')}: ${activity.load}kg`}</Label>
          )}
          {activity.time && (
            <Label>{`${t('lbl_time')}: ${activity.time} ${t(
              'lbl_minutes',
            )}`}</Label>
          )}
        </Row>
        <Row $align={'center'} $justifyContent={'flex-start'}>
          {activity.note && <Label>{`${activity.note}`}</Label>}
        </Row>
      </Column>
      <ModalSetActivityDefinitions
        activity={activity}
        index={index}
        openModal={openModal}
        setOpenModal={setOpenModal}
        updateTraining={updateTraining}
      />
    </React.Fragment>
  );
}
