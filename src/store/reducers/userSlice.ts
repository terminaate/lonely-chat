import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  authorized: boolean;
  user: {
    name: null | string;
  };
}

export const initialState: UserState = {
  authorized: false,
  user: {
    name: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<Partial<UserState>>) {
      return { ...state, ...action.payload };
    },
    login(state, action: PayloadAction<string>) {
      state.user.name = action.payload;
      state.authorized = true;
      sessionStorage.setItem('name', action.payload);
    },
  },
});

export const { updateUser, login } = userSlice.actions;

export default userSlice.reducer;
