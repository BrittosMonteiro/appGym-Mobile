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
  setMessageError,
  setMessageOff,
} from '../../../../store/actions/systemAction';
import {
  setLoading,
  unsetLoading,
} from '../../../../store/actions/loadingAction';
import {useDispatch} from 'react-redux';
import {readCategoriesService} from '../../../../service/category';
import SelectDropdown from 'react-native-select-dropdown';
import {
  createActivityService,
  updateExerciseService,
} from '../../../../service/activity';

export default function ModalCreateAndUpdateExercise({
  exercise,
  onClose,
  open,
  reload,
}) {
  const {t} = useTranslation();
  const DISPATCH = useDispatch();
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [idExercise, setIdExercise] = useState('');
  const [idCategory, setIdCategory] = useState('');
  const [dropDownIndex, setDropDownIndex] = useState('');

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
        setCategories(response.data);
      })
      .catch(() => {
        setMessage(['system_message_workout_could_not_load_list']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (exercise) {
      setTitle(exercise.title);
      setIdExercise(exercise.id);
      setIdCategory(exercise.group);
      setDropDownIndex(categories.findIndex(e => e.title === exercise.group));
    }
  }, [exercise]);

  async function createCategory() {
    DISPATCH(setLoading());
    if (!title || !idCategory) {
      DISPATCH(unsetLoading());
      return;
    }

    const data = {
      title,
      idGroup: idCategory,
    };

    await createActivityService(data)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          reload();
          onClose();
          setTitle('');
          setIdCategory('');
        }
      })
      .catch(() => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function updateCategory() {
    DISPATCH(setLoading());
    if (!title || !idCategory) {
      DISPATCH(unsetLoading());
      return;
    }

    const data = {
      idExercise,
      idGroup: idCategory,
    };

    await updateExerciseService(data)
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

  return (
    <ModalDefault openModal={open} title={t('lbl_manage_exercise')}>
      <Column $gap>
        <CustomText>{t('lbl_exercise')}</CustomText>
        <InputDataDefault
          $padding={16}
          $bgColor={props => props.theme.colors.black_01}
          $color={props => props.theme.colors.white_02}
          autoCapitalize={'characters'}
          autoCorrect={true}
          placeholder={t('lbl_exercise_name')}
          defaultValue={title}
          onChangeText={text => setTitle(text)}
        />
      </Column>

      <Column $gap>
        <CustomText>{t('lbl_category')}</CustomText>
        <SelectDropdown
          data={categories}
          onSelect={(selectedItem, id) => {
            setIdCategory(selectedItem.id);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            return item.title;
          }}
          defaultButtonText={t('lbl_choose_category')}
          search
          searchInputStyle={{
            backgroundColor: '#fcf3f3',
          }}
          searchInputTxtStyle={{
            fontFamily: 'IBMPlexSansCondensed-SemiBold',
            fontSize: 18,
          }}
          searchPlaceHolder={t('lbl_search_categories')}
          searchInputTxtColor="#202020"
          searchPlaceHolderColor="#828282"
          buttonStyle={{
            width: '100%',
            padding: 0,
            margin: 0,
            backgroundColor: '#202020',
            borderRadius: 4,
          }}
          buttonTextStyle={{
            color: '#fcf3f3',
            fontFamily: 'IBMPlexSansCondensed-SemiBold',
            fontSize: 18,
          }}
          rowStyle={{backgroundColor: '#fcf3f3'}}
          rowTextStyle={{
            color: '#202020',
            fontFamily: 'IBMPlexSansCondensed-SemiBold',
            fontSize: 18,
          }}
          dropdownStyle={{
            margin: 0,
            padding: 0,
            backgroundColor: '#fcf3f3',
            borderRadius: 4,
          }}
          defaultValueByIndex={dropDownIndex}
        />
      </Column>

      <Row $align={'center'} $justifyContent={'space-between'}>
        <Link onPress={() => onClose()}>
          <CustomText $fontSize={18}>{t('lbl_cancel')}</CustomText>
        </Link>
        {idExercise ? (
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
