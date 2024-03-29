import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Pressable} from 'react-native';
import {useTranslation} from 'react-i18next';

import HorizontalRule from '../../../components/HorizontalRule/HorizontalRule';
import Plan from '../../profile/components/profilePlan';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {
  readUserByIdService,
  removePlanFromUserService,
} from '../../../service/user';
import {ButtonDefault, Card} from '../../style';
import {Column, InputText, Label} from '../../profile/components/style';
import {
  setMessageError,
  setMessageOff,
} from '../../../store/actions/systemAction';

export default function ManageUserData({navigation, route}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {id} = route.params;
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [plan, setPlan] = useState('');
  const [planValidDate, setPlanValidDate] = useState('');
  const {t} = useTranslation();

  function setMessage(text) {
    DISPATCH(setMessageError(text));
    setTimeout(() => {
      DISPATCH(setMessageOff());
    }, 5000);
  }

  function proceedToPlan(hasPlan) {
    if (!name || !birthdate || !email) {
      setMessage(['system_message_user_login_missing_information']);
      return;
    }

    let data = {
      name,
      email,
      birthdate,
      idGym: USERSESSION.idGym,
    };

    if (id) {
      data = {...data, id};
    }
    navigation.navigate('UserPlanSelect', {user: data, hasPlan});
  }

  async function loadUserInformation() {
    DISPATCH(setLoading());
    await readUserByIdService(id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setName(response.data.name);
        setBirthdate(response.data.birthdate);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setPlan(response.data.plan);
        setPlanValidDate(response.data.planValidDate);
      })
      .catch(() => {
        setMessage(['system_message_user_could_not_load_profile']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function removePlanFromUser() {
    DISPATCH(setLoading());

    await removePlanFromUserService({idUser: id})
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          navigation.goBack();
        }
      })
      .catch(() => {
        setMessage(['system_message_plans_remove_plan_from_user']);
      })
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  useEffect(() => {
    if (id) {
      loadUserInformation();
    }
  }, [id]);

  return (
    <React.Fragment>
      <Card $black $fullWidth $padding>
        <Column $gap>
          <Label>{t('lbl_name')}</Label>
          <InputText
            placeholder={t('lbl_name')}
            defaultValue={name}
            editable={!id}
            onChangeText={data => setName(data)}
          />
        </Column>

        <Column $gap>
          <Label>{t('lbl_email')}</Label>
          <InputText
            placeholder={t('lbl_email')}
            defaultValue={email}
            editable={!id}
            onChangeText={data => setEmail(data)}
          />
        </Column>

        {username && (
          <Column $gap>
            <Label>{t('lbl_user')}</Label>
            <InputText
              placeholder={t('lbl_user')}
              defaultValue={username}
              editable={false}
              onChangeText={data => setEmail(data)}
            />
          </Column>
        )}

        <Pressable onPress={() => (id ? null : setOpenDatePicker(true))}>
          <Column $gap>
            <Label>{t('lbl_birthdate')}</Label>
            <InputText
              placeholder={t('lbl_birthdate')}
              defaultValue={
                birthdate ? new Date(birthdate).toLocaleDateString() : null
              }
              editable={false}
            />
            <DatePicker
              modal
              open={openDatePicker}
              date={new Date()}
              androidVariant="nativeAndroid"
              mode="date"
              onConfirm={date => {
                setOpenDatePicker(false);
                setBirthdate(date);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
              title={null}
              confirmText={t('lbl_confirm')}
              cancelText={t('lbl_cancel')}
            />
          </Column>
        </Pressable>

        {plan && (
          <>
            <HorizontalRule />
            <Plan
              plan={plan}
              planValidDate={planValidDate}
              removePlanFromUser={removePlanFromUser}
              proceedToPlan={proceedToPlan}
            />
          </>
        )}
      </Card>

      <Card $fullWidth>
        {id ? (
          <>
            {!plan && (
              <ButtonDefault $green onPress={() => proceedToPlan()}>
                <Label>{t('lbl_add_plan')}</Label>
              </ButtonDefault>
            )}
          </>
        ) : (
          <Column $gap>
            <ButtonDefault $green onPress={() => proceedToPlan()}>
              <Label>{t('lbl_advance')}</Label>
            </ButtonDefault>
            <ButtonDefault $red onPress={() => cancel()}>
              <Label>{t('lbl_cancel')}</Label>
            </ButtonDefault>
          </Column>
        )}
      </Card>
    </React.Fragment>
  );
}
