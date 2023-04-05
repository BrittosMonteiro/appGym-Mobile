import React from 'react';
import {Modal, Pressable, ScrollView, Text, View} from 'react-native';

import HorizontalRule from '../../../components/HorizontalRule';
import styles from '../../../styles';
import {Plus, XCircle} from 'phosphor-react-native';

export default function ModalAddItemToActivityList({
  availableActivities,
  open,
  onClose,
  addItemToList,
}) {
  return (
    <Modal animationType="fade" visible={open} transparent={true}>
      <View
        style={[
          styles.alignment.alignItems.center,
          styles.alignment.justifyContent.center,
          styles.paddingStyle.pa_3,
          {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        ]}>
        <View
          style={[
            styles.colors.backgroundColor.white_1,
            styles.main.column,
            styles.paddingStyle.pa_3,
            styles.main.borderRadiusDefault,
            styles.gapStyle.gap_5,
            {
              width: '100%',
              maxWidth: 400,
              height: '100%',
              maxHeight: 600,
            },
          ]}>
          <View
            style={[
              styles.main.row,
              styles.alignment.alignItems.center,
              styles.alignment.justifyContent.space_between,
            ]}>
            <Text
              style={[
                styles.font.size.size_20,
                styles.font.weight.medium,
                styles.colors.textColor.dark_2,
              ]}>
              ATIVIDADES DISPONÍVEIS
            </Text>
            <Pressable onPress={() => onClose()}>
              <XCircle
                color={styles.colors.textColor.red_1.color}
                weight="bold"
                size={24}
              />
            </Pressable>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.main.column, styles.gapStyle.gap_1]}>
            {availableActivities.map((activity, index) => (
              <React.Fragment key={index}>
                <Pressable
                  onPress={() => {
                    addItemToList(activity);
                    onClose();
                  }}
                  style={[
                    styles.main.row,
                    styles.alignment.alignItems.center,
                    styles.alignment.justifyContent.space_between,
                  ]}>
                  <Text
                    style={[
                      styles.font.size.size_18,
                      styles.font.weight.regular,
                      styles.colors.textColor.dark_2,
                    ]}>
                    {activity.title}
                  </Text>
                  <Plus
                    weight="bold"
                    size={24}
                    color={styles.colors.textColor.dark_2.color}
                  />
                </Pressable>
                {index < availableActivities.length - 1 && (
                  <HorizontalRule
                    color={styles.colors.textColor.dark_3.color}
                  />
                )}
              </React.Fragment>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
