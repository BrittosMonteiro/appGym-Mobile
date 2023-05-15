import {useState} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {CaretRight, Eye, EyeSlash} from 'phosphor-react-native';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {createAccountService} from '../../service/login';
import {setUser} from '../../store/actions/userSessionAction';
import {ButtonDefault, Card, ContainerScroll, CustomText} from '../style';
import {Column, InputText, Label, Row} from '../profile/components/style';

export default function CreateGymAccount({navigation, route}) {
  const DISPATCH = useDispatch();
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
  const {t} = useTranslation();

  const setUserSession = async data => {
    try {
      await AsyncStorage.setItem('USERSESSION', JSON.stringify(data));
      getUserSession();
    } catch (e) {
      console.log(e);
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
    } catch (e) {
      setIsLoading(false);
    }
  };

  async function sendData(data) {
    setIsLoading(true);
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
      <ContainerScroll
        contentContainerStyle={{gap: 24, justifyContent: 'center'}}>
        <Column>
          <CustomText $fontSize={28} $weight={'Medium'}>
            {t('access_account_2')}
          </CustomText>
          <CustomText $fontSize={38} $weight={'Medium'}>
            {t('access_account_3')}
          </CustomText>
          <CustomText $fontSize={28} $weight={'Regular'}>
            {userLevel === 1 ? 'ACADEMIA' : `${t('lbl_user')}`}
          </CustomText>
        </Column>

        <Card $black $fullWidth $padding>
          <Column $gap>
            <Label>{t('lbl_name')}</Label>
            <InputText
              autoCapitalize={'words'}
              autoCorrect={true}
              keyboardType={'default'}
              inputMode={'text'}
              placeholder={t('lbl_name')}
              defaultValue={name}
              onChangeText={text => setName(text)}
            />
          </Column>

          {userLevel === 1 && (
            <Column $gap>
              <Label>NOME ENCURTADO</Label>
              <InputText
                autoCapitalize={'words'}
                autoCorrect={true}
                keyboardType={'default'}
                inputMode={'text'}
                placeholder="NOME ENCURTADO"
                defaultValue={shortName}
                onChangeText={text => setShortName(text)}
              />
            </Column>
          )}

          <Column $gap>
            <Label>{t('lbl_email')}</Label>
            <InputText
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'email-address'}
              inputMode={'email'}
              placeholder={t('lbl_email')}
              defaultValue={email}
              onChangeText={text => setEmail(text)}
            />
          </Column>

          {userLevel === 1 && (
            <Column $gap>
              <Label>CNPJ</Label>
              <InputText
                keyboardType={'numeric'}
                inputMode={'numeric'}
                placeholder="CNPJ"
                defaultValue={cnpj}
                onChangeText={text => setCnpj(text)}
              />
            </Column>
          )}

          {userLevel === 3 && (
            <Column $gap>
              <Label>{t('lbl_cpf')}</Label>
              <InputText
                keyboardType={'numeric'}
                inputMode={'numeric'}
                placeholder={t('lbl_cpf')}
                defaultValue={cpf}
                onChangeText={text => setCpf(text)}
              />
            </Column>
          )}

          <Column $gap>
            <Label>{t('lbl_user')}</Label>
            <InputText
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'default'}
              inputMode={'text'}
              placeholder={t('lbl_user')}
              defaultValue={username}
              onChangeText={text => setUsername(text)}
            />
          </Column>

          <Column $gap>
            <Label>{t('lbl_password')}</Label>
            <Row $align={'center'} $justifyContent={'space-between'}>
              <InputText
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'default'}
                inputMode={'text'}
                secureTextEntry={!showPassword}
                placeholder={t('lbl_password')}
                defaultValue={password}
                onChangeText={text => setPassword(text)}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Eye weight="bold" color={'#fcf3f3'} size={24} />
                ) : (
                  <EyeSlash weight="bold" color={'#fcf3f3'} size={24} />
                )}
              </Pressable>
            </Row>
          </Column>

          <Column $gap>
            <Label>{t('lbl_password_confirm')}</Label>
            <Row $align={'center'} $justifyContent={'space-between'}>
              <InputText
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'default'}
                inputMode={'text'}
                secureTextEntry={!showPassword}
                placeholder={t('lbl_password_confirm')}
                defaultValue={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <Eye weight="bold" color={'#fcf3f3'} size={24} />
                ) : (
                  <EyeSlash weight="bold" color={'#fcf3f3'} size={24} />
                )}
              </Pressable>
            </Row>
          </Column>

          <ButtonDefault $green onPress={() => createAccount()}>
            <Label>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={'#fcf3f3'} />
              ) : (
                `${t('access_account_2')}`
              )}
            </Label>
          </ButtonDefault>

          <HorizontalRule color={'#fcf3f3'} />

          <Row $align={'center'} $justifyContent={'space-between'}>
            <ButtonDefault onPress={() => navigation.navigate('Login')}>
              <CustomText $weight={'Regular'} $color={'#fcf3f3'}>
                {t('go_to_login')}
              </CustomText>
            </ButtonDefault>
            <CaretRight weight="bold" size={24} color={'#fcf3f3'} />
          </Row>
        </Card>
      </ContainerScroll>
    </ViewDefault>
  );
}
