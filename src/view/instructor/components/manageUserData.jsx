import React, {useEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import styles from '../../../styles';
import HorizontalRule from '../../../components/HorizontalRule';
import Plan from '../../profile/components/profilePlan';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, unsetLoading} from '../../../store/actions/loadingAction';
import {
  readUserByIdService,
  removePlanFromUserService,
} from '../../../service/user';

export default function ManageUserData({navigation, route}) {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
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
      idGym: userSession.idGym,
    };

    if (id) {
      data = {...data, id};
    }
    navigation.navigate('UserPlanSelect', {user: data, hasPlan});
  }

  async function loadUserInformation() {
    dispatch(setLoading());
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
        dispatch(unsetLoading());
      });
  }

  async function removePlanFromUser() {
    dispatch(setLoading());
    await removePlanFromUserService({idUser: id})
      .then(responseUpdate => {
        if (responseUpdate.status === 200) {
          navigation.goBack();
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  useEffect(() => {
    if (id) {
      loadUserInformation();
    }
  }, [id]);

  return (
    <React.Fragment>
      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_16,
            styles.font.weight.regular,
          ]}>
          NOME
        </Text>
        <TextInput
          style={[
            styles.colors.backgroundColor.dark_3,
            styles.colors.textColor.white_1,
            styles.paddingStyle.pa_1,
            styles.main.borderRadiusDefault,
            styles.font.size.size_18,
            styles.font.weight.medium,
          ]}
          placeholderTextColor={[styles.colors.textColor.white_2]}
          placeholder="NOME"
          defaultValue={name}
          editable={!id}
          onChangeText={data => setName(data)}
        />
      </View>

      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_16,
            styles.font.weight.regular,
          ]}>
          E-MAIL
        </Text>
        <TextInput
          style={[
            styles.colors.backgroundColor.dark_3,
            styles.colors.textColor.white_1,
            styles.paddingStyle.pa_1,
            styles.main.borderRadiusDefault,
            styles.font.size.size_18,
            styles.font.weight.medium,
          ]}
          placeholderTextColor={[styles.colors.textColor.white_2]}
          placeholder="E-MAIL"
          defaultValue={email}
          editable={!id}
          onChangeText={data => setEmail(data)}
        />
      </View>

      {username && (
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_16,
              styles.font.weight.regular,
            ]}>
            USUÁRIO
          </Text>
          <TextInput
            style={[
              styles.colors.backgroundColor.dark_3,
              styles.colors.textColor.white_1,
              styles.paddingStyle.pa_1,
              styles.main.borderRadiusDefault,
              styles.font.size.size_18,
              styles.font.weight.medium,
            ]}
            placeholderTextColor={[styles.colors.textColor.white_2]}
            placeholder="USUÁRIO"
            defaultValue={username}
            editable={false}
            onChangeText={data => setEmail(data)}
          />
        </View>
      )}

      <Pressable
        style={[styles.main.column, styles.gapStyle.gap_1]}
        onPress={() => (id ? null : setOpenDatePicker(true))}>
        <Text
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_16,
            styles.font.weight.regular,
          ]}>
          DATA NASCIMENTO
        </Text>
        <TextInput
          style={[
            styles.colors.backgroundColor.dark_3,
            styles.colors.textColor.white_1,
            styles.paddingStyle.pa_1,
            styles.main.borderRadiusDefault,
            styles.font.size.size_18,
            styles.font.weight.medium,
          ]}
          placeholderTextColor={[styles.colors.textColor.white_2]}
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
      </Pressable>

      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_16,
            styles.font.weight.regular,
          ]}>
          CPF
        </Text>
        <TextInput
          style={[
            styles.colors.backgroundColor.dark_3,
            styles.colors.textColor.white_1,
            styles.paddingStyle.pa_1,
            styles.main.borderRadiusDefault,
            styles.font.size.size_18,
            styles.font.weight.medium,
          ]}
          placeholderTextColor={[styles.colors.textColor.white_2]}
          placeholder="CPF"
          defaultValue={cpf}
          editable={!id}
          onChangeText={data => setCpf(data)}
        />
      </View>

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

      {id ? (
        <>
          {!plan && (
            <Pressable onPress={() => proceedToPlan()}>
              <Button title={'ADICIONAR PLANO'} type={1} />
            </Pressable>
          )}
        </>
      ) : (
        <>
          <Pressable onPress={() => proceedToPlan()}>
            <Button title={'AVANÇAR'} type={1} />
          </Pressable>
          <Pressable onPress={() => cancel()}>
            <Button title={'CANCELAR'} type={0} />
          </Pressable>
        </>
      )}
    </React.Fragment>
  );
}
