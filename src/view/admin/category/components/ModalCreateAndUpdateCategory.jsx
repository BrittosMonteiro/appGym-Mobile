import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import ModalDefault from '../../../../components/ModalDefault/ModalDefault';
import {Column, Row} from '../../../profile/components/style';
import {
  ButtonDefault,
  CustomText,
  InputDataDefault,
  Link,
} from '../../../style';
import {createCategoryService} from '../../../../service/category';

export default function ModalCreateAndUpdateCategory({onClose, open, reload}) {
  const {t} = useTranslation();
  const [title, setTitle] = useState('');

  async function createCategory() {
    if (!title) return;

    await createCategoryService({title})
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          onClose();
          reload();
          setTitle('');
        }
      })
      .catch(err => {})
      .finally(() => {});
  }

  return (
    <ModalDefault openModal={open} title={t('lbl_manage_category')}>
      <Column $gap>
        <CustomText $fontSize={14}>{t('lbl_category')}</CustomText>
        <InputDataDefault
          $padding={16}
          $color={props => props.theme.colors.white_02}
          $bgColor={props => props.theme.colors.black_01}
          autoCapitalize={'characters'}
          autoCorrect={true}
          placeholder={t('lbl_category_name')}
          defaultValue={title}
          onChangeText={text => setTitle(text)}
        />
      </Column>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <Link
          onPress={() => {
            setTitle('');
            onClose();
          }}>
          <CustomText $fontSize={18}>{t('lbl_cancel')}</CustomText>
        </Link>
        <ButtonDefault $turquoise onPress={() => createCategory()}>
          <CustomText
            $fontSize={18}
            $weight={'SemiBold'}
            $color={props => props.theme.colors.white_02}>
            {t('lbl_create')}
          </CustomText>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
