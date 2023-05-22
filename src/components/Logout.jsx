import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import * as RootNavigation from '../utils/RootNavigation';
import {Button, CustomText} from '../view/style';
import {unsetUser} from '../store/actions/userSessionAction';

export default function Logout() {
  const {t} = useTranslation();
  const DISPATCH = useDispatch();

  async function logout() {
    try {
      const storedData = await AsyncStorage.removeItem('USERSESSION');
      DISPATCH(unsetUser());
      if (!storedData) {
        RootNavigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Button
      $bgColor={props => props.theme.colors.red_01}
      onPress={() => logout()}>
      <CustomText
        $fontSize={18}
        $weight={'SemiBold'}
        $color={props => props.theme.colors.white_02}
        $textAlign={'center'}>
        {t('lbl_logout')}
      </CustomText>
    </Button>
  );
}
