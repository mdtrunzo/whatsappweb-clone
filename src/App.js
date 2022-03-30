import { useContext } from 'react'
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { StateContext } from './context/StateProvider'

function App() {
  const [{ user }, dispatch ] = useContext(StateContext)
  
  return (
    <Router>
      <div className="app">
         {!user ? (
            <Login />
         ): (
           <div className="app-body">
             <Sidebar />
                 <Routes>
                   <Route path="/rooms/:roomId" element={<Chat />} />
                   <Route path="/" element={<Chat />} />
                 </Routes>
             </div>
         )}
      </div>
    </Router>
  )
}

export default App;
