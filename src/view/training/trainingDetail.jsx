import React, {useState, useEffect} from 'react';
import {Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header/Header';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {Button, ContainerScroll, ContainerTitle, CustomText} from '../style';
import {Label, Row} from '../profile/components/style';
import {readTrainingHistoryByIdService} from '../../service/trainingHistory';
import {readTrainingByIdService} from '../../service/training';
import ModalDeleteTraining from './components/ModalDeleteTraining';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';
import Container from '../../components/Container/Container';
import ExerciseDetail from './components/ExerciseDetail';

export default function TrainingDetail({navigation, route}) {
  const {idActivity} = route.params;
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const DISPATCH = useDispatch();
  const [training, setTraining] = useState([]);
  const [trainingHistory, setTrainingHistory] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function loadActivity() {
    DISPATCH(setLoading());
    await readTrainingByIdService(idActivity)
      .then(responseFind => {
        if (responseFind) {
          return responseFind.json();
        }
      })
      .then(response => {
        setTraining(response.data);
      })
      .catch(() => {
        setMessage(`${t('system_message_workout_could_not_load')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function loadActivityHistory() {
    DISPATCH(setLoading());
    await readTrainingHistoryByIdService({idActivity})
      .then(responseFind => {
        if (responseFind) {
          return responseFind.json();
        }
      })
      .then(response => {
        setTrainingHistory(response.data);
      })
      .catch(() => {
        setMessage(`${t('system_message_workout_could_not_load_history')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadActivity();
    loadActivityHistory();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadActivity();
      loadActivityHistory();
    });
  }, [navigation]);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('details')} />
      <ContainerScroll contentContainerStyle={{gap: 32}}>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <ContainerTitle>{training.title}</ContainerTitle>
          <Pressable
            onPress={() => navigation.navigate('ManageTraining', {idActivity})}>
            <Label $black>{t('edit')}</Label>
          </Pressable>
        </Row>

        {training?.items &&
          training.items.length > 0 &&
          training.owner === USERSESSION.id && (
            <Button
              $bgColor={props => props.theme.colors.turquoise_01}
              onPress={() =>
                navigation.navigate('TrainingOnGoing', {training, idActivity})
              }>
              <CustomText
                $fontSize={18}
                $color={props => props.theme.colors.white_02}
                $textAlign={'center'}
                $weight={'SemiBold'}>
                {t('go_to_onGoing')}
              </CustomText>
            </Button>
          )}

        <Container gap={16}>
          <ContainerTitle>WORKOUT DESCRIPTION</ContainerTitle>
          <Container gap={16}>
            {training?.items && training.items.length ? (
              <Container
                gap={16}
                bgColor={props => props.theme.colors.black_01}
                padding={'16px'}>
                {training.items.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ExerciseDetail activity={activity} />
                    {index < training.items.length - 1 && (
                      <HorizontalRule color={'#fcf3f3'} />
                    )}
                  </React.Fragment>
                ))}
              </Container>
            ) : (
              <Row $align={'center'} $justifyContent={'center'}>
                <CustomText>{t('empty_exercises_list')}</CustomText>
              </Row>
            )}
          </Container>
        </Container>

        <Button
          $bgColor={props => props.theme.colors.red_01}
          onPress={() => setOpenModal(true)}>
          <CustomText
            $textAlign={'center'}
            $fontSize={18}
            $weight={'SemiBold'}
            $color={props => props.theme.colors.white_02}>
            {t('lbl_delete_workout')}
          </CustomText>
        </Button>
      </ContainerScroll>
      <ModalDeleteTraining
        idTraining={idActivity}
        navigation={navigation}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </ViewDefault>
  );
}
