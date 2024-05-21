import React, { useEffect, useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import state from "../state";
import img1 from "./Shoe/material/1.jpg"
import img2 from "./Shoe/material/2.jpg";
import img3 from "./Shoe/material/3.jpg";
import img4 from "./Shoe/material/4.jpg";
import img5 from "./Shoe/material/5.jpg";
import img6 from "./Shoe/material/6.jpg";
import img7 from "./Shoe/material/7.jpg";
import img8 from "./Shoe/material/8.jpg";
import img9 from "./Shoe/material/trouserfabric.png"
import { Html } from '@react-three/drei';

export const Shorts = ({fabricIndex}) => {
    const [hovered, setHovered] = useState(null);
    const group = useRef();
    const [indeximg, setIndeximg] = useState(0); // Corrected here
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF("shorts1.glb");
    console.log("nodes:", nodes);
    const [texture1, texture2, texture3, texture4, texture5, texture6, texture7, texture8, texture9] = useLoader(TextureLoader, [img1, img2, img3, img4, img5, img6, img7, img8, img9]);
    

    // Ensure the texture is applied without distortion
    texture9.wrapS = THREE.RepeatWrapping;
    texture9.wrapT = THREE.RepeatWrapping;
    texture9.repeat.set(4, 4);
    const customMaterials = useRef([
        new THREE.MeshStandardMaterial({ map: texture1 }),
        new THREE.MeshStandardMaterial({ map: texture2 }),
        new THREE.MeshStandardMaterial({ map: texture3 }),
        new THREE.MeshStandardMaterial({ map: texture4 }),
        new THREE.MeshStandardMaterial({ map: texture5 }),
        new THREE.MeshStandardMaterial({ map: texture6 }),
        new THREE.MeshStandardMaterial({ map: texture7 }),
        new THREE.MeshStandardMaterial({ map: texture8 }),
        new THREE.MeshStandardMaterial({ map: texture9 })
    ]);




    const { camera } = useThree();
    // useEffect(() => {
    //   // Zoom out by increasing the field of view (fov)
    //   camera.fov = 45; // Increase this value to zoom out
    //   camera.updateProjectionMatrix();
    // }, [camera]); // Get access to the camera

    // Set initial camera position




    const handleMaterialChange = (index) => {
        // Update indeximg
        if (index >= 8) index = 0;
        setIndeximg(index);

    };
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

    return (
        <>
            

            <group ref={group} dispose={null}>
        {Object.keys(nodes).map((key) => (
          <mesh
            key={key}
            castShadow
            receiveShadow
            geometry={nodes[key].geometry}
            material={fabricmaterial[fabricIndex]}
          />
        ))}
      </group>
        </>
    );
};
