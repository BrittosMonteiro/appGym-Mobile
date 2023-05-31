import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

import ModalDefault from '../../../components/ModalDefault/ModalDefault';
import {Column, Label, Row} from '../../profile/components/style';
import {ButtonDefault, CustomText, InputDataDefault, Link} from '../../style';

export default function ExerciseDefinitions({
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
      <Row $align={'center'} $justifyContent={'space-between'}>
        <Column $gap $flex>
          <CustomText $fontSize={14}>{t('lbl_series')}</CustomText>
          <InputDataDefault
            $bgColor={props => props.theme.colors.black_01}
            $padding={16}
            $color={props => props.theme.colors.white_02}
            $fontWeight={'SemiBold'}
            keyboardType={'numeric'}
            inputMode={'numeric'}
            placeholder={t('lbl_series')}
            defaultValue={series && series.toString()}
            onChangeText={text => setSeries(text)}
          />
        </Column>
        <Column $gap $flex>
          <CustomText $fontSize={14}>{t('lbl_repetitions')}</CustomText>
          <InputDataDefault
            $bgColor={props => props.theme.colors.black_01}
            $padding={16}
            $color={props => props.theme.colors.white_02}
            $fontWeight={'SemiBold'}
            keyboardType={'numeric'}
            inputMode={'numeric'}
            placeholder={t('lbl_repetitions')}
            defaultValue={repetitions && repetitions.toString()}
            onChangeText={text => setRepetitions(text)}
          />
        </Column>
      </Row>
      <Row>
        <Column $gap $flex>
          <CustomText $fontSize={14}>{t('lbl_machine')}</CustomText>
          <InputDataDefault
            $bgColor={props => props.theme.colors.black_01}
            $padding={16}
            $color={props => props.theme.colors.white_02}
            $fontWeight={'SemiBold'}
            keyboardType={'numeric'}
            inputMode={'numeric'}
            placeholder={t('lbl_machine')}
            defaultValue={machine && machine.toString()}
            onChangeText={text => setMachine(text)}
          />
        </Column>
        <Column $gap $flex>
          <CustomText $fontSize={14}>{t('lbl_load')}</CustomText>
          <InputDataDefault
            $bgColor={props => props.theme.colors.black_01}
            $padding={16}
            $color={props => props.theme.colors.white_02}
            $fontWeight={'SemiBold'}
            keyboardType={'numeric'}
            inputMode={'numeric'}
            placeholder={t('lbl_load')}
            defaultValue={load && load.toString()}
            onChangeText={text => setLoad(text)}
          />
        </Column>
      </Row>
      <Column $gap>
        <CustomText $fontSize={14}>{t('lbl_minutes')}</CustomText>
        <InputDataDefault
          $bgColor={props => props.theme.colors.black_01}
          $padding={16}
          $color={props => props.theme.colors.white_02}
          $fontWeight={'SemiBold'}
          keyboardType={'numeric'}
          inputMode={'numeric'}
          placeholder={t('lbl_minutes')}
          defaultValue={time && time.toString()}
          onChangeText={text => setTime(text)}
        />
      </Column>
      <Column $gap>
        <Label $black>{t('lbl_note')}</Label>
        <InputDataDefault
          $bgColor={props => props.theme.colors.black_01}
          $padding={16}
          $color={props => props.theme.colors.white_02}
          $fontWeight={'SemiBold'}
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
        <Link onPress={() => setOpenModal(false)}>
          <CustomText $fontSize={18}>{t('lbl_cancel')}</CustomText>
        </Link>
        <ButtonDefault $turquoise onPress={() => sendUpdatedData()}>
          <Label>{t('lbl_save')}</Label>
        </ButtonDefault>
      </Row>
    </ModalDefault>
  );
}
