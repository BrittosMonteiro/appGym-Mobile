import React, {useEffect, useState} from 'react';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {CaretRight} from 'phosphor-react-native';
import {useSelector} from 'react-redux';
import {readInstructorListService} from '../../service/instructor';
import {Label, Row} from '../profile/components/style';
import {ButtonDefault, Card, ContainerScroll, CustomText} from '../style';
import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../components/TrainingList/style';

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
      <HorizontalRule color={'#202020'} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 16}}>
        <CustomText>Lista de instrutores aptos para criar treinos</CustomText>

        <Row>
          <ButtonDefault
            $turquoise
            onPress={() => navigation.navigate('ManageInstructor', {id: null})}>
            <Label>ADICIONAR</Label>
          </ButtonDefault>
        </Row>

        {instructorsList.length > 0 ? (
          <Card $black $padding>
            {instructorsList.map((instructor, index) => (
              <React.Fragment key={index}>
                <ContainerListItem
                  onPress={() =>
                    navigation.navigate('ManageInstructor', {
                      idInstructor: instructor._id.toString(),
                    })
                  }>
                  <ContainerListItemTitle>
                    {instructor.name}
                  </ContainerListItemTitle>
                  <CaretRight color={'#fcf3f3'} weight={'bold'} size={28} />
                </ContainerListItem>
                {index < instructorsList.length - 1 && (
                  <HorizontalRule color={'#fcf3f3'} />
                )}
              </React.Fragment>
            ))}
          </Card>
        ) : null}
      </ContainerScroll>
    </ViewDefault>
  );
}
