import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'yup-phone';

import PropTypes from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import { BsPersonAdd } from 'react-icons/bs';
import {
  Form,
  FormField,
  FieldFormik,
  ErrorMessage,
  StyledButton,
  LabelWrapper,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';

import { addContactsThunk } from 'redux/thunks';
import { toast } from 'react-toastify';
import { selectContacts } from 'redux/contact/contactSelector';

const toastifyOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};
const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  phone: yup.string().required(),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const onAddContact = data => {
    const findName = contacts.find(
      ({ name }) => name.toLowerCase().trim() === data.name.toLowerCase().trim()
    );

    if (findName) {
      toast.error(`${data.name}: is already in contacts`, toastifyOptions);
      return;
    }
    const findNumber = contacts.find(({ phone }) => phone === data.phone);
    if (findNumber) {
      toast.error(`This phone number is already in use.`, toastifyOptions);
      return;
    }
    dispatch(addContactsThunk(data));
  };
  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      onSubmit={(values, { resetForm }) => {
        onAddContact({ ...values });

        resetForm();
      }}
      validationSchema={schema}
    >
      <Form autoComplete="off">
        <FormField htmlFor="name">
          <LabelWrapper>Name</LabelWrapper>
          <FieldFormik type="text" name="name" placeholder="Name" required />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField>
          <LabelWrapper>Number</LabelWrapper>
          <FieldFormik type="tel" name="phone" required />
          <ErrorMessage name="phone" component="span" />
        </FormField>
        <StyledButton type="submit">
          <span>
            <BsPersonAdd />
          </span>
          Add contact
        </StyledButton>
      </Form>
    </Formik>
  );
};

ContactForm.propType = {
  onSubmit: PropTypes.func.isRequired,
};
