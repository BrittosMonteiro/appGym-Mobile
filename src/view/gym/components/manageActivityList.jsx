import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import HorizontalRule from '../../../components/HorizontalRule';
import styles from '../../../styles';
import ManageActivityItem from './manageActivityItem';
import {Plus} from 'phosphor-react-native';
import ModalAddItemToActivityList from './ModalAddItemToActivityList';

export default function ManageActivityList({
  selectedActivities,
  availableActivities,
  title,
  addItemToList,
}) {
  const [openModal, setOpenModal] = useState(false);

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <>
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
            styles.colors.textColor.white_1,
          ]}>
          {title}
        </Text>
        <Pressable onPress={() => setOpenModal(!openModal)}>
          <Plus
            color={styles.colors.textColor.white_1.color}
            weight="bold"
            size={24}
          />
        </Pressable>
      </View>
      {selectedActivities.length > 0 ? (
        <View style={[styles.main.column, styles.gapStyle.gap_3, {flex: 1}]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.main.column, styles.gapStyle.gap_1]}>
            {selectedActivities.map((activity, index) => (
              <React.Fragment key={index}>
                <ManageActivityItem activity={activity} />
                {index < selectedActivities.length - 1 && (
                  <HorizontalRule
                    color={styles.colors.textColor.orange_1.color}
                  />
                )}
              </React.Fragment>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={[styles.main.row, styles.alignment.justifyContent.center]}>
          <Text
            style={[
              styles.colors.textColor.white_3,
              styles.font.weight.regular,
              styles.font.size.size_16,
            ]}>
            NENHUMA ATIVIDADE SELECIONADA
          </Text>
        </View>
      )}
      <ModalAddItemToActivityList
        availableActivities={availableActivities}
        open={openModal}
        onClose={closeModal}
        addItemToList={addItemToList}
      />
    </>
  );
}
