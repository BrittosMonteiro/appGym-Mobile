import styled from 'styled-components/native';

export const ContainerList = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`;

export const ContainerListItem = styled.Pressable`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  width: 100%;
  ${props => (!props.$paddingVertical ? null : `paddingVertical: 8px;`)}
`;

export const ContainerListItemTitle = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: ${props => props.theme.colors.white_02};
  font-family: IBMPlexSansCondensed-Medium;
`;

export const ContainerListItemSubtitle = styled.Text`
  font-size: 12px;
  line-height: 16px;
  color: ${props => props.theme.colors.gray_01};
  font-family: IBMPlexSansCondensed-Regular;
`;
