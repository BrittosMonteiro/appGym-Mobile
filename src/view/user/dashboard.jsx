import {Text, View} from 'react-native';

import HeaderStart from '../../components/HeaderStart';
import TrainingList from '../../components/trainingList';
import ViewDefault from '../ViewDefault';
import styles from '../../styles';
import {useSelector} from 'react-redux';

export default function Dashboard({navigation}) {
  const userSession = useSelector(state => {
    return state.userSessionReducer;
  });
  return (
    <ViewDefault>
      <HeaderStart />
      <View style={[styles.paddingStyle.px_3]}>
        <Text
          style={[
            styles.colors.textColor.white_1,
            styles.font.size.size_28,
            styles.font.weight.bold,
          ]}>
          MEUS{'\n'}
          <Text
            style={[
              styles.colors.textColor.white_2,
              styles.font.size.size_42,
              styles.font.weight.bold,
            ]}>
            TREINOS
          </Text>
        </Text>
      </View>
      <View style={[styles.paddingStyle.px_3]}>
        <TrainingList navigation={navigation} userId={userSession.id} />
      </View>
    </ViewDefault>
  );
}
