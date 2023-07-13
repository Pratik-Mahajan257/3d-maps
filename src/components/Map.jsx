import React, { useState } from 'react';
import ReactMapGL, { Marker, FlyToInterpolator } from 'react-map-gl';

const Map = ({ handleCaptureImage }) => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 12,
  });

  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  const handleMapClick = (event) => {
    const [longitude, latitude] = event.lngLat;
    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom: 16,
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
      transitionDuration: 'auto',
    });
  };

  const handleCaptureButtonClick = () => {
    handleCaptureImage(viewport);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        width="100%"
        height={400}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={handleViewportChange}
        onClick={handleMapClick}
      >
        <Marker latitude={viewport.latitude} longitude={viewport.longitude} offsetLeft={-20} offsetTop={-10}>
          <div>Selected Location</div>
        </Marker>
      </ReactMapGL>
      <button onClick={handleCaptureButtonClick}>Capture Image</button>
    </div>
  );
};

export default Map;
