import React from 'react';
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
   return (
    <div className="sidebar" style={{ width: isOpen ? '35vw' : '0' }}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="material-symbols-outlined">last_page</span>
      </button>
      {isOpen && (
        <div className="sidebar-content">
          <div className="sidebar-headerblock">
            <header className="sidebar-header"><p>FocalPoint</p></header>
          </div>
          <div className='sidebar-topMenu'>
            <div>
              <a href="/">Information</a>
              <a href='/'>Insights</a>
            </div>
          </div>
          {"Text"/* Sidebar content goes here */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;