import React, { useState } from "react";
import styles from "./Checklist.module.css";

function Checklist() {
  const [checklistItems, setChecklistItems] = useState([
    { text: "비행기 티켓", checked: false },
    { text: "숙소 예약 확인", checked: false },
    { text: "캐리어", checked: false },
    { text: "상비약", checked: false },
  ]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setChecklistItems([...checklistItems, { text: newItem, checked: false }]);
      setNewItem("");
    }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = checklistItems.filter((_, i) => i !== index);
    setChecklistItems(updatedItems);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  const toggleCheck = (index) => {
    const updatedItems = checklistItems.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setChecklistItems(updatedItems);
  };

  return (
    <div className={styles.ChecklistContainer}>
      <ul className={styles.Checklist}>
        {checklistItems.map((item, index) => (
          <li key={index} className={styles.ChecklistItem}>
            <div className={styles.ChecklistText}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(index)}
              />
              <span className={item.checked ? styles.checked : ""}>
                {item.text}
              </span>
            </div>
            <button
              className={styles.RemoveButton}
              onClick={() => handleRemoveItem(index)}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.AddItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="새 항목 추가"
        />
        <button onClick={handleAddItem} className={styles.AddButton}>
          추가
        </button>
      </div>
    </div>
  );
}

export default Checklist;
