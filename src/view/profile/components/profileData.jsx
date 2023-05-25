import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {Row} from './style';
import {ContainerTitle, CustomText, InputDataDefault, Link} from '../../style';
import DatePicker from 'react-native-date-picker';
import Container2 from '../../../components/Container/Container';

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
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [edit, setEdit] = useState(false);
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
    <Container2 gap={16}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ContainerTitle>{t('lbl_my_profile')}</ContainerTitle>
        {!edit ? (
          <Link onPress={() => setEdit(!edit)}>
            <CustomText $fontSize={18}>{t('edit')}</CustomText>
          </Link>
        ) : (
          <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
            <Link onPress={() => update()}>
              <CustomText $fontSize={18}>{t('lbl_update')}</CustomText>
            </Link>

            <Link onPress={() => cancel()}>
              <CustomText $fontSize={18}>{t('lbl_cancel')}</CustomText>
            </Link>
          </View>
        )}
      </Row>

      <Row>
        <CustomText $fontSize={14}>{t('lbl_name')}</CustomText>
        <InputDataDefault
          $fontSize={18}
          $fontWeight={'SemiBold'}
          $padding={16}
          $color={props => props.theme.colors.white_02}
          $bgColor={props => props.theme.colors.black_01}
          keyboardType={'default'}
          inputMode={'text'}
          placeholder={t('lbl_name')}
          editable={edit}
          defaultValue={name}
          onChangeText={text => setName(text)}
        />
      </Row>

      {shortName && (
        <Row>
          <CustomText $fontSize={14}>{t('lbl_shortName')}</CustomText>
          <InputDataDefault
            $fontSize={18}
            $fontWeight={'SemiBold'}
            $padding={16}
            $color={props => props.theme.colors.white_02}
            $bgColor={props => props.theme.colors.black_01}
            keyboardType={'default'}
            inputMode={'text'}
            placeholder={t('lbl_shortName')}
            editable={edit}
            defaultValue={shortName}
            onChangeText={text => setShortName(text)}
          />
        </Row>
      )}

      <Row>
        <CustomText $fontSize={14}>{t('lbl_email')}</CustomText>
        <InputDataDefault
          $fontSize={18}
          $fontWeight={'SemiBold'}
          $padding={16}
          $color={props => props.theme.colors.white_02}
          $bgColor={props => props.theme.colors.black_01}
          keyboardType={'email-address'}
          inputMode={'email'}
          placeholder={t('lbl_email')}
          editable={edit}
          defaultValue={email}
          onChangeText={text => setEmail(text)}
        />
      </Row>

      <Row>
        <CustomText $fontSize={14}>{t('lbl_user')}</CustomText>
        <InputDataDefault
          $fontSize={18}
          $fontWeight={'SemiBold'}
          $padding={16}
          $color={props => props.theme.colors.white_02}
          $bgColor={props => props.theme.colors.black_01}
          keyboardType={'default'}
          inputMode={'text'}
          placeholder={t('lbl_user')}
          editable={edit}
          defaultValue={username}
          onChangeText={text => setUsername(text)}
        />
      </Row>

      {birthdate && (
        <Pressable onPress={() => (!edit ? null : setOpenDatePicker(true))}>
          <Row>
            <CustomText $fontSize={14}>{t('lbl_birthdate')}</CustomText>
            <InputDataDefault
              $fontSize={18}
              $fontWeight={'SemiBold'}
              $padding={16}
              $color={props => props.theme.colors.white_02}
              $bgColor={props => props.theme.colors.black_01}
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
          </Row>
        </Pressable>
      )}

      {cpf && (
        <Row>
          <CustomText $fontSize={14}>{t('lbl_cpf')}</CustomText>
          <InputDataDefault
            $fontSize={18}
            $fontWeight={'SemiBold'}
            $padding={16}
            $color={props => props.theme.colors.white_02}
            $bgColor={props => props.theme.colors.black_01}
            keyboardType={'numeric'}
            inputMode={'numeric'}
            placeholder={t('lbl_cpf')}
            editable={edit}
            defaultValue={cpf}
            onChangeText={text => setCpf(text)}
          />
        </Row>
      )}

      {cnpj && (
        <Row>
          <CustomText $fontSize={14}>{t('lbl_cnpj')}</CustomText>
          <InputDataDefault
            $fontSize={18}
            $fontWeight={'SemiBold'}
            $padding={16}
            $color={props => props.theme.colors.white_02}
            $bgColor={props => props.theme.colors.black_01}
            keyboardType={'numeric'}
            inputMode={'numeric'}
            placeholder={t('lbl_cnpj')}
            editable={edit}
            defaultValue={cnpj}
            onChangeText={text => setCnpj(text)}
          />
        </Row>
      )}

      {cref && (
        <Row>
          <CustomText $fontSize={14}>{t('lbl_cref')}</CustomText>
          <InputDataDefault
            $fontSize={18}
            $fontWeight={'SemiBold'}
            $padding={16}
            $color={props => props.theme.colors.white_02}
            $bgColor={props => props.theme.colors.black_01}
            keyboardType={'numeric'}
            inputMode={'numeric'}
            placeholder={t('lbl_cref')}
            editable={edit}
            defaultValue={cref}
            onChangeText={text => setCref(text)}
          />
        </Row>
      )}

      {gymName && (
        <Row>
          <CustomText $fontSize={14}>{t('lbl_gym')}</CustomText>
          <InputDataDefault
            $fontSize={18}
            $fontWeight={'SemiBold'}
            $padding={16}
            $color={props => props.theme.colors.white_02}
            $bgColor={props => props.theme.colors.black_01}
            placeholder={t('lbl_gym')}
            editable={false}
            defaultValue={gymName}
          />
        </Row>
      )}
    </Container2>
  );
}
