import React, { useRef, useEffect } from 'react';
import * as BABYLON from 'babylonjs';

const Cuboid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const createCuboid = () => {
      const canvas = canvasRef.current;
      const engine = new BABYLON.Engine(canvas, true);
      const scene = new BABYLON.Scene(engine);

      const camera = new BABYLON.ArcRotateCamera(
        'camera',
        -Math.PI / 2,
        Math.PI / 2.5,
        5,
        new BABYLON.Vector3(0, 0, 0),
        scene
      );

      const light = new BABYLON.HemisphericLight(
        'light',
        new BABYLON.Vector3(0, 1, 0),
        scene
      );

      const material = new BABYLON.StandardMaterial('material', scene);
      const texture = new BABYLON.Texture('YOUR_IMAGE_URL', scene);
      material.diffuseTexture = texture;

      const box = BABYLON.MeshBuilder.CreateBox('box', { size: 1 }, scene);
      box.material = material;

      engine.runRenderLoop(() => {
        scene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
      });
    };

    createCuboid();
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '400px' }} />;
};

export default Cuboid;
