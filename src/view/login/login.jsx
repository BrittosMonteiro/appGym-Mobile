import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {CaretRight, Eye, EyeSlash} from 'phosphor-react-native';

import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import Button from '../../components/Button';
import HorizontalRule from '../../components/HorizontalRule';
import {loginService} from '../../service/login';
import {setUser} from '../../store/actions/userSessionAction';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setUserSession = async data => {
    try {
      await AsyncStorage.setItem('userSession', JSON.stringify(data));
      getUserSession();
    } catch (e) {
      console.log(e);
    }
  };

  const getUserSession = async () => {
    setIsLoading(true);
    try {
      const jsonUserSession = await AsyncStorage.getItem('userSession');
      const jsonUserData = JSON.parse(jsonUserSession);
      if (jsonUserData !== null) {
        dispatch(setUser(jsonUserData));
        navigation.reset({
          index: 0,
          routes: [{name: goTo(jsonUserData.userLevel)}],
        });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  async function access() {
    setIsLoading(true);

    if (!username || !password) {
      setIsLoading(false);
      return;
    }

    const data = {
      username,
      password,
    };

    await loginService(data)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setUserSession(response);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function goTo(userLevel) {
    switch (userLevel) {
      case 1:
        return 'GymProfile';
      case 2:
        return 'ProfileInstructor';
      case 3:
        return 'Dashboard';
      default:
        'Login';
    }
  }

  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <ViewDefault>
      <View
        style={[
          styles.alignment.alignItems.center,
          styles.alignment.justifyContent.center,
          styles.paddingStyle.pa_3,
          {flex: 1},
        ]}>
        <View
          style={[
            styles.gapStyle.gap_3,
            styles.main.column,
            styles.main.borderRadiusDefault,
            {width: '100%', maxWidth: 400},
          ]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.weight.bold,
              styles.font.size.size_28,
            ]}>
            ACESSAR {'\n'}
            <Text style={[styles.font.size.size_42]}>MINHA CONTA</Text>
          </Text>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_18,
                styles.font.weight.regular,
              ]}>
              USUÁRIO
            </Text>
            <TextInput
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_20,
                styles.font.weight.medium,
                styles.colors.backgroundColor.dark_3,
                styles.paddingStyle.px_2,
                styles.paddingStyle.py_1,
              ]}
              editable={!isLoading}
              placeholder="USUÁRIO"
              placeholderTextColor={styles.colors.textColor.gray_1}
              defaultValue={username}
              onChangeText={text => setUsername(text)}
            />
          </View>

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
                editable={!isLoading}
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

          <Pressable onPress={() => access()} disabled={isLoading}>
            <Button
              title={
                isLoading ? (
                  <ActivityIndicator
                    size={'small'}
                    color={styles.colors.textColor.white_1.color}
                  />
                ) : (
                  'ACESSAR'
                )
              }
              type={1}
            />
          </Pressable>

          <HorizontalRule color={styles.colors.textColor.orange_1.color} />

          <View style={[styles.main.column, styles.gapStyle.gap_3]}>
            <Pressable
              onPress={() =>
                navigation.navigate('CreateGymAccount', {userLevel: 3})
              }
              style={[
                styles.main.row,
                styles.alignment.justifyContent.space_between,
              ]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.regular,
                ]}>
                CRIAR CONTA COMO USUÁRIO
              </Text>
              <CaretRight
                weight="bold"
                size={24}
                color={styles.colors.textColor.white_1.color}
              />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('CreateGymAccount', {userLevel: 1})
              }
              style={[
                styles.main.row,
                styles.alignment.justifyContent.space_between,
              ]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.regular,
                ]}>
                CRIAR CONTA COMO ACADEMIA
              </Text>
              <CaretRight
                weight="bold"
                size={24}
                color={styles.colors.textColor.white_1.color}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </ViewDefault>
  );
}
