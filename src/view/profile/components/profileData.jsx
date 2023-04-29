import React, {useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';

import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import {Column, InputText, Label, Row} from './style';
import {Card, ContainerTitle} from '../../style';

export default function ProfileData({userData, updateProfile}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });

  const [birthdate, setBirthdate] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cpf, setCpf] = useState('');
  const [cref, setCref] = useState('');
  const [email, setEmail] = useState('');
  const [gymName, setGymName] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [username, setUsername] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setOriginalData();
  }, [userData]);

  function setOriginalData() {
    setBirthdate(userData.birthdate);
    setCnpj(userData.cnpj);
    setCpf(userData.cpf);
    setCref(userData.cref);
    setEmail(userData.email);
    setGymName(userData.gym);
    setName(userData.name);
    setShortName(userData.shortName);
    setUsername(userData.username);
  }

  async function update() {
    let data = {
      name,
      username,
      email,
    };

    let updateData = manageData(data);
    updateData = {updateData, idUser: userSession.id};
    updateProfile(updateData);
    setEdit(false);
  }

  function manageData(data) {
    switch (userSession.userLevel) {
      case 1:
        return (data = {...data, cnpj, shortName});
      case 2:
        return (data = {...data, birthdate, cref});
      case 3:
        return (data = {...data, birthdate, cpf});
      default:
        return data;
    }
  }

  function cancel() {
    setEdit(!edit);
    setOriginalData();
  }

  return (
    <Card $black={true} $fullWidth={true} $padding={true}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ContainerTitle $white>DADOS</ContainerTitle>
        {!edit ? (
          <Pressable onPress={() => setEdit(!edit)}>
            <Label>EDITAR</Label>
          </Pressable>
        ) : (
          <Row $align={'center'} $justifyContent={'space-between'}>
            <Pressable onPress={() => update()}>
              <Label>ATUALIZAR</Label>
            </Pressable>
            <Pressable onPress={() => cancel()}>
              <Label>CANCELAR</Label>
            </Pressable>
          </Row>
        )}
      </Row>

      <HorizontalRule color={'#fcf3f3'} />

      <Column $gap>
        <Label>NOME</Label>
        <InputText
          placeholder={'NOME'}
          editable={edit}
          defaultValue={name}
          onChangeText={text => setName(text)}
        />
      </Column>

      {shortName && (
        <Column $gap>
          <Label>NOME DE EXIBIÇÃO</Label>
          <InputText
            placeholder={'NOME DE EXIBIÇÃO'}
            editable={edit}
            defaultValue={shortName}
            onChangeText={text => setShortName(text)}
          />
        </Column>
      )}

      <Column $gap>
        <Label>E-MAIL</Label>
        <InputText
          placeholder={'E-MAIL'}
          editable={edit}
          defaultValue={email}
          onChangeText={text => setEmail(text)}
        />
      </Column>

      <Column $gap>
        <Label>USUÁRIO</Label>
        <InputText
          placeholder={'USUÁRIO'}
          editable={edit}
          defaultValue={username}
          onChangeText={text => setUsername(text)}
        />
      </Column>

      {birthdate && (
        <Column $gap>
          <Label>DATA DE NASCIMENTO</Label>
          <InputText
            placeholder={'DATA DE NASCIMENTO'}
            editable={edit}
            defaultValue={new Date(birthdate).toLocaleDateString()}
          />
        </Column>
      )}

      {cpf && (
        <Column $gap>
          <Label>CPF</Label>
          <InputText
            placeholder={'CPF'}
            editable={edit}
            defaultValue={cpf}
            onChangeText={text => setCpf(text)}
          />
        </Column>
      )}

      {cnpj && (
        <Column $gap>
          <Label>CNPJ</Label>
          <InputText
            placeholder={'CNPJ'}
            editable={edit}
            defaultValue={cnpj}
            onChangeText={text => setCnpj(text)}
          />
        </Column>
      )}

      {cref && (
        <Column $gap>
          <Label>CREF</Label>
          <InputText
            placeholder={'CREF'}
            editable={edit}
            defaultValue={cref}
            onChangeText={text => setCref(text)}
          />
        </Column>
      )}

      {gymName && (
        <Column $gap>
          <Label>ACADEMIA</Label>
          <InputText
            placeholder={'ACADEMIA'}
            editable={false}
            defaultValue={gymName}
          />
        </Column>
      )}
    </Card>
  );
}
