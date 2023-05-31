import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab';
import ManageUserData from './components/manageUserData';
import TrainingList from '../workout/list/components/WorkoutListResume';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {ContainerScroll} from '../style';

export default function ManageUser({navigation, route}) {
  const {id, isAttached} = route.params;
  const [selectedTab, setSelectedTab] = useState(0);
  const {t} = useTranslation();

  const tablist = [
    {
      title: `${t('title_profile')}`,
      component: <ManageUserData navigation={navigation} route={route} />,
    },
    {
      title: `${t('title_workouts')}`,
      component: <TrainingList navigation={navigation} userId={id} />,
    },
  ];

  function changeTab(index) {
    setSelectedTab(index);
  }

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('title_user_management')} />
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
