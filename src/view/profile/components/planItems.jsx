import {Check, X} from 'phosphor-react-native';

import PlanItemsList from './planItemsList';
import {Row} from './style';
import styles from '../../../styles';
import { Card } from '../../style';

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
    <Card $fullWidth={true}>
      <Row $align={'flex-start'} $justifyContent={'space-between'}>
        <PlanItemsList
          title={'ITENS INCLUSOS'}
          list={isIncluded}
          icon={check}
        />
        <PlanItemsList
          title={'ITENS NÃO INCLUSOS'}
          list={notIncluded}
          icon={x}
        />
      </Row>
    </Card>
  );
}
