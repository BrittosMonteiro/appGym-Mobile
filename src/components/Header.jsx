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
        styles.paddingStyle.pa_3,
        styles.colors.backgroundColor.yellow_2,
        styles.alignment.justifyContent.space_between,
        styles.alignment.alignItems.center,
        styles.main.borderBottomLeftRadius_16,
        styles.main.borderBottomRightRadius_16,
      ]}>
      <Pressable onPress={() => navigation.goBack()}>
        <CaretLeft weight="bold" color="#1e1e1e" />
      </Pressable>
      <Text
        style={[
          styles.colors.textColor.dark_2,
          styles.font.size.size_24,
          styles.font.weight.bold,
        ]}>
        {title}
      </Text>
      <Pressable onPress={() => dispatch(setOpen())}>
        <List weight="bold" color="#1e1e1e" />
      </Pressable>
    </View>
  );
}
