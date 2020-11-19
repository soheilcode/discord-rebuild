import React from 'react'
import './Sidebar.css'
import {useDispatch, useSelector} from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChannel from './SidebarChannel'
import HeadsetIcon from '@material-ui/icons/Headset';
import MicIcon from '@material-ui/icons/Mic';
import SettingsIcon from '@material-ui/icons/Settings';
import {selectUser } from './features/userSlice';
import db, { auth } from './firebase';
import { selectServerId, selectServerName } from './features/serverSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import { setChannelId } from './features/channelSlice';
function Sidebar() {
    const dispatch = useDispatch()
    const [channels , setChannels] = useState([])
    const [channelName , setChannelName] = useState('')
    const [open , setOpen] = useState(false)
    const user = useSelector(selectUser)
    const serverId = useSelector(selectServerId)
    const serverName = useSelector(selectServerName)

    useEffect(() => {
        if(serverId) {

            db.collection('servers').doc(serverId).collection('channels').onSnapshot(shot => {
                setChannels(shot.docs.map(doc => ({
                    channelId : doc.id ,
                    channelName : doc.data().channelName
                })))
            })
        }
    }, [serverId])

    const handleClose = () => {
        setOpen(false)
    }
    const handleCreateChannel = () => {
        if(channelName) {
            db.collection('servers').doc(serverId).collection('channels').add({
                channelName : channelName
            })
            setChannelName(null)
            handleClose()
        }
    }
    const changeChannel = (channel) => {
        dispatch(setChannelId({
            channelId : channel.channelId ,
            channelName : channel.channelName
        }))
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>{serverName}</h3>
                <ExpandMoreIcon />
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                        <IconButton className="sidebar__addChannel" onClick={() => {
                            if(serverId) {
                                setOpen(true)
                            }
                            }}>
                        <AddIcon />
                        </IconButton>
                </div>
                <div className="sidebar__channelsList">
                    {
                        channels.map(channel => (
                                <div onClick={() => changeChannel(channel)}>
                                    <SidebarChannel key={channel.channelId} name={channel.channelName}/>
                                </div>
                        ))
                    }
                </div>
          
            </div>
            {/* <div className="sidebar__sidebarVoice">
                <div className="sidebarVoice--wrapper">
                <SignalCellularAltIcon fontSize="large" htmlColor="#4fb185"/>
                <div className="sidebar__voiceInfo">
                    <p>no functionality(not yet)</p>
                    <h4 style={{color : "#4fb185"}} >Voice Connected</h4>
                    <p style={{fontSize : "12px"}} >Stream</p>
                </div>

                </div>
                <div className="sidebar__sidebarVoiceIcons">
                    <InfoIcon />
                    <CallIcon />
                </div>
            </div> */}
                <div className="sidebar__profile">
                    <div className="sidebar__profileInfo">
                    <Avatar className="sidebar__profileAvatar" src={user.photo} onClick={() => {
                          auth.signOut() ;
                    }} />
                    <div>
                    <h3>{user.name}</h3>
                    <p style={{color : "lightgray" , fontSize: "12px"}} >#{user.uid.substring(0 , 5)}</p>

                    </div>
                    </div>
                    <div className="sidebar__profileIcons">
                        <MicIcon />
                        <HeadsetIcon />
                        <SettingsIcon />
                    </div>

                </div>
                <Modal
                open={open}
                onClose={handleClose}
            
            >
                <div style={{
                    top: `50%`,
                    left: `50%`,
                    transform: `translate(-50%, -50%)`,
                    position: 'absolute',
                    width: 350,
                    height:300,
                    backgroundColor: "white",
                    borderRadius : "5px" ,
                    padding : '20px' ,
                    outline : 'none' ,
                    display : "flex" ,
                    flexDirection : 'column',
                    justifyContent : "space-between"
                    

                    }} 
                >
                <div>
                <h2 className="serverModal__title">Add a new channel</h2>
                <p style={{textAlign : "center" , color : "gray" , fontSize : "15px" , margin : "10px" , fontWeight:"350"}}>
                Create a new channel on this server
                </p>

                </div>
                <div style={{display : 'flex' , flexDirection : 'column'}}>
                <p style={{fontSize : '11px' , color : 'gray' , fontWeight : '700' , paddingBottom : '10px'}}>CHANNEL NAME</p>

                <input type="text" name="" id="" style={{width : '100%' , height : '35px' , border : "1px solid #bfbfbf" , outline: 'none'}} value={channelName} onChange={(e) => {setChannelName(e.target.value)}}/>
            
                <button  style={{backgroundColor : '#677BC5' , padding : '13px 30px' , border : 'none' , borderRadius : '3px' , color : 'white' , fontWeight : '550' , alignSelf : 'flex-end' , margin : '20px 0px'}}
                onClick={handleCreateChannel}
                >Create</button>

        
                </div>
            
            </div>
            </Modal>
        </div>
    )
}

export default Sidebar
