import {useState} from 'react';
import {Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CaretDown, CaretUp, Eye, EyeSlash} from 'phosphor-react-native';
import {useTranslation} from 'react-i18next';

import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {Column, Row, Label, InputText} from './style';
import {ButtonDefault, Card, ContainerTitle} from '../../style';

import {updatePasswordService} from '../../../service/user';
import {
  setMessageError,
  setMessageOff,
} from '../../../store/actions/systemAction';

export default function ProfilePassword() {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleUpdatePassword, setToggleUpdatePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  async function updatePassword() {
    DISPATCH(setLoading());
    if (!password || !confirmPassword) {
      DISPATCH(unsetLoading());
      setMessage(`${t('system_message_user_login_missing_information')}`);
      return;
    }

    if (password !== confirmPassword) {
      DISPATCH(unsetLoading());
      setMessage(`${t('system_message_user_password_does_not_match')}`);
      return;
    }

    const data = {
      idUser: USERSESSION.id,
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
      .catch(() => {
        setMessage(`${t('system_message_default_error')}`);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  return (
    <>
      <Card $black $padding $fullWidth>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <ContainerTitle $white>{t('title_change_password')}</ContainerTitle>
          <Pressable
            onPress={() => setToggleUpdatePassword(!toggleUpdatePassword)}>
            {toggleUpdatePassword ? (
              <CaretDown size={24} weight="regular" color={'#fcf3f3'} />
            ) : (
              <CaretUp size={24} weight="regular" color={'#fcf3f3'} />
            )}
          </Pressable>
        </Row>
        {toggleUpdatePassword && (
          <>
            <Column $gap>
              <Label>{t('lbl_new_password')}</Label>
              <Row $align={'center'} $justifyContent={'space-between'}>
                <InputText
                  placeholder={t('lbl_your_new_password')}
                  secureTextEntry={!showPassword}
                  defaultValue={password}
                  onChangeText={text => setPassword(text)}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye weight="regular" color={'#fcf3f3'} size={24} />
                  ) : (
                    <EyeSlash weight="regular" color={'#fcf3f3'} size={24} />
                  )}
                </Pressable>
              </Row>
            </Column>

            <Column $gap>
              <Label>{t('lbl_confirm_new_password')}</Label>
              <Row $align={'center'} $justifyContent={'space-between'}>
                <InputText
                  placeholder={t('lbl_confirm_your_new_password')}
                  secureTextEntry={!showPassword}
                  defaultValue={confirmPassword}
                  onChangeText={text => setConfirmPassword(text)}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye weight="regular" color={'#fcf3f3'} size={24} />
                  ) : (
                    <EyeSlash weight="regular" color={'#fcf3f3'} size={24} />
                  )}
                </Pressable>
              </Row>
            </Column>

            <ButtonDefault $green onPress={() => updatePassword()}>
              <Label>{t('lbl_update')}</Label>
            </ButtonDefault>
          </>
        )}
      </Card>
    </>
  );
}
