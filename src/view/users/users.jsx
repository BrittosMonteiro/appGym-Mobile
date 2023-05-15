import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import Tab from '../../components/Tab';
import UsersAttached from './usersAttached';
import UsersNotAttached from './usersNotAttached';
import {ContainerScroll} from '../style';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';

export default function Users({navigation}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const {t} = useTranslation();

  const tabList = [
    {
      title: `${t('lbl_users_attached')}`,
      component: <UsersAttached navigation={navigation} />,
    },
    {
      title: `${t('lbl_users_not_attached')}`,
      component: <UsersNotAttached navigation={navigation} />,
    },
  ];

  function changeTab(index) {
    setSelectedTab(index);
  }

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('title_users')} />
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
