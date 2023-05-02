import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

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

export default function ManageInstructor({navigation, route}) {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const {idInstructor} = route.params;
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [cref, setCref] = useState('');

  async function createInstructor() {
    dispatch(setLoading());
    if (!name || !email) {
      dispatch(unsetLoading());
      return;
    }

    const data = {
      idGym: userSession.id,
      name,
      birthdate,
      username: `${name
        .split(' ')[0]
        .replace(' ', '')
        .toLocaleLowerCase()}${name
        .split(' ')[1]
        .replace(' ', '')
        .toLocaleLowerCase()}_${userSession.displayName
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
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function readInstructor() {
    dispatch(setLoading());

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
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function updateInstructor() {
    dispatch(setLoading());

    if (!name || !email) {
      dispatch(unsetLoading());
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
          .toLocaleLowerCase()}_${userSession.displayName
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
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function deleteInstructor() {
    dispatch(setLoading());
    await deleteInstructorService({idInstructor})
      .then(responseDelete => {
        if (responseDelete) {
          navigation.goBack();
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  useEffect(() => {
    if (idInstructor) {
      readInstructor();
    }
  }, [idInstructor]);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'GERENCIAR INSTRUTOR'} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 24}}>
        <Card $black $fullWidth $padding>
          <Column $gap>
            <Label>NOME</Label>
            <InputText
              placeholder="NOME DO INSTRUTOR"
              defaultValue={name}
              onChangeText={data => setName(data)}
            />
          </Column>

          <Column $gap>
            <Label>DATA NASCIMENTO</Label>
            <InputText
              placeholder="DATA DE NASCIMENTO"
              defaultValue={new Date(birthdate).toLocaleDateString()}
              onChangeText={data => setBirthdate(data)}
            />
          </Column>

          <Column $gap>
            <Label>E-MAIL</Label>
            <InputText
              placeholder="E-MAIL"
              keyboardType="default"
              defaultValue={email}
              onChangeText={data => setEmail(data)}
            />
          </Column>

          <Column $gap>
            <Label>CREF</Label>
            <InputText
              placeholder="CREF"
              defaultValue={cref}
              onChangeText={data => setCref(data)}
            />
          </Column>
        </Card>

        <Card $fullWidth>
          {idInstructor ? (
            <Column $gap>
              <ButtonDefault $green onPress={() => updateInstructor()}>
                <Label>ATUALIZAR</Label>
              </ButtonDefault>
              <ButtonDefault $red onPress={() => deleteInstructor()}>
                <Label>EXCLUIR</Label>
              </ButtonDefault>
            </Column>
          ) : (
            <Column $gap>
              <ButtonDefault $green onPress={() => createInstructor()}>
                <Label>SALVAR</Label>
              </ButtonDefault>
              <ButtonDefault $red onPress={() => navigation.goBack()}>
                <Label>CANCELAR</Label>
              </ButtonDefault>
            </Column>
          )}
        </Card>
      </ContainerScroll>
    </ViewDefault>
  );
}
