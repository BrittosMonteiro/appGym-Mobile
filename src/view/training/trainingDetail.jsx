import React, {useState, useEffect} from 'react';
import {Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header/Header';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {
  ButtonDefault,
  Card,
  ContainerScroll,
  ContainerTitle,
  CustomText,
} from '../style';
import {Column, Label, Row} from '../profile/components/style';
import {readTrainingHistoryByIdService} from '../../service/trainingHistory';
import {readTrainingByIdService} from '../../service/training';
import ModalDeleteTraining from './components/ModalDeleteTraining';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

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
      .catch(err => {})
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
      .catch(err => {})
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
      <HorizontalRule color={'#202020'} />
      <ContainerScroll contentContainerStyle={{gap: 24}}>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <ContainerTitle>{training.title}</ContainerTitle>
          <Pressable
            onPress={() => navigation.navigate('ManageTraining', {idActivity})}>
            <Label $black>{t('edit')}</Label>
          </Pressable>
        </Row>

        {trainingHistory.qty > 0 && (
          <Card $padding $fullWidth $black>
            <Label>
              {t('workouts_done')} - {trainingHistory.qty}
            </Label>
            <Label>
              {t('last_workout_date')} -{' '}
              {new Date(trainingHistory.last).toLocaleDateString()}
            </Label>
          </Card>
        )}

        <Row $align={'center'} $justifyContent={'space-between'}>
          <ContainerTitle>{t('exercises')}</ContainerTitle>
          {training?.items &&
            training.items.length > 0 &&
            training.owner === USERSESSION.id && (
              <ButtonDefault
                $turquoise
                onPress={() =>
                  navigation.navigate('TrainingOnGoing', {training, idActivity})
                }>
                <Label>{t('go_to_onGoing')}</Label>
              </ButtonDefault>
            )}
        </Row>

        <Card $black $padding $fullWidth>
          {training?.items && training.items.length ? (
            <React.Fragment>
              {training.items.map((activity, index) => (
                <React.Fragment key={index}>
                  <Column $gap>
                    <Row $align={'center'} $justifyContent={'space-between'}>
                      <CustomText $color={'#fcf3f3'} $fontSize={18}>
                        {activity.title.toUpperCase()}
                      </CustomText>
                    </Row>
                    {activity.machine && (
                      <Row $align={'center'} $justifyContent={'flex-start'}>
                        <Label>{`${t('lbl_machine')}: ${
                          activity.machine
                        }`}</Label>
                      </Row>
                    )}
                    {(activity.series ||
                      activity.repetitions ||
                      activity.load ||
                      activity.time) && (
                      <>
                        <Row $align={'center'} $justifyContent={'flex-start'}>
                          {activity.series && (
                            <Label>{`${t('lbl_series')}: ${
                              activity.series
                            }`}</Label>
                          )}
                          {activity.repetitions && (
                            <Label>{`${t('lbl_repetitions')}: ${
                              activity.repetitions
                            }`}</Label>
                          )}
                          {activity.load && (
                            <Label>{`${t('lbl_load')}: ${
                              activity.load
                            }kg`}</Label>
                          )}
                          {activity.time && (
                            <Label>{`${t('lbl_time')}: ${activity.time} ${t(
                              'lbl_minutes',
                            )}`}</Label>
                          )}
                        </Row>
                        <Row $align={'center'} $justifyContent={'flex-start'}>
                          {activity.note && <Label>{`${activity.note}`}</Label>}
                        </Row>
                      </>
                    )}
                  </Column>
                  {index < training.items.length - 1 && (
                    <HorizontalRule color={'#fcf3f3'} />
                  )}
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : (
            <Row $align={'center'} $justifyContent={'center'}>
              <Label>{t('empty_exercises_list')}</Label>
            </Row>
          )}
        </Card>

        <ButtonDefault $red onPress={() => setOpenModal(true)}>
          <Label>{t('lbl_delete_workout')}</Label>
        </ButtonDefault>
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
