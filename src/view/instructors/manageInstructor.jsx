import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header/Header';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {
  createInstructorService,
  deleteInstructorService,
  readInstructorByIdService,
  updateInstructorService,
} from '../../service/instructor';
import {ButtonDefault, Card, ContainerScroll} from '../style';
import {Column, InputText, Label} from '../profile/components/style';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';

export default function ManageInstructor({navigation, route}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {idInstructor} = route.params;
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [cref, setCref] = useState('');
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function createInstructor() {
    DISPATCH(setLoading());
    if (!name || !email) {
      DISPATCH(unsetLoading());
      setMessage(['system_message_instructors_missing_information']);
      return;
    }

    const data = {
      idGym: USERSESSION.id,
      name,
      birthdate,
      username: `${name
        .split(' ')[0]
        .replace(' ', '')
        .toLocaleLowerCase()}${name
        .split(' ')[1]
        .replace(' ', '')
        .toLocaleLowerCase()}_${USERSESSION.displayName
        .replace(' ', '')
        .toLowerCase()}`,
      email,
      cref,
      userLevel: 2,
    };

    await createInstructorService(data)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          navigation.goBack();
        }
      })
      .catch(() => {
        setMessage(['system_message_instructors_could_not_create']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function readInstructor() {
    DISPATCH(setLoading());

    await readInstructorByIdService(idInstructor)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setName(response.data.name);
        setBirthdate(response.data.birthdate);
        setEmail(response.data.email);
        setCref(response.data.cref);
      })
      .catch(() => {
        setMessage([
          'system_message_instructors_could_not_load_instructor_data',
        ]);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function updateInstructor() {
    DISPATCH(setLoading());

    if (!name || !email) {
      DISPATCH(unsetLoading());
      setMessage(['system_message_instructors_missing_information']);
      return;
    }

    const update = {
      idInstructor,
      data: {
        name,
        birthdate,
        username: `${name
          .split(' ')[0]
          .replace(' ', '')
          .toLocaleLowerCase()}${name
          .split(' ')[1]
          .replace(' ', '')
          .toLocaleLowerCase()}_${USERSESSION.displayName
          .replace(' ', '')
          .toLowerCase()}`,
        email,
        cref,
      },
    };

    await updateInstructorService(update)
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          navigation.goBack();
        }
      })
      .catch(() => {
        setMessage(['system_message_instructors_could_not_update']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function deleteInstructor() {
    DISPATCH(setLoading());
    await deleteInstructorService({idInstructor})
      .then(responseDelete => {
        if (responseDelete) {
          navigation.goBack();
        }
      })
      .catch(() => {
        setMessage(['system_message_instructors_could_not_delete']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    if (idInstructor) {
      readInstructor();
    }
  }, [idInstructor]);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('title_manage_instructors')} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 24}}>
        <Card $black $fullWidth $padding>
          <Column $gap>
            <Label>{t('lbl_name')}</Label>
            <InputText
              placeholder={t('lbl_name')}
              defaultValue={name}
              onChangeText={data => setName(data)}
            />
          </Column>

          <Column $gap>
            <Label>{t('lbl_birthdate')}</Label>
            <InputText
              placeholder={t('lbl_birthdate')}
              defaultValue={new Date(birthdate).toLocaleDateString()}
              onChangeText={data => setBirthdate(data)}
            />
          </Column>

          <Column $gap>
            <Label>{t('lbl_email')}</Label>
            <InputText
              placeholder={t('lbl_email')}
              keyboardType="default"
              defaultValue={email}
              onChangeText={data => setEmail(data)}
            />
          </Column>

          <Column $gap>
            <Label>{t('lbl_cref')}</Label>
            <InputText
              placeholder={t('lbl_cref')}
              defaultValue={cref}
              onChangeText={data => setCref(data)}
            />
          </Column>
        </Card>

        <Card $fullWidth>
          {idInstructor ? (
            <Column $gap>
              <ButtonDefault $green onPress={() => updateInstructor()}>
                <Label>{t('lbl_update')}</Label>
              </ButtonDefault>
              <ButtonDefault $red onPress={() => deleteInstructor()}>
                <Label>{t('lbl_delete_instructor')}</Label>
              </ButtonDefault>
            </Column>
          ) : (
            <Column $gap>
              <ButtonDefault $green onPress={() => createInstructor()}>
                <Label>{t('lbl_save')}</Label>
              </ButtonDefault>
              <ButtonDefault $red onPress={() => navigation.goBack()}>
                <Label>{t('lbl_cancel')}</Label>
              </ButtonDefault>
            </Column>
          )}
        </Card>
      </ContainerScroll>
    </ViewDefault>
  );
}
