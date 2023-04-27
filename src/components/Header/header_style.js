import styled from 'styled-components/native';

export const HeaderComponent = styled.View`
  display: flex;
  flex-direction: row;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.colors.black_01};
  border-radius: 4px;
`;
