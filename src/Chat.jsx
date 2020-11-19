import React , {useRef} from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './features/channelSlice';
import { useEffect } from 'react';
import db from './firebase';
import firebase from 'firebase'
import { selectServerId } from './features/serverSlice';
import { useState } from 'react';
import { selectUser } from './features/userSlice';
function Chat() {

    const [typed , setTyped] = useState('')
    const [height , setHeight] = useState(null)

    //redux
    const [messages , setMessages] = useState([])
    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName) 
    const serverId = useSelector(selectServerId)
    const user = useSelector(selectUser)

    //scroll to bottom logic
    const chatRef = useRef()
    const scrollToBottom = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
      }
      useEffect(() => {
          scrollToBottom()
      }, [messages]);




    //get height of window and set it to chat height 
    useEffect(() => {
        window.addEventListener('resize' , () => {
            setHeight(window.innerHeight)
        })
        return () => window.removeEventListener('resize' , () => {
            setHeight(window.innerHeight)
        })

    },[])

    //get messages for this channel
    useEffect(() => {
        if(channelId && serverId) {
            db.collection('servers').doc(serverId).collection('channels').doc(channelId).collection('messages').orderBy('timestamp' , 'asc').onSnapshot(shot => {
                setMessages(shot.docs.map(doc => ({
                    id : doc.id , 
                    text : doc.data().message ,
                    photo : doc.data().photo ,
                    timestamp : doc.data().timestamp ,
                    username : doc.data().username
                })))
            })
        }
    },[channelId , serverId])

    
    const sendMessage = (e) => {
        e.stopPropagation()
        e.preventDefault();
        if(channelId && serverId && typed) {
            db.collection('servers').doc(serverId).collection('channels').doc(channelId).collection('messages').add({
                message : typed ,
                photo : user.photo ,
                username : user.name ,
                timestamp : firebase.firestore.FieldValue.serverTimestamp()
                
            })
            setTyped("")
        }
    }
    
    return (
        <div className="chat" style={height ? {height : height} : {height : '100vh'}}>
            <ChatHeader name={channelName}/>
            <div className="chat__messages" id="chatDiv" ref={chatRef}>
                {
                    messages.map(message => (
                        <Message text={message.text} key={message.id} photo={message.photo} timestamp={message.timestamp} username={message.username}/>
                    ))
                }
            </div>
            <div className="chat__input">
                <AddCircleIcon fontSize="large" htmlColor="gray"/>

                <form className="chat__sendMessageForm" action="post" onSubmit={sendMessage}>
                    <input type="text" placeholder={`Message #${channelName}`} value={typed} onChange={(e) => {setTyped(e.target.value)}} disabled={channelId ? false : true}/>
                </form>

                <div className="chat__inputIcons">
                    <CardGiftcardIcon />
                    <GifIcon />
                    <EmojiEmotionsIcon />
                </div>
            </div>
        </div>
    )
}

export default Chat
