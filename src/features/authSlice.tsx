import { createSlice } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

const initialState = {
  isLoggedIn: false,
  user: null,
  users: [],
};

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface cred {
  email: string;
  password: string;
}

const checkCredentials = (user: User, credentials: cred) => {
  return (
    user.email === credentials.email && user.password === credentials.password
  );
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    signup: (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload;
      state.users.push(action.payload);
    },
    login: (state, action) => {
      const storedUser = state.users.find(
        (user) => user.email === action.payload.email
      );

      console.log(storedUser, "check user");
      if (!storedUser) {
        state.isLoggedIn = false;
        enqueueSnackbar("User Not Found ", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: 1000,
        });
        return;
      }
      const isMatch = checkCredentials(storedUser, action.payload);
      if (isMatch) {
        state.isLoggedIn = true;
        state.user = storedUser;
        enqueueSnackbar("Login Successfully ", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: 1000,
        });
      } else {
        enqueueSnackbar("Invalid Credentials", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: 1000,
        });
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
