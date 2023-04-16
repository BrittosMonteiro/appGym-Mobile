import {Text, View} from 'react-native';
import HorizontalRule from '../HorizontalRule';
import styles from '../../styles';

export default function Plan({plan}) {
  return (
    <>
      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <View
          style={[
            styles.main.row,
            styles.alignment.justifyContent.space_between,
            styles.alignment.alignItems.flex_start,
          ]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            PLANO
          </Text>
          <Text
            style={[
              styles.font.size.size_16,
              styles.font.weight.medium,
              styles.colors.textColor.white_1,
              styles.colors.backgroundColor.green_1,
              styles.font.weight.medium,
              styles.main.borderRadiusDefault,
              styles.paddingStyle.px_1,
            ]}>
            ATIVO
          </Text>
        </View>

        <View
          style={[
            styles.main.row,
            styles.alignment.justifyContent.space_between,
            styles.alignment.alignItems.flex_start,
          ]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}>
            {plan.title}
          </Text>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}>
            R$ {plan.price.toString().replace('.', ',')}
          </Text>
        </View>

        <Text
          style={[
            styles.colors.textColor.white_2,
            styles.font.size.size_16,
            styles.font.weight.regular,
          ]}>
          VÁLIDO ATÉ: 13-08-2023
        </Text>
      </View>
      <HorizontalRule />
    </>
  );
}
