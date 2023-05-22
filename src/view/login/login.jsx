import {useEffect, useState} from 'react';
import {ActivityIndicator, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {CaretRight, CheckSquare, Square} from 'phosphor-react-native';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import {Button, CustomText, InputDataDefault, Link} from '../style';
import {Row} from '../profile/components/style';
import {loginService} from '../../service/login';
import {setUser} from '../../store/actions/userSessionAction';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';

import logo from '../../assets/icons/logo_01.png';
import {SignInSignUpTitle} from './style';
import Container from '../../components/Container/Container';

export default function Login({navigation}) {
  const DISPATCH = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  const setUserSession = async data => {
    try {
      await AsyncStorage.setItem('USERSESSION', JSON.stringify(data));
      getUserSession();
    } catch (err) {
      setMessage(`${t('system_message_user_could_not_set_session')}`);
    }
  };

  const getUserSession = async () => {
    setIsLoading(true);
    try {
      const jsonUserSession = await AsyncStorage.getItem('USERSESSION');
      const jsonUserData = JSON.parse(jsonUserSession);
      if (jsonUserData !== null) {
        DISPATCH(setUser(jsonUserData));
        navigation.reset({
          index: 0,
          routes: [{name: goTo(jsonUserData.userLevel)}],
        });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  async function access() {
    setIsLoading(true);

    if (!username || !password) {
      setIsLoading(false);
      setMessage(`${t('system_message_user_login_missing_information')}`);
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
      .catch(() => {
        setMessage(`${t('system_message_user_could_not_set_session')}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function goTo(userLevel) {
    switch (userLevel) {
      case 0:
        return 'AdminHome';
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

  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <ViewDefault>
      <Container flex={true} justifyContent={'center'}>
        <Row $align={'center'} $justifyContent={'center'}>
          <Image source={logo} alt="Logo" />
        </Row>
        <SignInSignUpTitle>{t('lbl_sign_in')}</SignInSignUpTitle>
        <Container gap={16}>
          <InputDataDefault
            $padding={16}
            $bgColor={'#202020'}
            $color={props => props.theme.colors.white_02}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={'default'}
            inputMode={'text'}
            editable={!isLoading}
            placeholder={t('lbl_user')}
            defaultValue={username}
            onChangeText={text => setUsername(text)}
          />
          <InputDataDefault
            $padding={16}
            $bgColor={'#202020'}
            $color={props => props.theme.colors.white_02}
            keyboardType={'default'}
            inputMode={'text'}
            editable={!isLoading}
            secureTextEntry={!showPassword}
            placeholder={t('lbl_password')}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          />

          {/* <Row $align={'center'}>
            <Link onPress={() => setRememberMe(!rememberMe)}>
              {rememberMe ? (
                <CheckSquare color={'#202020'} size={24} weight="regular" />
              ) : (
                <Square color={'#202020'} size={24} weight="regular" />
              )}
            </Link>
            <CustomText $fontSize={18}>{t('lbl_remember_me')}</CustomText>
          </Row> */}

          <Button
            $bgColor={props => props.theme.colors.turquoise_01}
            onPress={() => access()}
            disabled={isLoading}>
            <CustomText
              $textAlign={'center'}
              $fontSize={18}
              $weight={'SemiBold'}
              $color={props => props.theme.colors.white_02}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={'#fcf3f3'} />
              ) : (
                `${t('access_account_1')}`
              )}
            </CustomText>
          </Button>
        </Container>

        <Container gap={16}>
          {/* <Link $fullWidth>
            <CustomText $fontSize={18}>
              {t('go_to_recover_password')}
            </CustomText>
            <CaretRight color={'#202020'} />
          </Link> */}
          <Link
            $fullWidth
            onPress={() =>
              navigation.navigate('CreateGymAccount', {userLevel: 3})
            }>
            <CustomText $fontSize={18}>
              {t('go_to_create_account_as_user')}
            </CustomText>
            <CaretRight color={'#202020'} />
          </Link>
        </Container>
      </Container>
    </ViewDefault>
  );
}
