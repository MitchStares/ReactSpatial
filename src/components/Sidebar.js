import React from "react";
import "./Sidebar.css";
import { AppBar, Tabs, Tab, Card, CardContent, Typography } from "@mui/material/";

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

const Sidebar = ({ isOpen, toggleSidebar, selectedFeatures }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="sidebar" style={{ width: isOpen ? "35vw" : "0" }}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="material-symbols-outlined">last_page</span>
      </button>
      {isOpen && (
        <div className="sidebar-content">
          <AppBar position="static">
            <header className="sidebar-header">
              <p>FocalPoint</p>
            </header>
          </AppBar>
          {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'flex', position:'relative'}}> */}
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            centered
          >
            <LinkTab label="Information" href="info" />
            <LinkTab label="Data" href="/data" />
          </Tabs>
          {/* </Box> */}
          
          <Card sx={{ width: "50%", height: "33%" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Local Government Area
              </Typography>
                <Typography variant="body2">
                  {/* Render the feature information */}
                  {selectedFeatures.lganame}
                </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
