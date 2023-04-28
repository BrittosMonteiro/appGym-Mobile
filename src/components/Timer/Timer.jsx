import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {PauseCircle, PlayCircle, StopCircle} from 'phosphor-react-native';

import styles from '../../styles';
import {ContainerTitle} from '../../view/style';

export default function Timer({}) {
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

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
  }, [isPlaying, seconds]);

  return (
    <React.Fragment>
      <View style={[styles.main.row, styles.alignment.justifyContent.center]}>
        <ContainerTitle>
          {`${hours < 10 ? '0' + hours : hours}:${
            minutes < 10 ? '0' + minutes : minutes
          }:${seconds < 10 ? '0' + seconds : seconds}`}
        </ContainerTitle>
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
            weight="regular"
            size={48}
            color={isPaused || isStopped ? '#fefefe' : '#F2C94C'}
            style={(isPaused || isStopped) && {opacity: 0.25}}
          />
        </Pressable>

        <Pressable
          disabled={isPlaying}
          onPress={() => {
            manageButtons(false, true, false);
          }}>
          <PlayCircle
            weight="regular"
            size={48}
            color={isPlaying ? '#fefefe' : '#27AE60'}
            style={isPlaying && {opacity: 0.25}}
          />
        </Pressable>

        <Pressable
          disabled={isStopped}
          onPress={() => {
            manageButtons(false, false, true);
          }}>
          <StopCircle
            weight="regular"
            size={48}
            color={isStopped ? '#fefefe' : '#EB5757'}
            style={isStopped && {opacity: 0.25}}
          />
        </Pressable>
      </View>
    </React.Fragment>
  );
}
