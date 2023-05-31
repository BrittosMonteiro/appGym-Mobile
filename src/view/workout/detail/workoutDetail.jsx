import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {PencilSimple} from 'phosphor-react-native';

import ViewDefault from '../../ViewDefault';
import Header from '../../../components/Header/Header';
import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import DeleteWorkout from './components/DeleteWorkout';
import Container from '../../../components/Container/Container';
import ExerciseDetail from '../components/ExerciseDetail';
import Container2 from '../../../components/Container/Container';

import {
  Button,
  ButtonDefault,
  ContainerScroll,
  ContainerTitle,
  CustomText,
} from '../../style';
import {Row} from '../../profile/components/style';

import {readTrainingHistoryByIdService} from '../../../service/trainingHistory';
import {readWorkoutByIdService} from '../../../service/workoutService';

import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {
  setMessageError,
  setMessageOff,
} from '../../../store/actions/systemAction';

export default function WorkoutDetail({navigation, route}) {
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
    await readWorkoutByIdService(idActivity)
      .then(responseFind => {
        if (responseFind) {
          return responseFind.json();
        }
      })
      .then(response => {
        setTraining(response.data);
      })
      .catch(() => {
        setMessage(['system_message_workout_could_not_load']);
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
        setMessage(['system_message_workout_could_not_load_history']);
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
          <ButtonDefault
            $black
            onPress={() => navigation.navigate('WorkoutManagement', {idActivity})}>
            <PencilSimple color="#fcf3f3" size={24} weight="regular" />
          </ButtonDefault>
        </Row>

        {training?.items &&
          training.items.length > 0 &&
          training.owner === USERSESSION.id && (
            <Button
              $bgColor={props => props.theme.colors.turquoise_01}
              onPress={() =>
                navigation.navigate('WorkoutOnGoing', {training, idActivity})
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

        {trainingHistory.qty > 0 && (
          <Container2 gap={16}>
            <ContainerTitle>{t('lbl_workout_history')}</ContainerTitle>
            <Container2
              gap={8}
              bgColor={props => props.theme.colors.black_01}
              padding={'16px'}>
              <CustomText
                $fontSize={16}
                $color={props => props.theme.colors.white_02}>{`${t(
                'lbl_last_workout',
              )}: ${new Date(
                trainingHistory.last,
              ).toLocaleDateString()}`}</CustomText>
              <CustomText
                $fontSize={16}
                $color={props => props.theme.colors.white_02}>{`${t(
                'lbl_workouts_done',
              )}: ${trainingHistory.qty}`}</CustomText>
            </Container2>
          </Container2>
        )}

        <Container gap={16}>
          <ContainerTitle>{t('lbl_workout_description')}</ContainerTitle>
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
      <DeleteWorkout
        idTraining={idActivity}
        navigation={navigation}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </ViewDefault>
  );
}
