import React from 'react'
import './ChatHeader.css'
import NotificationsIcon from '@material-ui/icons/Notifications';
import RoomIcon from '@material-ui/icons/Room';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SearchIcon from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import HelpIcon from '@material-ui/icons/Help';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setChannelId } from './features/channelSlice';
function ChatHeader({name}) {
    const dispatch = useDispatch()
    const clearChannel = () => {
        dispatch(setChannelId({
            channelId : null ,
            channelName : null
        }))
    }
    return (
        <div className="chatHeader">
            <div className="chatHeaderLeft">
                <IconButton onClick={clearChannel}>
                    <ClearIcon htmlColor="gray"/>
                </IconButton>
                <h3><span className="chatHeaderLeft__hash">#</span>{name}</h3>
            </div>
            <div className="chatHeaderRight">
                <NotificationsIcon />
                <RoomIcon />
                <SupervisedUserCircleIcon/>
                <div className="chatHeader__search">
                    <input type="text" name="" placeholder="Search" id=""/>
                    <SearchIcon />
                </div>
                    <SendIcon/>
                    <HelpIcon />
            </div>
        </div>
    )
}

export default ChatHeader
