import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  draft: null,
};

const courseDraftSlice = createSlice({
  name: "courseDraft",
  initialState,
  reducers: {
    addCourseDraft(state, action) {
      state.draft = action.payload;
    },
    clearCourseDraft(state) {
      state.draft = null;
    },
  },
});

export const { addCourseDraft, clearCourseDraft } = courseDraftSlice.actions;
export default courseDraftSlice.reducer;
