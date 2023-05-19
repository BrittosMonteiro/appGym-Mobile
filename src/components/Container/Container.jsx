import {ContainerDefault} from './style';

export default function Container2(props) {
  return (
    <ContainerDefault
      $gap={props.gap}
      $padding={props.padding}
      $alignItems={props.alignItems}
      $justifyContent={props.justifyContent}
      $bgColor={props.bgColor}
      $flex={props.flex}>
      {props.children}
    </ContainerDefault>
  );
}
