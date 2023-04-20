import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header';
import Tab from '../../components/Tab';
import styles from '../../styles';
import ManageUserData from './components/manageUserData';
import TrainingList from '../../components/trainingList';

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

      {isAttached && (
        <View style={[styles.paddingStyle.px_3]}>
          <Tab
            tabList={tablist}
            changeTab={changeTab}
            selectedTab={selectedTab}
          />
        </View>
      )}
      <ScrollView
        contentContainerStyle={[
          styles.main.column,
          styles.gapStyle.gap_5,
          styles.paddingStyle.px_3,
        ]}>
        {tablist[selectedTab].component}
      </ScrollView>
    </ViewDefault>
  );
}
