// Libs
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

// Interface
import Task from "@/interfaces/task";

interface TaskState {
  data: Task[];
  filteredData: Task[];
  filter: string;
  loading: boolean;
}

// Initial values
const initialValues: TaskState = {
  data: [],
  filteredData: [],
  filter: 'all',
  loading: false,
};


export const taskSlice = createSlice({
  name: 'task',
  initialState: { value: initialValues },
  reducers: {
    // Set Tasks
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.value.data = action.payload;
    
      const currentDate = new Date();
    
      // sort tasks
      state.value.data.sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : null;
        const dateB = b.date ? new Date(b.date) : null;
    
        if (dateA && dateB) {
          const isAPast = dateA < currentDate;
          const isBPast = dateB < currentDate;
    
          if (isAPast && isBPast) {
            return dateB.getTime() - dateA.getTime();
          }
    
          if (isAPast) return 1;
          if (isBPast) return -1;
    
          return dateA.getTime() - dateB.getTime();
        }

        if (dateA) return -1;
        if (dateB) return 1;
    
        return 0;
      });
    
      state.value.filteredData = state.value.data;
      state.value.loading = false;
    },
    
    // Set Loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.value.loading = action.payload;
    },

    // Set Filter
    setFilter: (state, action: PayloadAction<string>) => {
      state.value.filter = action.payload;

      if (action.payload === 'all') {
        state.value.filteredData = state.value.data;
      } else {
        state.value.filteredData = state.value.data.filter((task) => task.type === action.payload);
      }
    },
  },
});

export const { setTasks, setLoading, setFilter } = taskSlice.actions;
export default taskSlice.reducer;
