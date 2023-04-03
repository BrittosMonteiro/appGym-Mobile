import {Pressable, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {List} from 'phosphor-react-native';

import styles from '../styles';
import {setOpen} from '../store/actions/sidebarAction';

export default function HeaderStart() {
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
      <Text
        style={[
          styles.font.size.size_24,
          styles.font.weight.medium,
          styles.colors.textColor.white_1,
        ]}>
        Olá, <Text style={[styles.font.weight.bold]}>Lucas!</Text>
      </Text>
      <Pressable onPress={() => dispatch(setOpen())}>
        <List weight="bold" color="#fefefe" size={28} />
      </Pressable>
    </View>
  );
}
