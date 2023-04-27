import styled from 'styled-components/native';

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding: 16px;
  justify-content: space-between;
  align-items: flex-start;
  background: ${props => props.theme.colors.black_01};
  border-radius: 4px;
`;

export const HeaderColumn = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  gap: 16px;
`;

export const HeaderGreetings = styled.Text`
  font-size: 22px;
  line-height: 29px;
  font-weight: 400;
  font-family: IBMPlexSansCondensed-Regular;
  color: ${props => props.theme.colors.white_02};
`;

export const HeaderGreetingsStrong = styled.Text`
  font-size: 22px;
  line-height: 29px;
  font-weight: 500;
  font-family: IBMPlexSansCondensed-Medium;
  color: ${props => props.theme.colors.white_02};
`;

export const HeaderSubtitle = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.theme.colors.white_02};
  font-family: IBMPlexSansCondensed-Regular;
`;
