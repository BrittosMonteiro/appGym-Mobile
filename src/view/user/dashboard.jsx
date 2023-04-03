import {Text, View} from 'react-native';

import HeaderStart from '../../components/HeaderStart';
import TrainingList from '../../components/trainingList';
import ViewDefault from '../ViewDefault';
import styles from '../../styles';

export default function Dashboard({navigation}) {
  return (
    <ViewDefault>
      <HeaderStart />
      <View style={[styles.paddingStyle.px_3]}>
        <Text
          style={[
            styles.colors.textColor.dark_3,
            styles.font.size.size_28,
            styles.font.weight.bold,
          ]}>
          MEUS{'\n'}
          <Text
            style={[
              styles.colors.textColor.dark_2,
              styles.font.size.size_42,
              styles.font.weight.bold,
            ]}>
            TREINOS
          </Text>
        </Text>
      </View>
      <TrainingList navigation={navigation} />
    </ViewDefault>
  );
}
