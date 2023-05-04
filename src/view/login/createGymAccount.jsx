import {useState} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {CaretRight, Eye, EyeSlash} from 'phosphor-react-native';

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
            CRIAR
          </CustomText>
          <CustomText $fontSize={38} $weight={'Medium'}>
            MINHA CONTA
          </CustomText>
          <CustomText $fontSize={28} $weight={'Regular'}>
            {userLevel === 1 ? 'ACADEMIA' : 'USUÁRIO'}
          </CustomText>
        </Column>

        <Card $black $fullWidth $padding>
          <Column $gap>
            <Label>NOME</Label>
            <InputText
              placeholder="NOME"
              defaultValue={name}
              onChangeText={text => setName(text)}
            />
          </Column>

          {userLevel === 1 && (
            <Column $gap>
              <Label>NOME ENCURTADO</Label>
              <InputText
                placeholder="NOME ENCURTADO"
                defaultValue={shortName}
                onChangeText={text => setShortName(text)}
              />
            </Column>
          )}

          <Column $gap>
            <Label>E-MAIL</Label>
            <InputText
              placeholder="EMAIL"
              defaultValue={email}
              onChangeText={text => setEmail(text)}
            />
          </Column>

          {userLevel === 1 && (
            <Column $gap>
              <Label>CNPJ</Label>
              <InputText
                placeholder="CNPJ"
                defaultValue={cnpj}
                onChangeText={text => setCnpj(text)}
              />
            </Column>
          )}

          {userLevel === 3 && (
            <Column $gap>
              <Label>CPF</Label>
              <InputText
                placeholder="CPF"
                defaultValue={cpf}
                onChangeText={text => setCpf(text)}
              />
            </Column>
          )}

          <Column $gap>
            <Label>USUÁRIO</Label>
            <InputText
              placeholder="USUÁRIO"
              defaultValue={username}
              onChangeText={text => setUsername(text)}
            />
          </Column>

          <Column $gap>
            <Label>SENHA</Label>
            <Row $align={'center'} $justifyContent={'space-between'}>
              <InputText
                secureTextEntry={!showPassword}
                placeholder="SENHA"
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
            <Label>CONFIRMAR SENHA</Label>
            <Row $align={'center'} $justifyContent={'space-between'}>
              <InputText
                secureTextEntry={!showPassword}
                placeholder="CONFIRMAR SENHA"
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
                'ACESSAR'
              )}
            </Label>
          </ButtonDefault>

          <HorizontalRule color={'#fcf3f3'} />

          <Row $align={'center'} $justifyContent={'space-between'}>
            <ButtonDefault onPress={() => navigation.navigate('Login')}>
              <CustomText $weight={'Regular'} $color={'#fcf3f3'}>
                JÁ TENHO UMA CONTA
              </CustomText>
            </ButtonDefault>
            <CaretRight weight="bold" size={24} color={'#fcf3f3'} />
          </Row>
        </Card>
      </ContainerScroll>
    </ViewDefault>
  );
}
