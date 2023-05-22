import {useTranslation} from 'react-i18next';
import ModalDefault from '../../../../components/ModalDefault/ModalDefault';
import {Row} from '../../../profile/components/style';
import {ButtonDefault, CustomText, Link} from '../../../style';
import {deleteExerciseService} from '../../../../service/activity';
import {
  setMessageError,
  setMessageOff,
} from '../../../../store/actions/systemAction';
import {useDispatch} from 'react-redux';

export default function ModalDeleteExercise({idItem, open, onClose, reload}) {
  const DISPATCH = useDispatch();
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function deleteExercise() {
    await deleteExerciseService({idItem})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
          reload();
          onClose();
        }
      })
      .catch(err => {})
      .finally(implementar => {});
  }

  return (
    <ModalDefault openModal={open} title={t('lbl_delete_exercise')}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <Link onPress={() => onClose()}>
          <CustomText $fontSize={18}>{t('lbl_cancel')}</CustomText>
        </Link>
        <ButtonDefault $red onPress={() => deleteExercise()}>
          <CustomText
            $weight={'SemiBold'}
            $fontSize={18}
            $color={props => props.theme.colors.white_02}>
            {t('lbl_delete')}
          </CustomText>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
