import React, { Fragment, useEffect } from 'react';
import { List } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectError,
  selectIsLoading,
} from 'redux/contact/contactSelector';

import { selectFilter } from 'redux/filter/filterSelector';
import { ContactItem } from './ContactItem';
import { getContactsThunk } from 'redux/thunks';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);
  // console.log(contacts);

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  // console.log(filterContacts);

  return (
    <>
      {isLoading && contacts?.length === 0}
      {error && !isLoading && <div>Ooops, error...</div>}
      {!filterContacts?.length && !error && !isLoading && (
        <div>Contacts not found</div>
      )}
      {!error && !isLoading && filterContacts?.length > 0 && (
        <List>
          {filterContacts.map(({ name, phone, id }) => {
            return (
              <Fragment key={id}>
                <ContactItem name={name} phone={phone} id={id} />
              </Fragment>
            );
          })}
        </List>
      )}
    </>
  );
};
