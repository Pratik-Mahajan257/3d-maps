import React, { useState } from 'react';
import Map from './components/Map';
import Cuboid from './components/Cuboid';

function App() {
  const [mapImage, setMapImage] = useState(null);

  const handleCaptureImage = (imageData) => {
    setMapImage(imageData);
  };

  return (
    <div>
      <h1>MERN Map App</h1>
      <Map onCaptureImage={handleCaptureImage} />
      {mapImage && <Cuboid texture={mapImage} />}
    </div>
  );
}

export default App;
