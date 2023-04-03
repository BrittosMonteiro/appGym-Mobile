import {Modal, Pressable, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {XCircle} from 'phosphor-react-native';

import {setClose} from '../store/actions/sidebarAction';

import * as RootNavigation from '../utils/RootNavigation';
import styles from '../styles';

export default function Sidebar({open}) {
  const dispatch = useDispatch();

  const options = [
    {
      title: 'INÍCIO',
      goTo: 'Dashboard',
    },
    {
      title: 'PERFIL',
      goTo: 'Profile',
    },
    {
      title: 'PERFIL ACADEMIA',
      goTo: 'GymProfile',
    },
    {
      title: 'INSTRUTORES',
      goTo: 'Instructors',
    },
    {
      title: 'ALUNOS',
      goTo: 'Users',
    },
    {
      title: 'HISTÓRICO DE PAGAMENTO',
      goTo: 'PaymentHistory',
    },
    {
      title: 'SAIR',
      goTo: 'Logout',
    },
  ];
  return (
    <Modal animationType="fade" visible={open} transparent={true}>
      <View
        style={[
          styles.alignment.justifyContent.flex_end,
          styles.alignment.alignItems.flex_end,
          styles.colors.backgroundColor.dark_1,
          styles.gapStyle.gap_5,
          {
            flex: 1,
            width: '100%',
          },
        ]}>
        <View
          style={[
            {
              flex: 1,
              width: '100%',
            },
            styles.colors.backgroundColor.yellow_2,
            styles.paddingStyle.pa_3,
            styles.gapStyle.gap_3,
          ]}>
          <Pressable
            style={{alignItems: 'flex-end'}}
            onPress={() => dispatch(setClose())}>
            <XCircle weight="bold" size={28} />
          </Pressable>
          {options.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                dispatch(setClose());
                RootNavigation.navigate(item.goTo);
              }}>
              <Text
                style={[
                  styles.colors.textColor.dark_2,
                  styles.font.size.size_24,
                  styles.font.weight.bold,
                ]}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
}
