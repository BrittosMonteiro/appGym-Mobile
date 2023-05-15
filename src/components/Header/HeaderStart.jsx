import {Pressable} from 'react-native';
import {SquaresFour} from 'phosphor-react-native';
import {useTranslation} from 'react-i18next';

import {
  HeaderColumn,
  HeaderGreetings,
  HeaderGreetingsStrong,
  Header,
  HeaderSubtitle,
} from './headerStart_style';
import {useDispatch, useSelector} from 'react-redux';
import {setOpen} from '../../store/actions/sidebarAction';

export default function HeaderStart({navigation}) {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const {t} = useTranslation();

  return (
    <Header>
      <HeaderColumn>
        <HeaderGreetings>
          {t('hello')},{' '}
          <HeaderGreetingsStrong>
            {userSession.displayName}!
          </HeaderGreetingsStrong>
        </HeaderGreetings>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <HeaderSubtitle>{t('go_to_profile')}</HeaderSubtitle>
        </Pressable>
      </HeaderColumn>
      <Pressable onPress={() => dispatch(setOpen())}>
        <SquaresFour size={32} color="#FCF3F3" weight="regular" />
      </Pressable>
    </Header>
  );
}
