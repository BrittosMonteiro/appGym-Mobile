import React, {useState} from 'react';
import {Pressable, View} from 'react-native';

import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../../../components/TrainingList/style';
import {Column} from '../../../profile/components/style';
import {PencilSimple, Trash} from 'phosphor-react-native';
import ModalDeleteCategory from './ModalDeleteCategory';

export default function CategoryItem({category, reload}) {
  const [openDelete, setOpenDelete] = useState(false);

  function closeModal() {
    setOpenDelete(false);
  }

  return (
    <React.Fragment>
      <ContainerListItem onPress={() => {}}>
        <Column $gap>
          <ContainerListItemTitle $color={'#202020'}>
            {category.title.toUpperCase()}
          </ContainerListItemTitle>
        </Column>
        <View style={{display: 'flex', flexDirection: 'row', gap: 8}}>
          <Pressable onPress={() => console.log('Editar Categoria')}>
            <PencilSimple weight="regular" size={24} color={'#202020'} />
          </Pressable>
          <Pressable onPress={() => setOpenDelete(true)}>
            <Trash weight="regular" size={24} color={'#EB5757'} />
          </Pressable>
        </View>
      </ContainerListItem>
      <ModalDeleteCategory
        open={openDelete}
        onClose={closeModal}
        idCategory={category.id}
        reload={reload}
      />
    </React.Fragment>
  );
}
