import {useState} from 'react';
import {Pressable} from 'react-native';
import {CheckSquare, Square} from 'phosphor-react-native';

import {Label, Row} from '../../view/profile/components/style';
import {Card, ContainerTitle} from '../../view/style';

export default function ActivityItem({activity, isStopped}) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Row $align={'flex-start'}>
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        {isChecked ? (
          <CheckSquare weight="regular" size={24} color={'#219653'} />
        ) : (
          <Square weight="regular" size={24} color={'#fcf3f3'} />
        )}
      </Pressable>
      <Card>
        <Row $align={'flex-start'} $justifyContent={'space-between'}>
          <ContainerTitle $white>{activity.title}</ContainerTitle>
          {activity.machine && <Label>{`Máquina: ${activity.machine}`}</Label>}
        </Row>
        <Row $align={'center'} $justifyContent={'flex-start'}>
          {activity.series && <Label>{`SÉRIES: ${activity.series}`}</Label>}
          {activity.repetitions && (
            <Label>{`REPETIÇÕES: ${activity.repetitions}`}</Label>
          )}
          {activity.load && <Label>{`CARGA: ${activity.load}kg`}</Label>}
          {activity.time && <Label>{`TEMPO: ${activity.time} minutos`}</Label>}
        </Row>
      </Card>
    </Row>
  );
}
