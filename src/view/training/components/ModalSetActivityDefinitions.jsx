import {useEffect, useState} from 'react';
import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {Column, InputText, Label, Row} from '../../profile/components/style';
import {ButtonDefault} from '../../style';

export default function ModalSetActivityDefinitions({
  activity,
  index,
  openModal,
  setOpenModal,
  updateTraining,
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

  function sendUpdatedData() {
    const data = {
      index,
      newInformation: {
        id: activity.id,
        load,
        machine,
        note: activity.note,
        repetitions,
        series,
        time,
        title: activity.title,
      },
    };
    updateTraining(data);
    setOpenModal(false);
  }

  return (
    <ModalDefault openModal={openModal} title={'DEFINA AQUI SEU TREINO'}>
      <Column $gap>
        <Label $black>MÁQUINA UTILIZADA</Label>
        <InputText
          $black
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={'NÚMERO DA MÁQUINA'}
          defaultValue={machine && machine.toString()}
          onChangeText={text => setMachine(text)}
        />
      </Column>
      <Column $gap>
        <Label $black>NÚMERO DE SÉRIES</Label>
        <InputText
          $black
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={'SÉRIERS'}
          defaultValue={series && series.toString()}
          onChangeText={text => setSeries(text)}
        />
      </Column>
      <Column $gap>
        <Label $black>NÚMERO DE REPETIÇÕES</Label>
        <InputText
          $black
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={'REPETIÇÕES'}
          defaultValue={repetitions && repetitions.toString()}
          onChangeText={text => setRepetitions(text)}
        />
      </Column>
      <Column $gap>
        <Label $black>CARGA UTILIZADA</Label>
        <InputText
          $black
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={'PESO MÁXIMO QUE VOCÊ SUPORTA'}
          defaultValue={load && load.toString()}
          onChangeText={text => setLoad(text)}
        />
      </Column>
      <Column $gap>
        <Label $black>TEMPO DE DURAÇÃO DESTE EXERCÍCIO</Label>
        <InputText
          $black
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={'TEMPO MÁXIMO DE EXECUÇÃO'}
          defaultValue={time && time.toString()}
          onChangeText={text => setTime(text)}
        />
      </Column>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ButtonDefault $red onPress={() => setOpenModal(false)}>
          <Label>CANCELAR</Label>
        </ButtonDefault>
        <ButtonDefault $green onPress={() => sendUpdatedData()}>
          <Label>SALVAR</Label>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
