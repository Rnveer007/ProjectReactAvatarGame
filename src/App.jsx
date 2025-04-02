import { useEffect, useState } from "react";
import groot from "./assets/groot.png";
import hulk from "./assets/hulk.png";
import thor from "./assets/thor.png";

function App() {
  const [screen, setScreen] = useState(1);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [score, setScore] = useState(0);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [timer, setTimer] = useState(60)
  // console.log(score)

  function handleClick(src) {
    setSelectedAvatar(src);
    setScreen((prev) => prev + 1);
  }

  useEffect(() => {
    let interval;
    if (screen === 3 && selectedAvatar) {
      interval = setInterval(() => {

        setTimer(prevTime => {
          if (prevTime === 0) {
            clearInterval(interval);
            setGeneratedImages([]);
            return 0
          }

          return prevTime - 1;
        }
        )
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

  function handleDelete(id) {
    setGeneratedImages(generatedImages.filter((item) => item.id !== id))
    setScore(prevScore => prevScore + 1);
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
          <div className="avatar-wrapper flex justify-center gap-20 pt-10">
            <img
              onClick={(e) => handleClick(e.target.src)}
              className="avatar w-[200px] cursor-pointer object-cover"
              src={groot}
              alt="GROOT"
            />
            <img
              onClick={(e) => handleClick(e.target.src)}
              className="avatar w-[200px] cursor-pointer object-cover"
              src={hulk}
              alt="HULK"
            />
            <img
              onClick={(e) => handleClick(e.target.src)}
              className="avatar w-[200px] cursor-pointer object-cover"
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
            <p>Time Left: <span className="ml-3">{timer}</span></p>
            <p>Score: <span className="ml-3">{score}</span></p>
          </div>
          <div className="playingArea mt-10">
            {generatedImages.map((image, index) => (
              <img
                className="killShot w-[100px] my-10 absolute cursor-pointer"
                key={index}
                src={selectedAvatar}
                alt="IMAGE"
                style={{ left: image.x, top: image.y }}
                onClick={() => handleDelete(image.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;