import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import Header from '../../../components/Header/Header';
import ViewDefault from '../../ViewDefault';
import {
  ContainerScroll,
  ContainerTitle,
  CustomText,
  InputDataDefault,
  Link,
} from '../../style';
import {Row} from '../../profile/components/style';
import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {
  setMessageError,
  setMessageOff,
} from '../../../store/actions/systemAction';
import {useDispatch} from 'react-redux';
import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import {readCategoriesService} from '../../../service/category';
import ModalCreateAndUpdateCategory from './components/ModalCreateAndUpdateCategory';
import CategoryItem from './components/CategoryItem';

export default function CategoriesList({navigation}) {
  const DISPATCH = useDispatch();
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [originalList, setOriginalList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function loadCategories() {
    DISPATCH(setLoading());
    await readCategoriesService()
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setOriginalList(response.data);
        setCategories(response.data);
      })
      .catch(() => {
        setMessage(`${t('system_message_workout_could_not_load_list')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadCategories();
  }, []);

  function filterList(text) {
    setCategories(
      originalList.filter(
        item =>
          item.title.includes(text.toLowerCase()) ||
          item.title.includes(text.toUpperCase()),
      ),
    );
  }

  function closeModal() {
    setOpenCreate(false);
  }

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('lbl_categories')} />
      <InputDataDefault
        $padding={16}
        $bgColor={'#202020'}
        $color={props => props.theme.colors.white_02}
        autoCapitalize={'characters'}
        placeholder={t('lbl_search_categories')}
        keyboardType={'default'}
        inputMode={'text'}
        defaultValue={search}
        onChangeText={text => filterList(text)}
      />
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ContainerTitle>{t('lbl_categories')}</ContainerTitle>
        <Link onPress={() => setOpenCreate(true)}>
          <CustomText>{t('lbl_create')}</CustomText>
        </Link>
      </Row>
      <ContainerScroll contentContainerStyle={{gap: 16}}>
        {categories.length > 0 ? (
          <React.Fragment>
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <CategoryItem category={category} reload={loadCategories} />
                {index < categories.length - 1 && (
                  <HorizontalRule color={'#202020'} />
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ) : null}
      </ContainerScroll>
      <ModalCreateAndUpdateCategory
        onClose={closeModal}
        open={openCreate}
        reload={loadCategories}
      />
    </ViewDefault>
  );
}
