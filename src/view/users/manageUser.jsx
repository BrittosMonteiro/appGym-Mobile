import React, {useState} from 'react';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab';
import ManageUserData from './components/manageUserData';
import TrainingList from '../../components/trainingList';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {ContainerScroll} from '../style';

export default function ManageUser({navigation, route}) {
  const {id, isAttached} = route.params;

  const [selectedTab, setSelectedTab] = useState(0);

  const tablist = [
    {
      title: 'PERFIL',
      component: <ManageUserData navigation={navigation} route={route} />,
    },
    {
      title: 'TREINOS',
      component: <TrainingList navigation={navigation} userId={id} />,
    },
  ];

  function changeTab(index) {
    setSelectedTab(index);
  }

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'GERENCIAR USUÁRIO'} />
      <HorizontalRule />

      {isAttached && (
        <Tab
          tabList={tablist}
          changeTab={changeTab}
          selectedTab={selectedTab}
        />
      )}
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 24}}>
        {tablist[selectedTab].component}
      </ContainerScroll>
    </ViewDefault>
  );
}
