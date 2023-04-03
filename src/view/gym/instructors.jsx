import React from 'react';
import {Pressable, Text, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import style from '../../styles/index';
import HorizontalRule from '../../components/HorizontalRule';
import {DotsThreeVertical} from 'phosphor-react-native';

export default function Instructors({navigation}) {
  const instructorsList = [
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
      <Header navigation={navigation} title={'INSTRUTORES'} />
      <View
        style={[
          style.main.column,
          style.paddingStyle.px_3,
          style.gapStyle.gap_5,
        ]}>
        <Text
          style={[
            style.font.size.size_18,
            style.font.weight.regular,
            style.colors.textColor.white_2,
          ]}>
          Lista de instrutores aptos para criar treinos
        </Text>

        <View style={[style.main.row]}>
          <Pressable
            style={[
              style.colors.backgroundColor.dark_3,
              style.paddingStyle.pa_1,
              {borderRadius: 4},
            ]}>
            <Text
              style={[
                style.font.weight.medium,
                style.font.size.size_16,
                style.colors.textColor.white_2,
              ]}>
              ADICIONAR
            </Text>
          </Pressable>
        </View>

        {instructorsList.length > 0 ? (
          <View style={[style.main.column, style.gapStyle.gap_3]}>
            {instructorsList.map((instructor, index) => (
              <React.Fragment key={index}>
                <View
                  style={[
                    style.main.row,
                    style.alignment.justifyContent.space_between,
                  ]}>
                  <Text
                    style={[
                      style.font.weight.medium,
                      style.font.size.size_20,
                      style.colors.textColor.white_2,
                    ]}>
                    {instructor.name}
                  </Text>
                  <DotsThreeVertical
                    color={'#fefefe'}
                    weight={'bold'}
                    size={28}
                  />
                </View>
                {index < instructorsList.length - 1 && <HorizontalRule />}
              </React.Fragment>
            ))}
          </View>
        ) : null}
      </View>
    </ViewDefault>
  );
}
