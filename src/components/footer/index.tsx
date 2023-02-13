export function Footer() {
  // state
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full flex items-center justify-between flex-wrap p-4 text-xs text-white bg-blue-600">
      <span>本系統採用 React + Redux 進行前端開發。</span>
      <span>&copy; 2022{<span>{currentYear !== 2022 && ` - ${currentYear}`}</span>}&nbsp;Design & Coding by ツキノリュウ.</span>
    </footer>
  );
}