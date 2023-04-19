import {useEffect, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';

import styles from '../../../styles';
import Button from '../../../components/Button';
import {useSelector} from 'react-redux';

export default function ProfileData({userData, updateProfile}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [birthdate, setBirthdate] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cpf, setCpf] = useState('');
  const [cref, setCref] = useState('');
  const [email, setEmail] = useState('');
  const [gymName, setGymName] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [username, setUsername] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setOriginalData();
  }, [userData]);

  function setOriginalData() {
    setBirthdate(userData.birthdate);
    setCnpj(userData.cnpj);
    setCpf(userData.cpf);
    setCref(userData.cref);
    setEmail(userData.email);
    setGymName(userData.gym);
    setName(userData.name);
    setShortName(userData.shortName);
    setUsername(userData.username);
  }

  async function update() {
    let data = {
      name,
      username,
      email,
    };

    let updateData = manageData(data);
    updateData = {updateData, idUser: userSession.id};
    updateProfile(updateData);
    setEdit(false);
  }

  function manageData(data) {
    switch (userSession.userLevel) {
      case 1:
        return (data = {...data, cnpj, shortName});
      case 2:
        return (data = {...data, birthdate, cref});
      case 3:
        return (data = {...data, birthdate, cpf});
      default:
        return data;
    }
  }

  function cancel() {
    setEdit(!edit);
    setOriginalData();
  }

  return (
    <View style={[styles.gapStyle.gap_5]}>
      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_2,
            styles.font.size.size_18,
            styles.font.weight.regular,
          ]}>
          NOME
        </Text>
        <TextInput
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_20,
            styles.font.weight.medium,
            edit
              ? [styles.colors.backgroundColor.dark_1, styles.paddingStyle.pa_1]
              : [styles.paddingStyle.px_0, styles.paddingStyle.py_1],
          ]}
          placeholder="NOME"
          placeholderTextColor={styles.colors.textColor.white_1.color}
          editable={edit}
          defaultValue={name}
          onChangeText={text => setName(text)}
        />
      </View>

      {shortName && (
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_2,
              styles.font.size.size_18,
              styles.font.weight.regular,
            ]}>
            NOME DE EXIBIÇÃO
          </Text>
          <TextInput
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_20,
              styles.font.weight.medium,
              edit
                ? [
                    styles.colors.backgroundColor.dark_1,
                    styles.paddingStyle.pa_1,
                  ]
                : [styles.paddingStyle.px_0, styles.paddingStyle.py_1],
            ]}
            placeholder="NOME DE EXIBIÇÃO"
            placeholderTextColor={styles.colors.textColor.white_1.color}
            editable={edit}
            defaultValue={shortName}
            onChangeText={text => setShortName(text)}
          />
        </View>
      )}

      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_2,
            styles.font.size.size_18,
            styles.font.weight.regular,
          ]}>
          E-MAIL
        </Text>
        <TextInput
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_20,
            styles.font.weight.medium,
            edit
              ? [styles.colors.backgroundColor.dark_1, styles.paddingStyle.pa_1]
              : [styles.paddingStyle.px_0, styles.paddingStyle.py_1],
          ]}
          placeholder="E-MAIL"
          placeholderTextColor={styles.colors.textColor.white_1.color}
          editable={edit}
          defaultValue={email}
          onChangeText={text => setEmail(text)}
        />
      </View>

      <View style={[styles.main.column, styles.gapStyle.gap_1]}>
        <Text
          style={[
            styles.colors.textColor.white_2,
            styles.font.size.size_18,
            styles.font.weight.regular,
          ]}>
          USERNAME
        </Text>
        <TextInput
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_20,
            styles.font.weight.medium,
            edit
              ? [styles.colors.backgroundColor.dark_1, styles.paddingStyle.pa_1]
              : [styles.paddingStyle.px_0, styles.paddingStyle.py_1],
          ]}
          placeholder="USUÁRIO"
          placeholderTextColor={styles.colors.textColor.white_1.color}
          editable={edit}
          defaultValue={username}
          onChangeText={text => setUsername(text)}
        />
      </View>

      {birthdate && (
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_2,
              styles.font.size.size_18,
              styles.font.weight.regular,
            ]}>
            DATA DE NASCIMENTO
          </Text>
          <TextInput
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_20,
              styles.font.weight.medium,
              edit
                ? [
                    styles.colors.backgroundColor.dark_1,
                    styles.paddingStyle.pa_1,
                  ]
                : [styles.paddingStyle.px_0, styles.paddingStyle.py_1],
            ]}
            placeholder="DATA DE NASCIMENTO"
            placeholderTextColor={styles.colors.textColor.white_1.color}
            editable={false}
            value={new Date(birthdate).toLocaleDateString()}
          />
        </View>
      )}

      {cpf && (
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_2,
              styles.font.size.size_18,
              styles.font.weight.regular,
            ]}>
            CPF
          </Text>
          <TextInput
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_20,
              styles.font.weight.medium,
              edit
                ? [
                    styles.colors.backgroundColor.dark_1,
                    styles.paddingStyle.pa_1,
                  ]
                : [styles.paddingStyle.px_0, styles.paddingStyle.py_1],
            ]}
            placeholder="CPF"
            placeholderTextColor={styles.colors.textColor.white_1.color}
            editable={edit}
            defaultValue={cpf}
            onChangeText={text => setCpf(text)}
          />
        </View>
      )}

      {cnpj && (
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_2,
              styles.font.size.size_18,
              styles.font.weight.regular,
            ]}>
            CNPJ
          </Text>
          <TextInput
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_20,
              styles.font.weight.medium,
              edit
                ? [
                    styles.colors.backgroundColor.dark_1,
                    styles.paddingStyle.pa_1,
                  ]
                : [styles.paddingStyle.px_0, styles.paddingStyle.py_1],
            ]}
            placeholder="CNPJ"
            placeholderTextColor={styles.colors.textColor.white_1.color}
            editable={edit}
            defaultValue={cnpj}
            onChangeText={text => setCnpj(text)}
          />
        </View>
      )}

      {cref && (
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_2,
              styles.font.size.size_18,
              styles.font.weight.regular,
            ]}>
            CREF
          </Text>
          <TextInput
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_20,
              styles.font.weight.medium,
              edit
                ? [
                    styles.colors.backgroundColor.dark_1,
                    styles.paddingStyle.pa_1,
                  ]
                : [styles.paddingStyle.px_0, styles.paddingStyle.py_1],
            ]}
            placeholder="CREF"
            placeholderTextColor={styles.colors.textColor.white_1.color}
            editable={edit}
            defaultValue={cref}
            onChangeText={text => setCref(text)}
          />
        </View>
      )}

      {gymName && (
        <View style={[styles.main.column, styles.gapStyle.gap_1]}>
          <Text
            style={[
              styles.colors.textColor.white_2,
              styles.font.size.size_18,
              styles.font.weight.regular,
            ]}>
            ACADEMIA
          </Text>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.size.size_20,
              styles.font.weight.medium,
            ]}>
            {gymName}
          </Text>
        </View>
      )}
      {!edit ? (
        <Pressable onPress={() => setEdit(!edit)}>
          <Button title={'EDITAR'} type={2} />
        </Pressable>
      ) : (
        <>
          <Pressable onPress={() => update()}>
            <Button title={'CONFIRMAR'} type={1} />
          </Pressable>
          <Pressable onPress={() => cancel()}>
            <Button title={'CANCELAR'} type={0} />
          </Pressable>
        </>
      )}
    </View>
  );
}
