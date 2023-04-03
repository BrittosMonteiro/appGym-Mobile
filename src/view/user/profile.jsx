import {Text, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule';
import styles from '../../styles';

export default function Profile({navigation}) {
  return (
    <ViewDefault>
      <Header navigation={navigation} title={'PERFIL'} />
      <View
        style={[
          styles.main.column,
          styles.paddingStyle.px_3,
          styles.gapStyle.gap_5,
        ]}>
        <View style={[styles.main.column, styles.gapStyle.gap_5]}>
          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_2,
                styles.font.size.size_18,
                styles.font.weight.regular,
              ]}>
              NOME
            </Text>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_20,
                styles.font.weight.medium,
              ]}>
              Lucas
            </Text>
          </View>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_2,
                styles.font.size.size_18,
                styles.font.weight.regular,
              ]}>
              ACADEMIA
            </Text>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_20,
                styles.font.weight.medium,
              ]}>
              The Best
            </Text>
          </View>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_2,
                styles.font.size.size_18,
                styles.font.weight.regular,
              ]}>
              ID
            </Text>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_20,
                styles.font.weight.medium,
              ]}>
              01234
            </Text>
          </View>

          <HorizontalRule />

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
                FN: SECO SEMESTRAL
              </Text>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.medium,
                ]}>
                R$ 720,00
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
        </View>
      </View>
    </ViewDefault>
  );
}
