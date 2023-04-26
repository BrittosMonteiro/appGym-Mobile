import React, {useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {CaretRight} from 'phosphor-react-native';

import HorizontalRule from './HorizontalRule';
import styles from '../styles';
import Button from './Button';
import {readActivityListService} from '../service/activity';

export default function TrainingList({navigation, userId}) {
  const [activities, setActivities] = useState([]);

  async function loadActivities() {
    await readActivityListService(userId)
      .then(responseFind => {
        return responseFind.json();
      })
      .then(response => {
        setActivities(response.data);
      })
      .catch(err => {});
  }

  useEffect(() => {
    loadActivities();
  }, []);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      loadActivities();
    });
  }, [navigation]);

  return (
    <View style={[styles.main.column, styles.gapStyle.gap_3]}>
      <View style={[styles.main.row]}>
        <Pressable
          onPress={() =>
            navigation.navigate('ManageActivity', {userId, idActivity: null})
          }>
          <Button title={'CRIAR TREINO'} type={2} />
        </Pressable>
      </View>
      {activities.length > 0 ? (
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          {activities.map((item, index) => (
            <React.Fragment key={index}>
              <Pressable
                onPress={() => {
                  navigation.navigate('ActivityDetail', {idActivity: item.id});
                }}
                style={[styles.main.column, styles.gapStyle.gap_1]}>
                <View
                  style={[
                    styles.main.row,
                    styles.alignment.justifyContent.space_between,
                  ]}>
                  <Text
                    style={[
                      styles.colors.textColor.white_1,
                      styles.font.size.size_20,
                      styles.font.weight.medium,
                    ]}>
                    {item.title}
                  </Text>
                  <CaretRight
                    weight="bold"
                    color={styles.colors.textColor.white_1.color}
                    size={28}
                  />
                </View>
                {item.qty ? (
                  <Text
                    style={[
                      styles.colors.textColor.white_1,
                      styles.font.size.size_16,
                      styles.font.weight.regular,
                    ]}>
                    {item.qty} exercícios
                  </Text>
                ) : null}
              </Pressable>
              {index < activities.length - 1 && (
                <HorizontalRule
                  color={styles.border.color.orange_1.borderColor}
                />
              )}
            </React.Fragment>
          ))}
        </View>
      ) : null}
    </View>
  );
}
