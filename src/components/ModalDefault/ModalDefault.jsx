import {Modal} from 'react-native';
import {OpacityBg} from './style';
import {Card, ContainerTitle} from '../../view/style';

export default function ModalDefault(props) {
  return (
    <Modal visible={props.openModal} transparent={true} animationType="fade">
      <OpacityBg>
        <Card
          $bgColor={'#fcf3f3'}
          $fullWidth
          $padding
          style={{width: '90%', maxWidth: 500}}>
          <ContainerTitle>{props.title}</ContainerTitle>
          {props.children}
        </Card>
      </OpacityBg>
    </Modal>
  );
}
