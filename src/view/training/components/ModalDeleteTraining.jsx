import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

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
  const {t} = useTranslation();

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
    <ModalDefault openModal={openModal} title={t('title_delete_workout')}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ButtonDefault $red onPress={() => setOpenModal(false)}>
          <Label>{t('lbl_cancel')}</Label>
        </ButtonDefault>
        <ButtonDefault $green onPress={() => deleteActivity()}>
          <Label>{t('lbl_confirm')}</Label>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}