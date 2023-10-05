import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slice/userSlice';
import presenceSlice from './slice/presenceSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    presence: presenceSlice,
  },
});
