import {useDispatch} from 'react-redux';
import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {deleteTrainingByIdService} from '../../../service/training';
import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {Label, Row} from '../../profile/components/style';
import {ButtonDefault} from '../../style';

export default function ModalDeleteTraining({
  idTraining,
  navigation,
  openModal,
  setOpenModal,
}) {
  const DISPATCH = useDispatch();

  async function deleteActivity() {
    DISPATCH(setLoading());

    await deleteTrainingByIdService({idTraining})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
          navigation.goBack();
        }
      })
      .catch(err => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }
  return (
    <ModalDefault openModal={openModal} title={'DESEJA EXCLUIR ESTE TREINO?'}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ButtonDefault $red onPress={() => setOpenModal(false)}>
          <Label>CANCELAR</Label>
        </ButtonDefault>
        <ButtonDefault $green onPress={() => deleteActivity()}>
          <Label>EXCLUIR</Label>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
