import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addAppointment } from './appointmentSetterSlice';

export function AppointmentSetter() {
  const dispatch = useAppDispatch();
  // state
  const [showAppointmentSetter, setShowAbout] = useState(false);
  const [newAppointmentData, setNewAppointmentData] = useState({
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      day: new Date().getDay(),
    },
    note: '我是今天預設新增的代辦事項！'
  })
  // methods
  const reFormatDate = (value: string) => {
    return {
      year: new Date(value).getFullYear(),
      month: new Date(value).getMonth() + 1,
      date: new Date(value).getDate(),
      day: new Date(value).getDay(),
    }
  }
  const submitData = (data: {
    date: {
      year: number,
      month: number,
      date: number,
      day: number
    },
    note: string
  }) => {
    dispatch(addAppointment(data))
    setShowAbout(false)
  }

  return (
    <div>
      <button className='fixed bottom-10 sm:bottom-20 right-5 sm:right-10 flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white' aria-label="開啟建立待辦事項視窗" onClick={() => setShowAbout(true)}><i className='gg-math-plus'></i></button>
      {showAppointmentSetter && (
        <div className='fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 p-4 w-full max-w-xs sm:max-w-md min-h-fit rounded-xl bg-blue-600'>
          <input className='w-full p-2 rounded' type="date" name='date' value={`${newAppointmentData.date.year}-${newAppointmentData.date.month > 9 ? newAppointmentData.date.month : `0${newAppointmentData.date.month}`}-${newAppointmentData.date.date}`} onChange={(event) => setNewAppointmentData({ date: reFormatDate(event.target.value), note: newAppointmentData.note })} />
          <input className='w-full mt-4 p-2 rounded' type="text" name='note' value={newAppointmentData.note} onChange={(event) => setNewAppointmentData({ date: newAppointmentData.date, note: event.target.value })} />
          <div className='mt-4 flex justify-around'>
            <button type='button' className='py-1 px-4 mr-4 rounded-full bg-blue-900 text-white text-sm' aria-label="關閉建立待辦事項視窗" onClick={() => setShowAbout(false)}>關閉</button>
            <button type='submit' className='py-1 px-4 mr-4 rounded-full bg-green-600 text-white text-sm' aria-label="新增待辦事項" onClick={() => submitData(newAppointmentData)}>新增待辦事項</button>
          </div>
        </div>)
      }
    </div >
  );
}
