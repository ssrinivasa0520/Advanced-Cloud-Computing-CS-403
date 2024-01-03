import { User } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: { user: User | null } = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      console.log(action.payload);
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

export default authSlice;
