import {Modal, Pressable, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {CaretRight, XCircle} from 'phosphor-react-native';

import {setClose} from '../store/actions/sidebarAction';

import * as RootNavigation from '../utils/RootNavigation';
import styles from '../styles';
import HorizontalRule from './HorizontalRule';

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
          styles.colors.backgroundColor.dark_2,
          styles.gapStyle.gap_1,
          styles.paddingStyle.pa_3,
          {
            flex: 1,
            width: '100%',
          },
        ]}>
        <Pressable
          style={[styles.alignment.alignItems.flex_end, {marginBottom: 24}]}
          onPress={() => dispatch(setClose())}>
          <XCircle
            weight="bold"
            size={28}
            color={styles.colors.textColor.white_1.color}
          />
        </Pressable>
        {options.map((item, index) => (
          <>
            <Pressable
              key={index}
              onPress={() => {
                dispatch(setClose());
                RootNavigation.navigate(item.goTo);
              }}
              style={[
                styles.main.row,
                styles.alignment.alignItems.center,
                styles.alignment.justifyContent.space_between,
              ]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_24,
                  styles.font.weight.bold,
                ]}>
                {item.title}
              </Text>
              <CaretRight
                weight="bold"
                size={28}
                color={styles.colors.textColor.white_1.color}
              />
            </Pressable>
            {index < options.length - 1 && (
              <HorizontalRule color={styles.colors.textColor.white_1.color} />
            )}
          </>
        ))}
      </View>
    </Modal>
  );
}
