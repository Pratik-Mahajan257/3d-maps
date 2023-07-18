import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Map from './components/Map';
import Cuboid from './components/Cuboid';

const App = () => {
  return (
   
     <Routes>

        <Route exact path="/" component={Map} />
        <Route exact path="/cuboid" component={Cuboid} />
    
     </Routes>
   
  );
};

export default App;
