import React, { useState } from 'react';

export function Footer() {
  // state
  const currentYear = new Date().getFullYear();
  const [showAbout, setShowAbout] = useState(false);

  return (
    <footer className="w-full flex items-center justify-between flex-wrap px-4 text-xs text-right bg-blue-600">
      <div className='flex items-center py-3'>
        <button className='py-1 px-3 rounded-full bg-white' onFocus={() => setShowAbout(true)} onBlur={() => setShowAbout(false)} aria-label="顯示關於資料">About</button>
        {showAbout && <div className='ml-4 py-1 px-3 rounded-full bg-white '>本系統採用 React + Redux 進行前端開發。</div>}
      </div>
      <span className='py-3 text-white'>&copy; 2022{<span>{currentYear !== 2022 && `&nbsp;-&nbsp;${currentYear}`}</span>}&nbsp;Design & Coding by ツキノリュウ.</span>
    </footer>
  );
}