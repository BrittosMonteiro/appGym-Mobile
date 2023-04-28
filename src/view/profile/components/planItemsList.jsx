import {Label, Row} from './style';
import {Card, ContainerTitle} from '../../style';

export default function PlanItemsList({icon, list, title}) {
  return (
    <Card>
      <ContainerTitle $white>{title}</ContainerTitle>
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
