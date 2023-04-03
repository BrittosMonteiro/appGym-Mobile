import {Text, View} from 'react-native';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import HorizontalRule from '../../components/HorizontalRule';

export default function Profile({navigation}) {
  return (
    <ViewDefault>
      <Header navigation={navigation} title={'PERFIL'} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: 16,
          gap: 24,
        }}>
        <View style={{display: 'flex', flexDirection: 'column', gap: 24}}>
          <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <Text style={{color: '#fefefe', fontSize: 14, fontFamily: 'HindVadodara-Regular'}}>
              NOME
            </Text>
            <Text style={{color: '#fefefe', fontSize: 18, fontFamily: 'HindVadodara-Medium'}}>
              Lucas
            </Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <Text style={{color: '#fefefe', fontSize: 14, fontFamily: 'HindVadodara-Regular'}}>
              ACADEMIA
            </Text>
            <Text style={{color: '#fefefe', fontSize: 18, fontFamily: 'HindVadodara-Medium'}}>
              The Best
            </Text>
          </View>

          <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <Text style={{color: '#fefefe', fontSize: 14, fontFamily: 'HindVadodara-Regular'}}>
              ID
            </Text>
            <Text style={{color: '#fefefe', fontSize: 18, fontFamily: 'HindVadodara-Medium'}}>
              01234
            </Text>
          </View>

          <HorizontalRule />

          <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <Text style={{color: '#fefefe', fontSize: 14, fontFamily: 'HindVadodara-Regular'}}>
                PLANO
              </Text>
              <Text
                style={{
                  color: '#fefefe',
                  fontSize: 14,
                  fontFamily: 'HindVadodara-Medium',
                  backgroundColor: '#27AE60',
                  padding: 8,
                  borderRadius: 4,
                }}>
                ATIVO
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}>
              <Text style={{color: '#fefefe', fontSize: 18, fontFamily: 'HindVadodara-Medium'}}>
                FN: SECO SEMESTRAL
              </Text>
              <Text style={{color: '#fefefe', fontSize: 18, fontFamily: 'HindVadodara-Medium'}}>
                R$ 720,00
              </Text>
            </View>

            <Text style={{color: '#fefefe', fontSize: 14, fontFamily: 'HindVadodara-Regular'}}>
              VÁLIDO ATÉ: 13-08-2023
            </Text>
          </View>
        </View>
      </View>
    </ViewDefault>
  );
}
