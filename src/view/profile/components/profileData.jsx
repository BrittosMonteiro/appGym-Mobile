import React, {useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import {Column, InputText, Label, Row} from './style';
import {Card, ContainerTitle} from '../../style';
import DatePicker from 'react-native-date-picker';

export default function ProfileData({userData, updateProfile}) {
  const USERSESSION = useSelector(state => {
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
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const {t} = useTranslation();

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
    updateData = {updateData, idUser: USERSESSION.id};
    updateProfile(updateData);
    setEdit(false);
  }

  function manageData(data) {
    switch (USERSESSION.userLevel) {
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
    <Card $black $fullWidth $padding>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ContainerTitle $white>{t('lbl_data')}</ContainerTitle>
        {!edit ? (
          <Pressable onPress={() => setEdit(!edit)}>
            <Label>{t('edit')}</Label>
          </Pressable>
        ) : (
          <Row $align={'center'} $justifyContent={'space-between'}>
            <Pressable onPress={() => update()}>
              <Label>{t('lbl_update')}</Label>
            </Pressable>
            <Pressable onPress={() => cancel()}>
              <Label>{t('lbl_cancel')}</Label>
            </Pressable>
          </Row>
        )}
      </Row>

      <HorizontalRule color={'#fcf3f3'} />

      <Column $gap>
        <Label>{t('lbl_name')}</Label>
        <InputText
          keyboardType={'default'}
          inputMode={'text'}
          placeholder={t('lbl_name')}
          editable={edit}
          defaultValue={name}
          onChangeText={text => setName(text)}
        />
      </Column>

      {shortName && (
        <Column $gap>
          <Label>{t('lbl_shortName')}</Label>
          <InputText
            keyboardType={'default'}
            inputMode={'text'}
            placeholder={t('lbl_shortName')}
            editable={edit}
            defaultValue={shortName}
            onChangeText={text => setShortName(text)}
          />
        </Column>
      )}

      <Column $gap>
        <Label>{t('lbl_email')}</Label>
        <InputText
          keyboardType={'email-address'}
          inputMode={'email'}
          placeholder={t('lbl_email')}
          editable={edit}
          defaultValue={email}
          onChangeText={text => setEmail(text)}
        />
      </Column>

      <Column $gap>
        <Label>{t('lbl_user')}</Label>
        <InputText
          keyboardType={'default'}
          inputMode={'text'}
          placeholder={t('lbl_user')}
          editable={edit}
          defaultValue={username}
          onChangeText={text => setUsername(text)}
        />
      </Column>

      {birthdate && (
        <Pressable onPress={() => (!edit ? null : setOpenDatePicker(true))}>
          <Column $gap>
            <Label>{t('lbl_birthdate')}</Label>
            <InputText
              placeholder={t('lbl_birthdate')}
              defaultValue={
                birthdate ? new Date(birthdate).toLocaleDateString() : null
              }
              editable={false}
            />
            <DatePicker
              modal
              open={openDatePicker}
              date={new Date()}
              androidVariant="nativeAndroid"
              mode="date"
              onConfirm={date => {
                setOpenDatePicker(false);
                setBirthdate(date);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
              title={null}
              confirmText={t('lbl_confirm')}
              cancelText={t('lbl_cancel')}
            />
          </Column>
        </Pressable>
      )}

      {cpf && (
        <Column $gap>
          <Label>{t('lbl_cpf')}</Label>
          <InputText
            keyboardType={'numeric'}
            inputMode={'numeric'}
            placeholder={t('lbl_cpf')}
            editable={edit}
            defaultValue={cpf}
            onChangeText={text => setCpf(text)}
          />
        </Column>
      )}

      {cnpj && (
        <Column $gap>
          <Label>{t('lbl_cnpj')}</Label>
          <InputText
            keyboardType={'numeric'}
            inputMode={'numeric'}
            placeholder={t('lbl_cnpj')}
            editable={edit}
            defaultValue={cnpj}
            onChangeText={text => setCnpj(text)}
          />
        </Column>
      )}

      {cref && (
        <Column $gap>
          <Label>{t('lbl_cref')}</Label>
          <InputText
            keyboardType={'numeric'}
            inputMode={'numeric'}
            placeholder={t('lbl_cref')}
            editable={edit}
            defaultValue={cref}
            onChangeText={text => setCref(text)}
          />
        </Column>
      )}

      {gymName && (
        <Column $gap>
          <Label>{t('lbl_gym')}</Label>
          <InputText
            placeholder={t('lbl_gym')}
            editable={false}
            defaultValue={gymName}
          />
        </Column>
      )}
    </Card>
  );
}
