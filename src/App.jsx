import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import First from "./First"
import About from "./pages/About"
import Game from "./pages/Game"

const router = createBrowserRouter([
  {
    path: '/',
    element: <First />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/game",
        element: <Game />
      },

    ]
  }
])


function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App