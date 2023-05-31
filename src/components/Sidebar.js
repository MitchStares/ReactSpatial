import React, { useState } from "react";
import "./Sidebar.css";
import {
  AppBar,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material/";

const LinkTab = (props) => (
  <Tab
    component="a"
    onClick={(event) => {
      event.preventDefault();
    }}
    {...props}
  />
);

const InformationTab = ({ selectedFeatures, handleInputChange, handleCancelClick, handleChange, handleEditClick, handleSaveClick, isEditing, editedText }) => (
  <>
              {isEditing ? (
                <>
                  <textarea
                    value={editedText}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "25%",
                      padding: "10px",
                    }}
                  />
                  <div>
                    <IconButton
                      onClick={handleSaveClick}
                      aria-label="Save"
                      size="small"
                    >
                      Save
                    </IconButton>
                    <IconButton
                      onClick={handleCancelClick}
                      aria-label="Cancel"
                      size="small"
                    >
                      Cancel
                    </IconButton>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: "100%",
                      height: "25%",
                      padding: "10px",
                    }}
                  >
                    {selectedFeatures.lganame}
                    <IconButton
                      onClick={handleEditClick}
                      aria-label="Edit"
                      size="small"
                    >
                      &#9998; {/* Unicode character for edit icon */}
                    </IconButton>
                  </div>
                  <Card sx={{ width: "50%", height: "33%", margin: "10px" }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Local Government Area
                      </Typography>
                      <Typography variant="body2">
                        {selectedFeatures.lganame}
                      </Typography>
                    </CardContent>
                  </Card>
                </>
              )}
            </>
          );


const DataTab = () => (
  <>
    {/* Render your Data tab content here */}
  </>
);


const Sidebar = ({ isOpen, toggleSidebar, selectedFeatures }) => {
  const [value, setValue] = useState(0);
  const [editedText, setEditedText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedText(selectedFeatures.lganame);
  };

  const handleSaveClick = () => {
    // Perform save action with editedText
    setIsEditing(false);
    // Additional logic to update the feature information with the editedText
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (event) => {
    setEditedText(event.target.value);
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

          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            centered
          >
            <LinkTab label="Information" href="info" />
            <LinkTab label="Data" href="/data" />
          </Tabs>

          {value === 0 && (
            <InformationTab
              selectedFeatures={selectedFeatures}
              handleEditClick={handleEditClick}
              handleSaveClick={handleSaveClick}
              handleCancelClick={handleCancelClick}
              handleChange={handleChange}
              handleInputChange={handleInputChange}
              isEditing={isEditing}
              editedText={editedText}
            />
          )}
          {value === 1 && <DataTab />}
          
        </div>
      )}
    </div>
  );
};

export default Sidebar;
