import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {PauseCircle, PlayCircle, StopCircle} from 'phosphor-react-native';

export default function Timer({finishTime, isStopped, setIsStopped}) {
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  function manageButtons(pause, play, stop) {
    setIsPaused(pause);
    setIsPlaying(play);
    setIsStopped(stop);
  }

  return (
    <React.Fragment>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 8,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* <Pressable
          disabled={isPaused || isStopped}
          onPress={() => {
            manageButtons(true, false, false);
          }}>
          <PauseCircle
            weight="regular"
            size={40}
            color={'#fefefe'}
            style={(isPaused || isStopped) && {opacity: 0.25}}
          />
        </Pressable> */}

        <Pressable
          disabled={isPlaying}
          onPress={() => {
            manageButtons(false, true, false);
          }}>
          <PlayCircle
            weight="regular"
            size={40}
            color={'#fcf3f3'}
            style={isPlaying && {opacity: 0.25}}
          />
        </Pressable>

        <Pressable
          disabled={isStopped}
          onPress={() => {
            finishTime(new Date());
            manageButtons(false, false, true);
          }}>
          <StopCircle
            weight="regular"
            size={40}
            color={'#fcf3f3'}
            style={isStopped && {opacity: 0.25}}
          />
        </Pressable>
      </View>
    </React.Fragment>
  );
}
