import styled from 'styled-components';

export const ContainerDefault = styled.View`
  width: 100%;
  border-radius: 4px;
  flex: ${props => (!props.$flex ? 'none' : 1)};
  gap: ${props => (!props.$gap ? '32px' : `${props.$gap}px`)};
  padding: ${props => (!props.$padding ? '0px' : `${props.$padding}px`)};
  align-items: ${props =>
    !props.$alignItems ? 'flex-start' : props.$alignItems};
  justify-content: ${props =>
    !props.$justifyContent ? 'flex-start' : props.$justifyContent};
  background-color: ${props =>
    !props.$bgColor ? 'transparent' : props.$bgColor};
`;
