import {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
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
import {createAccountService} from '../../service/login';
import {setUser} from '../../store/actions/userSessionAction';

export default function CreateGymAccount({navigation, route}) {
  const dispatch = useDispatch();
  const {userLevel} = route.params;
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  async function sendData(data) {
    await createAccountService(data)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          return responseCreate.json();
        }
      })
      .then(response => {
        setUserSession(response.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function createAccount() {
    setIsLoading(true);

    if (password !== confirmPassword) {
      setIsLoading(false);
      return;
    }

    if (userLevel === 1) {
      if (
        !cnpj ||
        !name ||
        !shortName ||
        !email ||
        !username ||
        !password ||
        !userLevel
      ) {
        setIsLoading(false);
        return;
      }
      sendData({cnpj, name, shortName, email, username, password, userLevel});
    } else {
      if (userLevel === 3) {
        if (!cpf || !name || !email || !username || !password || !userLevel) {
          setIsLoading(false);
          return;
        }
        sendData({cpf, name, email, username, password, userLevel});
      }
    }
  }

  function goTo(userLevel) {
    switch (userLevel) {
      case 1:
        return 'Profile';
      case 2:
        return 'Profile';
      case 3:
        return 'Home';
      default:
        'Login';
    }
  }

  return (
    <ViewDefault>
      <View
        style={[
          styles.alignment.alignItems.center,
          styles.alignment.justifyContent.center,
          styles.paddingStyle.pa_3,
          {flex: 1},
        ]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.gapStyle.gap_3,
            styles.main.column,
            styles.main.borderRadiusDefault,
          ]}
          style={[{width: '100%', maxWidth: 400}]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.weight.bold,
              styles.font.size.size_28,
            ]}>
            CRIAR {'\n'}
            <Text style={[styles.font.size.size_42]}>MINHA CONTA</Text>
            {'\n'}
            {userLevel === 1 ? 'ACADEMIA' : 'USUÁRIO'}
          </Text>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_18,
                styles.font.weight.regular,
              ]}>
              NOME
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
              placeholder="NOME"
              placeholderTextColor={styles.colors.textColor.gray_1}
              defaultValue={name}
              onChangeText={text => setName(text)}
            />
          </View>

          {userLevel === 1 && (
            <View style={[styles.main.column, styles.gapStyle.gap_1]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.regular,
                ]}>
                NOME ENCURTADO
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
                placeholder="NOME ENCURTADO"
                placeholderTextColor={styles.colors.textColor.gray_1}
                defaultValue={shortName}
                onChangeText={text => setShortName(text)}
              />
            </View>
          )}

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_18,
                styles.font.weight.regular,
              ]}>
              E-MAIL
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
              placeholder="EMAIL"
              placeholderTextColor={styles.colors.textColor.gray_1}
              defaultValue={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          {userLevel === 1 && (
            <View style={[styles.main.column, styles.gapStyle.gap_1]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.regular,
                ]}>
                CNPJ
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
                placeholder="CNPJ"
                placeholderTextColor={styles.colors.textColor.gray_1}
                defaultValue={cnpj}
                onChangeText={text => setCnpj(text)}
              />
            </View>
          )}

          {userLevel === 3 && (
            <View style={[styles.main.column, styles.gapStyle.gap_1]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.regular,
                ]}>
                CPF
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
                placeholder="CPF"
                placeholderTextColor={styles.colors.textColor.gray_1}
                defaultValue={cpf}
                onChangeText={text => setCpf(text)}
              />
            </View>
          )}

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

          <Pressable onPress={() => createAccount()}>
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
              onPress={() => navigation.navigate('Login')}
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
                JÁ TENHO UMA CONTA
              </Text>
              <CaretRight
                weight="bold"
                size={24}
                color={styles.colors.textColor.white_1.color}
              />
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </ViewDefault>
  );
}
