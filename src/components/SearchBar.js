import React, { useState, useEffect, useCallback } from "react";
import { ReactComponent as SearchIcon } from "../assets/icon_search.svg";
import styles from "./SearchBar.module.css";
import Dropdown from "./Dropdown";

function SearchBar({
  searchTerm,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  placeholder = "태그나 제목으로 검색해 주세요", // 검색 용도 설명
  sortOptions = [
    { label: "최신순", value: "latest" },
    { label: "오래된 순", value: "oldest" },
  ], // 최신순과 오래된 순
  centeredMenu = false,
  isBordered = false,
}) {
  const [currentFilter, setCurrentFilter] = useState("latest");

  // 필터가 변경될 때 currentFilter 업데이트
  useEffect(() => {
    if (selectedFilter !== currentFilter) {
      setCurrentFilter(selectedFilter || "latest");
    }
  }, [selectedFilter, currentFilter]);

  // 필터 옵션을 선택할 때
  const handleOptionSelect = useCallback(
    (selectedLabel) => {
      const selectedValue =
        sortOptions.find((option) => option.label === selectedLabel)?.value ||
        "latest";
      if (selectedValue !== currentFilter) {
        setCurrentFilter(selectedValue);
        onFilterChange(selectedValue); // 필터 변경 함수 호출
      }
    },
    [currentFilter, onFilterChange, sortOptions]
  );

  const selectedOptionLabel =
    sortOptions.find((option) => option.value === currentFilter)?.label ||
    "최신순";

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInputWrapper}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <Dropdown
        options={sortOptions.map((option) => option.label)}
        selectedOption={selectedOptionLabel}
        onOptionSelect={handleOptionSelect}
        isBordered={true} // isBordered 전달
        centeredMenu={true}
      />
    </div>
  );
}

export default SearchBar;
