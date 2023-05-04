import React, {useState, useEffect} from 'react';
import {Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header/Header';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {ButtonDefault, Card, ContainerScroll, ContainerTitle} from '../style';
import {Column, Label, Row} from '../profile/components/style';
import {readTrainingHistoryByIdService} from '../../service/trainingHistory';
import {readTrainingByIdService} from '../../service/training';
import ModalDeleteTraining from './components/ModalDeleteTraining';

export default function TrainingDetail({navigation, route}) {
  const {idActivity} = route.params;
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const DISPATCH = useDispatch();
  const [training, setTraining] = useState([]);
  const [trainingHistory, setTrainingHistory] = useState('');
  const [openModal, setOpenModal] = useState(false);

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
      <Header navigation={navigation} title={'DETALHES'} />
      <HorizontalRule color={'#202020'} />
      <ContainerScroll contentContainerStyle={{gap: 24}}>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <ContainerTitle>{training.title}</ContainerTitle>
          <Pressable
            onPress={() => navigation.navigate('ManageTraining', {idActivity})}>
            <Label $black>EDITAR</Label>
          </Pressable>
        </Row>

        {trainingHistory.qty > 0 && (
          <Card $padding $fullWidth $black>
            <Label>TREINOS REALIZADOS - {trainingHistory.qty}</Label>
            <Label>
              ÚLTIMO TREINO -{' '}
              {new Date(trainingHistory.last).toLocaleDateString()}
            </Label>
          </Card>
        )}

        <Row $align={'center'} $justifyContent={'space-between'}>
          <ContainerTitle>ATIVIDADES</ContainerTitle>
          {training?.items &&
            training.items.length > 0 &&
            training.owner === USERSESSION.id && (
              <ButtonDefault
                $turquoise
                onPress={() =>
                  navigation.navigate('TrainingOnGoing', {training, idActivity})
                }>
                <Label>INICIAR</Label>
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
                      <ContainerTitle $white>{activity.title}</ContainerTitle>
                    </Row>
                    {activity.machine && (
                      <Row $align={'center'} $justifyContent={'flex-start'}>
                        <Label>{`Máquina: ${activity.machine}`}</Label>
                      </Row>
                    )}
                    {(activity.series ||
                      activity.repetitions ||
                      activity.load ||
                      activity.time) && (
                      <Row $align={'center'} $justifyContent={'flex-start'}>
                        {activity.series && (
                          <Label>{`SÉRIES: ${activity.series}`}</Label>
                        )}
                        {activity.repetitions && (
                          <Label>{`REPETIÇÕES: ${activity.repetitions}`}</Label>
                        )}
                        {activity.load && (
                          <Label>{`CARGA: ${activity.load}kg`}</Label>
                        )}
                        {activity.time && (
                          <Label>{`TEMPO: ${activity.time} minutos`}</Label>
                        )}
                      </Row>
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
              <Label>NÃO HÁ ATIVIDADES</Label>
            </Row>
          )}
        </Card>

        <ButtonDefault $red onPress={() => setOpenModal(true)}>
          <Label>EXCLUIR TREINO</Label>
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
