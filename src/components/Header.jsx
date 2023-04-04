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
        styles.alignment.alignItems.center,
        styles.alignment.justifyContent.space_between,
        styles.border.color.orange_1,
        styles.border.width.pb3,
        styles.colors.backgroundColor.dark_2,
        styles.main.row,
        styles.paddingStyle.py_5,
        styles.paddingStyle.px_3,
      ]}>
      <Pressable onPress={() => navigation.goBack()}>
        <CaretLeft
          weight="bold"
          color={styles.colors.textColor.white_1.color}
        />
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
        <List weight="bold" color={styles.colors.textColor.white_1.color} />
      </Pressable>
    </View>
  );
}
