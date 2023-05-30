import React from 'react';
import {useTranslation} from 'react-i18next';

import {Row} from '../../view/profile/components/style';
import {
  Button,
  ButtonDefault,
  ContainerTitle,
  CustomText,
  Link,
} from '../../view/style';
import Container2 from '../Container/Container';
import ItemList from './ItemList';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
import {CaretRight, Plus} from 'phosphor-react-native';

export default function TrainingMiniList({
  navigation,
  routeName,
  trainingList,
  userId,
  userSession,
}) {
  const {t} = useTranslation();

  return (
    <Container2 gap={16}>
      {userSession.id === userId && (
        <Row $align={'center'} $justifyContent={'space-between'}>
          <ContainerTitle>{t('my_workouts')}</ContainerTitle>
          {routeName === 'TrainingFullList' && trainingList.length > 0 && (
            <ButtonDefault
              $black
              $bgColor={props => props.theme.colors.turquoise_01}
              onPress={() =>
                navigation.navigate('ManageTraining', {
                  userId,
                  idActivity: null,
                })
              }>
              <Plus color="#fcf3f3" size={24} weight="regular" />
            </ButtonDefault>
          )}
        </Row>
      )}
      {trainingList.length > 0 ? (
        <Container2
          bgColor={props => props.theme.colors.turquoise_01}
          padding={'16px'}
          gap={16}>
          <React.Fragment>
            {trainingList.map((training, index) => (
              <React.Fragment key={index}>
                <ItemList item={training} navigation={navigation} />
                {index < trainingList.length - 1 && (
                  <HorizontalRule color={'#fcf3f3'} />
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
        </Container2>
      ) : (
        <Row $align={'center'} $justifyContent={'center'}>
          <CustomText
            $color={props => props.theme.colors.black_01}
            $fontSize={16}>
            {t('empty_workout_list')}
          </CustomText>
          <Button
            $bgColor={props => props.theme.colors.turquoise_01}
            onPress={() =>
              navigation.navigate('ManageTraining', {
                userId,
                idActivity: null,
              })
            }>
            <Plus color="#fcf3f3" size={24} weight="regular" />
            <CustomText
              $color={props => props.theme.colors.white_02}
              $textAlign={'center'}>
              {t('lbl_create_workout')}
            </CustomText>
          </Button>
        </Row>
      )}

      {routeName === 'Home' && trainingList.length > 0 && (
        <Link
          $fullWidth
          onPress={() => navigation.navigate('TrainingFullList')}>
          <CustomText $fontSize={18}>{t('go_to_workouts')}</CustomText>
          <CaretRight color={'#202020'} />
        </Link>
      )}
    </Container2>
  );
}
