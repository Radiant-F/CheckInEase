import {createSlice} from '@reduxjs/toolkit';

const presenceSlice = createSlice({
  name: 'presenceSlice',
  initialState: {
    presence_data: null,
    camera_permission: null,
    modal_loading: false,
  },
  reducers: {
    setCameraPermission(state, action) {
      state.camera_permission = action.payload;
    },
    setModalLoading(state, action) {
      state.modal_loading = action.payload;
    },
  },
});

export const {setCameraPermission, setModalLoading} = presenceSlice.actions;

export default presenceSlice.reducer;
