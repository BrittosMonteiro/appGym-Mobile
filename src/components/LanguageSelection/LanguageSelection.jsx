import SelectDropdown from 'react-native-select-dropdown';
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';

import {Card, ContainerTitle} from '../../view/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Row} from '../../view/profile/components/style';

export default function LanguageSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    {
      code: 'en',
      language: 'English',
    },
    {
      code: 'ptBr',
      language: 'Português',
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
    <Card $black $fullWidth $padding>
      <Row $align={'center'} $justifyContent={'space-between'}>
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
          searchPlaceHolder={t('lbl_choose_language')}
          search
          buttonStyle={{
            padding: 0,
            margin: 0,
            backgroundColor: '#202020',
          }}
          buttonTextStyle={{
            color: '#fcf3f3',
            fontFamily: 'IBMPlexSansCondensed-Regular',
            fontSize: 16,
          }}
          rowStyle={{backgroundColor: '#fcf3f3'}}
          rowTextStyle={{
            color: '#202020',
            fontFamily: 'IBMPlexSansCondensed-Regular',
            fontSize: 16,
          }}
          dropdownStyle={{
            margin: 0,
            padding: 0,
            backgroundColor: '#fcf3f3',
            borderRadius: 4,
          }}
          searchInputStyle={{backgroundColor: '#fcf3f3'}}
          searchInputTxtStyle={{
            fontFamily: 'IBMPlexSansCondensed-Regular',
            fontSize: 16,
          }}
          defaultValueByIndex={selectedLanguage}
        />
      </Row>
    </Card>
  );
}
