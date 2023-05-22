import {useTranslation} from 'react-i18next';

import ModalDefault from '../../../../components/ModalDefault/ModalDefault';
import {Row} from '../../../profile/components/style';
import {ButtonDefault, CustomText, Link} from '../../../style';
import {deleteCategoryService} from '../../../../service/category';

export default function ModalDeleteCategory({
  idCategory,
  open,
  onClose,
  reload,
}) {
  const {t} = useTranslation();

  async function deleteCategory() {
    await deleteCategoryService({idCategory})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
          onClose();
          reload();
        }
      })
      .catch(() => {})
      .finally(() => {});
  }

  return (
    <ModalDefault openModal={open} title={t('lbl_delete_category')}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <Link onPress={() => onClose()}>
          <CustomText $fontSize={18}>{t('lbl_cancel')}</CustomText>
        </Link>
        <ButtonDefault $red onPress={() => deleteCategory()}>
          <CustomText
            $weight={'SemiBold'}
            $color={props => props.theme.colors.white_02}>
            {t('lbl_delete')}
          </CustomText>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
