import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface settingBarState {
  dataView: string,
  datePicker: boolean,
  today: {
    year: number,
    month: number,
    date: number,
    day: number,
  },
  pickerDate: {
    year: number,
    month: number,
    date: number,
    day: number,
  },
}

const initialState: settingBarState = {
  dataView: 'month', // month、week、date,
  datePicker: false,
  today: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  },
  pickerDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    day: new Date().getDay(),
  },
};

export const settingBarSlice = createSlice({
  name: 'settingBar',
  initialState,
  reducers: {
    updateView: (state, action: PayloadAction<string>) => {
      state.dataView = action.payload;
    },
    triggerDatePicker(state, action: PayloadAction<boolean>) {
      state.datePicker = action.payload
    },
    setToToday(state) {
      Object.assign(state.pickerDate, state.today)
    },
    updatePickerDate(state, action: PayloadAction<{
      year: number,
      month: number,
      date: number,
      day: number,
    }>) {
      Object.assign(state.pickerDate, action.payload)
    },
  },
});

export const { updateView, triggerDatePicker, setToToday, updatePickerDate, } = settingBarSlice.actions;

export const defaultView = (state: RootState) => state.settingBar.dataView;
export const defaultPickerDate = (state: RootState) => state.settingBar.pickerDate;
export const defaultDate = (state: RootState) => state.settingBar.today;

export default settingBarSlice.reducer;
