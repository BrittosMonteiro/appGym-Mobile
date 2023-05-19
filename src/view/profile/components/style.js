import styled from 'styled-components/native';

export const Column = styled.View`
  display: flex;
  flex-direction: column;
  ${props => props.$gap && `gap: 8px`};
`;

export const Row = styled.View`
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  ${props => `justify-content: ${props.$justifyContent}`}
  ${props => `align-items: ${props.$align}`}
`;
export const Label = styled.Text`
  font-size: 14px;
  line-height: 18px;
  font-family: IBMPlexSansCondensed-Regular;
  color: ${props =>
    !props.$black ? props.theme.colors.white_02 : props.theme.colors.black_01};
`;

export const InputText = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.gray_01,
}))`
  font-size: 18px;
  font-family: IBMPlexSansCondensed-Medium;
  padding: 0;
  color: ${props => (props.$black ? '#202020' : props.theme.colors.white_02)};
  ${props => props.$borderRadius && 'border-radius: 2px'};
  ${props =>
    props.$borderRadius && `border: 1px solid ${props.theme.colors.gray_01}`};
  ${props => props.$borderRadius && 'padding: 8px'};
`;
