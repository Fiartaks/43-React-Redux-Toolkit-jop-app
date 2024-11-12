import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [], // bu diziyi asla degisitirmicez sadece filtreleme icin
  jobs: [],
  isLoading: false,
  isError: false,
};

const JobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    setJobs: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = action.payload;
      state.mainJobs = action.payload;
    },
    deleteJob: (state, action) => {
      const i = state.jobs.findIndex((i) => i.id === action.payload);
      state.jobs.splice(i, 1);
    },

    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    //aratilan sirket ismine goe filtrele

    filterBySearch: (state, action) => {
      const query = action.payload.text.toLowerCase();

      const filtred = state.mainJobs.filter((i) =>
        i[action.payload.field].toLowerCase().includes(query)
      );
      state.jobs = filtred;
    },
  },
});

export const {
  filterBySearch,
  createJob,
  setLoading,
  setError,
  setJobs,
  deleteJob,
} = JobSlice.actions;

export default JobSlice.reducer;
