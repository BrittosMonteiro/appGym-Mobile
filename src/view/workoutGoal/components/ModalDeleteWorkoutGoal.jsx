import {useTranslation} from 'react-i18next';
import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {Row} from '../../profile/components/style';
import {ButtonDefault, CustomText, Link} from '../../style';
import {useDispatch} from 'react-redux';
import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {deleteWorkoutGoalService} from '../../../service/goalService';
import {
  setMessageError,
  setMessageOff,
} from '../../../store/actions/systemAction';

export default function ModalDeleteWorkoutGoal({
  idWorkoutGoal,
  openModal,
  onClose,
  reload,
}) {
  const {t} = useTranslation();
  const DISPATCH = useDispatch();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    });
  }

  async function deleteWorkoutGoal() {
    DISPATCH(setLoading());

    await deleteWorkoutGoalService({idWorkoutGoal})
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
    <ModalDefault openModal={openModal} title={t('lbl_workout_goal_delete')}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <Link onPress={() => onClose()}>
          <CustomText $fontSize={18}>{t('lbl_cancel')}</CustomText>
        </Link>
        <ButtonDefault $red onPress={() => deleteWorkoutGoal()}>
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
