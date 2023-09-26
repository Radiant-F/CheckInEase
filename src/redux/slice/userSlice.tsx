import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    token: '',
    user_data: {
      name: '',
    },
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUserData(state, action) {
      state.user_data = action.payload;
    },
  },
});

export const {setToken, setUserData} = userSlice.actions;

export default userSlice.reducer;
