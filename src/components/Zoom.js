import React, { useEffect, useRef } from  "react";
import "./Zoom.css"

const Zoom = ({ zoomLevel }) => {
    const zoomContainer = useRef(null);
    const zoomOut = document.getElementById('zoomOut');

    // zoomOut.addEventListener('click', () => {
    //         console.log("legend clicked");
    //     });
        
    return (
        <div ref={zoomContainer} className="zoomBar">
            <button className="zoomControl" id="zoomOut"><span className="material-symbols-outlined">remove</span></button>
            <div className="zoomLevel">{zoomLevel}</div>
            <button className="zoomControl"><span className="material-symbols-outlined">Add</span></button>
        </div>
    );
};
export default Zoom;