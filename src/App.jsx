import { useEffect, useState } from 'react'
import groot from './assets/groot.png'
import ironman from './assets/ironman.jpg'
import thor from './assets/thor.png'


function App() {
  const [screen, SetScreen] = useState(1);
  const [imgUrl, setImgUrl] = useState("");
  const [imgArr, setImgArry] = useState([]);
  const [timer, setTimer] = useState(0);


  function handleStart(e) {
    SetStartGame(true)
    setImgUrl(e)
  }

  useEffect(() => {
    const interval = setInterval(() => {

      if (imgUrl) {
        const obj = { id: Date.now(), img: imgUrl };
        setImgArry(prevArr => [...prevArr, obj]);
        timer++
      }
      return clearInterval(interval)
    }, 1000);

  }, [imgUrl]);

  // console.log(imgArr)

  return (
    <>
      {screen === 1 &&
        <div>
          <h1>Start Game</h1>
        </div>}

      {screen === 2 &&
        <div className='my-30'>
          <div>Choose Your Avatar</div>
          <div className='flex gap-20 mt-20'>
            <div>
              <img src={groot} alt="" className='w-[200px] cursor-pointer' onClick={(e) => handleStart(e.target.src)} />
              <h1 className='cursor-pointer' >Groot</h1>

            </div>
            <div>
              <img src={ironman} alt="" className='w-[200px] h-[200px] cursor-pointer' onClick={(e) => handleStart(e.target.src)} />
              <h1 className='cursor-pointer' > Iron Man</h1>
            </div>
            <div>
              <img src={thor} alt="" className='w-[200px] cursor-pointer' onClick={(e) => handleStart(e.target.src)} />
              <h1 className='cursor-pointer' >Thor</h1>
            </div>
          </div>
        </div>}


      {/* <div>
        <h1>time {timer}</h1>
        <div>

        </div>
      </div> */}
    </>


  )
}

export default App