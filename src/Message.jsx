import { Avatar } from '@material-ui/core'
import React from 'react'
import './Message.css'
function Message({text , photo , timestamp , username}) {
    return (
        <div className="message">
            <Avatar className="message__avatar" src={photo}/>
            <div className="message__info">
                <h4>
                    {username}
                    <span className="message__timestamp">{timestamp && timestamp.toDate().toUTCString().slice(17,22)}</span>
                </h4>
                <p className="message__message">{text}</p>
            </div>
        </div>
    )
}

export default Message
