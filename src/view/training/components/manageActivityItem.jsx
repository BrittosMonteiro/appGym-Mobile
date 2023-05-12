import React, {useState} from 'react';
import {Column, Label, Row} from '../../profile/components/style';
import {ButtonDefault, ContainerTitle} from '../../style';
import {PencilSimple, Trash} from 'phosphor-react-native';
import ModalSetActivityDefinitions from './ModalSetActivityDefinitions';

export default function ManageActivityItem({
  activity,
  deleteItemFromList,
  index,
  updateTraining,
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <React.Fragment>
      <Column $gap>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <ContainerTitle $white>{activity.title.toUpperCase()}</ContainerTitle>
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
          {activity.machine && <Label>{`MÁQUINA: ${activity.machine}`}</Label>}
        </Row>
        <Row $align={'center'} $justifyContent={'flex-start'}>
          {activity.series && <Label>{`SÉRIES: ${activity.series}`}</Label>}
          {activity.repetitions && (
            <Label>{`REPETIÇÕES: ${activity.repetitions}`}</Label>
          )}
          {activity.load && <Label>{`CARGA: ${activity.load}kg`}</Label>}
          {activity.time && <Label>{`TEMPO: ${activity.time} minutos`}</Label>}
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
