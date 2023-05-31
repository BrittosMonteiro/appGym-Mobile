import React from 'react';
import {CaretRight} from 'phosphor-react-native';

import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import {Card} from '../../style';
import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../workout/components/style';

export default function UsersList({isAttached, list, navigation}) {
  return (
    <Card $black $fullWidth $padding>
      {list.map((user, index) => (
        <React.Fragment key={index}>
          <ContainerListItem
            onPress={() =>
              navigation.navigate('ManageUser', {id: user.idUser, isAttached})
            }>
            <ContainerListItemTitle>
              {user.name.toUpperCase()}
            </ContainerListItemTitle>
            <CaretRight color={'#fcf3f3'} weight={'bold'} size={28} />
          </ContainerListItem>
          {index < list.length - 1 && <HorizontalRule color={'#fcf3f3'} />}
        </React.Fragment>
      ))}
    </Card>
  );
}
