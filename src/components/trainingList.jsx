import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {CaretRight} from 'phosphor-react-native';

import HorizontalRule from './HorizontalRule';
import styles from '../styles';
import Button from './Button';

export default function TrainingList({navigation}) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'CALISTENIA',
      qty: 2,
    },
  ];

  return (
    <View
      style={[
        styles.main.column,
        styles.paddingStyle.px_3,
        styles.gapStyle.gap_3,
      ]}>
      <View style={[styles.main.row]}>
        <Pressable
          onPress={() => navigation.navigate('ManageActivity', {idUser: 123})}>
          <Button title={'CRIAR TREINO'} type={2} />
        </Pressable>
      </View>
      <FlatList
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
                <CaretRight
                  weight="bold"
                  color={styles.colors.textColor.white_1.color}
                  size={28}
                />
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
            {index < DATA.length - 1 && (
              <HorizontalRule
                color={styles.border.color.orange_1.borderColor}
              />
            )}
          </React.Fragment>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}
