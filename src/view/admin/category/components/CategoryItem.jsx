import React, {useState} from 'react';
import {Pressable, View} from 'react-native';

import {
  ContainerListItem,
  ContainerListItemTitle,
} from '../../../workout/components/style';
import {Column} from '../../../profile/components/style';
import {PencilSimple, Trash} from 'phosphor-react-native';
import ModalDeleteCategory from './ModalDeleteCategory';
import ModalCreateAndUpdateCategory from './ModalCreateAndUpdateCategory';

export default function CategoryItem({category, reload}) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  function closeModal() {
    setOpenDelete(false);
    setOpenEdit(false);
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
          <Pressable onPress={() => setOpenEdit(true)}>
            <PencilSimple weight="regular" size={24} color={'#202020'} />
          </Pressable>
          <Pressable onPress={() => setOpenDelete(true)}>
            <Trash weight="regular" size={24} color={'#EB5757'} />
          </Pressable>
        </View>
      </ContainerListItem>
      <ModalCreateAndUpdateCategory
        onClose={closeModal}
        open={openEdit}
        reload={reload}
        category={category}
      />
      <ModalDeleteCategory
        open={openDelete}
        onClose={closeModal}
        idCategory={category.id}
        reload={reload}
      />
    </React.Fragment>
  );
}
