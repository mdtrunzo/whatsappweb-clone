import { Avatar, IconButton } from '@mui/material'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';
import { useState, useEffect, useContext} from 'react'
import { db } from '../firebase'
import { StateContext } from '../context/StateProvider'

function Sidebar() {
  const [rooms, setRooms] = useState([])
  const [{ user }, dispatch] = useContext(StateContext)

   useEffect(() => {
     db.collection('rooms').onSnapshot(snapshot => (
       setRooms(snapshot.docs.map(doc => (
         {
           id: doc.id,
           data: doc.data()
         }
       )))
     ))
   }, [])

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src={user?.photoURL}/>
        <div className="sidebar-header-right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton >
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <div className="sidebar-search-container">
          <SearchOutlinedIcon />
          <input type="text" placeholder='Search or start new chat'/>
        </div>
      </div>
      <div className="sidebar-chats">
        <SidebarChat addNewChat/>
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} /> 
        ))}
      </div>
    </div>
  )
}

export default Sidebar