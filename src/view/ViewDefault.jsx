import {StatusBar} from 'react-native';

import {SafeAreaView, Container} from './style';

export default function ViewDefault(props) {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'#fddd78'} barStyle={'dark-content'} />
      <Container>{props.children}</Container>
    </SafeAreaView>
  );
}
