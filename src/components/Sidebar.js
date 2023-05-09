import React from 'react';
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
   return (
    <div className="sidebar" style={{ width: isOpen ? '45vw' : '0' }}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="material-symbols-outlined">last_page</span>
      </button>
      {isOpen && (
        <div className="sidebar-content">
          {"Text"/* Sidebar content goes here */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;