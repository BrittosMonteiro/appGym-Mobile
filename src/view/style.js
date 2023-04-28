import styled from 'styled-components';

export const SafeAreaView = styled.SafeAreaView`
  padding: 16px;
  background: ${props => props.theme.colors.white_02};
  flex: 1;
`;

export const Container = styled.View`
  width: 100%;
  gap: 24px;
  flex: 1;
`;

export const ContainerScroll = styled.ScrollView.attrs(() => ({
  type: 'text',
  showsVerticalScrollIndicator: false,
}))`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

export const ContainerTitle = styled.Text`
  font-family: IBMPlexSansCondensed-Regular;
  font-weight: 400;
  font-size: 22px;
  line-height: 29px;
  ${props =>
    props.$white
      ? `
    color: ${props.theme.colors.white_02};
  `
      : `
  color: ${props.theme.colors.black_01};
`}
`;

export const Card = styled.View`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 4px;
  ${props => props.$fullWidth && `width: 100%;`};
  ${props => props.$padding && `padding: 16px;`};
  ${props => props.$black && `background:${props.theme.colors.black_01}`};
`;
