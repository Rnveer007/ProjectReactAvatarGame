import { Link } from 'react-router-dom'


function Home() {
    return (
        <div>

            <button><Link to="/about">Start Game</Link></button>
        </div>
    )
}

export default Home