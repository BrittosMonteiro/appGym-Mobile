import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import Tab from '../../components/Tab';
import UsersAttached from './usersAttached';
import UsersNotAttached from './usersNotAttached';

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
      <ScrollView
        contentContainerStyle={[
          styles.main.column,
          styles.paddingStyle.px_3,
          styles.gapStyle.gap_5,
        ]}>
        <Tab
          tabList={tabList}
          changeTab={changeTab}
          selectedTab={selectedTab}
        />
        {tabList[selectedTab].component}
      </ScrollView>
    </ViewDefault>
  );
}
