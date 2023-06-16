import axios from 'axios';

export const getContacts = async () => {
  const { data } = await axios(
    'https://648cb0ef8620b8bae7ed42e3.mockapi.io/contacts'
  );
  return data;
};

export const getContactsDetails = async id => {
  const { data } = await axios(
    `https://648cb0ef8620b8bae7ed42e3.mockapi.io/contacts/:${id}`
  );
  return data;
};
