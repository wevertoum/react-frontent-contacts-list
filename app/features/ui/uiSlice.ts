import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  isUserDrawerOpen: boolean;
}

const initialState: UiState = {
  isUserDrawerOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openUserDrawer(state) {
      state.isUserDrawerOpen = true;
    },
    closeUserDrawer(state) {
      state.isUserDrawerOpen = false;
    },
  },
});

export const { openUserDrawer, closeUserDrawer } = uiSlice.actions;

export default uiSlice.reducer;
