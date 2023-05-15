import {MagnifyingGlass} from 'phosphor-react-native';
import {useTranslation} from 'react-i18next';

import styles from '../styles';
import {InputText, Row} from '../view/profile/components/style';
import {Card} from '../view/style';

export default function Search({search}) {
  const {t} = useTranslation();

  return (
    <Card $padding $black $fullWidth>
      <Row $align={'center'}>
        <MagnifyingGlass
          color={styles.colors.textColor.white_3.color}
          weight="bold"
          size={24}
        />
        <InputText
          placeholder={t('lbl_search')}
          placeholderTextColor={styles.colors.textColor.gray_1.color}
          onChangeText={text => search(text)}
        />
      </Row>
    </Card>
  );
}
