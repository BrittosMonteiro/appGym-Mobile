import {CaretLeft, List} from 'phosphor-react-native';
import {Pressable, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {setOpen} from '../store/actions/sidebarAction';
import styles from '../styles';

export default function Header({title, navigation}) {
  const dispatch = useDispatch();

  return (
    <View
      style={[
        styles.main.row,
        styles.paddingStyle.py_5,
        styles.paddingStyle.px_3,
        styles.alignment.alignItems.center,
        styles.alignment.justifyContent.space_between,
        styles.colors.backgroundColor.dark_2,
        {
          borderBottomColor: '#ff6500',
          borderBottomWidth: 3,
        },
      ]}>
      <Pressable onPress={() => navigation.goBack()}>
        <CaretLeft weight="bold" color="#fefefe" />
      </Pressable>
      <Text
        style={[
          styles.colors.textColor.white_1,
          styles.font.size.size_24,
          styles.font.weight.bold,
        ]}>
        {title}
      </Text>
      <Pressable onPress={() => dispatch(setOpen())}>
        <List weight="bold" color="#fefefe" />
      </Pressable>
    </View>
  );
}
