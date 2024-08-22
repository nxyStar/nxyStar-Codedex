import { useState } from 'react'
import './App.css'
import './ColourPicker.css'

function App() {

  const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
  const [focusedIndex, setFocusedIndex] = useState(null);
    
  const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
  ];

  function handleClick(color) {
    console.log("color: ",color);
    setSelectedColor(color);
  }

  function handleMouseEnter(colorHex) {
    setSelectedColor({
      ...selectedColor,
      name: "",
      hex: colorHex
    })
  }

  function handleMouseLeave() {
    setSelectedColor({
      ...selectedColor,
      name: ""
    })
  }
  
  function handleFocus(index) {
    setFocusedIndex(index);
  }

  function handleBlur() {
    setSelectedColor({
      ...selectedColor,
      name: null,
    })
  }

  function handleKeyDown(e, index) {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(colors[index]);
    }
    console.log("handleKeyDown",e.key);
    let newIndex = 0;
    if (e.key === "ArrowLeft") {
      console.log("left");
      if (index == 0){
        newIndex = index + 5;
        setFocusedIndex(newIndex);
        console.log("selected color: ",colors[newIndex]);
        handleClick(colors[newIndex]);
      } else {
        newIndex = index - 1;
        setFocusedIndex(newIndex);
        console.log("selected color: ",colors[newIndex]);
        handleClick(colors[newIndex]);
      }
    }
    if (e.key === "ArrowRight") {
      if (index == 5){
        setFocusedIndex(newIndex);
        console.log("selected color: ",colors[newIndex]);
        handleClick(colors[newIndex]);
      } else {
        newIndex = index + 1;
        setFocusedIndex(index + 1);
        console.log("selected color: ",colors[newIndex]);
        handleClick(colors[newIndex]);
      }
    }
  }

  return (
    <>
    <div className="color-picker">
      <h1>Color Picker</h1>
      <div className="color-list">
      {colors.map((color, index) => (
        <div
          key={index}
          className={`color-item ${focusedIndex === index ? 'focused' : ''}`}
          style={{ backgroundColor: color.hex }}
          onClick={() => handleClick(color)}
          onMouseEnter={() => handleMouseEnter(color.hex)}
          onMouseLeave={handleMouseLeave}
          onFocus={() => handleFocus(index)}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, focusedIndex)}
          tabIndex={0}
        >
          {selectedColor.hex === color.hex && (
            <span className="color-code">{selectedColor.name || color.hex}</span>
          )}
        </div>
      ))}
      </div>
    </div>
    </>
  );

  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App