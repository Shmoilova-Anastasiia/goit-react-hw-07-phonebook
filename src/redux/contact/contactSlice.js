import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { initialState } from '../initialState';
import {
  addContactsThunk,
  deleteContactsThunk,
  getContactsThunk,
} from 'redux/thunks';

const arrayThunk = [addContactsThunk, deleteContactsThunk, getContactsThunk];

const status = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

const fn = status => arrayThunk.map(el => el[status]);

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    const { pending, fulfilled, rejected } = status;
    builder
      .addCase(getContactsThunk.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContactsThunk.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContactsThunk.fulfilled, (state, { payload }) => {
        state.items = state.items.filter(({ id }) => id !== payload);
      })
      .addMatcher(isAnyOf(...fn(pending)), handlePending)
      .addMatcher(isAnyOf(...fn(fulfilled)), handleFulfilled)
      .addMatcher(isAnyOf(...fn(rejected)), handleRejected);
  },
});

export const contactsReducer = contactSlice.reducer;
