import {Modal} from 'react-native';
import {OpacityBg} from './style';
import {Card} from '../../view/style';

export default function ModalDefault(props) {
  return (
    <Modal visible={props.openModal} transparent={true} animationType="fade">
      <OpacityBg>
        <Card
          $bgColor={'#fcf3f3'}
          $fullWidth
          $padding
          style={{width: '90%', maxWidth: 500}}>
          {props.children}
        </Card>
      </OpacityBg>
    </Modal>
  );
}
