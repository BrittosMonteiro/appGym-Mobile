import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {Row} from './style';
import {ContainerTitle, CustomText, InputDataDefault, Link} from '../../style';

import {updatePasswordService} from '../../../service/user';
import {
  setMessageError,
  setMessageOff,
} from '../../../store/actions/systemAction';
import Container2 from '../../../components/Container/Container';

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
    <Container2 gap={16}>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ContainerTitle $white>{t('title_change_password')}</ContainerTitle>
        <Link onPress={() => updatePassword()}>
          <CustomText $fontSize={18}>{t('lbl_update')}</CustomText>
        </Link>
      </Row>
      <Row>
        <CustomText $fontSize={14}>{t('lbl_new_password')}</CustomText>
        <InputDataDefault
          $bgColor={props => props.theme.colors.black_01}
          $color={props => props.theme.colors.white_02}
          $padding={16}
          $fontSize={18}
          $fontWeight={'SemiBold'}
          placeholder={t('lbl_your_new_password')}
          secureTextEntry={!showPassword}
          defaultValue={password}
          onChangeText={text => setPassword(text)}
        />
      </Row>

      <Row>
        <CustomText $fontSize={14}>{t('lbl_confirm_new_password')}</CustomText>
        <InputDataDefault
          $bgColor={props => props.theme.colors.black_01}
          $color={props => props.theme.colors.white_02}
          $padding={16}
          $fontSize={18}
          $fontWeight={'SemiBold'}
          placeholder={t('lbl_confirm_your_new_password')}
          secureTextEntry={!showPassword}
          defaultValue={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
      </Row>

      <Row $justifyContent={'flex-end'}>
        <Link onPress={() => setShowPassword(!showPassword)}>
          <CustomText>
            {showPassword ? t('lbl_hide_password') : t('lbl_display_password')}
          </CustomText>
        </Link>
      </Row>
    </Container2>
  );
}
