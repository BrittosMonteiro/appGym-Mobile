import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  Barbell,
  Bicycle,
  PersonSimpleRun,
  PersonSimpleWalk,
} from 'phosphor-react-native';
import {
  ContainerListItem,
  ContainerListItemTitle,
  ContainerListItemSubtitle,
} from './style';

export default function ItemList({item, navigation}) {
  const activityIcon = [
    <Barbell color={'#EB5757'} size={32} />,
    <Bicycle color={'#EB5757'} size={32} />,
    <PersonSimpleWalk color={'#EB5757'} size={32} />,
    <PersonSimpleRun color={'#EB5757'} size={32} />,
  ];

  const {t} = useTranslation();

  return (
    <ContainerListItem
      onPress={() => {
        navigation.navigate('TrainingDetail', {idActivity: item.id});
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
      <ContainerListItemSubtitle>
        {item.qty} {t('exercises')}
      </ContainerListItemSubtitle>
    </ContainerListItem>
  );
}
