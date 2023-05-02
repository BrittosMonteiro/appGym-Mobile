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
  ${props => props.$alignItems && `align-items: ${props.$alignItems}`}
  ${props =>
    props.$justifyContent && `justify-content: ${props.$justifyContent}`}
    ${props => props.$bgColor && `backgroundColor: ${props.$bgColor}`}
`;

export const ContainerScroll = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  ${props => props.$bgColor && `backgroundColor: ${props.$bgColor}`}
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
  ${props => props.$bgColor && `background: ${props.$bgColor}`}
`;

export const ButtonDefault = styled.Pressable`
  align-items: center;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: center;
  padding: 8px;
  ${props => props.$green && `background: ${props.theme.colors.green_01}`};
  ${props => props.$red && `background: ${props.theme.colors.red_01}`};
  ${props =>
    props.$turquoise && `background: ${props.theme.colors.turquoise_01}`};
`;

export const CustomText = styled.Text`
  font-family: IBMPlexSansCondensed-${props => props.$weight || 'Regular'};
  fontSize: ${props => props.$fontSize || 16}px
  color: ${props => props.$color || '#202020'}
  line-height: ${props => props.$fontSize + 6 || 22}px
`;
