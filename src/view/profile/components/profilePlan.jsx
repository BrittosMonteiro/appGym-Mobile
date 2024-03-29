import React, {useEffect, useState} from 'react';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {CaretDown, CaretUp} from 'phosphor-react-native';
import {useTranslation} from 'react-i18next';

import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import PlanItems from './planItems';
import {Label, Row} from './style';
import {Card, CustomText} from '../../style';
import ModalRemovePlanFromUser from './ModalRemovePlanFromUser';

export default function Plan({
  plan,
  planValidDate,
  proceedToPlan,
  removePlanFromUser,
}) {
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const [planStatusTitle, setPlanStatusTitle] = useState('');
  const [expand, setExpand] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {t} = useTranslation();

  const planStatus = [
    {
      title: `${t('lbl_plan_active')}`,
    },
    {
      title: `${t('lbl_plan_expired')}`,
    },
  ];

  function compareDates() {
    if (USERSESSION.planValidDate || planValidDate) {
      const today = new Date().getTime();
      const formatedDate = new Date(
        USERSESSION.planValidDate || planValidDate,
      ).getTime();
      if (today <= formatedDate) {
        setPlanStatusTitle(planStatus[0].title);
      } else {
        if (today > formatedDate) {
          setPlanStatusTitle(planStatus[1].title);
        }
      }
    }
  }

  useEffect(() => {
    compareDates();
  }, [planValidDate]);

  return (
    <React.Fragment>
      <Card $black $padding $fullWidth>
        <Row $align={'center'} $justifyContent={'space-between'}>
          <CustomText $fontSize={18} $color={'#fcf3f3'}>
            {t('title_plan')}
          </CustomText>
          <Pressable onPress={() => setExpand(!expand)}>
            {expand ? (
              <CaretDown color={'#FCF3F3'} weight="bold" size={24} />
            ) : (
              <CaretUp color={'#FCF3F3'} weight="bold" size={24} />
            )}
          </Pressable>
        </Row>
        {expand && (
          <React.Fragment>
            {USERSESSION.userLevel === 2 && (
              <Row $align={'center'} $justifyContent={'space-between'}>
                <Pressable onPress={() => proceedToPlan(plan._id.toString())}>
                  <Label>{t('lbl_change_plan')}</Label>
                </Pressable>
                <Pressable onPress={() => setOpenModal(true)}>
                  <Label>{t('lbl_remove_plan')}</Label>
                </Pressable>
              </Row>
            )}

            <HorizontalRule color={'#FCF3F3'} />

            <Row $align={'center'} $justifyContent={'space-between'}>
              <Label>{plan.title}</Label>
              <Label>R$ {plan.price.toString().replace('.', ',')}</Label>
            </Row>

            <Row $align={'center'} $justifyContent={'space-between'}>
              <Label>{planStatusTitle}</Label>
              <Label>
                {t('lbl_valid_thru')}:{' '}
                {new Date(
                  USERSESSION.planValidDate || planValidDate,
                ).toLocaleDateString()}
              </Label>
            </Row>

            <PlanItems
              isIncluded={plan.isIncluded}
              notIncluded={plan.notIncluded}
            />
          </React.Fragment>
        )}
      </Card>
      <ModalRemovePlanFromUser
        openModal={openModal}
        setOpenModal={setOpenModal}
        remove={removePlanFromUser}
      />
    </React.Fragment>
  );
}
