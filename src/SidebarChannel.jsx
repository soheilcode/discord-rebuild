import React from 'react'
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import './SidebarChannel.css'
function SidebarChannel({name , voice}) {
    return (
        <div className="sidebarChannel">
            <h4><span className="sidebarChannel__hash">{!voice ? '#' : <VolumeUpIcon />}</span>{name}</h4>
        </div>
    )
}

export default SidebarChannel
