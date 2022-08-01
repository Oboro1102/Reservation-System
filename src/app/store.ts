import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import settingBarReducer from '../components/settingBar/settingBarSlice';
import appointmentSetterReducer from '../components/appointmentSetter/appointmentSetterSlice';

export const store = configureStore({
  reducer: {
    settingBar: settingBarReducer,
    appointmentSetter: appointmentSetterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
