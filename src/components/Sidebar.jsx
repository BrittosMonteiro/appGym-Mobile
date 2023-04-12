import React, {useEffect, useState} from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CaretRight, XCircle} from 'phosphor-react-native';

import {setClose} from '../store/actions/sidebarAction';
import * as RootNavigation from '../utils/RootNavigation';
import styles from '../styles';
import HorizontalRule from './HorizontalRule';

export default function Sidebar({open}) {
  const dispatch = useDispatch();
  const userSessionReducer = useSelector(state => {
    return state.userSessionReducer;
  });
  const [menu, setMenu] = useState([]);

  const options = [
    {
      title: 'PERFIL ACADEMIA',
      goTo: 'GymProfile',
      canSee: 1,
    },
    {
      title: 'INSTRUTORES',
      goTo: 'Instructors',
      canSee: 1,
    },

    {
      title: 'PERFIL DO INSTRUTOR',
      goTo: 'ProfileInstructor',
      canSee: 2,
    },
    {
      title: 'ALUNOS',
      goTo: 'Users',
      canSee: 2,
    },

    {
      title: 'INÍCIO',
      goTo: 'Dashboard',
      canSee: 3,
    },
    {
      title: 'PERFIL',
      goTo: 'Profile',
      canSee: 3,
    },
    {
      title: 'HISTÓRICO DE PAGAMENTO',
      goTo: 'PaymentHistory',
      canSee: 3,
    },
  ];

  useEffect(() => {
    const newMenu = options.filter(
      option =>
        option.canSee === userSessionReducer.userLevel ||
        option.canSee === null,
    );
    setMenu(newMenu);
  }, [userSessionReducer]);

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
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <Pressable
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
                  styles.font.weight.regular,
                ]}>
                {item.title}
              </Text>
              <CaretRight
                weight="bold"
                size={28}
                color={styles.colors.textColor.white_1.color}
              />
            </Pressable>
            {index < menu.length - 1 && (
              <HorizontalRule color={styles.colors.textColor.orange_1.color} />
            )}
          </React.Fragment>
        ))}
      </View>
    </Modal>
  );
}
