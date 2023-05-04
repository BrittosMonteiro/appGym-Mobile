import {Column, Label, Row} from './style';
import {CustomText} from '../../style';

export default function PlanItemsList({icon, list, title}) {
  return (
    <Column $gap>
      <CustomText $fontSize={18} $color={'#fcf3f3'}>
        {title}
      </CustomText>
      <Column $gap>
        {list.map((item, index) => (
          <Row key={index} $align={'center'} $justifyContent={'flex-start'}>
            {icon}
            <Label>{item.title}</Label>
          </Row>
        ))}
      </Column>
    </Column>
  );
}
