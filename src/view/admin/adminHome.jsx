import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import {ContainerScroll, ContainerTitle, CustomText, Link} from '../style';
import HeaderStart from '../../components/Header/HeaderStart';
import Container2 from '../../components/Container/Container';
import {CaretRight} from 'phosphor-react-native';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {countGymsService} from '../../service/user';
import {countExercisesService} from '../../service/activity';
import {countCategoriesService} from '../../service/category';
import LanguageSelection from '../../components/LanguageSelection/LanguageSelection';

export default function AdminHome({navigation}) {
  const {t} = useTranslation();
  const [countGyms, setCountGyms] = useState(0);
  const [countExercises, setCountExercises] = useState(0);
  const [countCategories, setCountCategories] = useState(0);

  async function loadCountGyms() {
    await countGymsService()
      .then(responseCount => {
        return responseCount.json();
      })
      .then(response => {
        setCountGyms(response.count);
      })
      .catch(err => {});
  }

  async function loadCountExercises() {
    await countExercisesService()
      .then(responseCount => {
        if (responseCount) {
          return responseCount.json();
        }
      })
      .then(response => {
        setCountExercises(response.count);
      })
      .catch(err => {});
  }

  async function loadCountCategories() {
    await countCategoriesService()
      .then(responseCount => {
        if (responseCount) {
          return responseCount.json();
        }
      })
      .then(response => {
        setCountCategories(response.count);
      })
      .catch(err => {});
  }

  useEffect(() => {
    loadCountGyms();
    loadCountExercises();
    loadCountCategories();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadCountGyms();
      loadCountExercises();
      loadCountCategories();
    });
  }, [navigation]);

  return (
    <ViewDefault>
      <ContainerScroll contentContainerStyle={{gap: 32}}>
        <HeaderStart navigation={navigation} />

        <Container2 gap={8}>
          <ContainerTitle>{t('lbl_gyms')}</ContainerTitle>
          <CustomText $fontSize={42} $weight={'SemiBold'}>
            {countGyms}
          </CustomText>
        </Container2>

        <HorizontalRule color="#202020" />

        <Container2 gap={8}>
          <ContainerTitle>{t('lbl_exercises')}</ContainerTitle>
          <CustomText $fontSize={42} $weight={'SemiBold'}>
            {countExercises}
          </CustomText>
          <Link $fullWidth onPress={() => navigation.navigate('ExercisesList')}>
            <CustomText $fontSize={18}>{t('go_to_exercises')}</CustomText>
            <CaretRight weight="regular" size={24} color="#202020" />
          </Link>
        </Container2>

        <HorizontalRule color="#202020" />

        <Container2 gap={8}>
          <ContainerTitle>{t('lbl_categories')}</ContainerTitle>
          <CustomText $fontSize={42} $weight={'SemiBold'}>
            {countCategories}
          </CustomText>
          <Link
            $fullWidth
            onPress={() => navigation.navigate('CategoriesList')}>
            <CustomText $fontSize={18}>{t('go_to_categories')}</CustomText>
            <CaretRight weight="regular" size={24} color="#202020" />
          </Link>
        </Container2>
      </ContainerScroll>
    </ViewDefault>
  );
}
