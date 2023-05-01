import React, {useEffect, useState} from 'react';
import {Column, InputText, Label, Row} from '../../profile/components/style';
import {ButtonDefault, Card, Container, CustomText} from '../../style';

export default function ManageActivityItem({
  activity,
  deleteItemFromList,
  index,
}) {
  const [load, setLoad] = useState('');
  const [machine, setMachine] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [series, setSeries] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (activity) {
      setLoad(activity.load);
      setMachine(activity.machine);
      setRepetitions(activity.repetitions);
      setSeries(activity.series);
      setTime(activity.time);
    }
  }, []);

  return (
    <Card>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <CustomText $color={'#fcf3f3'} $fontSize={18} $weight={'Medium'}>
          {activity.title}
        </CustomText>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <ButtonDefault
            onPress={() => {
              console.log('Implementar edição da atividade');
            }}>
            <Label>EDITAR</Label>
          </ButtonDefault>
          <ButtonDefault
            onPress={() => {
              deleteItemFromList(index);
            }}>
            <Label>REMOVER</Label>
          </ButtonDefault>
        </Row>
      </Row>

      {/* <Container $gap>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <Column $gap style={{flex: 1}}>
            <Label>CARGA</Label>
            <InputText
              placeholder="CARGA EM KG"
              keyboardType="numeric"
              defaultValue={load}
              onChangeText={text => setLoad(text)}
            />
          </Column>

          <Column $gap style={{flex: 1}}>
            <Label>MÁQUINA</Label>
            <InputText
              placeholder="MÁQUINA"
              keyboardType="numeric"
              defaultValue={machine}
              onChangeText={text => setMachine(text)}
            />
          </Column>
        </Row>

        <Row $align={'center'} $justifyContent={'space-between'}>
          <Column $gap style={{flex: 1}}>
            <Label>REPETIÇÕES</Label>
            <InputText
              placeholder="REPETIÇÕES"
              keyboardType="numeric"
              defaultValue={repetitions}
              onChangeText={text => setRepetitions(text)}
            />
          </Column>

          <Column $gap style={{flex: 1}}>
            <Label>SÉRIES</Label>
            <InputText
              placeholder="SÉRIES"
              keyboardType="numeric"
              defaultValue={series}
              onChangeText={text => setSeries(text)}
            />
          </Column>
        </Row>

        <Row $align={'center'} $justifyContent={'space-between'}>
          <Column $gap style={{flex: 1}}>
            <Label>TEMPO</Label>
            <InputText
              placeholder="TEMPO EM MINUTOS"
              keyboardType="numeric"
              defaultValue={time}
              onChangeText={text => setTime(text)}
            />
          </Column>
        </Row>
      </Container> */}
    </Card>
  );
}
