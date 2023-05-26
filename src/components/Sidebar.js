import React from 'react';
import "./Sidebar.css";
import {AppBar, Tabs, Tab, Box} from '@mui/material/';

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const Sidebar = ({ isOpen, toggleSidebar}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
   return (
    <div className="sidebar" style={{ width: isOpen ? '35vw' : '0' }}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="material-symbols-outlined">last_page</span>
      </button>
      {isOpen && (
        <div className="sidebar-content">
          <AppBar position='static'>
            <header className="sidebar-header"><p>FocalPoint</p></header>
          </AppBar>
          {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'flex', position:'relative'}}> */}
            <Tabs value={value} onChange={handleChange} variant="fullWidth" centered>
              <LinkTab label='Information' href='info'/>
              <LinkTab label='Data' href='/data'/>
            </Tabs>
          {/* </Box> */}
                    
          {"Text"/* Sidebar content goes here */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;