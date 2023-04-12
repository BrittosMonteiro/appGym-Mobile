import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {Eye, EyeSlash, ToggleLeft, ToggleRight} from 'phosphor-react-native';

import styles from '../../styles';
import HeaderStart from '../../components/HeaderStart';
import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule';
import Button from '../../components/Button';
import {updatePasswordService} from '../../service/user';
import {readInstructorByIdService} from '../../service/instructor';

export default function ProfileInstructor({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [cref, setCref] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gymName, setGymName] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleUpdatePassword, setToggleUpdatePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function loadProfile() {
    dispatch(setLoading());
    await readInstructorByIdService(userSession.id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setName(response.data.name);
        setEmail(response.data.email);
        setCref(response.data.cref);
        setBirthdate(response.data.birthdate);
        setGymName(response.data.gym);
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function logout() {
    try {
      const storedData = await AsyncStorage.removeItem('userSession');
      if (!storedData) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updatePassword() {
    dispatch(setLoading());
    if (!password || !confirmPassword) {
      console.log('Preencher campos');
      dispatch(unsetLoading());
      return;
    }

    if (password !== confirmPassword) {
      console.log('Senhas não são iguais');
      dispatch(unsetLoading());
      return;
    }

    const data = {
      idUser: userSession.id,
      password,
    };

    await updatePasswordService(data)
      .then(responseUpdate => {
        if (responseUpdate) {
          setPassword('');
          setConfirmPassword('');
          setToggleUpdatePassword(false);
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ViewDefault>
      <HeaderStart />
      <ScrollView
        style={[
          styles.main.column,
          styles.paddingStyle.px_3,
          styles.gapStyle.gap_5,
        ]}>
        <View style={[styles.main.column, styles.gapStyle.gap_5]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.weight.medium,
              styles.font.size.size_20,
            ]}>
            MEUS DADOS
          </Text>
          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.font.weight.regular,
                styles.font.size.size_18,
                styles.colors.textColor.white_1,
              ]}>
              NOME
            </Text>
            <Text
              style={[
                styles.font.weight.medium,
                styles.font.size.size_20,
                styles.colors.textColor.white_1,
              ]}>
              {name}
            </Text>
          </View>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.font.weight.regular,
                styles.font.size.size_18,
                styles.colors.textColor.white_1,
              ]}>
              E-MAIL
            </Text>
            <Text
              style={[
                styles.font.weight.medium,
                styles.font.size.size_20,
                styles.colors.textColor.white_1,
              ]}>
              {email}
            </Text>
          </View>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.font.weight.regular,
                styles.font.size.size_18,
                styles.colors.textColor.white_1,
              ]}>
              DATA DE NASCIMENTO
            </Text>
            <Text
              style={[
                styles.font.weight.medium,
                styles.font.size.size_20,
                styles.colors.textColor.white_1,
              ]}>
              {birthdate}
            </Text>
          </View>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.font.weight.regular,
                styles.font.size.size_18,
                styles.colors.textColor.white_1,
              ]}>
              CREF
            </Text>
            <Text
              style={[
                styles.font.weight.medium,
                styles.font.size.size_20,
                styles.colors.textColor.white_1,
              ]}>
              {cref}
            </Text>
          </View>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.font.weight.regular,
                styles.font.size.size_18,
                styles.colors.textColor.white_1,
              ]}>
              ACADEMIA
            </Text>
            <Text
              style={[
                styles.font.weight.medium,
                styles.font.size.size_20,
                styles.colors.textColor.white_1,
              ]}>
              {gymName}
            </Text>
          </View>

          <HorizontalRule />

          <View style={[styles.main.column, styles.gapStyle.gap_3]}>
            <View
              style={[
                styles.main.row,
                styles.alignment.justifyContent.space_between,
              ]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.weight.medium,
                  styles.font.size.size_20,
                ]}>
                ALTERAR SENHA
              </Text>
              <Pressable
                onPress={() => setToggleUpdatePassword(!toggleUpdatePassword)}>
                {toggleUpdatePassword ? (
                  <ToggleRight
                    size={32}
                    weight="fill"
                    color={styles.colors.textColor.green_1.color}
                  />
                ) : (
                  <ToggleLeft
                    size={32}
                    weight="fill"
                    color={styles.colors.textColor.red_1.color}
                  />
                )}
              </Pressable>
            </View>
            {toggleUpdatePassword && (
              <>
                <View style={[styles.main.column, styles.gapStyle.gap_1]}>
                  <Text
                    style={[
                      styles.colors.textColor.white_1,
                      styles.font.size.size_18,
                      styles.font.weight.regular,
                    ]}>
                    SENHA
                  </Text>
                  <View
                    style={[
                      styles.colors.backgroundColor.dark_3,
                      styles.paddingStyle.px_2,
                      styles.paddingStyle.py_1,
                      styles.alignment.alignItems.center,
                      styles.main.row,
                    ]}>
                    <TextInput
                      style={[
                        styles.colors.textColor.white_1,
                        styles.font.size.size_20,
                        styles.font.weight.medium,
                        styles.colors.backgroundColor.dark_3,
                        styles.paddingStyle.pa_0,
                        {flex: 1},
                      ]}
                      secureTextEntry={!showPassword}
                      placeholder="SENHA"
                      placeholderTextColor={styles.colors.textColor.gray_1}
                      defaultValue={password}
                      onChangeText={text => setPassword(text)}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Eye
                          weight="bold"
                          color={styles.colors.textColor.white_1.color}
                          size={24}
                        />
                      ) : (
                        <EyeSlash
                          weight="bold"
                          color={styles.colors.textColor.white_1.color}
                          size={24}
                        />
                      )}
                    </Pressable>
                  </View>
                </View>

                <View style={[styles.main.column, styles.gapStyle.gap_1]}>
                  <Text
                    style={[
                      styles.colors.textColor.white_1,
                      styles.font.size.size_18,
                      styles.font.weight.regular,
                    ]}>
                    CONFIRMAR SENHA
                  </Text>
                  <View
                    style={[
                      styles.colors.backgroundColor.dark_3,
                      styles.paddingStyle.px_2,
                      styles.paddingStyle.py_1,
                      styles.alignment.alignItems.center,
                      styles.main.row,
                    ]}>
                    <TextInput
                      style={[
                        styles.colors.textColor.white_1,
                        styles.font.size.size_20,
                        styles.font.weight.medium,
                        styles.colors.backgroundColor.dark_3,
                        styles.paddingStyle.pa_0,
                        {flex: 1},
                      ]}
                      secureTextEntry={!showPassword}
                      placeholder="CONFIRMAR SENHA"
                      placeholderTextColor={styles.colors.textColor.gray_1}
                      defaultValue={confirmPassword}
                      onChangeText={text => setConfirmPassword(text)}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Eye
                          weight="bold"
                          color={styles.colors.textColor.white_1.color}
                          size={24}
                        />
                      ) : (
                        <EyeSlash
                          weight="bold"
                          color={styles.colors.textColor.white_1.color}
                          size={24}
                        />
                      )}
                    </Pressable>
                  </View>
                </View>
                <Pressable onPress={() => updatePassword()}>
                  <Button title={'ALTERAR'} type={1} />
                </Pressable>
              </>
            )}
          </View>

          {toggleUpdatePassword && <HorizontalRule />}

          <Pressable onPress={() => logout()}>
            <Button title={'SAIR'} type={2} />
          </Pressable>
        </View>
      </ScrollView>
    </ViewDefault>
  );
}
