import {Check, X} from 'phosphor-react-native';
import {useTranslation} from 'react-i18next';

import PlanItemsList from './planItemsList';
import {Row} from './style';
import {Card} from '../../style';

export default function PlanItems({isIncluded, notIncluded}) {
  const x = <X weight="bold" color={'#EB5757'} size={24} />;
  const check = <Check weight="bold" color={'#27AE60'} size={24} />;

  const {t} = useTranslation();

  return (
    <Card $fullWidth>
      <Row $align={'flex-start'} $justifyContent={'space-between'}>
        <PlanItemsList
          title={t('lbl_included_items')}
          list={isIncluded}
          icon={check}
        />
        <PlanItemsList
          title={t('lbl_not_included_items')}
          list={notIncluded}
          icon={x}
        />
      </Row>
    </Card>
  );
}
