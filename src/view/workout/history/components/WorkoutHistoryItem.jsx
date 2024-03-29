import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {Trash} from 'phosphor-react-native';

import {Column, Row} from '../../../profile/components/style';
import {CustomText} from '../../../style';
import DeleteWorkoutHistory from './DeleteWorkoutHistory';

export default function WorkoutHistoryItem({navigation, reload, workout}) {
  const [openModal, setOpenModal] = useState(false);

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <React.Fragment>
      <Column $gap $fullWidth>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <Pressable
            onPress={() =>
              workout.idWorkout &&
              navigation.navigate('WorkoutDetail', {
                idActivity: workout.idWorkout,
              })
            }>
            <CustomText $fontSize={18} $weight={'SemiBold'}>
              {workout.title}
            </CustomText>
          </Pressable>
          <Pressable onPress={() => setOpenModal(true)}>
            <Trash color={'#EB5757'} weight="regular" size={24} />
          </Pressable>
        </Row>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <CustomText $fontSize={14}>{workout.totalTime}</CustomText>
          <CustomText $fontSize={14}>
            {new Date(workout.date).toLocaleDateString()}
          </CustomText>
        </Row>
      </Column>
      <DeleteWorkoutHistory
        idWorkoutHistory={workout.id}
        openModal={openModal}
        onClose={closeModal}
        reload={reload}
      />
    </React.Fragment>
  );
}
