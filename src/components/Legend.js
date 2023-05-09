import React, {useRef} from "react";

const Legend = () => {
    const legend = useRef(null);
    return (
        <div ref={legend} className="legend">
            Legend
        </div>
    );
};
export default Legend;