import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {Trash} from 'phosphor-react-native';

import {Column, Row} from '../profile/components/style';
import {CustomText} from '../style';
import ModalDeleteWorkoutGoal from './components/ModalDeleteWorkoutGoal';

export default function GoalHistoryListItem({goal, reload}) {
  const [openModal, setOpenModal] = useState(false);

  function closeModal() {
    setOpenModal(false);
  }
  return (
    <React.Fragment>
      <Column $gap $fullWidth>
        <Row $align={'flex-start'} $justifyContent={'space-between'}>
          <CustomText
            $fontSize={22}
            $weight={'SemiBold'}
            $color={props => props.theme.colors.black_01}>
            {goal.value}
          </CustomText>
          <Pressable onPress={() => setOpenModal(true)}>
            <Trash color={'#EB5757'} size={24} weight="regular" />
          </Pressable>
        </Row>
        <CustomText
          $fontSize={14}
          $color={props => props.theme.colors.black_01}>
          {new Date(goal.createdAt).toLocaleDateString()}
        </CustomText>
      </Column>
      <ModalDeleteWorkoutGoal
        idWorkoutGoal={goal._id}
        openModal={openModal}
        onClose={closeModal}
        reload={reload}
      />
    </React.Fragment>
  );
}
