import './App.css'
import { useState, useEffect } from 'react'
import GamePage from './GamePage'
import NavBar from './Navbar'
import LoadGame from '../services/LoadGame'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SignIn, SignOut, useAuthentication } from '../services/authService'
import { createNewGame, fetchGames } from '../services/gameService'
import Location from '../containers/Location'

function App() {
  const user = useAuthentication()
  const [games, setGames] = useState([])
  const [game, setGame] = useState(null)
  const [newGame, setNewGame] = useState(false)

  useEffect(() => {
    if (user) {
      fetchGames().then(setGames)
    }
  }, [user])

  useEffect(() => {}, [games])

  // TODO: Future feature
  function addGame({ title }) {
    createNewGame({ title }).then(game => {
      setGame(game)
      setGames([game, ...games])
      setNewGame(false)
    })
  }

  return (
    <div className="App">
      {!user ? '' : <NavBar />}
      {!user ? <SignIn /> : <SignOut />}
      {!user ? '' : <GamePage username={user?.displayName} />}
      {!user ? '' : <LoadGame games={games} setGame={setGame} />}

      <Router>
        <Routes>
          <Route
            path="/corner"
            element={
              <Location
                mainText="You are standing in the corner. There are a few students in deep conversation."
                enableJoke={true}
                nextLink="/couch"
              />
            }
          />
          <Route
            path="/couch"
            element={
              <Location
                mainText="You are standing by the couches. Julian is explaining code on the whiteboard."
                enableAlert={true}
                alertText="A frog"
                nextLink="/server"
              />
            }
          />
          <Route
            path="/server"
            element={
              <Location
                mainText="You are standing by the server. There are a lot of people in this area of the lab. Homework is probably due soon."
                nextLink="/coffee-table"
              />
            }
          />
          <Route
            path="/coffee-table"
            element={
              <Location
                mainText="You are standing by the coffee table. The putting green is to your left, and there is a tea bag next to the empty kettle."
                nextLink="/"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
