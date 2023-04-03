import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {CaretRight} from 'phosphor-react-native';

import HorizontalRule from './HorizontalRule';
import styles from '../styles';

export default function TrainingList({navigation}) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'TREINO A',
      qty: 8,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'TREINO B',
      qty: 6,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'TREINO C',
      qty: 7,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      title: 'Treino bicicleta',
    },
  ];

  return (
    <FlatList
      style={[styles.main.column, styles.paddingStyle.px_3]}
      contentContainerStyle={[styles.gapStyle.gap_1]}
      data={DATA}
      renderItem={({item, index}) => (
        <React.Fragment key={index}>
          <Pressable
            onPress={() => {
              navigation.navigate('ActivityDetail');
            }}
            style={[styles.main.column, styles.gapStyle.gap_1]}>
            <View
              style={[
                styles.main.row,
                styles.alignment.justifyContent.space_between,
              ]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_20,
                  styles.font.weight.medium,
                ]}>
                {item.title}
              </Text>
              <CaretRight weight="bold" color="#fefefe" size={28} />
            </View>
            {item?.qty && (
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_16,
                  styles.font.weight.regular,
                ]}>
                {item.qty} exercícios
              </Text>
            )}
          </Pressable>
          {index < DATA.length - 1 && <HorizontalRule color={'#F2C24C'} />}
        </React.Fragment>
      )}
      keyExtractor={item => item.id}
    />
  );
}
