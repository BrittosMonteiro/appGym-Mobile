import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {Trash} from 'phosphor-react-native';

import {Column, Row} from '../../profile/components/style';
import {CustomText} from '../../style';
import ModalDeleteWorkoutHistory from './ModalDeleteWorkoutHistory';

export default function WorkoutHistoryItem({workout, reload}) {
  const [openModal, setOpenModal] = useState(false);

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <React.Fragment>
      <Column $gap $fullWidth>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <CustomText $fontSize={18} $weight={'SemiBold'}>
            {workout.title}
          </CustomText>
          <Pressable onPress={() => setOpenModal(true)}>
            <Trash color={'#EB5757'} weight="regular" size={24} />
          </Pressable>
        </Row>
        <CustomText $fontSize={14}>{workout.date}</CustomText>
      </Column>
      <ModalDeleteWorkoutHistory
        idWorkoutHistory={workout.id}
        openModal={openModal}
        onClose={closeModal}
        reload={reload}
      />
    </React.Fragment>
  );
}
