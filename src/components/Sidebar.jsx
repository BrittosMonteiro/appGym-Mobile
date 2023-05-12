import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CaretRight, XCircle} from 'phosphor-react-native';

import {setClose} from '../store/actions/sidebarAction';
import * as RootNavigation from '../utils/RootNavigation';
import HorizontalRule from './HorizontalRule/HorizontalRule';
import {ButtonDefault, Card, ContainerScroll, CustomText} from '../view/style';
import {ContainerListItem} from './TrainingList/style';
import {Row} from '../view/profile/components/style';

export default function Sidebar({open}) {
  const dispatch = useDispatch();
  const userSessionReducer = useSelector(state => {
    return state.userSessionReducer;
  });
  const [menu, setMenu] = useState([]);

  const options = [
    {
      title: 'PERFIL ACADEMIA',
      goTo: 'Profile',
      canSee: 1,
    },
    {
      title: 'INSTRUTORES',
      goTo: 'Instructors',
      canSee: 1,
    },
    {
      title: 'PLANOS',
      goTo: 'PlanList',
      canSee: 1,
    },

    {
      title: 'PERFIL DO INSTRUTOR',
      goTo: 'Profile',
      canSee: 2,
    },
    {
      title: 'ALUNOS',
      goTo: 'Users',
      canSee: 2,
    },

    {
      title: 'INÍCIO',
      goTo: 'Home',
      canSee: 3,
    },
    {
      title: 'PERFIL',
      goTo: 'Profile',
      canSee: 3,
    },
    // {
    //   title: 'HISTÓRICO DE PAGAMENTO',
    //   goTo: 'PaymentHistory',
    //   canSee: 3,
    // },
  ];

  useEffect(() => {
    const newMenu = options.filter(
      option =>
        option.canSee === userSessionReducer.userLevel ||
        option.canSee === null,
    );
    setMenu(newMenu);
  }, [userSessionReducer]);

  return (
    <Modal animationType="fade" visible={open} transparent={true}>
      <ContainerScroll $bgColor={'#fcf3f3'}>
        <Card $padding $fullWidth>
          <Row $justifyContent={'flex-end'}>
            <ButtonDefault onPress={() => dispatch(setClose())}>
              <XCircle weight="regular" size={28} color={'#202020'} />
            </ButtonDefault>
          </Row>
          {menu.map((item, index) => (
            <React.Fragment key={index}>
              <ContainerListItem
                onPress={() => {
                  dispatch(setClose());
                  RootNavigation.navigate(item.goTo);
                }}>
                <CustomText
                  $weight={'Medium'}
                  $color={'#202020'}
                  $fontSize={24}>
                  {item.title}
                </CustomText>
                <CaretRight weight="bold" size={28} color={'#202020'} />
              </ContainerListItem>
              {index < menu.length - 1 && <HorizontalRule color={'#202020'} />}
            </React.Fragment>
          ))}
        </Card>
      </ContainerScroll>
    </Modal>
  );
}
