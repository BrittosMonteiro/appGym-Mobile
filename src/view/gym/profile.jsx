import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HeaderStart from '../../components/HeaderStart';
import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule';
import Button from '../../components/Button';

export default function GymProfile({navigation}) {
  async function logout() {
    try {
      const storedData = await AsyncStorage.removeItem('userSession');
      if (!storedData) {
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ViewDefault>
      <HeaderStart />
      <ScrollView
        contentContainerStyle={[
          style.column,
          style.gap_6,
          {paddingHorizontal: 16},
        ]}>
        <View style={[style.column]}>
          <Text style={[style.fontRegular, style.font_18, style.whiteColor]}>
            NOME
          </Text>
          <Text style={[style.fontMedium, style.font_20, style.whiteColor]}>
            The Best Academy
          </Text>
        </View>
        <View style={[style.column]}>
          <Text style={[style.fontRegular, style.font_18, style.whiteColor]}>
            NOME DE EXIBIÇÃO
          </Text>
          <Text style={[style.fontMedium, style.font_20, style.whiteColor]}>
            The Best
          </Text>
        </View>
        <View style={[style.column]}>
          <Text style={[style.fontRegular, style.font_18, style.whiteColor]}>
            ID
          </Text>
          <Text style={[style.fontMedium, style.font_20, style.whiteColor]}>
            01234
          </Text>
        </View>
        <HorizontalRule />
        <View style={[style.column, style.gap_6]}>
          <Text style={[style.fontRegular, style.font_20, style.whiteColor]}>
            ALTERAR SENHA
          </Text>
          <View style={[style.column, style.gap_2]}>
            <Text style={[style.fontRegular, style.font_18, style.whiteColor]}>
              NOVA SENHA
            </Text>
            <TextInput
              secureTextEntry={true}
              placeholder="NOVA SENHA"
              style={[
                style.dark_2_BackgroundColor,
                style.whiteColor,
                style.font_20,
                style.fontMedium,
                {padding: 8},
              ]}
              placeholderTextColor={'#777'}
            />
          </View>
          <View style={[style.column, style.gap_2]}>
            <Text style={[style.fontRegular, style.font_18, style.whiteColor]}>
              CONFIRMAR SENHA
            </Text>
            <TextInput
              secureTextEntry={true}
              placeholder="CONFIRMAR SENHA"
              style={[
                style.dark_2_BackgroundColor,
                style.whiteColor,
                style.font_20,
                style.fontMedium,
                {padding: 8},
              ]}
              placeholderTextColor={'#777'}
            />
          </View>
        </View>
        <Pressable onPress={() => logout()}>
          <Button title={'SAIR'} type={2} />
        </Pressable>
      </ScrollView>
    </ViewDefault>
  );
}

const style = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  gap_1: {
    gap: 4,
  },
  gap_2: {
    gap: 8,
  },
  gap_3: {
    gap: 12,
  },
  gap_4: {
    gap: 16,
  },
  gap_5: {
    gap: 20,
  },
  gap_6: {
    gap: 24,
  },
  fontRegular: {
    fontFamily: 'HindVadodara-Regular',
  },
  fontMedium: {
    fontFamily: 'HindVadodara-Medium',
  },
  fontSemiBold: {
    fontFamily: 'HindVadodara-SemiBold',
  },
  fontBold: {
    fontFamily: 'HindVadodara-Bold',
  },
  font_14: {
    fontSize: 14,
  },
  font_16: {
    fontSize: 16,
  },
  font_18: {
    fontSize: 18,
  },
  font_20: {
    fontSize: 20,
  },
  whiteColor: {
    color: '#fefefe',
  },
  dark_1_Color: {
    color: '#1e1e1e',
  },
  dark_1_BackgroundColor: {
    backgroundColor: '#1e1e1e',
  },
  dark_2_BackgroundColor: {
    backgroundColor: '#2d2d2d',
  },
});
