import {useEffect, useState} from 'react';
import CurrencyInput from 'react-native-currency-input';
import {useTranslation} from 'react-i18next';

import Header from '../../components/Header/Header';
import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import {ToggleLeft, ToggleRight, Trash} from 'phosphor-react-native';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {
  createPlanService,
  deletePlanService,
  readPlanByIdService,
  updatePlanService,
} from '../../service/plan';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, unsetLoading} from '../../store/actions/loadingAction';
import {ButtonDefault, Card, ContainerScroll, CustomText} from '../style';
import {Column, InputText, Label, Row} from '../profile/components/style';

export default function PlanManagement({navigation, route}) {
  const DISPATCH = useDispatch();
  const USERSESSION = useSelector(state => {
    return state.userSessionReducer;
  });
  const {id} = route.params;
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(false);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [validMonths, setValidMonths] = useState('');
  const [isIncluded, setIsIncluded] = useState([]);
  const [notIncluded, setNotIncluded] = useState([]);
  const [itemPlanTitle, setItemPlanTitle] = useState('');
  const [itemPlanStatus, setItemPlanStatus] = useState(false);
  const {t} = useTranslation();

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
    DISPATCH(setLoading());
    const newPlan = {
      idGym: USERSESSION.id,
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
        DISPATCH(unsetLoading());
      });
  }

  async function readPlan() {
    DISPATCH(setLoading());
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
        setValidMonths(response.data.validMonths);
      })
      .catch(err => {})
      .finally(() => {
        DISPATCH(unsetLoading());
      });
  }

  async function updatePlan() {
    DISPATCH(setLoading());
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
        DISPATCH(unsetLoading());
      });
  }

  async function deletePlan() {
    DISPATCH(setLoading());
    await deletePlanService({idPlan: id})
      .then(responseDelete => {
        if (responseDelete.status === 200) {
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
      readPlan();
    }
  }, []);

  return (
    <ViewDefault>
      <Header navigation={navigation} title={t('title_manage_plan')} />
      <HorizontalRule color={'#202020'} />
      <ContainerScroll
        contentContainerStyle={{alignItems: 'flex-start', gap: 24}}>
        <Card $black $fullWidth $padding>
          <Column $gap>
            <Label>{t('lbl_plan_status')}</Label>
            <Row $align={'center'} $justifyContent={'space-between'}>
              <CustomText $fontSize={18} $weight={'Medium'} $color={'#fcf3f3'}>
                {status ? `${t('lbl_available')}` : `${t('lbl_unavailable')}`}
              </CustomText>
              <ButtonDefault onPress={() => setStatus(!status)}>
                {status ? (
                  <ToggleRight color={'#219653'} weight="fill" size={28} />
                ) : (
                  <ToggleLeft color={'#EB5757'} weight="fill" size={28} />
                )}
              </ButtonDefault>
            </Row>
          </Column>

          <Column $gap>
            <Label>{t('lbl_title')}</Label>
            <InputText
              placeholder={t('lbl_title')}
              defaultValue={title}
              onChangeText={data => setTitle(data)}
            />
          </Column>

          <Column $gap>
            <Label>{t('lbl_price')}</Label>
            <CurrencyInput
              style={[
                styles.colors.backgroundColor.dark_3,
                styles.colors.textColor.white_1,
                styles.paddingStyle.pa_1,
                styles.font.size.size_18,
                styles.font.weight.medium,
              ]}
              placeholderTextColor={[styles.colors.textColor.white_2]}
              placeholder={t('lbl_price')}
              value={price}
              onChangeValue={data => setPrice(data)}
            />
          </Column>

          <Column $gap>
            <Label>{t('lbl_description')}</Label>
            <InputText
              placeholder={t('lbl_description')}
              defaultValue={description}
              onChangeText={data => setDescription(data)}
            />
          </Column>

          <Column>
            <Label>{t('lbl_duration')}</Label>
            <InputText
              placeholder={t('lbl_months')}
              defaultValue={validMonths}
              onChangeText={data => setValidMonths(data)}
            />
          </Column>

          <Column $gap>
            <Label>{t('lbl_items_plan')}</Label>
            <Column $gap>
              <InputText
                placeholder={t('message_items_plan')}
                defaultValue={itemPlanTitle}
                onChangeText={data => setItemPlanTitle(data)}
              />
              <Row $align={'center'} $justifyContent={'space-between'}>
                <CustomText
                  $fontSize={18}
                  $color={'#fcf3f3'}
                  $weight={'Regular'}>
                  {itemPlanStatus
                    ? `${t('lbl_included')}`
                    : `${t('lbl_not_included')}`}
                </CustomText>
                <ButtonDefault
                  onPress={() => setItemPlanStatus(!itemPlanStatus)}>
                  {itemPlanStatus ? (
                    <ToggleRight color={'#219653'} size={28} weight="fill" />
                  ) : (
                    <ToggleLeft color={'#EB5757'} size={28} weight="fill" />
                  )}
                </ButtonDefault>
              </Row>
              <ButtonDefault $turquoise onPress={() => addItemToPlan()}>
                <Label>{t('lbl_confirm')}</Label>
              </ButtonDefault>
            </Column>
          </Column>

          <HorizontalRule color={'#fcf3f3'} />

          <Column $gap>
            <Label>{t('lbl_included_items')}</Label>

            <Column $gap>
              {isIncluded.length > 0 ? (
                <>
                  {isIncluded.map((item, index) => (
                    <Row
                      key={index}
                      $align={'center'}
                      $justifyContent={'space-between'}>
                      <CustomText
                        $color={'#fcf3f3'}
                        $weight={'Medium'}
                        $fontSize={18}>
                        {item.title}
                      </CustomText>
                      <ButtonDefault
                        onPress={() => removeFromIsIncluded(index)}>
                        <Trash color={'#EB5757'} weight="fill" size={24} />
                      </ButtonDefault>
                    </Row>
                  ))}
                </>
              ) : (
                <CustomText
                  $fontSize={18}
                  $weight={'Medium'}
                  $color={'#fcf3f3'}>
                  {t('lbl_no_items')}
                </CustomText>
              )}
            </Column>
          </Column>

          <HorizontalRule color={'#fcf3f3'} />

          <Column $gap>
            <Label>{t('lbl_not_included')}</Label>

            <Column $gap>
              {notIncluded.length > 0 ? (
                <>
                  {notIncluded.map((item, index) => (
                    <Row
                      key={index}
                      $align={'center'}
                      $justifyContent={'space-between'}>
                      <CustomText
                        $color={'#fcf3f3'}
                        $weight={'Medium'}
                        $fontSize={18}>
                        {item.title}
                      </CustomText>
                      <ButtonDefault
                        onPress={() => removeFromNotIncluded(index)}>
                        <Trash color={'#EB5757'} weight="fill" size={24} />
                      </ButtonDefault>
                    </Row>
                  ))}
                </>
              ) : (
                <CustomText
                  $fontSize={18}
                  $weight={'Medium'}
                  $color={'#fcf3f3'}>
                  {t('lbl_no_items')}
                </CustomText>
              )}
            </Column>
          </Column>
        </Card>

        <Card $fullWidth>
          {!id ? (
            <Column $gap>
              <ButtonDefault $green onPress={() => createPlan()}>
                <Label>{t('lbl_create')}</Label>
              </ButtonDefault>
              <ButtonDefault $red onPress={() => navigation.goBack()}>
                <Label>{t('lbl_cancel')}</Label>
              </ButtonDefault>
            </Column>
          ) : (
            <Column $gap>
              <ButtonDefault $green onPress={() => updatePlan()}>
                <Label>{t('lbl_update')}</Label>
              </ButtonDefault>
              <ButtonDefault $red onPress={() => deletePlan()}>
                <Label>{t('lbl_delete_plan')}</Label>
              </ButtonDefault>
            </Column>
          )}
        </Card>
      </ContainerScroll>
    </ViewDefault>
  );
}
