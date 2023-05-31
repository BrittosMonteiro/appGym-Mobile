import {useTranslation} from 'react-i18next';

import ModalDefault from '../../../../components/ModalDefault/ModalDefault';
import {ButtonDefault, CustomText, Link} from '../../../style';
import {Row} from '../../../profile/components/style';
import {deleteWorkoutHistoryByIdService} from '../../../../service/trainingHistory';
import {useDispatch} from 'react-redux';
import {
  setLoading,
  unsetLoading,
} from '../../../../store/actions/loadingAction';
import {
  setMessageError,
  setMessageOff,
} from '../../../../store/actions/systemAction';

export default function DeleteWorkoutHistory({
  idWorkoutHistory,
  openModal,
  reload,
  onClose,
}) {
  const DISPATCH = useDispatch();
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function deleteWorkout() {
    DISPATCH(setLoading());
    await deleteWorkoutHistoryByIdService({idWorkoutHistory})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
          reload();
          onClose();
        }
      })
      .catch(() => {
        setMessage(['system_message_default_error']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  return (
    <ModalDefault openModal={openModal} title={t('lbl_workout_history_delete')}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <Link
          $color={props => props.theme.colors.black_01}
          onPress={() => onClose()}>
          <CustomText $fontSize={18}>{t('lbl_cancel')}</CustomText>
        </Link>
        <ButtonDefault $red onPress={() => deleteWorkout()}>
          <CustomText
            $fontSize={18}
            $weight={'SemiBold'}
            $color={props => props.theme.colors.white_02}>
            {t('lbl_delete')}
          </CustomText>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
