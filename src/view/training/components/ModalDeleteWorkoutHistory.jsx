import {useTranslation} from 'react-i18next';

import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {ButtonDefault, CustomText, Link} from '../../style';
import {Row} from '../../profile/components/style';
import {deleteWorkoutHistoryByIdService} from '../../../service/trainingHistory';

export default function ModalDeleteWorkoutHistory({
  idWorkoutHistory,
  openModal,
  reload,
  onClose,
}) {
  const {t} = useTranslation();

  async function deleteWorkout() {
    await deleteWorkoutHistoryByIdService({idWorkoutHistory})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
          reload();
          onClose();
        }
      })
      .catch(implementar => {})
      .finally(implementar => {});
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
