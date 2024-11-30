import React, { useState } from "react";
import styles from "./Dropdown.module.css";

function Dropdown({
  options,
  selectedOption,
  onOptionSelect,
  isBordered,
  centeredMenu,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <span
        onClick={handleDropdownClick}
        className={`${styles.dropdownText} ${
          isBordered ? styles.bordered : ""
        }`}
      >
        {selectedOption} <span className={styles.arrow}>▼</span>
      </span>
      {isOpen && (
        <ul
          className={`${styles.dropdownMenu} ${
            centeredMenu ? styles.centeredMenu : ""
          }`}
        >
          {options.map((option) => (
            <li
              key={option}
              className={`${styles.dropdownItem} ${
                option === selectedOption ? styles.selectedItem : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
