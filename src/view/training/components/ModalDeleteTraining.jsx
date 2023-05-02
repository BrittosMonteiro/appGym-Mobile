import {useDispatch} from 'react-redux';
import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {deleteTrainingByIdService} from '../../../service/activity';
import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {Label, Row} from '../../profile/components/style';
import {ButtonDefault, ContainerTitle} from '../../style';

export default function ModalDeleteTraining({
  idTraining,
  navigation,
  openModal,
  setOpenModal,
}) {
  const dispatch = useDispatch();

  async function deleteActivity() {
    dispatch(setLoading());

    await deleteTrainingByIdService({idTraining})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
          navigation.goBack();
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }
  return (
    <ModalDefault openModal={openModal}>
      <ContainerTitle>DESEJA EXCLUIR ESTE TREINO?</ContainerTitle>
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
