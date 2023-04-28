import styled from 'styled-components/native';

export const Column = styled.View`
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.View`
  gap: 8px;
  display: flex;
  flex-direction: row;
  ${props => `justify-content: ${props.$justifyContent}`}
  ${props => `align-items: ${props.$align}`}
`;
export const Label = styled.Text`
  fontSize: 14px;
  line-height: 18px;
  font-family: IBMPlexSansCondensed-Regular;
  color: ${props => props.theme.colors.white_02};
`;

export const InputText = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.colors.gray_01,
}))`
  fontSize: 18px;
  font-family: IBMPlexSansCondensed-Medium;
  padding: 0;
  color: ${props => props.theme.colors.white_02};
`;
