import { useAppSelector } from '../../app/hooks';
import { defaultDate, defaultPickerDate, defaultView } from '../settingBar/settingBarSlice';
import { defaultAppointment } from '../appointmentSetter/appointmentSetterSlice';

export function DatePicker() {
  // state
  const today = useAppSelector(defaultDate);
  const pickerDate = useAppSelector(defaultPickerDate);
  const view = useAppSelector(defaultView);
  const appointment = useAppSelector(defaultAppointment);

  // methods
  const calculateFirstDate = (calculateDate: { year: number, month: number, date: number, day: number }, type: string): { year: number, month: number, date: number, day: number } => {
    const { year, month, date } = calculateDate
    let result
    if (type === 'month') {
      const monthDate = new Date(year, month - 1, 1);
      result = new Date(year, month - 1, 2 - monthDate.getDay());
    } else {
      // type === 'week'
      let selectedDate = new Date(year, month - 1, date)
      const monday = selectedDate.getDate() - selectedDate.getDay() + (selectedDate.getDay() === 0 ? -6 : 1);
      result = new Date(year, month - 1, monday);
    }
    return {
      year: result.getFullYear(),
      month: result.getMonth() + 1,
      date: result.getDate(),
      day: result.getDay(),
    };
  }
  const generateCalendar = (calculateDate: { year: number, month: number, date: number, day: number, }, totalDays: number): { year: number; month: number; date: number; day: number; }[] => {
    const result = [];
    const { year, month, date } = calculateFirstDate(calculateDate, totalDays > 7 ? 'month' : 'week')
    let calendarDate;
    for (let i = 0; i < totalDays; i++) {
      calendarDate = new Date(year, month - 1, date + i);
      result.push({
        year: calendarDate.getFullYear(),
        month: calendarDate.getMonth() + 1,
        date: calendarDate.getDate(),
        day: calendarDate.getDay(),
      });
    }
    return result;
  }
  const pickerType = (type: string = 'month'): JSX.Element | JSX.Element[] => {
    const dateStyle: { otherDay: string, sunday: string, saturday: string, today: string } = {
      otherDay: 'text-gray-400',
      sunday: 'text-red-600',
      saturday: 'text-green-600',
      today: 'bg-blue-500 text-white rounded-full'
    }
    const renderDateStyle = (value: { year: number, month: number, date: number, day: number }): string => {
      const conditionMap: { otherDay: boolean, sunday: boolean, saturday: boolean, today: boolean } = {
        otherDay: value.month !== today.month || value.year !== today.year,
        sunday: value.day === 0 && value.month === today.month && value.year === today.year && value.date !== today.date,
        saturday: value.day === 6 && value.month === today.month && value.year === today.year && value.date !== today.date,
        today: value.month === today.month && value.year === today.year && value.date === today.date
      }
      const result = []
      const conditionResult = Object.entries(conditionMap)

      for (let index = 0; index < conditionResult.length; index++) {
        const element = conditionResult[index];
        if (element[1] === true) {
          result.push(dateStyle[element[0] as keyof typeof dateStyle])
        }
      }

      return result.join(' ')
    }
    const renderAppointmentList = (value: { year: number, month: number, date: number, day: number }) => {
      const list = appointment.filter(item => { return Object.values(item.date).join() === Object.values(value).join() })
      return list
    }

    switch (type) {
      case 'month':
        return generateCalendar(pickerDate, 42).map((item, index) => (
          <div className='p-2 h-28 overflow-hidden rounded-lg bg-white text-xs sm:text-base' key={index}>
            <span className={`p-1 font-bold ${renderDateStyle(item)}`}>{item.date}</span>
            {renderAppointmentList(item).length > 0 && (
              <ul className='py-2 h-full max-h-fit overflow-auto text-xs sm:text-sm'>
                {renderAppointmentList(item).map((item, index) => (<li key={index}>{item.note}</li>))}
              </ul>
            )}
          </div>))
      case 'week':
        return generateCalendar(pickerDate, 7).map((item, index) => (
          <div className='p-2 h-full overflow-hidden rounded-lg bg-white text-xs sm:text-base' key={index}>
            <span className={`p-1 font-bold ${renderDateStyle(item)}`}>{item.date}</span>
            {renderAppointmentList(item).length > 0 && (
              <ul className='py-2 h-full max-h-fit overflow-auto text-xs sm:text-sm'>
                {renderAppointmentList(item).map((item, index) => (<li key={index}>{item.note}</li>))}
              </ul>
            )}
          </div>))
      case 'date':
        return <div className='p-2 w-full h-full overflow-hidden rounded-lg bg-white text-xs sm:text-base'>
          <span className={`p-1 font-bold ${renderDateStyle(pickerDate)}`}>{pickerDate.date}</span>
          {renderAppointmentList(pickerDate).length > 0 && (
            <ul className='py-2 h-full max-h-fit overflow-auto text-xs sm:text-sm'>
              {renderAppointmentList(pickerDate).map((item, index) => (<li key={index}>{item.note}</li>))}
            </ul>
          )}
        </div>

      default:
        return generateCalendar(pickerDate, 42).map((item, index) => (
          <div className='p-2 h-28 rounded-lg bg-white' key={index}>
            <span className={`p-1 font-bold ${renderDateStyle(item)}`}>{item.date}</span>
            {renderAppointmentList(item).length > 0 && (
              <ul>
                {renderAppointmentList(item).map((item, index) => (<li key="index">{item.note}</li>))}
              </ul>
            )}
          </div>))
    }
  }

  return (
    <main className='grow w-full p-4'>
      {view === 'month' && <div className='grid grid-flow-row-dense grid-cols-7 gap-4 auto-cols-min'>{pickerType(view)}</div>}
      {view === 'week' && <div className='grid grid-cols-7 gap-4 h-full'>{pickerType(view)}</div>}
      {view === 'date' && <div className='w-full h-full'>{pickerType(view)}</div>}
    </main >
  );
}
