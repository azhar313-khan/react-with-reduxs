import { createSlice } from "@reduxjs/toolkit";

interface Row {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
}

interface State {
  rows: Row[];
  searchQuery: string;
  filterStatus: string;
}

const initialState: State = {
  rows: [],
  searchQuery: "",
  filterStatus: "all",
};

const userSlice = createSlice({
  name: "taskStore",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.rows.push(action?.payload);
    },
    update: (state, action) => {
      state.rows = state.rows.map((list) => {
        if (list?.id === action?.payload?.id) {
          list = action?.payload;
        }
        return list;
      });
    },
    remove: (state, action) => {
      state.rows = state.rows.filter((list) => list.id !== action.payload);
    },
    changeStatus: (state, action) => {
      // eslint-disable-next-line prefer-const
      let { itemId, newStatus } = action.payload;
      newStatus = newStatus === "active" ? "inactive" : "active";
      state.rows = state.rows.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      );
    },
    search: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearAll: (state) => {
      state.rows = [];
      state.searchQuery = "";
      state.filterStatus = "all";
    },
    filterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const {
  add,
  update,
  remove,
  changeStatus,
  search,
  filterStatus,
  clearAll,
} = userSlice.actions;
export default userSlice.reducer;
