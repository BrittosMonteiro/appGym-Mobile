import {Pressable} from 'react-native';
import {SquaresFour} from 'phosphor-react-native';

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

  return (
    <Header>
      <HeaderColumn>
        <HeaderGreetings>
          Olá,{' '}
          <HeaderGreetingsStrong>
            {userSession.displayName}!
          </HeaderGreetingsStrong>
        </HeaderGreetings>
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <HeaderSubtitle>VER PERFIL</HeaderSubtitle>
        </Pressable>
      </HeaderColumn>
      <Pressable onPress={() => dispatch(setOpen())}>
        <SquaresFour size={32} color="#FCF3F3" weight="regular" />
      </Pressable>
    </Header>
  );
}
