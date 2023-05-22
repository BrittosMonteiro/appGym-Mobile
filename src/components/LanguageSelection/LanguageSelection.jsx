import SelectDropdown from 'react-native-select-dropdown';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';

import {ContainerTitle} from '../../view/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import Container2 from '../Container/Container';

export default function LanguageSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    {
      code: 'en',
      language: 'ENGLISH',
    },
    {
      code: 'ptBr',
      language: 'PORTUGUÊS',
    },
  ];

  const {t} = useTranslation();

  function getSelectedLanguage() {
    AsyncStorage.getItem('SYSTEM_LANGUAGE')
      .then(lang => {
        const language = JSON.parse(lang);
        if (language !== null) {
          setSelectedLanguage(language.index);
        }
      })
      .catch(err => {});
  }

  function changeLanguage(language) {
    i18next.changeLanguage(language.code);
    AsyncStorage.setItem('SYSTEM_LANGUAGE', JSON.stringify(language));
  }

  useEffect(() => {
    getSelectedLanguage();
  }, []);

  return (
    <Container2 gap={16}>
      <ContainerTitle $white>{t('title_choose_language')}</ContainerTitle>
      <SelectDropdown
        data={languages}
        onSelect={(selectedItem, index) => {
          changeLanguage({...selectedItem, index});
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.language;
        }}
        rowTextForSelection={(item, index) => {
          return item.language;
        }}
        defaultButtonText={t('title_choose_language')}
        buttonStyle={{
          width: '100%',
          padding: 0,
          margin: 0,
          backgroundColor: '#202020',
          borderRadius: 4,
        }}
        buttonTextStyle={{
          color: '#fcf3f3',
          fontFamily: 'IBMPlexSansCondensed-SemiBold',
          fontSize: 18,
        }}
        rowStyle={{backgroundColor: '#fcf3f3'}}
        rowTextStyle={{
          color: '#202020',
          fontFamily: 'IBMPlexSansCondensed-SemiBold',
          fontSize: 18,
        }}
        dropdownStyle={{
          margin: 0,
          padding: 0,
          backgroundColor: '#fcf3f3',
          borderRadius: 4,
        }}
        defaultValueByIndex={selectedLanguage}
      />
    </Container2>
  );
}
