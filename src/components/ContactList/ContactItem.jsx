import { useDispatch } from 'react-redux';

import { Btn, Item } from './ContactList.styled';
import { deleteContactsThunk } from 'redux/thunks';
import { TiDelete } from 'react-icons/ti';

export const ContactItem = ({ name, phone, id }) => {
  const dispatch = useDispatch();

  const onDelete = contactId => {
    dispatch(deleteContactsThunk(contactId));
  };

  return (
    <>
      <Item>
        <span>{name}:</span>
        <span>{phone}</span>
        <Btn type="button" onClick={() => onDelete(id)}>
          <TiDelete size="20" />
        </Btn>
      </Item>
    </>
  );
};
