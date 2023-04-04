import {ActivityIndicator, Modal, View} from 'react-native';
import {useSelector} from 'react-redux';

import styles from '../styles';

export default function ModalLoading() {
  const openLoading = useSelector(state => {
    return state.loadingReducer;
  });

  return (
    <Modal animationType={'fade'} visible={openLoading} transparent={true}>
      <View
        style={[
          styles.alignment.alignItems.center,
          styles.alignment.justifyContent.center,
          styles.colors.backgroundColor.dark_1,
          {flex: 1, opacity: 0.75},
        ]}>
        <ActivityIndicator
          color={styles.colors.textColor.white_1.color}
          animating={true}
          size={'large'}
        />
      </View>
    </Modal>
  );
}
