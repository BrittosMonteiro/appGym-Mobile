import {useEffect, useState} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {CaretRight, Eye, EyeSlash} from 'phosphor-react-native';
import {useTranslation} from 'react-i18next';

import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {ButtonDefault, Container, CustomText} from '../style';
import {Card} from '../style';
import {Column, InputText, Label, Row} from '../profile/components/style';
import {ContainerListItem} from '../../components/TrainingList/style';
import {loginService} from '../../service/login';
import {setUser} from '../../store/actions/userSessionAction';
import {setMessageError, setMessageOff} from '../../store/actions/systemAction';

export default function Login({navigation}) {
  const DISPATCH = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    } catch (e) {
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
    } catch (e) {
      setIsLoading(false);
    }

    // await AsyncStorage.getItem('USERSESSION')
    //   .then(jsonUserData => {
    //     const data = JSON.parse(jsonUserData);
    //     if (data !== null) {
    //       DISPATCH(setUser(jsonUserData));
    //       navigation.reset({
    //         index: 0,
    //         routes: [{name: goTo(jsonUserData.userLevel)}],
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
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
      <Container $justifyContent={'center'}>
        <Column>
          <CustomText $fontSize={28} $weight={'Medium'}>
            {t('access_account_1')}
          </CustomText>
          <CustomText $fontSize={38} $weight={'Medium'}>
            {t('access_account_3')}
          </CustomText>
        </Column>
        <Card $black $padding>
          <Column $gap>
            <Label>{t('lbl_user')}</Label>
            <InputText
              autoCapitalize={'none'}
              autoCorrect={false}
              keyboardType={'default'}
              inputMode={'text'}
              editable={!isLoading}
              placeholder={t('lbl_user')}
              defaultValue={username}
              onChangeText={text => setUsername(text)}
            />
          </Column>

          <Column $gap>
            <Label>{t('lbl_password')}</Label>
            <Row $align={'center'} $justifyContent={'space-between'}>
              <InputText
                keyboardType={'default'}
                inputMode={'text'}
                editable={!isLoading}
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

          <ButtonDefault onPress={() => access()} disabled={isLoading} $green>
            <Label>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={'#fcf3f3'} />
              ) : (
                `${t('access_account_1')}`
              )}
            </Label>
          </ButtonDefault>

          <HorizontalRule color={'#fcf3f3'} />

          <Card>
            <ContainerListItem
              $paddingVertical={false}
              onPress={() =>
                navigation.navigate('CreateGymAccount', {userLevel: 3})
              }>
              <CustomText $fontSize={16} $color={'#fcf3f3'}>
                {t('go_to_create_account_as_user')}
              </CustomText>
              <CaretRight weight="regular" size={24} color={'#fcf3f3'} />
            </ContainerListItem>

            {/* <ContainerListItem
              $paddingVertical={false}
              onPress={() =>
                navigation.navigate('CreateGymAccount', {userLevel: 1})
              }>
              <CustomText $fontSize={16} $color={'#fcf3f3'}>
                CRIAR CONTA COMO ACADEMIA
              </CustomText>
              <CaretRight weight="regular" size={24} color={'#fcf3f3'} />
            </ContainerListItem> */}
          </Card>
        </Card>
      </Container>
    </ViewDefault>
  );
}
