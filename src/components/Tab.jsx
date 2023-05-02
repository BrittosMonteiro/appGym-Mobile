import {Row} from '../view/profile/components/style';
import {ButtonDefault, CustomText} from '../view/style';

export default function Tab({changeTab, selectedTab, tabList}) {
  return (
    <Row>
      {tabList.map((item, index) => (
        <ButtonDefault
          onPress={() => changeTab(index)}
          key={index}
          style={[
            selectedTab === index && [{backgroundColor: '#202020'}],
            {flex: 1},
          ]}>
          <CustomText $color={selectedTab === index && '#fcf3f3'}>
            {item.title}
          </CustomText>
        </ButtonDefault>
      ))}
    </Row>
  );
}
