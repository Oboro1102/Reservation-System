import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface appointmentSetterState {
  appointment: {
    date: {
      year: number,
      month: number,
      date: number,
      day: number,
    },
    note: string
  }[]
}

const initialState: appointmentSetterState = {
  appointment: [{
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      day: new Date().getDay(),
    },
    note: '預設的代辦事項'
  }]
};

export const appointmentSetterSlice = createSlice({
  name: 'appointmentSetter',
  initialState,
  reducers: {
    addAppointment(state, action: PayloadAction<{
      date: {
        year: number,
        month: number,
        date: number,
        day: number,
      },
      note: string
    }>) {
      state.appointment.push(action.payload)
    },
  },
});

export const { addAppointment } = appointmentSetterSlice.actions;

export const defaultAppointment = (state: RootState) => state.appointmentSetter.appointment;

export default appointmentSetterSlice.reducer;
