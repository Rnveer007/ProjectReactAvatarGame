import { useEffect, useState } from "react";
import groot from "./assets/groot.png";
import ironman from "./assets/ironman.jpg";
import thor from "./assets/thor.png";

function App() {
  const [screen, setScreen] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [score, setScore] = useState(0);
  const [generatedImages, setGeneratedImages] = useState([]);
  console.log(generatedImages)

  function handleClick(src) {
    setSelectedAvatar(src);
    setScreen((prev) => prev + 1);
  }

  useEffect(() => {
    let interval;
    if (screen === 3 && selectedAvatar) {
      interval = setInterval(() => {
        setGeneratedImages((prevImages) => [
          ...prevImages,
          {
            id: Date.now(),
            x: getARandomNumber("x") + "px",
            y: getARandomNumber("y") + "px",
          },
        ]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [screen, selectedAvatar]);

  function getARandomNumber(axis) {
    return axis === "x"
      ? Math.floor(Math.random() * 1000)
      : Math.floor(Math.random() * 400);
  }

  return (
    <div className="h-screen flex items-center justify-center relative">
      {/* Screen 1: Start Game */}
      {screen === 1 && (
        <div className="screen1 ">
          <button onClick={() => setScreen((prev) => prev + 1)}
            className="border-2 py-1 cursor-pointer bg-red-500 text-white px-3 mt-10 "
          >
            Start Game
          </button>
        </div>
      )}

      {/* Screen 2: Select Avatar */}
      {screen === 2 && (
        <div className="screen2">
          <h3 className="text-center my-5 font-bold">Select Your Avatar</h3>
          <div className="avatar-wrapper flex justify-center gap-10 pt-10">
            <img
              onClick={(e) => handleClick(e.target.src)}
              className="avatar w-[200px] cursor-pointer"
              src={groot}
              alt="GROOT"
            />
            <img
              onClick={(e) => handleClick(e.target.src)}
              className="avatar w-[200px] cursor-pointer"
              src={ironman}
              alt="IRONMAN"
            />
            <img
              onClick={(e) => handleClick(e.target.src)}
              className="avatar w-[200px] cursor-pointer"
              src={thor}
              alt="THOR"
            />
          </div>
        </div>
      )}

      {/* Screen 3: Gameplay */}
      {screen === 3 && (
        <div className="screen3 absolute top-10 left-10">
          <div className="info">
            <p>Time Left: <span></span></p>
            <p>Score: <span>{score}</span></p>
          </div>
          <div className="playingArea mt-10">
            {generatedImages.map((image, index) => (
              <img
                className="killShot w-[150px]"
                key={index}
                src={selectedAvatar}
                alt="IMAGE"
                style={{ left: image.x, top: image.y }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;