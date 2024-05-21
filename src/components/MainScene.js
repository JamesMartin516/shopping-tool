import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Trousers } from './Trousers';
import { Joggers } from './Joggers';
import { Teeshirt } from './Teeshirt';
import { Shorts } from './Shorts';
import { Tooltip} from 'react-tooltip';
import Slider from 'react-slick';
import backimg from "./background.png"
import halfpointedright from "./Trouser fabric/half-pointed-right.png"
import halfpointedleft from "./Trouser fabric/half-pointed-left.png"
import pointedflapleft from "./Trouser fabric/pointed-flap-left.PNG"
import pointedflapright from "./Trouser fabric/pointed-flap-right.PNG"
import standardflapleft from "./Trouser fabric/standard-flap-left.png"
import standardflapright from "./Trouser fabric/standard-flap-right.png"
import nopocket from "./Trouser fabric/no-pocket.PNG"
function MainScenes() {
  const [selectedComponent, setSelectedComponent] = useState('Trousers');
  const [fabricIndex, setFabricIndex] = useState(0);
  const [styleIndex, setStyleIndex] = useState([true, false, false, false, false, false, false]);
  const [productType, setProductType] = useState('Trousers');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };
  let index = 0;

  // Function to handle image selection
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    setProductType(component);
  };

  function importAll(r) {
    return r.keys().map(r);
  }

  const selectFabric = (index, img) => {
    console.log('selectFabric', index);
    setFabricIndex(index);
    setImage(img)
  };
  const debounce = (func, delay) => {
    let timeoutId;
    
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  
  useEffect(() => {
    const handleResize = () => {
      // Your resize logic here
    };

    const debouncedHandleResize = debounce(handleResize, 100); // Adjust debounce delay as needed

    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);
  const a = new Array(7).fill(false);

  const handleStyleChange = (number) => {
    console.log("number:", number);
    for (let j = 0; j < 7; j++) {
      a[j] = false;
    }
    a[number] = true;
    setStyleIndex(a);
  };

  const images = importAll(require.context('./Trouser fabric', false, /\.jpg$/));
  return (
    <div className="flex h-full">
      {/* Canvas Container */}
      <div className="flex-grow lg:w-[80%] md:w-[70%] w-[60%] bg-[#141720]">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }}>
          <directionalLight
            position={[0, -1000, -1000]}
            intensity={0.1}

          />
          <directionalLight
            position={[0, 1000, 1000]}
            intensity={0.1}
          />
          <Suspense fallback={null}>
            {selectedComponent === 'Trousers' && <Trousers fabricIndex={fabricIndex} styleIndex={styleIndex} />}
            {selectedComponent === 'Joggers' && <Joggers />}
            {selectedComponent === 'Teeshirt' && <Teeshirt fabricIndex={fabricIndex} />}
            {selectedComponent === 'Shorts' && <Shorts fabricIndex={fabricIndex} />}
            <Environment preset="city" />
            <ContactShadows
              rotation-x={Math.PI / 2}
              position={[0, -0.8, 0]}
              opacity={0.25}
              width={10}
              height={10}
              blur={1.5}
              far={0.8}
            />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
      <div className="lg:w-[25%] md:w-[30%] w-[35%] overflow-hidden shadow-white shadow-lg" style={{ backgroundImage: `url(${backimg})`, backgroundSize: 'cover' }}>
        <div className="flex justify-center items-center mt-12 mb-12">
          <button className="justify-center glowing-btn h-[80px] w-[85%]">
            <div className='lg:flex md:flex'>
              <span className=" font-[50px]">Online</span>
              <span>Shop</span>
            </div>
          </button>
        </div>
        <div className="dropdown z-10 mt-[100px]">
          <label htmlFor="dropdown" className="dropdown-btn  opacity-80">
            <span className="flex justify-center">{productType}</span>
            <span className="arrow"></span>
          </label>
          <ul className="dropdown-content opacity-90" role="menu">
            <li><button onClick={() => handleComponentChange('Trousers')} className="w-[100%] h-12  text-white">Trousers</button></li>
            <li><button onClick={() => handleComponentChange('Joggers')} className="w-[100%] h-12 text-white">Joggers</button></li>
            <li><button onClick={() => handleComponentChange('Teeshirt')} className="w-[100%] h-12 text-white">Teeshirts</button></li>
            <li><button onClick={() => handleComponentChange('Shorts')} className="w-[100%] h-12 text-white">Shorts</button></li>
          </ul>
        </div>

        <div className="border-solid border-2 opacity-80 bg-[#1E222A] border-[#A6A6A6] h-100 mx-5 p-5 rounded-md flex flex-col mt-[50px]">
          <article className="text-white flex justify-center text-[28px] mb-5 mt-4 glowing-title font-bold">FABRIC SELECTION</article>

          <div className="border-solid border-2 bg-[#1E222A] border-[#a89e9e] mx-1 rounded-md inline-flex overflow-clip overscroll-x-auto">

            {images.map((img, index) => (
              <button key={index} onClick={() => selectFabric(index, img)} className='h-[50px] w-[300px]' >
                <img src={img} alt={`Image ${index + 1}`} className='h-[100px] w-[100px]' />
                {console.log(index)}
              </button>
            ))}

          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />


        </div>

        <div className="flex border-solid border-2 opacity-80 bg-[#1E222A] border-[#A6A6A6] h-100 mx-5 mt-[20px] p-5 rounded-md flex-col h-[460px]">

          <article className="text-white flex items-center justify-center text-[28px] mb-5 mt-4 glowing-title font-bold">Style  Option</article>
          <div className='grid grid-cols-3 grid-rows-4 items-center'>
            <div className="text-white text-[13px]" >STANDARD FLAP</div>
            <label className="container text-white" data-tooltip-id="my-tooltip-left" data-tooltip-place="top">
              Right
              <input type="radio" name="flap" onChange={() => handleStyleChange(0)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-tooltip-left" className='opacity-100' >
            <div>
    <img src={halfpointedright} alt="Cat" />
    <span>Tooltip Text</span>
  </div>
            </Tooltip>
            <label
              className="container text-white"
              data-tooltip-id="my-tooltip-right"
              data-tooltip-html={`<img src="${halfpointedleft}" alt="Cat"/>`}
              data-tooltip-content="Left Flap"
              data-tooltip-place="top"
            >
              Left
              <input type="radio" name="flap" onChange={() => handleStyleChange(1)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-tooltip-right" className="opacity-100">
              <img src={halfpointedleft} alt="Cat" />
            </Tooltip>
            <div className="text-white text-[13px] mt-[10px]">HALF POINTED</div>
            <label className="container text-white  mt-[10px]">Right
              <input type="radio" name="flap" onChange={() => handleStyleChange(2)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-tooltip" className='opacity-100' >
              <img src={halfpointedleft} alt="Cat" />
            </Tooltip>
            <label className="container text-white   mt-[10px]">Left
              <input type="radio" name="flap" onChange={() => handleStyleChange(3)} />
              <span className="checkmark"></span>
            </label>
            <Tooltip id="my-tooltip" className='opacity-100' >
              <img src={halfpointedleft} alt="Cat" />
            </Tooltip>
            <div className="text-white text-[13px]  mt-[10px]">POINTED FLAP</div>
            <label className="container text-white  mt-[10px]">Right
              <input type="radio" name="flap" onChange={() => handleStyleChange(4)} />
              <span className="checkmark"></span>
            </label>
            <label className="container text-white mt-[10px]">Left
              <input type="radio" name="flap" onChange={() => handleStyleChange(5)} />
              <span className="checkmark"></span>
            </label>
            <div className="text-white mt-[10px]">NO</div>
            <label className="container text-white mt-[10px]">NO
              <input type="radio" name="flap" onChange={() => handleStyleChange(8)} />
              <span className="checkmark"></span>
            </label>
            <span></span>
            <div className="text-white text-[13px] mt-[10px]">TICKET POCKET</div>
            <label className="container text-white mt-[10px]">Horizontal
              <input type="radio" name="ticket" onChange={() => handleStyleChange(6)} />
              <span className="checkmark"></span>
            </label>
            <label className="container text-white mt-[10px]">Vertical
              <input type="radio" name="ticket" onChange={() => handleStyleChange(7)} />
              <span className="checkmark"></span>
            </label>

          </div>
          <div className='grid grid-cols-4 grid-rows-2 flex items-center'>
            <div className="text-white text-[13px] mt-[10px]">BOTTOM STYLE</div>
            <label className="container text-white text-[8px] mt-[10px]">T-3620
              <input type="radio" name="bottom" onChange={() => handleStyleChange(9)} />
              <span className="checkmark"></span>
            </label>
            <label className="container text-white mt-[10px]">T-3621
              <input type="radio" name="bottom" onChange={() => handleStyleChange(10)} />
              <span className="checkmark"></span>
            </label>
            <label className="container text-white mt-[10px]">T-362A
              <input type="radio" name="bottom" onChange={() => handleStyleChange(11)} />
              <span className="checkmark"></span>
            </label>
            <div className="text-white text-[13px] mt-[10px]">CUFF STYLE</div>
            <label className="container text-white text-[8px] mt-[10px]">T-3605
              <input type="radio" name="bottom" onChange={() => handleStyleChange(12)} />
              <span className="checkmark"></span>
            </label>
            <label className="container text-white mt-[10px]">T-3606
              <input type="radio" name="bottom" onChange={() => handleStyleChange(13)} />
              <span className="checkmark"></span>
            </label>
            <label className="container text-white mt-[10px]">T-3627
              <input type="radio" name="bottom" onChange={() => handleStyleChange(14)} />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>


      </div>
    </div>
  );
}

export default MainScenes;