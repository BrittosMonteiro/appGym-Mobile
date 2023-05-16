import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {CaretRight} from 'phosphor-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {readInstructorListService} from '../../service/instructor';
import {Label, Row} from '../profile/components/style';
import {ButtonDefault, Card, ContainerScroll, CustomText} from '../style';
import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../components/TrainingList/style';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';

export default function Instructors({navigation}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [instructorsList, setInstructorList] = useState([]);
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function loadInstructors() {
    DISPATCH(setLoading());
    await readInstructorListService(USERSESSION.id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setInstructorList(response.data);
      })
      .catch(err => {
        setMessage(`${t('system_message_instructors_could_not_load_list')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
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
      <Header navigation={navigation} title={t('title_instructors')} />
      <HorizontalRule color={'#202020'} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 16}}>
        <CustomText>{t('message_instructors')}</CustomText>

        <Row>
          <ButtonDefault
            $turquoise
            onPress={() => navigation.navigate('ManageInstructor', {id: null})}>
            <Label>{t('lbl_add')}</Label>
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
