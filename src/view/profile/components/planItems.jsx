import {View} from 'react-native';
import {Check, X} from 'phosphor-react-native';

import styles from '../../../styles';
import PlanItemsList from './planItemsList';

const x = (
  <X weight="bold" color={styles.colors.textColor.red_1.color} size={24} />
);

const check = (
  <Check
    weight="bold"
    color={styles.colors.textColor.green_1.color}
    size={24}
  />
);

export default function PlanItems({isIncluded, notIncluded}) {
  return (
    <View
      style={[
        styles.main.row,
        styles.alignment.alignItems.flex_start,
        styles.alignment.justifyContent.space_between,
      ]}>
      <PlanItemsList title={'ITENS INCLUSOS'} list={isIncluded} icon={check} />
      <PlanItemsList title={'ITENS NÃO INCLUSOS'} list={notIncluded} icon={x} />
    </View>
  );
}
