import React, { useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import state from "../state";
import { Html } from '@react-three/drei';

export const Trousers = ({ fabricIndex, styleIndex }) => {
  const [hovered, setHovered] = useState(null);
  const group = useRef();
  const inputRef = useRef();
  const [indeximg, setIndeximg] = useState(0);
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("trousertotal3.glb");
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1, 50); // Adjust these values to change the camera position
    camera.lookAt(0, 0, 0); // Look at the center of the scene
    camera.fov = 75;
    camera.updateProjectionMatrix();
  }, [camera]);

  function importAll(r) {
    return r.keys().map(r);
  }

  const images = importAll(require.context('./Trouser fabric', false, /\.jpg$/));
  const textureLoader = new TextureLoader();

  const textures = images.map(image => {
    const texture = textureLoader.load(image);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    return texture;
  });

  const fabricmaterial = textures.map(texture => new THREE.MeshStandardMaterial({ map: texture }));

  console.log("images:", images);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
  };

  // Use useFrame hook to rotate the group in each frame
  useFrame(({ clock }) => {
    // Adjust the rotation speed here (e.g., rotate 1 degree per second)
      group.current.rotation.y += 0.01; // Adjust the rotation speed as needed
  });

  return (
    <>
      <Html >
        <div>
          <input type="file" accept=".jpg" onChange={handleFileChange} style={{ display: 'none' }} ref={inputRef} />
        </div>
      </Html>
      <group ref={group}>
        <mesh castShadow receiveShadow>
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.ATT.geometry}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.ATT_1.geometry}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.centerpocket_left.geometry}
            visible={styleIndex[5]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.centerpocket_right.geometry}
            visible={styleIndex[0]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.nocenterpocket_left.geometry}
            visible={styleIndex[1]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.nocenterpocket_right.geometry}
            visible={styleIndex[2]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.pocket_left.geometry}
            visible={styleIndex[3]}
          />
          <mesh
            material-color={snap.items.laces}
            material={fabricmaterial[fabricIndex]}
            geometry={nodes.pocket_right.geometry}
            visible={styleIndex[4]}
          />
        </mesh>
      </group>
    </>
  );
};
