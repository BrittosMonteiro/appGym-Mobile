import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Pressable} from 'react-native';

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

export default function ManageUserData({navigation, route}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {id} = route.params;
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [username, setUsername] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [plan, setPlan] = useState('');
  const [planValidDate, setPlanValidDate] = useState('');

  function proceedToPlan(hasPlan) {
    if (!name || !birthdate || !email || !cpf) {
      console.log('Preencher corretamente');
      return;
    }

    let data = {
      name,
      email,
      birthdate,
      cpf,
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
        setCpf(response.data.cpf);
        setUsername(response.data.username);
        setPlan(response.data.plan);
        setPlanValidDate(response.data.planValidDate);
      })
      .catch(err => {})
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
      .catch(err => {})
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
          <Label>NOME</Label>
          <InputText
            placeholder="NOME"
            defaultValue={name}
            editable={!id}
            onChangeText={data => setName(data)}
          />
        </Column>

        <Column $gap>
          <Label>E-MAIL</Label>
          <InputText
            placeholder="E-MAIL"
            defaultValue={email}
            editable={!id}
            onChangeText={data => setEmail(data)}
          />
        </Column>

        {username && (
          <Column $gap>
            <Label>USUÁRIO</Label>
            <InputText
              placeholder="USUÁRIO"
              defaultValue={username}
              editable={false}
              onChangeText={data => setEmail(data)}
            />
          </Column>
        )}

        <Pressable onPress={() => (id ? null : setOpenDatePicker(true))}>
          <Column $gap>
            <Label>DATA NASCIMENTO</Label>
            <InputText
              placeholder="DATA DE NASCIMENTO"
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
              confirmText="CONFIRMAR"
              cancelText="CANCELAR"
            />
          </Column>
        </Pressable>

        <Column $gap>
          <Label>CPF</Label>
          <InputText
            placeholder="CPF"
            defaultValue={cpf}
            editable={!id}
            onChangeText={data => setCpf(data)}
          />
        </Column>

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
                <Label>ADICIONAR PLANO</Label>
              </ButtonDefault>
            )}
          </>
        ) : (
          <Column $gap>
            <ButtonDefault $green onPress={() => proceedToPlan()}>
              <Label>AVANÇAR</Label>
            </ButtonDefault>
            <ButtonDefault $red onPress={() => cancel()}>
              <Label>CANCELAR</Label>
            </ButtonDefault>
          </Column>
        )}
      </Card>
    </React.Fragment>
  );
}