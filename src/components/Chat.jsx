import { Avatar, IconButton } from '@mui/material'
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { db } from '../firebase';
import { StateContext } from '../context/StateProvider'
import firebase from 'firebase/compat/app';

function Chat() {
    const [input, setInput] = useState('')
    const [seed, setSeed] = useState('')
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const { roomId } = useParams()
    const [{ user }, dispatch] = useContext(StateContext)

    useEffect(() => {
      if(roomId) {
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
          setRoomName(snapshot.data().name)
        ))
        setSeed(Math.floor(Math.random() * 5000))

        db.collection('rooms').doc(roomId).collection('messages')
        .orderBy('timestamp', 'asc').onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()))
        })
      }
    },[roomId])


    const sendMessage = (e) => {
      e.preventDefault()
      db.collection('rooms').doc(roomId).collection('messages').add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('')
    }

  return (
    <div className='chat'>
        <div className="chat-header">
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
          <div className="chat-header-info">
              <h3>{roomName}</h3>
              <p>Last seen at {" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toLocaleTimeString()}
              </p>
          </div>
          <div className="chat-header-right">
              <IconButton>
                <SearchOutlinedIcon />
              </IconButton>
              <IconButton>
                <AttachFileOutlinedIcon />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
          </div>
        </div>
        <div className="chat-body">
          {messages.map(message => (
            <p className={`chat-message ${message.name === user.displayName && 'chat-reciever'}`}>
            <span className='chat-name'>{message.name}</span>
              {message.message}
              <span className="chat-timestamp">
                {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
              </span>
            </p>
          ))}
        </div>
        <div className="chat-footer">
          <InsertEmoticonIcon />
          <form>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message"/>
            <button onClick={sendMessage} type='submit'>Send a message</button>
          </form>
          <MicIcon />
        </div>
    </div>
  )
}

export default Chat