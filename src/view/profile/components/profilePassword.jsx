import {useState} from 'react';
import {Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CaretDown, CaretUp, Eye, EyeSlash} from 'phosphor-react-native';

import styles from '../../../styles';
import Button from '../../../components/Button';
import HorizontalRule from '../../../components/HorizontalRule';

import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {Column, Row, Label, InputText} from './style';
import {Card, ContainerTitle} from '../../style';

import {updatePasswordService} from '../../../service/user';

export default function ProfilePassword() {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleUpdatePassword, setToggleUpdatePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <>
      <Card $black={true} $padding={true} $fullWidth={true}>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <ContainerTitle $white>ALTERAR SENHA</ContainerTitle>
          <Pressable
            onPress={() => setToggleUpdatePassword(!toggleUpdatePassword)}>
            {toggleUpdatePassword ? (
              <CaretDown
                size={24}
                weight="bold"
                color={styles.colors.textColor.white_1.color}
              />
            ) : (
              <CaretUp
                size={24}
                weight="bold"
                color={styles.colors.textColor.white_1.color}
              />
            )}
          </Pressable>
        </Row>
        {toggleUpdatePassword && (
          <>
            <Column>
              <Label>NOVA SENHA</Label>
              <Row $align={'center'} $justifyContent={'space-between'}>
                <InputText
                  placeholder={'SUA NOVA SENHA'}
                  secureTextEntry={!showPassword}
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
              </Row>
            </Column>

            <Column>
              <Label>CONFIRMAR NOVA SENHA</Label>
              <Row $align={'center'} $justifyContent={'space-between'}>
                <InputText
                  placeholder={'CONFIRME SUA NOVA SENHA'}
                  secureTextEntry={!showPassword}
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
              </Row>
            </Column>

            <Pressable onPress={() => updatePassword()}>
              <Button title={'ALTERAR'} type={1} />
            </Pressable>
          </>
        )}
      </Card>

      {toggleUpdatePassword && <HorizontalRule />}
    </>
  );
}
