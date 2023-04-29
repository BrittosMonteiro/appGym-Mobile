import {useEffect, useState} from 'react';
import {ActivityIndicator, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {CaretRight, Eye, EyeSlash} from 'phosphor-react-native';

import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {ButtonDefault, Container, CustomText} from '../style';
import {Card} from '../style';
import {Column, InputText, Label, Row} from '../profile/components/style';
import {ContainerListItem} from '../../components/TrainingList/style';
import {loginService} from '../../service/login';
import {setUser} from '../../store/actions/userSessionAction';

export default function Login({navigation}) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('teste123');
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
      case 1 || 2:
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
            CRIAR
          </CustomText>
          <CustomText $fontSize={38} $weight={'Medium'}>
            MINHA CONTA
          </CustomText>
        </Column>
        <Card $black $padding>
          <Column $gap>
            <Label>USUÁRIO</Label>
            <InputText
              editable={!isLoading}
              placeholder="USUÁRIO"
              defaultValue={username}
              onChangeText={text => setUsername(text)}
            />
          </Column>

          <Column $gap>
            <Label>SENHA</Label>
            <Row $align={'center'} $justifyContent={'space-between'}>
              <InputText
                editable={!isLoading}
                placeholder="SENHA"
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
            </Row>
          </Column>

          <ButtonDefault onPress={() => access()} disabled={isLoading} $green>
            <Label>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={'#fcf3f3'} />
              ) : (
                'ACESSAR'
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
                CRIAR CONTA COMO USUÁRIO
              </CustomText>
              <CaretRight weight="regular" size={24} color={'#fcf3f3'} />
            </ContainerListItem>

            <ContainerListItem
              $paddingVertical={false}
              onPress={() =>
                navigation.navigate('CreateGymAccount', {userLevel: 1})
              }>
              <CustomText $fontSize={16} $color={'#fcf3f3'}>
                CRIAR CONTA COMO ACADEMIA
              </CustomText>
              <CaretRight weight="regular" size={24} color={'#fcf3f3'} />
            </ContainerListItem>
          </Card>
        </Card>
      </Container>
    </ViewDefault>
  );
}
