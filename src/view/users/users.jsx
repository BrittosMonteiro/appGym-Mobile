import React, {useState} from 'react';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import Tab from '../../components/Tab';
import UsersAttached from './usersAttached';
import UsersNotAttached from './usersNotAttached';
import {ContainerScroll} from '../style';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';

export default function Users({navigation}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabList = [
    {
      title: 'USUÁRIOS ATRELADOS',
      component: <UsersAttached navigation={navigation} />,
    },
    {
      title: 'DEMAIS USUÁRIOS',
      component: <UsersNotAttached navigation={navigation} />,
    },
  ];

  function changeTab(index) {
    setSelectedTab(index);
  }

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'ALUNOS'} />
      <HorizontalRule color={'#202020'} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 24}}>
        <Tab
          tabList={tabList}
          changeTab={changeTab}
          selectedTab={selectedTab}
        />
        {tabList[selectedTab].component}
      </ContainerScroll>
    </ViewDefault>
  );
}
