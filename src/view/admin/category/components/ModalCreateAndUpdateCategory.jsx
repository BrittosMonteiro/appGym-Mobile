import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import ModalDefault from '../../../../components/ModalDefault/ModalDefault';
import {Column, Row} from '../../../profile/components/style';
import {
  ButtonDefault,
  CustomText,
  InputDataDefault,
  Link,
} from '../../../style';
import {
  createCategoryService,
  updateCategoryService,
} from '../../../../service/category';
import {useDispatch} from 'react-redux';
import {
  setLoading,
  unsetLoading,
} from '../../../../store/actions/loadingAction';

export default function ModalCreateAndUpdateCategory({
  category,
  onClose,
  open,
  reload,
}) {
  const DISPATCH = useDispatch();
  const {t} = useTranslation();
  const [title, setTitle] = useState('');
  const [idCategory, setIdCategory] = useState('');

  async function createCategory() {
    DISPATCH(setLoading());
    if (!title) {
      DISPATCH(unsetLoading());
      return;
    }

    await createCategoryService({title})
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          onClose();
          reload();
          setTitle('');
        }
      })
      .catch(() => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function updateCategory() {
    DISPATCH(setLoading());
    if (!title) {
      DISPATCH(unsetLoading());
      return;
    }
    await updateCategoryService({title, idCategory})
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          onClose();
          reload();
        }
      })
      .catch(() => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setIdCategory(category.id);
    }
  }, [category]);

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
            onClose();
          }}>
          <CustomText $fontSize={18}>{t('lbl_cancel')}</CustomText>
        </Link>
        {idCategory ? (
          <ButtonDefault $turquoise onPress={() => updateCategory()}>
            <CustomText
              $fontSize={18}
              $weight={'SemiBold'}
              $color={props => props.theme.colors.white_02}>
              {t('lbl_update')}
            </CustomText>
          </ButtonDefault>
        ) : (
          <ButtonDefault $turquoise onPress={() => createCategory()}>
            <CustomText
              $fontSize={18}
              $weight={'SemiBold'}
              $color={props => props.theme.colors.white_02}>
              {t('lbl_create')}
            </CustomText>
          </ButtonDefault>
        )}
      </Row>
    </ModalDefault>
  );
}
