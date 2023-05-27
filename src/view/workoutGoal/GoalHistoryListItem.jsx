import {Row} from '../profile/components/style';
import {CustomText} from '../style';

export default function GoalHistoryListItem({goal}) {
  return (
    <Row $align={'flex-start'} $justifyContent={'space-between'}>
      <CustomText
        $fontSize={22}
        $weight={'SemiBold'}
        $color={props => props.theme.colors.white_02}>
        {goal.value}
      </CustomText>
      <CustomText $fontSize={14} $color={props => props.theme.colors.white_02}>
        {new Date(goal.createdAt).toLocaleDateString()}
      </CustomText>
    </Row>
  );
}
