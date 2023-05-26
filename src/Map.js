import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Legend from "./components/Legend.js";
import Sidebar from "./components/Sidebar.js";
import Zoom from "./components/Zoom.js";
import ReactDOM from "react-dom";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

// const Popup = ({ lganame }) => (
//   <div className="popup">
//     <h3 className="lga-name">{lganame}</h3>
//     {/* <div className="route-metric-row">
//       <h4 className="row-title">Route #</h4>
//       <div className="row-value">{routeNumber}</div>
//     </div>
//     <div className="route-metric-row">
//       <h4 className="row-title">Route Type</h4>
//       <div className="row-value">{type}</div>
//     </div>
//     <p className="route-city">Serves {city}</p> */}
//   </div>
// );

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(151.21);
  const [lat, setLat] = useState(-33.8);
  const [zoom, setZoom] = useState(7);
  const [isOpen, setIsOpen] = useState(false);
  // const popupRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const [selectedFeatures, setSelectedFeatures] = React.useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // map.current.addSource("Local Government Area",{
  //   type: 'geojson',
  //   data: 'https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Administrative_Boundaries_Theme/FeatureServer/8/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=false&sqlFormat=none&resultType=&featureEncoding=esriDefault&datumTransformation=&f=geojson'
  // });

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on("load", () => {
      map.current.addSource("LocalGovernmentArea", {
        type: "geojson",
        data: "https://portal.spatial.nsw.gov.au/server/rest/services/NSW_Administrative_Boundaries_Theme/FeatureServer/8/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&gdbVersion=&historicMoment=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=xyFootprint&resultOffset=&resultRecordCount=&returnTrueCurves=false&returnExceededLimitFeatures=false&quantizationParameters=&returnCentroid=false&sqlFormat=none&resultType=&featureEncoding=esriDefault&datumTransformation=&f=geojson",
      });
      map.current.addLayer({
        id: "local-government-area",
        type: "fill",
        source: "LocalGovernmentArea",
        paint: {
          "fill-opacity": 0.8,
          "fill-color": "#f05c5c",
          "fill-outline-color": "#000000",
        },
      });
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(0));
    });
    map.current.on("click", (e) => {
      setLng(e.lngLat.lng.toFixed(4));
      setLat(e.lngLat.lat.toFixed(4));
    });
    map.current.on("click", (e) => {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["local-government-area"],
      });
      if (features.length > 0) {
        const feature = features[0];
        setSelectedFeatures(feature.properties)
        // create popup node
        // const popupNode = document.createElement("div");
        // ReactDOM.render(
        //   <Popup
        //     lganame={feature?.properties?.lganame}
        //     // routeNumber={feature?.properties?.LineAbbr}
        //     // city={feature?.properties?.City}
        //     // type={feature?.properties?.RouteType}
        //   />,
        //   popupNode
        // );
        // popupRef.current
        //   .setLngLat(e.lngLat)
        //   .setDOMContent(popupNode)
        //   .addTo(map.current);
      }
    });
  });

  return (
    <div>
      <div className="coordinates">
        Longitude: {lng} | Latitude: {lat}
      </div>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ width: isOpen ? "65vw" : "100vw" }}
      />
      <Legend />
      <Zoom zoomLevel={zoom} />
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} selectedFeatures={selectedFeatures} />
    </div>
  );
};

export default Map;
