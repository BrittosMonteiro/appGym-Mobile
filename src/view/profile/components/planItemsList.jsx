import {Label, Row} from './style';
import {Card, ContainerTitle, CustomText} from '../../style';

export default function PlanItemsList({icon, list, title}) {
  return (
    <Card>
      <CustomText $fontSize={18} $color={'#fcf3f3'}>
        {title}
      </CustomText>
      <Card>
        {list.map((item, index) => (
          <Row key={index} $align={'center'} $justifyContent={'flex-start'}>
            {icon}
            <Label>{item.title}</Label>
          </Row>
        ))}
      </Card>
    </Card>
  );
}
