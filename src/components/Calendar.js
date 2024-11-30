import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.module.css';

function Calendar({ dateRange, onChange }) {
  const handleDateChange = (range) => {
    if (range && range.length === 2) {
      const [start, end] = range;
      const dayLimit = (end - start) / (1000 * 60 * 60 * 24);

      // 최대 범위를 7일로 제한
      if (dayLimit <= 7) {
        onChange(range); // 부모 컴포넌트의 상태 업데이트
      } else {
        alert("최대 7일까지만 선택할 수 있습니다.");
      }
    } else {
      onChange(range); // 단일 날짜 선택 시 설정
    }
  };

  return (
    <div>
      <CalendarComponent
        onChange={handleDateChange}
        selectRange={true}
        value={dateRange}
      />
    </div>
  );
}

export default Calendar;