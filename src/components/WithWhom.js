import React, { useState } from "react";
import styles from './WithWhom.module.css';

function WithWhom({ onCompanionSelect }) {
  const buttonLabels = ['친구와', '연인과', '부모님과', '아이와', '혼자'];
  const [activeIndex, setActiveIndex] = useState(null);

  const handleButtonClick = (index) => {
    setActiveIndex(index); 
    const selectedLabel = buttonLabels[index];
    onCompanionSelect(selectedLabel); // 선택된 버튼 내용을 부모 컴포넌트로 전달
  };

  return (
    <div className={styles.withWhom}>
      {buttonLabels.map((label, index) => (
        <button 
          key={index}
          className={styles.buttonStyle}
          onClick={() => handleButtonClick(index)}
          style={{ 
            backgroundColor: activeIndex === index ? '#FFA94F' : 'white', 
            color: activeIndex === index ? 'white' : '#333' 
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default WithWhom;