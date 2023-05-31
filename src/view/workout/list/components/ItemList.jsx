import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  Barbell,
  Bicycle,
  PersonSimpleRun,
  PersonSimpleWalk,
} from 'phosphor-react-native';
import {ContainerListItem, ContainerListItemTitle} from '../../components/style';
import {CustomText} from '../../../style';

export default function ItemList({item, navigation}) {
  const activityIcon = [
    <Barbell color={'#fcf3f3'} size={24} />,
    <Bicycle color={'#EB5757'} size={32} />,
    <PersonSimpleWalk color={'#EB5757'} size={32} />,
    <PersonSimpleRun color={'#EB5757'} size={32} />,
  ];

  const {t} = useTranslation();

  return (
    <ContainerListItem
      onPress={() => {
        navigation.navigate('WorkoutDetail', {idActivity: item.id});
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        {item.type ? activityIcon[item.type] : activityIcon[0]}
        <ContainerListItemTitle>
          {item.title.toUpperCase()}
        </ContainerListItemTitle>
      </View>
      <CustomText
        $fontSize={14}
        $weight={'Regular'}
        $color={props => props.theme.colors.white_02}>
        {item.qty} {t('exercises')}
      </CustomText>
    </ContainerListItem>
  );
}
