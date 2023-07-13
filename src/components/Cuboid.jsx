import React from 'react';
import * as BABYLON from 'babylonjs';

const Cuboid = ({ imageURL }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const createScene = () => {
      const canvas = canvasRef.current;
      const engine = new BABYLON.Engine(canvas, true);
      const scene = new BABYLON.Scene(engine);

      // Create cuboid mesh and apply texture
      const width = 2;
      const height = 1;
      const depth = 1;
      const box = BABYLON.MeshBuilder.CreateBox('box', { width, height, depth }, scene);
      const material = new BABYLON.StandardMaterial('material', scene);
      material.diffuseTexture = new BABYLON.Texture(imageURL, scene);
      box.material = material;

      // Set up camera and light
      const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 5, new BABYLON.Vector3(0, 0, 0), scene);
      const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

      // Render the scene
      engine.runRenderLoop(() => {
        scene.render();
      });
    };

    createScene();
  }, [imageURL]);

  return <canvas ref={canvasRef} />;
};

export default Cuboid;
