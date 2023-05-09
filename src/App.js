import React from 'react';
import Map from "./Map.js";
import "mapbox-gl/dist/mapbox-gl.css";

function App() {
    // useEffect(() => {
  //   legend.addEventListener('click', () => {
  //     console.log("legend clicked");
  //   });
  // });

  return (
    <div>
      <Map />
    </div>
  );
};

export default App;
