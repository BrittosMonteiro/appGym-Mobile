import {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Eye, EyeSlash, ToggleLeft, ToggleRight} from 'phosphor-react-native';

import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {updatePasswordService} from '../../service/user';
import styles from '../../styles';
import Button from '../Button';
import HorizontalRule from '../HorizontalRule';

export default function ProfilePassword() {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toggleUpdatePassword, setToggleUpdatePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function updatePassword() {
    dispatch(setLoading());
    if (!password || !confirmPassword) {
      console.log('Preencher campos');
      dispatch(unsetLoading());
      return;
    }

    if (password !== confirmPassword) {
      console.log('Senhas não são iguais');
      dispatch(unsetLoading());
      return;
    }

    const data = {
      idUser: userSession.id,
      password,
    };

    await updatePasswordService(data)
      .then(responseUpdate => {
        if (responseUpdate) {
          setPassword('');
          setConfirmPassword('');
          setToggleUpdatePassword(false);
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  return (
    <>
      <View style={[styles.main.column, styles.gapStyle.gap_3]}>
        <View
          style={[
            styles.main.row,
            styles.alignment.justifyContent.space_between,
          ]}>
          <Text
            style={[
              styles.colors.textColor.white_1,
              styles.font.weight.medium,
              styles.font.size.size_20,
            ]}>
            ALTERAR SENHA
          </Text>
          <Pressable
            onPress={() => setToggleUpdatePassword(!toggleUpdatePassword)}>
            {toggleUpdatePassword ? (
              <ToggleRight
                size={32}
                weight="fill"
                color={styles.colors.textColor.green_1.color}
              />
            ) : (
              <ToggleLeft
                size={32}
                weight="fill"
                color={styles.colors.textColor.red_1.color}
              />
            )}
          </Pressable>
        </View>
        {toggleUpdatePassword && (
          <>
            <View style={[styles.main.column, styles.gapStyle.gap_1]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.regular,
                ]}>
                SENHA
              </Text>
              <View
                style={[
                  styles.colors.backgroundColor.dark_3,
                  styles.paddingStyle.px_2,
                  styles.paddingStyle.py_1,
                  styles.alignment.alignItems.center,
                  styles.main.row,
                ]}>
                <TextInput
                  style={[
                    styles.colors.textColor.white_1,
                    styles.font.size.size_20,
                    styles.font.weight.medium,
                    styles.colors.backgroundColor.dark_3,
                    styles.paddingStyle.pa_0,
                    {flex: 1},
                  ]}
                  secureTextEntry={!showPassword}
                  placeholder="SENHA"
                  placeholderTextColor={styles.colors.textColor.gray_1}
                  defaultValue={password}
                  onChangeText={text => setPassword(text)}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye
                      weight="bold"
                      color={styles.colors.textColor.white_1.color}
                      size={24}
                    />
                  ) : (
                    <EyeSlash
                      weight="bold"
                      color={styles.colors.textColor.white_1.color}
                      size={24}
                    />
                  )}
                </Pressable>
              </View>
            </View>

            <View style={[styles.main.column, styles.gapStyle.gap_1]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.regular,
                ]}>
                CONFIRMAR SENHA
              </Text>
              <View
                style={[
                  styles.colors.backgroundColor.dark_3,
                  styles.paddingStyle.px_2,
                  styles.paddingStyle.py_1,
                  styles.alignment.alignItems.center,
                  styles.main.row,
                ]}>
                <TextInput
                  style={[
                    styles.colors.textColor.white_1,
                    styles.font.size.size_20,
                    styles.font.weight.medium,
                    styles.colors.backgroundColor.dark_3,
                    styles.paddingStyle.pa_0,
                    {flex: 1},
                  ]}
                  secureTextEntry={!showPassword}
                  placeholder="CONFIRMAR SENHA"
                  placeholderTextColor={styles.colors.textColor.gray_1}
                  defaultValue={confirmPassword}
                  onChangeText={text => setConfirmPassword(text)}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <Eye
                      weight="bold"
                      color={styles.colors.textColor.white_1.color}
                      size={24}
                    />
                  ) : (
                    <EyeSlash
                      weight="bold"
                      color={styles.colors.textColor.white_1.color}
                      size={24}
                    />
                  )}
                </Pressable>
              </View>
            </View>
            <Pressable onPress={() => updatePassword()}>
              <Button title={'ALTERAR'} type={1} />
            </Pressable>
          </>
        )}
      </View>

      {toggleUpdatePassword && <HorizontalRule />}
    </>
  );
}
