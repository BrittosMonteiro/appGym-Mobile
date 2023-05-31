import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {PencilSimple, Trash} from 'phosphor-react-native';

import ExerciseDefinitions from './ExerciseDefinitions';

import {Column, Row} from '../../profile/components/style';
import {CustomText} from '../../style';

export default function ExerciseDetail({
  activity,
  deleteItemFromList,
  displayIcon,
  index,
  updateTraining,
}) {
  const [openModal, setOpenModal] = useState(false);
  const {t} = useTranslation();

  return (
    <React.Fragment>
      <Column $gap>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <CustomText
            $fontSize={18}
            $weight={'Medium'}
            $color={props => props.theme.colors.white_02}>
            {activity.title.toUpperCase()}
          </CustomText>
          {displayIcon && (
            <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
              <Pressable onPress={() => setOpenModal(true)}>
                <PencilSimple color={'#fcf3f3'} size={24} />
              </Pressable>
              <Pressable onPress={() => deleteItemFromList(index)}>
                <Trash color={'#EB5757'} size={24} />
              </Pressable>
            </View>
          )}
        </Row>
        {activity.machine && (
          <Row $align={'center'} $justifyContent={'flex-start'}>
            <CustomText
              $fontSize={14}
              $color={props => props.theme.colors.white_02}>{`${t(
              'lbl_machine',
            )}: ${activity.machine}`}</CustomText>
          </Row>
        )}
        {(activity.series ||
          activity.repetitions ||
          activity.load ||
          activity.time) && (
          <>
            <Row $align={'center'} $justifyContent={'flex-start'}>
              {activity.series && (
                <CustomText
                  $fontSize={14}
                  $color={props => props.theme.colors.white_02}>{`${t(
                  'lbl_series',
                )}: ${activity.series}`}</CustomText>
              )}
              {activity.repetitions && (
                <CustomText
                  $fontSize={14}
                  $color={props => props.theme.colors.white_02}>{`${t(
                  'lbl_repetitions',
                )}: ${activity.repetitions}`}</CustomText>
              )}
              {activity.load && (
                <CustomText
                  $fontSize={14}
                  $color={props => props.theme.colors.white_02}>{`${t(
                  'lbl_load',
                )}: ${activity.load}kg`}</CustomText>
              )}
              {activity.time && (
                <CustomText
                  $fontSize={14}
                  $color={props => props.theme.colors.white_02}>{`${t(
                  'lbl_time',
                )}: ${activity.time} ${t('lbl_minutes')}`}</CustomText>
              )}
            </Row>
            <Row $align={'center'} $justifyContent={'flex-start'}>
              {activity.note && (
                <CustomText
                  $fontSize={14}
                  $color={props =>
                    props.theme.colors.white_02
                  }>{`${activity.note}`}</CustomText>
              )}
            </Row>
          </>
        )}
      </Column>
      <ExerciseDefinitions
        activity={activity}
        index={index}
        openModal={openModal}
        setOpenModal={setOpenModal}
        updateTraining={updateTraining}
      />
    </React.Fragment>
  );
}
