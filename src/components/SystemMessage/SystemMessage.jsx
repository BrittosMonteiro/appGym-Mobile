import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {useTranslation} from 'react-i18next';

export default function SystemMessage() {
  const SYSTEM_MESSAGE = useSelector(state => {
    return state.systemMessageReducer;
  });
  const {t} = useTranslation();

  return (
    <>
      {SYSTEM_MESSAGE.show && (
        <View
          style={{
            backgroundColor: `${SYSTEM_MESSAGE.cardBackgroundColor}`,
            padding: 8,
            borderRadius: 4,
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            gap: 8,
          }}>
          {SYSTEM_MESSAGE.text.length > 0 && (
            <React.Fragment>
              {SYSTEM_MESSAGE.text.map((message, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: `${SYSTEM_MESSAGE.textBackgroundColor}`,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 4,
                  }}>
                  <Text
                    style={{
                      color: '#fcf3f3',
                      fontFamily: 'IBMPlexSansCondensed-Medium',
                      fontSize: 16,
                    }}>
                    {t(message)}
                  </Text>
                </View>
              ))}
            </React.Fragment>
          )}
        </View>
      )}
    </>
  );
}
