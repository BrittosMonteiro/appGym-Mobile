import {XCircle} from 'phosphor-react-native';
import {Pressable, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setMessageOff} from '../../store/actions/systemAction';

export default function SystemMessage() {
  const DISPATCH = useDispatch();
  const SYSTEM_MESSAGE = useSelector(state => {
    return state.systemMessageReducer;
  });

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
          }}>
          <View
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
              {SYSTEM_MESSAGE.text}
            </Text>
            <Pressable onPress={() => DISPATCH(setMessageOff())}>
              <XCircle color="#fcf3f3" size={28} weight="regular" />
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
}
