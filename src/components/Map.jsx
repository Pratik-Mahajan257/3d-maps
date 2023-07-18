import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicG0yNTciLCJhIjoiY2xrMG50cmtzMDgwazNqcGp3NnNzYzJ0biJ9.qyNC6ffyJNdZ0--qCz-RNw';

const Map = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [visibleRegion, setVisibleRegion] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/pm257/clk0vyrkb00aj01qr02byb62a',
        center: [0, 0],
        zoom: 2,
      });

      newMap.on('load', () => {
        setMap(newMap);
      });

      newMap.on('moveend', () => {
        const bounds = newMap.getBounds();
        setVisibleRegion(bounds);
      });
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  const captureImage = () => {
    if (map) {
      map.once('render', () => {
        map.getCanvas().toBlob((blob) => {
          // Use the captured image blob as needed (e.g., send to backend)
          console.log('Image blob:', blob);
        });
      });
      map.repaint = true;
    }
  };

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
      <button onClick={captureImage}>Capture Image</button>
      {visibleRegion && (
        <div>
          <h3>Visible Region</h3>
          <p>North: {visibleRegion.getNorth().toFixed(2)}</p>
          <p>South: {visibleRegion.getSouth().toFixed(2)}</p>
          <p>East: {visibleRegion.getEast().toFixed(2)}</p>
          <p>West: {visibleRegion.getWest().toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Map;
