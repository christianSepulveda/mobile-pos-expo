import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthorized: boolean;
}

const initialState: AuthState = { isAuthorized: true };

function onAuthChange(state: AuthState, action: PayloadAction<boolean>) {
  state.isAuthorized = action.payload;
}

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    onAuthChange,
  },
});

export const authActions = { ...authReducer.actions };
export const reducer = authReducer.reducer;
