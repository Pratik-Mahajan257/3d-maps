import React, { useState } from 'react';
import axios from 'axios';
import Map from './Map';
import Cuboid from './Cuboid';

const App = () => {
  const [imageURL, setImageURL] = useState('');

  const handleCaptureImage = async (viewport) => {
    try {
      const response = await axios.post('http://localhost:5000/capture-image', { viewport });
      setImageURL(response.data.imageURL);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Map handleCaptureImage={handleCaptureImage} />
      {imageURL && <Cuboid imageURL={imageURL} />}
    </div>
  );
};

export default App;
