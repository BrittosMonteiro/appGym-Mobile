import {MagnifyingGlass} from 'phosphor-react-native';

import styles from '../styles';
import {InputText, Row} from '../view/profile/components/style';
import {Card} from '../view/style';

export default function Search({search}) {
  return (
    <Card $padding $black $fullWidth>
      <Row $align={'center'}>
        <MagnifyingGlass
          color={styles.colors.textColor.white_3.color}
          weight="bold"
          size={24}
        />
        <InputText
          placeholder="PESQUISAR"
          placeholderTextColor={styles.colors.textColor.gray_1.color}
          onChangeText={text => search(text)}
        />
      </Row>
    </Card>
  );
}
