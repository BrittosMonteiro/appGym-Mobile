import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../../../components/TrainingList/style';
import {Column} from '../../../profile/components/style';
import {CustomText} from '../../../style';
import {PencilSimple, Trash} from 'phosphor-react-native';
import ModalDeleteExercise from './ModalDeleteExercise';
import ModalCreateAndUpdateExercise from './ModalCreateAndUpdateExercise';

export default function ExerciseItem({exercise, reload}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  function closeModal() {
    setOpenDelete(false);
    setOpenEdit(false);
  }
  return (
    <React.Fragment>
      <ContainerListItem onPress={() => {}}>
        <Column $gap>
          <CustomText $fontSize={14}>{exercise.group.toUpperCase()}</CustomText>
          <ContainerListItemTitle $color={'#202020'}>
            {exercise.title.toUpperCase()}
          </ContainerListItemTitle>
        </Column>
        <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
          <Pressable onPress={() => setOpenEdit(true)}>
            <PencilSimple weight="regular" size={24} color={'#202020'} />
          </Pressable>
          <Pressable onPress={() => setOpenDelete(true)}>
            <Trash weight="regular" size={24} color={'#EB5757'} />
          </Pressable>
        </View>
      </ContainerListItem>
      <ModalCreateAndUpdateExercise
        onClose={closeModal}
        open={openEdit}
        reload={reload}
        exercise={exercise}
      />
      <ModalDeleteExercise
        onClose={closeModal}
        open={openDelete}
        idItem={exercise.id}
        reload={reload}
      />
    </React.Fragment>
  );
}
