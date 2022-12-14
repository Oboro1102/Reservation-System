import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { defaultView, defaultPickerDate, updateView, updatePickerDate, setToToday } from './settingBarSlice';

export function SettingBar() {
  const dispatch = useAppDispatch();
  // state
  const view = useAppSelector(defaultView);
  const pickerDate = useAppSelector(defaultPickerDate);
  const { year, month, date } = pickerDate;
  // methods
  const adjustDate = (type: string) => {
    let fix = 0
    if (type === 'previous') {
      switch (view) {
        case 'month':
          fix = -42
          break;
        case 'week':
          fix = -7
          break;
        case 'date':
          fix = -1
          break;

        default:
          fix = -1
          break;
      }
    } else {
      // type === 'next'
      switch (view) {
        case 'month':
          fix = 42
          break;
        case 'week':
          fix = 7
          break;
        case 'date':
          fix = 1
          break;

        default:
          fix = 1
          break;
      }
    }

    const { year, month, date, day } = JSON.parse(JSON.stringify(pickerDate))
    const result = {
      year, month, date, day
    }
    const adjustYear = (fix: number) => {
      return result.year += fix;
    }
    const adjustMonth = (fix: number) => {
      const newMonth = month + fix;
      if (newMonth > 12) {
        adjustYear(1);
        result.month = 1;
      } else if (newMonth < 1) {
        adjustYear(-1);
        result.month = 12;
      } else {
        result.month = newMonth;
      }
    }
    let newDate = date + fix;
    let maxMonthDate = new Date(year, month, 0).getDate();
    let previousMaxMonthDate = new Date(year, month - 1, 0).getDate();

    if (newDate > maxMonthDate) {
      adjustMonth(1);
      result.date = 1;
    } else if (newDate < 1) {
      adjustMonth(-1);
      result.date = previousMaxMonthDate;
    } else {
      result.date = newDate;
    }
    result.day = new Date(result.year, result.month - 1, result.date).getDay()
    return dispatch(updatePickerDate(result));
  }

  return (
    <nav className='flex items-center justify-between flex-wrap px-4 w-full bg-blue-600'>
      <div className='flex items-center py-3'>
        <button className='py-1 px-4 mr-4 rounded-full bg-white text-sm' aria-label="????????????" onClick={() => dispatch(setToToday())}>??????</button>
        <button className='py-1 px-2 rounded-l-full bg-white' aria-label="???????????????" onClick={() => adjustDate('previous')}><i className='gg-chevron-left scale-75'></i></button>
        <button className='py-1 px-2 mr-4  rounded-r-full bg-white' aria-label="???????????????" onClick={() => adjustDate('next')}><i className='gg-chevron-right scale-75'></i></button>
      </div>
      <span className='py-3 text-xl font-bold text-white'>{`${year}???${month}???`}{view === 'date' && `${date}???`}</span>
      <div className='flex items-center py-3'>
        <button className={`py-1 px-4 rounded-l-full text-sm ${view === 'month' ? 'bg-green-600 text-white' : 'bg-white'}`} aria-label="?????????" onClick={() => dispatch(updateView('month'))}>?????????</button>
        <button className={`py-1 px-4 text-sm ${view === 'week' ? 'bg-green-600 text-white' : 'bg-white'}`} aria-label="?????????" onClick={() => dispatch(updateView('week'))}>?????????</button>
        <button className={`py-1 px-4 rounded-r-full text-sm ${view === 'date' ? 'bg-green-600 text-white' : 'bg-white'}`} aria-label="?????????" onClick={() => dispatch(updateView('date'))}>?????????</button>
      </div>
    </nav>
  );
}
