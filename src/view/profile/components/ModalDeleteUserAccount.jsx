import {useTranslation} from 'react-i18next';

import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {ButtonDefault, CustomText} from '../../style';
import {Label, Row} from './style';

export default function ModalDeleteUserAccount({
  deleteAccount,
  openModal,
  setOpenModal,
  title,
}) {
  const {t} = useTranslation();
  return (
    <ModalDefault openModal={openModal} title={title}>
      <CustomText>
        {t('message_delete_account_1')}{'\n\n'} {t('message_delete_account_2')}
      </CustomText>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ButtonDefault $red onPress={() => setOpenModal(false)}>
          <Label>{t('lbl_cancel')}</Label>
        </ButtonDefault>
        <ButtonDefault $green onPress={() => deleteAccount()}>
          <Label>{t('lbl_confirm')}</Label>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
