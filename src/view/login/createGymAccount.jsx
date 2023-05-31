import {useState} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {CaretRight} from 'phosphor-react-native';
import {useTranslation} from 'react-i18next';
import DatePicker from 'react-native-date-picker';

import ViewDefault from '../ViewDefault';
import {createAccountService} from '../../service/login';
import {setUser} from '../../store/actions/userSessionAction';
import {
  Button,
  ContainerScroll,
  CustomText,
  InputDataDefault,
  Link,
} from '../style';
import {
  setMessageError,
  setMessageOff,
  setMessageSuccess,
} from '../../store/actions/systemAction';
import Container from '../../components/Container/Container';
import {SignInSignUpTitle} from './style';
import {Row} from '../profile/components/style';

export default function CreateGymAccount({navigation, route}) {
  const DISPATCH = useDispatch();
  const {userLevel} = route.params;
  const [cnpj, setCnpj] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [birthdate, setBirthdate] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const {t} = useTranslation();

  const setUserSession = async data => {
    try {
      await AsyncStorage.setItem('USERSESSION', JSON.stringify(data));
      getUserSession();
    } catch (err) {
      setMessage(['system_message_user_could_not_load_session']);
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

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  function setSuccessMessage(text) {
    DISPATCH(setMessageSuccess(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function sendData(data) {
    setIsLoading(true);
    await createAccountService(data)
      .then(responseCreate => {
        if (responseCreate.status === 201 || responseCreate.status === 400) {
          return responseCreate.json();
        }
      })
      .then(response => {
        if (response.data) {
          setUserSession(response.data);
          setSuccessMessage(['lbl_account_created']);
        } else {
          setMessage(response.errors);
        }
      })
      .catch(e => {
        setMessage(['system_message_user_could_not_create']);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function createAccount() {
    setIsLoading(true);

    if (password !== confirmPassword) {
      setIsLoading(false);
      setMessage(['system_message_user_password_does_not_match']);
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
        setMessage(['system_message_user_login_missing_information']);
        return;
      }
      sendData({cnpj, name, shortName, email, username, password, userLevel});
    } else {
      if (userLevel === 3) {
        if (
          !name ||
          !email ||
          !username ||
          !password ||
          !userLevel ||
          !birthdate
        ) {
          setIsLoading(false);
          setMessage(['system_message_user_login_missing_information']);
          return;
        }
        sendData({name, email, username, password, userLevel, birthdate});
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
      <ContainerScroll
        contentContainerStyle={{gap: 32, justifyContent: 'center', flex: 1}}>
        <Container flex={true} justifyContent={'center'}>
          <SignInSignUpTitle>{t('lbl_sign_up')}</SignInSignUpTitle>
          <Container gap={16}>
            <InputDataDefault
              $padding={16}
              $bgColor={'#202020'}
              $color={props => props.theme.colors.white_02}
              autoCapitalize={'words'}
              autoCorrect={true}
              keyboardType={'default'}
              inputMode={'text'}
              placeholder={t('lbl_name')}
              defaultValue={name}
              onChangeText={text => setName(text)}
            />

            {userLevel === 3 && (
              <Pressable onPress={() => setOpenDatePicker(true)}>
                <Row>
                  <InputDataDefault
                    $fontSize={18}
                    $fontWeight={'SemiBold'}
                    $padding={16}
                    $color={props => props.theme.colors.white_02}
                    $bgColor={props => props.theme.colors.black_01}
                    placeholder={t('lbl_birthdate')}
                    defaultValue={
                      birthdate
                        ? new Date(birthdate).toLocaleDateString()
                        : null
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

            {userLevel === 1 && (
              <InputDataDefault
                $padding={16}
                $bgColor={'#202020'}
                $color={props => props.theme.colors.white_02}
                autoCapitalize={'words'}
                autoCorrect={true}
                keyboardType={'default'}
                inputMode={'text'}
                placeholder="NOME ENCURTADO"
                defaultValue={shortName}
                onChangeText={text => setShortName(text)}
              />
            )}

            <InputDataDefault
              $padding={16}
              $bgColor={'#202020'}
              $color={props => props.theme.colors.white_02}
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'email-address'}
              inputMode={'email'}
              placeholder={t('lbl_email')}
              defaultValue={email}
              onChangeText={text => setEmail(text)}
            />

            {userLevel === 1 && (
              <InputDataDefault
                $padding={16}
                $bgColor={'#202020'}
                $color={props => props.theme.colors.white_02}
                keyboardType={'numeric'}
                inputMode={'numeric'}
                placeholder="CNPJ"
                defaultValue={cnpj}
                onChangeText={text => setCnpj(text)}
              />
            )}

            <InputDataDefault
              $padding={16}
              $bgColor={'#202020'}
              $color={props => props.theme.colors.white_02}
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'default'}
              inputMode={'text'}
              placeholder={t('lbl_user')}
              defaultValue={username}
              onChangeText={text => setUsername(text)}
            />

            <InputDataDefault
              $padding={16}
              $bgColor={'#202020'}
              $color={props => props.theme.colors.white_02}
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'default'}
              inputMode={'text'}
              secureTextEntry={!showPassword}
              placeholder={t('lbl_password')}
              defaultValue={password}
              onChangeText={text => setPassword(text)}
            />

            <InputDataDefault
              $padding={16}
              $bgColor={'#202020'}
              $color={props => props.theme.colors.white_02}
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'default'}
              inputMode={'text'}
              secureTextEntry={!showPassword}
              placeholder={t('lbl_password_confirm')}
              defaultValue={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
            <Row $justifyContent={'flex-end'}>
              <Link
                onPress={() => !isLoading && setShowPassword(!showPassword)}>
                <CustomText>
                  {showPassword
                    ? t('lbl_hide_password')
                    : t('lbl_display_password')}
                </CustomText>
              </Link>
            </Row>

            <Button
              $bgColor={props => props.theme.colors.turquoise_01}
              onPress={() => createAccount()}
              disabled={isLoading}>
              <CustomText
                $textAlign={'center'}
                $fontSize={18}
                $weight={'SemiBold'}
                $color={props => props.theme.colors.white_02}>
                {isLoading ? (
                  <ActivityIndicator
                    size={'small'}
                    color={props => props.theme.colors.white_02}
                  />
                ) : (
                  `${t('access_account_2')}`
                )}
              </CustomText>
            </Button>
          </Container>
          <Container gap={16}>
            <Link
              $fullWidth
              onPress={() => !isLoading && navigation.navigate('Login')}>
              <CustomText $fontSize={18}>{t('go_to_login')}</CustomText>
              <CaretRight color={'#202020'} />
            </Link>
          </Container>
        </Container>
      </ContainerScroll>
    </ViewDefault>
  );
}
