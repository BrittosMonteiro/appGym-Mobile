import React from 'react';
import {useTranslation} from 'react-i18next';

import {Row} from '../../view/profile/components/style';
import {ContainerTitle, CustomText, Link} from '../../view/style';
import Container2 from '../Container/Container';
import ItemList from './ItemList';
import HorizontalRule from '../HorizontalRule/HorizontalRule';
import {CaretRight} from 'phosphor-react-native';

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
          {routeName === 'TrainingFullList' && (
            <Link
              onPress={() =>
                navigation.navigate('ManageTraining', {
                  userId,
                  idActivity: null,
                })
              }>
              <CustomText $fontSize={18}>{t('lbl_create_workout')}</CustomText>
            </Link>
          )}
        </Row>
      )}
      <Container2
        bgColor={props => props.theme.colors.turquoise_01}
        padding={'16px'}
        gap={16}>
        {trainingList.length > 0 ? (
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
        ) : (
          <Row $align={'center'} $justifyContent={'center'}>
            <CustomText $color={props => props.theme.colors.white_02}>
              {t('empty_workout_list')}
            </CustomText>
          </Row>
        )}
      </Container2>

      {routeName === 'Home' && (
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
