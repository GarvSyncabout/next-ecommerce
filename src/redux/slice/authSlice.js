import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Extract token from cookies
      const cookies = document.cookie.split("; ");
      let token = null;
      for (let cookie of cookies) {
        if (cookie.startsWith("token=")) {
          token = cookie.split("=")[1];
          break;
        }
      }

      if (token) {
        window.localStorage.setItem("token", token); // Store token in localStorage
      }

      return { user: data, token }; // Return user data & token
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    password: "",
    user: null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null, // Load token from localStorage
    isLoading: false,
    error: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      window.localStorage.setItem("token", action.payload); // Save token to localStorage
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setEmail, setPassword, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
