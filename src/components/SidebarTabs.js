import React from "react";
import styles from "./SidebarTabs.module.css";

function SidebarTabs({ tabs, activeTab, onTabClick }) {
  return (
    <div className={styles.sidebarTabs}>
      {/* 탭 버튼 */}
      <div className={styles.tabList}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${styles.tab} ${
              activeTab === tab.label ? styles.active : ""
            }`}
            onClick={() => onTabClick(tab.label)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* 선택된 탭 콘텐츠 */}
      <div className={styles.tabContent}>
        {tabs.find((tab) => tab.label === activeTab)?.content}
      </div>
    </div>
  );
}

export default SidebarTabs;
