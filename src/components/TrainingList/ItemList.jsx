import {View} from 'react-native';
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
  return (
    <ContainerListItem
      onPress={() => {
        navigation.navigate('ActivityDetail', {idActivity: item.id});
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
        {item.activitiesQty} EXERCÍCIOS
      </ContainerListItemSubtitle>
    </ContainerListItem>
  );
}
