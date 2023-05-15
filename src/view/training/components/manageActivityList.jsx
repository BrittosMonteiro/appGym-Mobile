import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import ManageActivityItem from './manageActivityItem';
import ModalAddItemToActivityList from './ModalAddItemToActivityList';
import {Label, Row} from '../../profile/components/style';
import {ButtonDefault, Card, CustomText} from '../../style';

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
    <Card $black $padding $fullWidth>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <CustomText $color={'#fcf3f3'} $fontSize={18} $weight={'Medium'}>
          {title}
        </CustomText>
        <ButtonDefault $turquoise onPress={() => setOpenModal(!openModal)}>
          <Label>{t('lbl_add')}</Label>
        </ButtonDefault>
      </Row>
      {selectedActivities.length > 0 ? (
        <React.Fragment>
          {selectedActivities.map((activity, index) => (
            <React.Fragment key={index}>
              <ManageActivityItem
                activity={activity}
                index={index}
                deleteItemFromList={deleteItemFromList}
                updateTraining={updateTraining}
              />
              {index < selectedActivities.length - 1 && (
                <HorizontalRule color={'#fcf3f3'} />
              )}
            </React.Fragment>
          ))}
        </React.Fragment>
      ) : (
        <Row $justifyContent={'center'}>
          <Label>{t('empty_exercises_list')}</Label>
        </Row>
      )}
      <ModalAddItemToActivityList
        open={openModal}
        onClose={closeModal}
        addItemToList={addItemToList}
      />
    </Card>
  );
}
