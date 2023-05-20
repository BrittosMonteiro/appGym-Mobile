import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import ModalAddItemToActivityList from './ModalAddItemToActivityList';
import {Row} from '../../profile/components/style';
import {ContainerTitle, CustomText, Link} from '../../style';
import Container2 from '../../../components/Container/Container';
import ExerciseDetail from './ExerciseDetail';

export default function ManageActivityList({
  selectedActivities,
  title,
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
        <Link onPress={() => setOpenModal(!openModal)}>
          <CustomText>{t('lbl_add')}</CustomText>
        </Link>
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
        </Row>
      )}
      <ModalAddItemToActivityList
        open={openModal}
        onClose={closeModal}
        addItemToList={addItemToList}
      />
    </Container2>
  );
}
