import {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import CurrencyInput from 'react-native-currency-input';

import Header from '../../components/Header';
import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import {ToggleLeft, ToggleRight, TrashSimple} from 'phosphor-react-native';
import Button from '../../components/Button';
import HorizontalRule from '../../components/HorizontalRule';
import {
  createPlanService,
  deletePlanService,
  readPlanByIdService,
  updatePlanService,
} from '../../service/plan';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';

export default function PlanManagement({navigation, route}) {
  const dispatch = useDispatch();
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  const {id} = route.params;
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(false);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isIncluded, setIsIncluded] = useState([]);
  const [notIncluded, setNotIncluded] = useState([]);
  const [itemPlanTitle, setItemPlanTitle] = useState('');
  const [itemPlanStatus, setItemPlanStatus] = useState(false);

  function addItemToPlan() {
    if (!itemPlanTitle) {
      console.log('Vazio');
      return;
    }

    if (itemPlanStatus) {
      addItemToIsIncluded(itemPlanTitle);
    } else {
      addToNotIncluded(itemPlanTitle);
    }
  }

  function addItemToIsIncluded(title) {
    isIncluded.unshift({title});
    setIsIncluded(isIncluded);
    resetItemPlan();
  }

  function addToNotIncluded(title) {
    notIncluded.unshift({title});
    setNotIncluded(notIncluded);
    resetItemPlan();
  }

  function removeFromIsIncluded(index) {
    setIsIncluded(items => items.filter((item, key) => key !== index));
  }

  function removeFromNotIncluded(index) {
    setNotIncluded(items => items.filter((item, key) => key !== index));
  }

  function resetItemPlan() {
    setItemPlanTitle('');
  }

  async function createPlan() {
    dispatch(setLoading());
    const newPlan = {
      idGym: userSession.id,
      status,
      title,
      price,
      description,
      isIncluded,
      notIncluded,
    };

    await createPlanService(newPlan)
      .then(responseCreate => {
        if (responseCreate.status === 201) {
          navigation.goBack();
        }
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function readPlan() {
    dispatch(setLoading());
    await readPlanByIdService(id)
      .then(responseFind => {
        if (responseFind.status === 200) {
          return responseFind.json();
        }
      })
      .then(response => {
        setStatus(response.data.status);
        setTitle(response.data.title);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setIsIncluded(response.data.isIncluded);
        setNotIncluded(response.data.notIncluded);
      })
      .catch(err => {})
      .finally(() => {
        dispatch(unsetLoading());
      });
  }

  async function updatePlan() {
    dispatch(setLoading());
    const updatePlan = {
      idPlan: id,
      data: {
        status,
        title,
        price,
        description,
        isIncluded,
        notIncluded,
      },
    };

    await updatePlanService(updatePlan)
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

  async function deletePlan() {
    dispatch(setLoading());
    await deletePlanService({idPlan: id})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
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
      readPlan();
    }
  }, []);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={'GERENCIAR PLANO'} />
      <View
        style={[styles.paddingStyle.px_3, styles.gapStyle.gap_5, {flex: 1}]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.main.column, styles.gapStyle.gap_5]}>
          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_16,
                styles.font.weight.regular,
              ]}>
              STATUS DO PLANO
            </Text>
            <View
              style={[
                styles.main.row,
                styles.alignment.alignItems.center,
                styles.alignment.justifyContent.space_between,
              ]}>
              <Text
                style={[
                  styles.colors.textColor.white_1,
                  styles.font.size.size_18,
                  styles.font.weight.medium,
                ]}>
                {status ? 'DISPONÍVEL' : 'INDISPONÍVEL'}
              </Text>
              <Pressable onPress={() => setStatus(!status)}>
                {status ? (
                  <ToggleRight
                    color={styles.colors.textColor.green_1.color}
                    weight="fill"
                    size={28}
                  />
                ) : (
                  <ToggleLeft
                    color={styles.colors.textColor.red_1.color}
                    weight="fill"
                    size={28}
                  />
                )}
              </Pressable>
            </View>
          </View>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_16,
                styles.font.weight.regular,
              ]}>
              TÍTULO
            </Text>
            <TextInput
              style={[
                styles.colors.backgroundColor.dark_3,
                styles.colors.textColor.white_1,
                styles.paddingStyle.pa_1,
                styles.font.size.size_18,
                styles.font.weight.medium,
              ]}
              placeholderTextColor={[styles.colors.textColor.white_2]}
              placeholder="TÍTULO"
              defaultValue={title}
              onChangeText={data => setTitle(data)}
            />
          </View>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_16,
                styles.font.weight.regular,
              ]}>
              PREÇO
            </Text>
            <CurrencyInput
              style={[
                styles.colors.backgroundColor.dark_3,
                styles.colors.textColor.white_1,
                styles.paddingStyle.pa_1,
                styles.font.size.size_18,
                styles.font.weight.medium,
              ]}
              placeholderTextColor={[styles.colors.textColor.white_2]}
              placeholder="PREÇO"
              value={price}
              onChangeValue={data => setPrice(data)}
            />
          </View>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_16,
                styles.font.weight.regular,
              ]}>
              DESCRIÇÃO
            </Text>
            <TextInput
              style={[
                styles.colors.backgroundColor.dark_3,
                styles.colors.textColor.white_1,
                styles.paddingStyle.pa_1,
                styles.font.size.size_18,
                styles.font.weight.medium,
              ]}
              placeholderTextColor={[styles.colors.textColor.white_2]}
              placeholder="DESCRIÇÃO"
              defaultValue={description}
              onChangeText={data => setDescription(data)}
            />
          </View>

          <View style={[styles.main.column, styles.gapStyle.gap_1]}>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_16,
                styles.font.weight.regular,
              ]}>
              ITENS DO PLANO
            </Text>
            <View
              style={[
                styles.main.column,
                styles.alignment.justifyContent.space_between,
                styles.gapStyle.gap_3,
              ]}>
              <TextInput
                style={[
                  styles.colors.backgroundColor.dark_3,
                  styles.colors.textColor.white_1,
                  styles.paddingStyle.pa_1,
                  styles.font.size.size_18,
                  styles.font.weight.medium,
                ]}
                placeholderTextColor={[styles.colors.textColor.white_2]}
                placeholder="ITENS DO PLANO"
                defaultValue={itemPlanTitle}
                onChangeText={data => setItemPlanTitle(data)}
              />
              <View
                style={[
                  styles.main.row,
                  styles.alignment.alignItems.center,
                  styles.alignment.justifyContent.space_between,
                ]}>
                <Text
                  style={[
                    styles.font.size.size_18,
                    styles.font.weight.medium,
                    styles.colors.textColor.white_1,
                  ]}>
                  {itemPlanStatus ? 'Incluso no plano' : 'Não incluso no plano'}
                </Text>
                <Pressable onPress={() => setItemPlanStatus(!itemPlanStatus)}>
                  {itemPlanStatus ? (
                    <ToggleRight
                      color={styles.colors.textColor.green_1.color}
                      size={28}
                      weight="fill"
                    />
                  ) : (
                    <ToggleLeft
                      color={styles.colors.textColor.red_1.color}
                      size={28}
                      weight="fill"
                    />
                  )}
                </Pressable>
              </View>
              <Pressable onPress={() => addItemToPlan()}>
                <Button title={'CONFIRMAR'} type={2} />
              </Pressable>
            </View>
          </View>

          <HorizontalRule />
          <View style={[styles.main.column, styles.gapStyle.gap_3]}>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_16,
                styles.font.weight.regular,
              ]}>
              ITENS INCLUSOS
            </Text>

            <View style={[styles.main.column, styles.gapStyle.gap_1]}>
              {isIncluded.length > 0 ? (
                <>
                  {isIncluded.map((item, index) => (
                    <View
                      key={index}
                      style={[
                        styles.main.row,
                        styles.alignment.alignItems.center,
                        styles.alignment.justifyContent.space_between,
                      ]}>
                      <Text
                        style={[
                          styles.colors.textColor.white_1,
                          styles.font.size.size_18,
                          styles.font.weight.medium,
                        ]}>
                        {item.title}
                      </Text>
                      <Pressable onPress={() => removeFromIsIncluded(index)}>
                        <TrashSimple
                          color={styles.colors.textColor.red_1.color}
                          weight="fill"
                          size={24}
                        />
                      </Pressable>
                    </View>
                  ))}
                </>
              ) : (
                <Text
                  style={[
                    styles.colors.textColor.white_1,
                    styles.font.size.size_18,
                    styles.font.weight.medium,
                  ]}>
                  NENHUM ITEM
                </Text>
              )}
            </View>
          </View>

          <HorizontalRule />
          <View style={[styles.main.column, styles.gapStyle.gap_3]}>
            <Text
              style={[
                styles.colors.textColor.white_1,
                styles.font.size.size_16,
                styles.font.weight.regular,
              ]}>
              ITENS NÃO INCLUSOS
            </Text>

            <View style={[styles.main.column, styles.gapStyle.gap_1]}>
              {notIncluded.length > 0 ? (
                <>
                  {notIncluded.map((item, index) => (
                    <View
                      key={index}
                      style={[
                        styles.main.row,
                        styles.alignment.alignItems.center,
                        styles.alignment.justifyContent.space_between,
                      ]}>
                      <Text
                        style={[
                          styles.colors.textColor.white_1,
                          styles.font.size.size_18,
                          styles.font.weight.medium,
                        ]}>
                        {item.title}
                      </Text>
                      <Pressable onPress={() => removeFromNotIncluded(index)}>
                        <TrashSimple
                          color={styles.colors.textColor.red_1.color}
                          weight="fill"
                          size={24}
                        />
                      </Pressable>
                    </View>
                  ))}
                </>
              ) : (
                <Text
                  style={[
                    styles.colors.textColor.white_1,
                    styles.font.size.size_18,
                    styles.font.weight.medium,
                  ]}>
                  NENHUM ITEM
                </Text>
              )}
            </View>
          </View>

          <HorizontalRule />

          <Pressable>
            <Button title={'VISUALIZAR'} type={2} />
          </Pressable>
          {!id ? (
            <>
              <Pressable onPress={() => createPlan()}>
                <Button title={'CRIAR'} type={1} />
              </Pressable>
              <Pressable onPress={() => navigation.goBack()}>
                <Button title={'CANCELAR'} type={0} />
              </Pressable>
            </>
          ) : (
            <>
              <Pressable onPress={() => updatePlan()}>
                <Button title={'ATUALIZAR'} type={1} />
              </Pressable>
              <Pressable onPress={() => deletePlan()}>
                <Button title={'EXCLUIR'} type={0} />
              </Pressable>
            </>
          )}
        </ScrollView>
      </View>
    </ViewDefault>
  );
}
