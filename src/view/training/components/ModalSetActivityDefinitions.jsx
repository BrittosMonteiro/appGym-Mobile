import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

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
  const [note, setNote] = useState('');
  const {t} = useTranslation();

  useEffect(() => {
    if (activity) {
      setLoad(activity.load);
      setMachine(activity.machine);
      setRepetitions(activity.repetitions);
      setSeries(activity.series);
      setTime(activity.time);
      setNote(activity.note);
    }
  }, []);

  function sendUpdatedData() {
    const data = {
      index,
      newInformation: {
        id: activity.id,
        load,
        machine,
        note: note,
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
    <ModalDefault openModal={openModal} title={t('title_set_workout')}>
      <Column $gap>
        <Label $black>{t('lbl_machine')}</Label>
        <InputText
          $black
          $borderRadius
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={t('lbl_machine')}
          defaultValue={machine && machine.toString()}
          onChangeText={text => setMachine(text)}
        />
      </Column>
      <Column $gap>
        <Label $black>{t('lbl_series')}</Label>
        <InputText
          $black
          $borderRadius
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={t('lbl_series')}
          defaultValue={series && series.toString()}
          onChangeText={text => setSeries(text)}
        />
      </Column>
      <Column $gap>
        <Label $black>{t('lbl_repetitions')}</Label>
        <InputText
          $black
          $borderRadius
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={t('lbl_repetitions')}
          defaultValue={repetitions && repetitions.toString()}
          onChangeText={text => setRepetitions(text)}
        />
      </Column>
      <Column $gap>
        <Label $black>{t('lbl_load')}</Label>
        <InputText
          $black
          $borderRadius
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={t('lbl_load')}
          defaultValue={load && load.toString()}
          onChangeText={text => setLoad(text)}
        />
      </Column>
      <Column $gap>
        <Label $black>{t('lbl_time')}</Label>
        <InputText
          $black
          $borderRadius
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={t('lbl_minutes')}
          defaultValue={time && time.toString()}
          onChangeText={text => setTime(text)}
        />
      </Column>
      <Column $gap>
        <Label $black>{t('lbl_note')}</Label>
        <InputText
          $black
          $borderRadius
          keyboardType={'default'}
          inputMode={'text'}
          placeholder={t('lbl_note')}
          multiline={true}
          numberOfLines={2}
          textAlignVertical={'top'}
          defaultValue={note && note}
          onChangeText={text => setNote(text)}
        />
      </Column>
      <Row $align={'center'} $justifyContent={'space-between'}>
        <ButtonDefault $red onPress={() => setOpenModal(false)}>
          <Label>{t('lbl_cancel')}</Label>
        </ButtonDefault>
        <ButtonDefault $green onPress={() => sendUpdatedData()}>
          <Label>{t('lbl_save')}</Label>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
