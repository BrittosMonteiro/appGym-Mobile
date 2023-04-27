import styled from 'styled-components/native';

export const CardStyle = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  gap: 24px;
  border-radius: 4px;
  background: ${props => props.theme.colors.black_01};
`;
