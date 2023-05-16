import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {useTranslation} from 'react-i18next';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import {useDispatch, useSelector} from 'react-redux';
import {readPlanListService} from '../../service/plan';
import {Check, Circle} from 'phosphor-react-native';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {createGymUser, setPlanToUserService} from '../../service/user';
import {ButtonDefault, Card, ContainerScroll, CustomText} from '../style';
import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../components/TrainingList/style';
import {Column, Label, Row} from '../profile/components/style';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function UserPlanSelect({navigation, route}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {user, hasPlan} = route.params;
  const [planList, setPlanList] = useState([]);
  const [idPlan, setIdPlan] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function loadPlans() {
    DISPATCH(setLoading());

    await readPlanListService(USERSESSION.idGym)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setPlanList(response.data);
      })
      .catch(() => {
        setMessage(`${t('system_message_plans_could_not_load')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function createUser() {
    DISPATCH(setLoading());
    if (!idPlan) {
      DISPATCH(unsetLoading());
      setMessage(`${t('system_message_plans_select')}`);
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
      .catch(() => {
        setMessage(`${t('system_message_user_could_not_create')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function setPlanToUser() {
    DISPATCH(setLoading());
    if (!idPlan) {
      DISPATCH(unsetLoading());
      setMessage(`${t('system_message_plans_select')}`);
      return;
    }

    const {validDate} = manageDates();

    const data = {
      idUser: user.id,
      idPlan,
      idGym: USERSESSION.idGym,
      planValidDate: validDate,
    };

    await setPlanToUserService(data)
      .then(responseCreate => {
        if (responseCreate.status === 200) {
          navigation.navigate('Users');
        }
      })
      .catch(() => {
        setMessage(`${t('system_message_plans_could_not_set_plan_to_user')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
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
      <Header navigation={navigation} title={t('title_select_plan')} />
      <HorizontalRule color={'#202020'} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 24}}>
        <CustomText>
          {t('message_select_plan')}{' '}
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
              </React.Fragment>
            ))}
            {selectedPlan && (
              <Card>
                <CustomText $color={'#fcf3f3'}>
                  {t('lbl_selected_plan')}: {selectedPlan.title}
                </CustomText>
                <Card>
                  {selectedPlan.description && (
                    <CustomText $color={'#fcf3f3'}>
                      {selectedPlan.description}
                    </CustomText>
                  )}

                  <Card>
                    <CustomText $color={'#fcf3f3'}>
                      {t('lbl_included_items')}
                    </CustomText>

                    <Column>
                      {selectedPlan.isIncluded.length > 0 ? (
                        <>
                          {selectedPlan.isIncluded.map((item, index) => (
                            <Row $align={'center'} key={index}>
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
                        <CustomText $color={'fcf3f3'}>
                          {t('lbl_no_items')}
                        </CustomText>
                      )}
                    </Column>
                  </Card>

                  <Card>
                    <CustomText $color={'#fcf3f3'}>
                      {t('lbl_not_included_items')}
                    </CustomText>

                    <Column>
                      {selectedPlan.notIncluded.length > 0 ? (
                        <>
                          {selectedPlan.notIncluded.map((item, index) => (
                            <Row $align={'center'} key={index}>
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
                        <CustomText $color={'fcf3f3'}>
                          {t('lbl_no_items')}
                        </CustomText>
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
              <Label>{t('lbl_finish')}</Label>
            </ButtonDefault>
          ) : (
            <ButtonDefault $green onPress={() => createUser()}>
              <Label>{t('lbl_finish')}</Label>
            </ButtonDefault>
          )}
        </Card>
      </ContainerScroll>
    </ViewDefault>
  );
}
