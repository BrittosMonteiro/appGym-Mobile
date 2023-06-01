import {useState} from 'react';
import {Pressable} from 'react-native';
import {CheckSquare, Square} from 'phosphor-react-native';
import {useTranslation} from 'react-i18next';

import {Column, Label, Row} from '../../view/profile/components/style';
import {ContainerTitle} from '../../view/style';

export default function ActivityItem({activity, isStopped}) {
  const [isChecked, setIsChecked] = useState(false);
  const {t} = useTranslation();

  return (
    <Pressable onPress={() => setIsChecked(!isChecked)}>
      <Row $align={'flex-start'}>
        {isChecked ? (
          <CheckSquare weight="fill" size={32} color={'#00A1AB'} />
        ) : (
          <Square weight="regular" size={32} color={'#FE7A71'} />
        )}
        <Column $gap>
          <Row $align={'flex-start'} $justifyContent={'flex-start'}>
            <ContainerTitle $color={props => props.theme.colors.white_02}>
              {activity.title.toUpperCase()}
            </ContainerTitle>
          </Row>
          <Row $align={'center'} $justifyContent={'flex-start'}>
            {activity.machine && (
              <Label>{`MÁQUINA: ${activity.machine}`}</Label>
            )}
          </Row>
          {(activity.series ||
            activity.repetitions ||
            activity.load ||
            activity.time) && (
            <Row $align={'center'} $justifyContent={'flex-start'}>
              {activity.series && (
                <Label>{`${t('lbl_series')}: ${activity.series}`}</Label>
              )}
              {activity.repetitions && (
                <Label>{`${t('lbl_repetitions')}: ${
                  activity.repetitions
                }`}</Label>
              )}
              {activity.load && (
                <Label>{`${t('lbl_load')}: ${activity.load}kg`}</Label>
              )}
              {activity.time && (
                <Label>{`${t('lbl_time')}: ${activity.time} ${t(
                  'lbl_minutes',
                )}`}</Label>
              )}
            </Row>
          )}
          {activity.note && (
            <Row $align={'center'} $justifyContent={'flex-start'}>
              <Label>{`${activity.note}`}</Label>
            </Row>
          )}
        </Column>
      </Row>
    </Pressable>
  );
}
