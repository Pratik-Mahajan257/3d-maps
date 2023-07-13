import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoicG0yNTciLCJhIjoiY2xrMG50cmtzMDgwazNqcGp3NnNzYzJ0biJ9.qyNC6ffyJNdZ0--qCz-RNw'; // Replace with your Mapbox access token

function Map({ onCaptureImage }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // Initial map center
      zoom: 9, // Initial zoom level
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const captureImage = () => {
    mapRef.current.once('render', () => {
      mapRef.current.getCanvas().toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          onCaptureImage(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    });
    mapRef.current.triggerRepaint();
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '400px' }} />
      <button onClick={captureImage}>Capture Image</button>
    </div>
  );
}

export default Map;
