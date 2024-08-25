// Libs
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Interface
import User from "@/interfaces/user";

// Initial values
const initialValues: User = {
  id: "1",
  name: "Bernardus Willson",
  photo: "https://randomuser.me/api/portraits/men/75.jpg"
}


export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialValues },
  reducers: {
    // Login
    login: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },

    // Logout
    logout: (state) => {
      state.value = initialValues
    }
  }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer