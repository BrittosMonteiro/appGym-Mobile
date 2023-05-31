import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Plus} from 'phosphor-react-native';

import HorizontalRule from '../../../../components/HorizontalRule/HorizontalRule';
import AvailableExerciseList from './AvailableExerciseList';
import Container2 from '../../../../components/Container/Container';
import ExerciseDetail from '../../components/ExerciseDetail';

import {Row} from '../../../profile/components/style';
import {
  Button,
  ButtonDefault,
  ContainerTitle,
  CustomText,
} from '../../../style';

export default function ExerciseList({
  selectedActivities,
  addItemToList,
  deleteItemFromList,
  updateTraining,
}) {
  const [openModal, setOpenModal] = useState(false);
  const {t} = useTranslation();

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <Container2 gap={16}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ContainerTitle>{t('lbl_workout_description')}</ContainerTitle>
        {selectedActivities.length > 0 && (
          <ButtonDefault $black onPress={() => setOpenModal(!openModal)}>
            <Plus size={24} color="#fcf3f3" />
          </ButtonDefault>
        )}
      </Row>
      {selectedActivities.length > 0 ? (
        <Container2
          gap={16}
          bgColor={props => props.theme.colors.black_01}
          padding={'16px'}>
          {selectedActivities.map((activity, index) => (
            <React.Fragment key={index}>
              <ExerciseDetail
                activity={activity}
                displayIcon={true}
                index={index}
                deleteItemFromList={deleteItemFromList}
                updateTraining={updateTraining}
              />
              {index < selectedActivities.length - 1 && (
                <HorizontalRule color={'#fcf3f3'} />
              )}
            </React.Fragment>
          ))}
        </Container2>
      ) : (
        <Row $justifyContent={'center'}>
          <CustomText>{t('empty_exercises_list')}</CustomText>
          <Button
            $bgColor={props => props.theme.colors.black_01}
            onPress={() => setOpenModal(!openModal)}>
            <Plus size={24} color="#fcf3f3" />
            <CustomText $color={props => props.theme.colors.white_02}>
              {t('lbl_add')}
            </CustomText>
          </Button>
        </Row>
      )}
      <AvailableExerciseList
        open={openModal}
        onClose={closeModal}
        addItemToList={addItemToList}
      />
    </Container2>
  );
}
