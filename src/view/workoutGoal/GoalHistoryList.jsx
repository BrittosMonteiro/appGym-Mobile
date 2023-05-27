import React from 'react';

import Container2 from '../../components/Container/Container';
import HorizontalRule from '../../components/HorizontalRule/HorizontalRule';
import {ContainerTitle, CustomText} from '../style';
import GoalHistoryListItem from './GoalHistoryListItem';
import {useTranslation} from 'react-i18next';
import {Row} from '../profile/components/style';

export default function GoalHistoryList({goalList}) {
  const {t} = useTranslation();

  return (
    <Container2 gap={16}>
      {goalList.length > 0 ? (
        <React.Fragment>
          <ContainerTitle>{t('lbl_your_goal_history_list')}</ContainerTitle>
          <Container2
            bgColor={props => props.theme.colors.black_01}
            padding={'16px'}
            gap={16}>
            {goalList.map((goal, index) => (
              <React.Fragment key={index}>
                <GoalHistoryListItem goal={goal} />
                {index < goalList.length - 1 && (
                  <HorizontalRule color={'#fcf3f3'} />
                )}
              </React.Fragment>
            ))}
          </Container2>
        </React.Fragment>
      ) : (
        <Row $justifyContent={'center'}>
          <CustomText $fontSize={18}>{t('lbl_no_goal_set')}</CustomText>
        </Row>
      )}
    </Container2>
  );
}
