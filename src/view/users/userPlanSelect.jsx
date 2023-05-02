import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import {useDispatch, useSelector} from 'react-redux';
import {readPlanListService} from '../../service/plan';
import {Check, Circle, X} from 'phosphor-react-native';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {createGymUser, setPlanToUserService} from '../../service/user';
import {ButtonDefault, Card, ContainerScroll, CustomText} from '../style';
import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../components/TrainingList/style';
import {Column, Label, Row} from '../profile/components/style';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function UserPlanSelect({navigation, route}) {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const {user, hasPlan} = route.params;
  const [planList, setPlanList] = useState([]);
  const [idPlan, setIdPlan] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');

  async function loadPlans() {
    await readPlanListService(userSession.idGym)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setPlanList(response.data);
      })
      .catch(err => {});
  }

  async function createUser() {
    dispatch(setLoading());
    if (!idPlan) {
      console.log('Escolha um plano');
      dispatch(unsetLoading());
      return;
    }

    const {validDate} = manageDates();

    const data = {...user, idPlan, planValidDate: validDate};

    await createGymUser(data)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          navigation.navigate('Users');
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function setPlanToUser() {
    dispatch(setLoading());
    if (!idPlan) {
      console.log('Escolha um plano');
      dispatch(unsetLoading());
      return;
    }

    const {validDate} = manageDates();

    const data = {
      idUser: user.id,
      idPlan,
      idGym: userSession.idGym,
      planValidDate: validDate,
    };

    await setPlanToUserService(data)
      .then(responseCreate => {
        if (responseCreate.status === 200) {
          navigation.navigate('Users');
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  function manageDates() {
    const today = new Date();
    const validDate = new Date(
      today.setMonth(today.getMonth() + selectedPlan.validMonths),
    );

    return {validDate};
  }

  useEffect(() => {
    loadPlans();
    if (hasPlan) {
      setIdPlan(hasPlan);
    }
  }, []);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'SELECIONAR UM PLANO'} />
      <HorizontalRule color={'#202020'} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 24}}>
        <CustomText>
          Selecionar um plano para{' '}
          <CustomText $weight={'Medium'}>{user.name.split(' ')[0]}</CustomText>:
        </CustomText>

        {planList.length > 0 ? (
          <Card $black $fullWidth $padding>
            {planList.map((plan, index) => (
              <React.Fragment key={index}>
                <ContainerListItem
                  onPress={() => {
                    setIdPlan(plan.idPlan);
                    setSelectedPlan(plan);
                  }}>
                  <ContainerListItemTitle>{plan.title}</ContainerListItemTitle>
                  <Circle
                    weight={idPlan === plan.idPlan ? 'fill' : 'bold'}
                    size={24}
                    color={'#fcf3f3'}
                  />
                </ContainerListItem>
                {(index < planList.length - 1 || selectedPlan) && (
                  <HorizontalRule color={'#fcf3f3'} />
                )}
                <></>
              </React.Fragment>
            ))}
            {selectedPlan && (
              <Card>
                <CustomText $color={'#fcf3f3'}>
                  PLANO SELECIONADO: {selectedPlan.title}
                </CustomText>
                <Card>
                  {selectedPlan.description && (
                    <CustomText $color={'#fcf3f3'}>
                      {selectedPlan.description}
                    </CustomText>
                  )}

                  <Card>
                    <CustomText $color={'#fcf3f3'}>ITENS INCLUSOS</CustomText>

                    <Column>
                      {selectedPlan.isIncluded.length > 0 ? (
                        <>
                          {selectedPlan.isIncluded.map((item, index) => (
                            <Row $align={'center'}>
                              <Check
                                color={'#219653'}
                                weight="fill"
                                size={24}
                              />
                              <ContainerListItemTitle>
                                {item.title}
                              </ContainerListItemTitle>
                            </Row>
                          ))}
                        </>
                      ) : (
                        <CustomText $color={'fcf3f3'}>NENHUM ITEM</CustomText>
                      )}
                    </Column>
                  </Card>

                  <Card>
                    <CustomText $color={'#fcf3f3'}>ITENS INCLUSOS</CustomText>

                    <Column>
                      {selectedPlan.notIncluded.length > 0 ? (
                        <>
                          {selectedPlan.notIncluded.map((item, index) => (
                            <Row $align={'center'}>
                              <Check
                                color={'#EB5757'}
                                weight="fill"
                                size={24}
                              />
                              <ContainerListItemTitle>
                                {item.title}
                              </ContainerListItemTitle>
                            </Row>
                          ))}
                        </>
                      ) : (
                        <CustomText $color={'fcf3f3'}>NENHUM ITEM</CustomText>
                      )}
                    </Column>
                  </Card>
                </Card>
              </Card>
            )}
          </Card>
        ) : (
          ''
        )}
        <Card $fullWidth>
          {user?.id ? (
            <ButtonDefault $green onPress={() => setPlanToUser()}>
              <Label>CONCLUIR</Label>
            </ButtonDefault>
          ) : (
            <ButtonDefault $green onPress={() => createUser()}>
              <Label>CONCLUIR</Label>
            </ButtonDefault>
          )}
        </Card>
      </ContainerScroll>
    </ViewDefault>
  );
}
