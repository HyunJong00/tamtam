import { useState } from 'react';
import Calendar from '../components/Calendar';
import './ChatPage.css';
import WithWhom from '../components/WithWhom';
import Thema from '../components/Thema';

function ChatPage() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [selectedThemes, setSelectedThemes] = useState([]); // 선택된 테마를 저장

  const handleCompanionSelect = (companion) => {
    setSelectedCompanion(companion);
  };

  const handleThemeSelectionChange = (themes) => {
    setSelectedThemes(themes);
    console.log("선택된 테마:", themes); // 선택된 테마 출력
  };

  const isDateRangeSelected = dateRange[0] && dateRange[1];

  return (
    <div className="screen">
      <div className="question-style">
        <div className="calendar-style">
          <Calendar dateRange={dateRange} onChange={setDateRange} />
          <span className="llm-message"> 언제 여행을 떠나시나요? </span>
        </div>
        <span className="client-message">
          {dateRange[0] ? dateRange[0].toLocaleDateString() : null} 
          {dateRange[1] && dateRange[0] !== dateRange[1] ? ` ~ ${dateRange[1].toLocaleDateString()}` : ''}
        </span>
      </div>
      
      {isDateRangeSelected && (
        <div className="question-style">
          <div>
            <span className="llm-message"> 누구와 함께 여행을 떠나시나요? </span>
            <WithWhom onCompanionSelect={handleCompanionSelect} />
          </div>
          {selectedCompanion && (
            <span className="client-message">
              {selectedCompanion}
            </span>
          )}
        </div>    
      )}

      {selectedCompanion && (
        <div className="question-style">
         <div>
          <span className="llm-message"> 여행의 테마를 골라주세요! (다중 선택이 가능해요) </span>
          <Thema onSelectionChange={handleThemeSelectionChange} />
         </div>
          <span className="bubble-container">
            {selectedThemes.map((theme, index) => (
              <span key={index} className="bubble">
                #{theme}
              </span>
            ))}
          </span>
        </div>
      )}
    </div>
  );
}

export default ChatPage;