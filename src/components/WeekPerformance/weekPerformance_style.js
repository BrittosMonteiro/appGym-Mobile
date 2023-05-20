import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const ContainerWeek = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Day = styled.Pressable`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 8px;
  background-color: ${props =>
    props.$isToday ? props.theme.colors.turquoise_01 : ''};
  border-radius: 4px;
`;

export const WeekdayNameAndNumber = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  color: ${props =>
    props.$isToday ? props.theme.colors.white_02 : props.theme.colors.black_01};
  font-family: IBMPlexSansCondensed-${props => (props.$isToday ? 'SemiBold' : 'Regular')};
`;
