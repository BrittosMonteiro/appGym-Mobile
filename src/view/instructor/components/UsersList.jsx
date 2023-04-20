import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {CaretRight} from 'phosphor-react-native';

import styles from '../../../styles';
import HorizontalRule from '../../../components/HorizontalRule';

export default function UsersList({isAttached, list, navigation}) {
  return (
    <View style={[styles.main.column, styles.gapStyle.gap_3]}>
      {list.map((user, index) => (
        <React.Fragment key={index}>
          <Pressable
            onPress={() =>
              navigation.navigate('ManageUser', {id: user.idUser, isAttached})
            }
            style={[
              styles.main.row,
              styles.alignment.justifyContent.space_between,
            ]}>
            <Text
              style={[
                styles.font.weight.medium,
                styles.font.size.size_20,
                styles.colors.textColor.white_2,
              ]}>
              {user.name.toUpperCase()}
            </Text>
            <CaretRight
              color={styles.colors.textColor.white_1.color}
              weight={'bold'}
              size={28}
            />
          </Pressable>
          {index < list.length - 1 && (
            <HorizontalRule color={styles.border.color.orange_1.borderColor} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
