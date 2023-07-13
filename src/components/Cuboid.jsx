import React, { useRef, useEffect } from 'react';
import { Engine, Scene, HemisphericLight } from 'react-babylonjs';

function Cuboid({ texture }) {
  const boxRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.material.diffuseTexture = new BABYLON.Texture(texture);
    }
  }, [texture]);

  return (
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
      <Scene>
        <HemisphericLight name="light1" intensity={0.7} direction={BABYLON.Vector3.Up()} />
        <arcRotateCamera name="camera1" target={BABYLON.Vector3.Zero()} alpha={Math.PI / 2} beta={Math.PI / 4} radius={10} />
        <box name="box" ref={boxRef} size={2} position={new BABYLON.Vector3(0, 1, 0)} />
      </Scene>
    </Engine>
  );
}

export default Cuboid;
