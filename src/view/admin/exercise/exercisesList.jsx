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
import {readExerciseListService} from '../../../service/exerciseService';
import {
  setMessageError,
  setMessageOff,
} from '../../../store/actions/systemAction';
import {useDispatch} from 'react-redux';
import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import ExerciseItem from './components/ExerciseItem';
import ModalCreateAndUpdateExercise from './components/ModalCreateAndUpdateExercise';

export default function ExercisesList({navigation}) {
  const DISPATCH = useDispatch();
  const {t} = useTranslation();
  const [search, setSearch] = useState('');
  const [originalList, setOriginalList] = useState([]);
  const [availableActivities, setAvailableActivities] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function loadExercises() {
    DISPATCH(setLoading());
    await readExerciseListService()
      .then(responseRead => {
        if (responseRead.status === 200) {
          return responseRead.json();
        }
      })
      .then(response => {
        setOriginalList(response.data);
        setAvailableActivities(response.data);
      })
      .catch(() => {
        setMessage(['system_message_workout_could_not_load_list']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadExercises();
  }, []);

  function filterList(text) {
    setAvailableActivities(
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
      <Header navigation={navigation} title={t('lbl_exercises')} />
      <InputDataDefault
        $padding={16}
        $bgColor={'#202020'}
        $color={props => props.theme.colors.white_02}
        autoCapitalize={'characters'}
        placeholder={t('lbl_search_exercises')}
        keyboardType={'default'}
        inputMode={'text'}
        defaultValue={search}
        onChangeText={text => filterList(text)}
      />
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ContainerTitle>{t('lbl_exercises')}</ContainerTitle>
        <Link onPress={() => setOpenCreate(true)}>
          <CustomText>{t('lbl_create')}</CustomText>
        </Link>
      </Row>
      <ContainerScroll contentContainerStyle={{gap: 16}}>
        {availableActivities.length > 0 ? (
          <React.Fragment>
            {availableActivities.map((exercise, index) => (
              <React.Fragment key={index}>
                <ExerciseItem exercise={exercise} reload={loadExercises} />
                {index < availableActivities.length - 1 && (
                  <HorizontalRule color={'#202020'} />
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        ) : null}
      </ContainerScroll>
      <ModalCreateAndUpdateExercise
        onClose={closeModal}
        open={openCreate}
        reload={loadExercises}
      />
    </ViewDefault>
  );
}
