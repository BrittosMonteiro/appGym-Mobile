import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {ButtonDefault, CustomText} from '../../style';
import {Label, Row} from './style';

export default function ModalDeleteUserAccount({
  deleteAccount,
  openModal,
  setOpenModal,
  title,
}) {
  return (
    <ModalDefault openModal={openModal} title={title}>
      <CustomText>
        Você está prestes a excluir sua conta por completa, e esta é uma ação
        irreversível.{'\n\n'} Você tem certeza disso?
      </CustomText>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ButtonDefault $red onPress={() => setOpenModal(false)}>
          <Label>CANCELAR</Label>
        </ButtonDefault>
        <ButtonDefault $green onPress={() => deleteAccount()}>
          <Label>CONFIRMAR</Label>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
