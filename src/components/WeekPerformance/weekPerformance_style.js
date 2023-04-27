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
  align-items: flex-start;
`;

export const Day = styled.Pressable`
  display: flex;
  flex-direction: column;
  align-items: center;
  paddingVertical: 8px;
  paddingHorizontal: 16px;
  gap: 8px;
  ${props =>
    props.isToday
      ? `
    background: ${props.theme.colors.turquoise_01};
  `
      : `
  background: ${props.theme.colors.black_01};`}
  border-radius: 4px;
`;

export const WeekdayNameAndNumber = styled.Text`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.theme.colors.white_02};
  font-family: IBMPlexSansCondensed-Medium;
`;
