import React from 'react';
import {Pressable, Text, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import style from '../../styles/index';
import HorizontalRule from '../../components/HorizontalRule';
import {CaretRight} from 'phosphor-react-native';
import Button from '../../components/Button';

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
          <View style={[style.main.row]}>
            <Pressable
              onPress={() =>
                navigation.navigate('ManageInstructor', {id: null})
              }>
              <Button title={'ADICIONAR'} type={2} />
            </Pressable>
          </View>
        </View>

        {instructorsList.length > 0 ? (
          <View style={[style.main.column, style.gapStyle.gap_3]}>
            {instructorsList.map((instructor, index) => (
              <React.Fragment key={index}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('ManageInstructor', {id: instructor.id})
                  }
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
                  <CaretRight
                    color={style.colors.textColor.white_1.color}
                    weight={'bold'}
                    size={28}
                  />
                </Pressable>
                {index < instructorsList.length - 1 && (
                  <HorizontalRule
                    color={style.border.color.orange_1.borderColor}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
        ) : null}
      </View>
    </ViewDefault>
  );
}
