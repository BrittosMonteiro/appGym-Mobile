import {Text, View} from 'react-native';

import styles from '../../../styles';

export default function ProfileData({
  name,
  email,
  username,
  birthdate,
  cpf,
  gymName,
}) {
  return (
    <View style={[styles.gapStyle.gap_5]}>
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
          {name}
        </Text>
      </View>

      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_2,
            styles.font.size.size_18,
            styles.font.weight.regular,
          ]}>
          E-MAIL
        </Text>
        <Text
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_20,
            styles.font.weight.medium,
          ]}>
          {email}
        </Text>
      </View>

      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_2,
            styles.font.size.size_18,
            styles.font.weight.regular,
          ]}>
          USERNAME
        </Text>
        <Text
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_20,
            styles.font.weight.medium,
          ]}>
          {username}
        </Text>
      </View>

      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_2,
            styles.font.size.size_18,
            styles.font.weight.regular,
          ]}>
          DATA DE NASCIMENTO
        </Text>
        <Text
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_20,
            styles.font.weight.medium,
          ]}>
          {new Date(birthdate).toLocaleDateString()}
        </Text>
      </View>

      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_2,
            styles.font.size.size_18,
            styles.font.weight.regular,
          ]}>
          CPF
        </Text>
        <Text
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_20,
            styles.font.weight.medium,
          ]}>
          {cpf}
        </Text>
      </View>

      {gymName && (
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
            {gymName}
          </Text>
        </View>
      )}
    </View>
  );
}
