import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {PauseCircle, PlayCircle, StopCircle} from 'phosphor-react-native';

import ViewDefault from '../ViewDefault';
import Header from '../../components/Header';
import ActivityItem from './activityItem';
import HorizontalRule from '../../components/HorizontalRule';
import styles from '../../styles';
import Button from '../../components/Button';

export default function TrainingCurrent({route, navigation}) {
  const {title} = route.params;
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  const details = [
    {
      id: 1,
      load: null,
      machine: null,
      repetitions: null,
      series: null,
      time: '5 minutos',
      title: 'ESTEIRA',
    },
    {
      id: 2,
      load: 23,
      machine: 37,
      repetitions: 12,
      series: 3,
      time: null,
      title: 'SUPINO RETO - HALTER',
    },
    {
      id: 1,
      load: null,
      machine: null,
      repetitions: null,
      series: null,
      time: '5 minutos',
      title: 'ESTEIRA',
    },
    {
      id: 2,
      load: 23,
      machine: 37,
      repetitions: 12,
      series: 3,
      time: null,
      title: 'SUPINO RETO - HALTER',
    },
  ];

  function manageButtons(pause, play, stop) {
    setIsPaused(pause);
    setIsPlaying(play);
    setIsStopped(stop);
  }

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (seconds === 59 && minutes !== 59) {
          setSeconds(seconds => seconds - 59);
          setMinutes(minutes => minutes + 1);
        } else {
          if (seconds === 59 && minutes === 59) {
            setSeconds(seconds => seconds - 60);
            setMinutes(minutes => minutes - 59);
            setHours(hours => hours + 1);
          }
        }

        setSeconds(seconds => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, seconds, minutes, hours]);

  return (
    <ViewDefault>
      <Header title={title} navigation={navigation} />
      <View
        style={[
          styles.main.column,
          styles.gapStyle.gap_5,
          styles.paddingStyle.px_3,
          {
            height: '100%',
          },
        ]}>
        <View style={[styles.main.row, styles.alignment.justifyContent.center]}>
          <Text
            style={[
              styles.font.size.size_42,
              styles.font.weight.semiBold,
              styles.colors.textColor.dark_2,
            ]}>
            {`${hours < 10 ? '0' + hours : hours}:${
              minutes < 10 ? '0' + minutes : minutes
            }:${seconds < 10 ? '0' + seconds : seconds}`}
          </Text>
        </View>

        <View
          style={[
            styles.main.row,
            styles.paddingStyle.pa_1,
            styles.gapStyle.gap_3,
            styles.main.borderRadiusDefault,
            styles.alignment.justifyContent.center,
          ]}>
          <Pressable
            disabled={isPaused || isStopped}
            onPress={() => {
              manageButtons(true, false, false);
            }}>
            <PauseCircle
              weight="bold"
              size={48}
              color={isPaused || isStopped ? '#eee' : '#F2C94C'}
              style={(isPaused || isStopped) && {opacity: 0.25}}
            />
          </Pressable>

          <Pressable
            disabled={isPlaying}
            onPress={() => {
              manageButtons(false, true, false);
            }}>
            <PlayCircle
              weight="bold"
              size={48}
              color={isPlaying ? '#eee' : '#27AE60'}
              style={isPlaying && {opacity: 0.25}}
            />
          </Pressable>

          <Pressable
            disabled={isStopped}
            onPress={() => {
              manageButtons(false, false, true);
            }}>
            <StopCircle
              weight="bold"
              size={48}
              color={isStopped ? '#eee' : '#EB5757'}
              style={isStopped && {opacity: 0.25}}
            />
          </Pressable>
        </View>

        {details.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.main.column, styles.gapStyle.gap_3]}>
            {details.map((activity, index) => (
              <React.Fragment key={index}>
                <ActivityItem activity={activity} isStopped={isStopped} />
                {index < details.length - 1 && (
                  <HorizontalRule color={'#FF6500'} />
                )}
              </React.Fragment>
            ))}
            <Pressable>
              <Button title={'CANCELAR'} type={0} />
            </Pressable>
          </ScrollView>
        ) : null}
      </View>
    </ViewDefault>
  );
}
