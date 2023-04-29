import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import style from '../../styles/index';
import HorizontalRule from '../../components/HorizontalRule';
import {CaretRight} from 'phosphor-react-native';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import {readInstructorListService} from '../../service/instructor';

export default function Instructors({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [instructorsList, setInstructorList] = useState([]);

  async function loadInstructors() {
    await readInstructorListService(userSession.id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setInstructorList(response.data);
      })
      .catch(err => {});
  }

  useEffect(() => {
    loadInstructors();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadInstructors();
    });
  }, [navigation]);

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
                    navigation.navigate('ManageInstructor', {
                      idInstructor: instructor._id.toString(),
                    })
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
