import React from 'react';
import {Pressable, Text, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import {DotsThreeVertical} from 'phosphor-react-native';
import HorizontalRule from '../../components/HorizontalRule';

export default function Users({navigation}) {
  const usersList = [
    {
      id: 1,
      name: 'Lucas',
    },
    {
      id: 2,
      name: 'Khetllyn',
    },
    {
      id: 3,
      name: 'Eduardo',
    },
    {
      id: 4,
      name: 'Ronaldo',
    },
    {
      id: 5,
      name: 'Nildo',
    },
    {
      id: 6,
      name: 'Amilton',
    },
  ];
  return (
    <ViewDefault>
      <Header navigation={navigation} title={'ALUNOS'} />
      <View
        style={[
          styles.main.column,
          styles.paddingStyle.px_3,
          styles.gapStyle.gap_5,
        ]}>
        <Text
          style={[
            styles.font.size.size_18,
            styles.font.weight.regular,
            styles.colors.textColor.white_2,
          ]}>
          Lista de alunos cadastrados no nosso sistema
        </Text>

        <View style={[styles.main.row]}>
          <Pressable
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.paddingStyle.pa_1,
              {borderRadius: 4},
            ]}>
            <Text
              style={[
                styles.font.weight.medium,
                styles.font.size.size_16,
                styles.colors.textColor.white_2,
              ]}>
              ADICIONAR
            </Text>
          </Pressable>
        </View>

        {usersList.length > 0 ? (
          <View style={[styles.main.column, styles.gapStyle.gap_3]}>
            {usersList.map((instructor, index) => (
              <React.Fragment key={index}>
                <View
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
                    {instructor.name}
                  </Text>
                  <DotsThreeVertical
                    color={'#fefefe'}
                    weight={'bold'}
                    size={28}
                  />
                </View>
                {index < usersList.length - 1 && <HorizontalRule />}
              </React.Fragment>
            ))}
          </View>
        ) : null}
      </View>
    </ViewDefault>
  );
}
