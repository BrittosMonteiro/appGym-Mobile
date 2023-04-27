import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {CaretLeft, SquaresFour} from 'phosphor-react-native';

import {setOpen} from '../../store/actions/sidebarAction';
import {HeaderComponent} from './header_style';
import {HeaderGreetings} from './headerStart_style';

export default function Header({title, navigation}) {
  const dispatch = useDispatch();

  return (
    <HeaderComponent>
      <Pressable onPress={() => navigation.goBack()}>
        <CaretLeft weight="regular" color={'#fcf3f3'} />
      </Pressable>
      <HeaderGreetings>{title}</HeaderGreetings>
      <Pressable onPress={() => dispatch(setOpen())}>
        <SquaresFour size={32} color="#FCF3F3" weight="regular" />
      </Pressable>
    </HeaderComponent>
  );
}
