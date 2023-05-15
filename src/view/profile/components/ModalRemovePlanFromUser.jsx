import {useTranslation} from 'react-i18next';

import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {ButtonDefault} from '../../style';
import {Label, Row} from './style';

export default function ModalRemovePlanFromUser({
  openModal,
  setOpenModal,
  remove,
}) {
  const {t} = useTranslation();

  return (
    <ModalDefault openModal={openModal} title={t('message_remove_plan')}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ButtonDefault $red onPress={() => setOpenModal(false)}>
          <Label>{t('lbl_cancel')}</Label>
        </ButtonDefault>
        <ButtonDefault $green onPress={() => remove()}>
          <Label>{t('lbl_confirm')}</Label>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
