import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {ButtonDefault} from '../../style';
import {Label, Row} from './style';

export default function ModalRemovePlanFromUser({
  openModal,
  setOpenModal,
  remove,
}) {
  return (
    <ModalDefault
      openModal={openModal}
      title={'DESEJA REMOVER O PLANO DESSE USUÁRIO?'}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ButtonDefault $red onPress={() => setOpenModal(false)}>
          <Label>CANCELAR</Label>
        </ButtonDefault>
        <ButtonDefault $green onPress={() => remove()}>
          <Label>CONFIRMAR</Label>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
