import React, {useEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header';
import Button from '../../components/Button';
import styles from '../../styles';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function ManageUser({navigation, route}) {
  const dispatch = useDispatch();
  const {id} = route.params;
  const [name, setName] = useState('Lucas');
  const [birthdate, setBirthdate] = useState('07-10-1994');
  const [phone, setPhone] = useState('(11) 99485-8446');
  const [email, setEmail] = useState('brittosmonteiro@gmail.com');
  const [cpf, setCpf] = useState('000000000');

  function createUser() {
    manageLoading();
  }
  function updateUser() {
    manageLoading();
  }
  function deleteUser() {
    manageLoading();
  }
  function cancel() {
    manageLoading();
  }

  function manageLoading() {
    dispatch(setLoading());
    setTimeout(() => {
      dispatch(unsetLoading());
    }, 1000);
  }

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'GERENCIAR USUÁRIO'} />
      <View
        style={[
          styles.main.column,
          styles.gapStyle.gap_5,
          styles.paddingStyle.px_3,
        ]}>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            NOME
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.colors.textColor.white_1,
              styles.paddingStyle.pa_1,
              styles.main.borderRadiusDefault,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}
            placeholderTextColor={[styles.colors.textColor.white_2]}
            placeholder="placeholder"
            defaultValue={name}
            onChangeText={data => setName(data)}
          />
        </View>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            DATA NASCIMENTO
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.colors.textColor.white_1,
              styles.paddingStyle.pa_1,
              styles.main.borderRadiusDefault,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}
            placeholderTextColor={[styles.colors.textColor.white_2]}
            placeholder="placeholder"
            defaultValue={birthdate}
            onChangeText={data => setBirthdate(data)}
          />
        </View>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            TELEFONE
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.colors.textColor.white_1,
              styles.paddingStyle.pa_1,
              styles.main.borderRadiusDefault,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}
            placeholderTextColor={[styles.colors.textColor.white_2]}
            placeholder="placeholder"
            defaultValue={phone}
            onChangeText={data => setPhone(data)}
          />
        </View>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            E-MAIL
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.colors.textColor.white_1,
              styles.paddingStyle.pa_1,
              styles.main.borderRadiusDefault,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}
            placeholderTextColor={[styles.colors.textColor.white_2]}
            placeholder="placeholder"
            defaultValue={email}
            onChangeText={data => setEmail(data)}
          />
        </View>
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            CPF
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.colors.textColor.white_1,
              styles.paddingStyle.pa_1,
              styles.main.borderRadiusDefault,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}
            placeholderTextColor={[styles.colors.textColor.white_2]}
            placeholder="placeholder"
            defaultValue={cpf}
            onChangeText={data => setCpf(data)}
          />
        </View>
        {id ? (
          <>
            <Pressable onPress={() => updateUser()}>
              <Button title={'ATUALIZAR'} type={1} />
            </Pressable>
            <Pressable onPress={() => deleteUser()}>
              <Button title={'EXCLUIR'} type={0} />
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={() => createUser()}>
              <Button title={'SALVAR'} type={1} />
            </Pressable>
            <Pressable onPress={() => cancel()}>
              <Button title={'CANCELAR'} type={0} />
            </Pressable>
          </>
        )}
      </View>
    </ViewDefault>
  );
}
