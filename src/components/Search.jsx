import {TextInput, View} from 'react-native';
import {MagnifyingGlass} from 'phosphor-react-native';

import styles from '../styles';

export default function Search({search}) {
  return (
    <View
      style={[
        styles.main.row,
        styles.gapStyle.gap_1,
        styles.paddingStyle.pa_1,
        styles.colors.backgroundColor.dark_3,
        styles.alignment.alignItems.center,
      ]}>
      <MagnifyingGlass
        color={styles.colors.textColor.white_3.color}
        weight="bold"
        size={24}
      />
      <TextInput
        style={[
          styles.paddingStyle.px_1,
          styles.paddingStyle.py_1,
          styles.font.size.size_20,
          styles.font.weight.medium,
          styles.colors.textColor.white_1,
          {flex: 1},
        ]}
        placeholder="PESQUISAR"
        placeholderTextColor={styles.colors.textColor.gray_1.color}
        onChangeText={text => search(text)}
      />
    </View>
  );
}
