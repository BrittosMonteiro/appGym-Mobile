import React, {useEffect, useState} from 'react';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {CaretRight} from 'phosphor-react-native';
import {readPlanListService} from '../../service/plan';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonDefault, Card, ContainerScroll, CustomText} from '../style';
import {Label, Row} from '../profile/components/style';
import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../components/TrainingList/style';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function PlanList({navigation}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [planList, setPlanList] = useState([]);

  async function loadPlans() {
    DISPATCH(setLoading());
    await readPlanListService(USERSESSION.id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setPlanList(response.data);
      })
      .catch(err => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    loadPlans();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadPlans();
    });
  }, [navigation]);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'PLANOS'} />
      <HorizontalRule color={'#202020'} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 24}}>
        <CustomText>Lista de planos cadastrados</CustomText>

        <Row>
          <ButtonDefault
            $turquoise
            onPress={() => navigation.navigate('PlanManagement', {id: null})}>
            <Label>ADICIONAR</Label>
          </ButtonDefault>
        </Row>
        {planList.length > 0 ? (
          <Card $black $fullWidth $padding>
            {planList.map((plan, index) => (
              <React.Fragment key={index}>
                <ContainerListItem
                  onPress={() =>
                    navigation.navigate('PlanManagement', {id: plan.idPlan})
                  }>
                  <ContainerListItemTitle>{plan.title}</ContainerListItemTitle>
                  <CaretRight color={'#fcf3f3'} weight={'bold'} size={28} />
                </ContainerListItem>
                {index < planList.length - 1 && (
                  <HorizontalRule color={'#fcf3f3'} />
                )}
              </React.Fragment>
            ))}
          </Card>
        ) : (
          ''
        )}
      </ContainerScroll>
    </ViewDefault>
  );
}
