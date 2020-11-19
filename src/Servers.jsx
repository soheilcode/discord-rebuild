import React from 'react'
import './Servers.css'
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import db from './firebase';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setServerId } from './features/serverSlice';
function Server({name , img , tag }) {

    return (
        <div className={tag ? "server server__add" : "server"}>
            <h5 className="server__name">{typeof(name) == 'string' && name.substring(0,2)}</h5>
            {
                img && <img src={img} style={{objectFit : "contain" , width : "75%" }} alt=""/>
            }

            {
                tag && tag
            }
        </div>
    )
}


function Servers() {
    const dispatch = useDispatch() ; 
    const [servers , setServers] = useState([])
    const [serverName , setServerName] = useState('')
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleCreate = () => {
      if(serverName) {
        console.log(serverName);
        handleClose() ; 
        db.collection('servers').add({
          serverName : serverName 
        })
      }
      setServerName(null) ;
    }
    useEffect(() => {
      db.collection('servers').onSnapshot(shot => {
        setServers(shot.docs.map(doc => ({
          id : doc.id ,
          serverInfo : doc.data()
        })))

        dispatch(setServerId({
          serverId : shot.docs[0]?.id ,
          serverName : shot.docs[0]?.data().serverName
        }))
      })
    } , [dispatch])

    const changeServer = (server) => {
      dispatch(setServerId({
        serverId : server.id ,
        serverName : server.serverInfo.serverName
      }))
      
    }
    return (
        
        <div className="servers">
            <Server alt="svgImg" img="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzg0IiBoZWlnaHQ9IjM4NCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMDAwMDAwOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjZmZmZmZmIj48cGF0aCBkPSJNMTQyLjk4OTMzLDQwLjY0OTMzYy0xMy42NDUzMywtMTAuOTcyMTcgLTM1LjIzMTMzLC0xMi44MjgzMyAtMzYuMTQ4NjcsLTEyLjkwNzE3Yy0xLjQ0MDUsLTAuMTIxODMgLTIuODA5MzMsMC42OTUxNyAtMy4zOTcsMi4wMTM4M2MtMC4wNDMsMC4wODYgLTAuNTE2LDEuMTY4MTcgLTEuMDM5MTcsMi44NTIzM2M5LjAyMjgzLDEuNTE5MzMgMjAuMTA5NjcsNC41ODY2NyAzMC4xNDMsMTAuODE0NWMxLjYwNTMzLDAuOTk2MTcgMi4wOTk4MywzLjExMDMzIDEuMTAzNjcsNC43MjI4M2MtMC42NDUsMS4wNDYzMyAtMS43NzAxNywxLjYxOTY3IC0yLjkxNjgzLDEuNjE5NjdjLTAuNjE2MzMsMCAtMS4yMzk4MywtMC4xNjQ4MyAtMS44MDYsLTAuNTE2Yy0xNy4yNDMsLTEwLjY5MjY3IC0zOC43ODYsLTExLjIzMDE3IC00Mi45MjgzMywtMTEuMjMwMTdjLTQuMTQyMzMsMCAtMjUuNjkyNSwwLjUzNzUgLTQyLjkyMTE3LDExLjIzMDE3Yy0xLjYxMjUsMS4wMDMzMyAtMy43MTk1LDAuNTAxNjcgLTQuNzIyODMsLTEuMTAzNjdjLTEuMDAzMzMsLTEuNjEyNSAtMC41MDE2NywtMy43MTk1IDEuMTAzNjcsLTQuNzIyODNjMTAuMDMzMzMsLTYuMjIwNjcgMjEuMTEzLC05LjI5NTE3IDMwLjE0MywtMTAuODE0NWMtMC41MzAzMywtMS42OTEzMyAtMS4wMDMzMywtMi43NjYzMyAtMS4wMzkxNywtMi44NTIzM2MtMC41OTQ4MywtMS4zMTg2NyAtMS45NTY1LC0yLjE1IC0zLjQwNDE3LC0yLjAwNjY3Yy0wLjkxMDE3LDAuMDcxNjcgLTIyLjQ5NjE3LDEuOTI3ODMgLTM2LjMyNzgzLDEzLjA1NzY3Yy03LjIyNCw2LjY3MjE3IC0yMS42NjQ4Myw0NS43MTYxNyAtMjEuNjY0ODMsNzkuNDcxMTdjMCwwLjU5NDgzIDAuMTU3NjcsMS4xODI1IDAuNDUxNSwxLjY5ODVjOS45Njg4MywxNy41MDgxNyAzNy4xNTkxNywyMi4wOTQ4MyA0My4zNTgzMywyMi4yOTU1YzAuMDM1ODMsMCAwLjA3MTY3LDAgMC4xMDc1LDBjMS4wOTY1LDAgMi4xMjg1LC0wLjUyMzE3IDIuNzczNSwtMS40MTE4M2w2LjI3MDgzLC04LjYxNDMzYy0xNi45MDYxNywtNC4zNzE2NyAtMjUuNTQyLC0xMS43ODkxNyAtMjYuMDQzNjcsLTEyLjIyNjMzYy0xLjQxOSwtMS4yNTQxNyAtMS41NTUxNywtMy40MTg1IC0wLjMwMSwtNC44Mzc1YzEuMjU0MTcsLTEuNDE5IDMuNDExMzMsLTEuNTU1MTcgNC44MzAzMywtMC4zMDgxN2MwLjIwNzgzLDAuMTg2MzMgMTYuMTEwNjcsMTMuNjgxMTcgNDcuMzg2LDEzLjY4MTE3YzMxLjMzMjY3LDAgNDcuMjM1NSwtMTMuNTUyMTcgNDcuMzkzMTcsLTEzLjY4ODMzYzEuNDE5LC0xLjIzMjY3IDMuNTgzMzMsLTEuMTAzNjcgNC44MzAzMywwLjMyMjVjMS4yNDcsMS40MTkgMS4xMTA4MywzLjU3NjE3IC0wLjMwMSw0LjgyMzE3Yy0wLjUwMTY3LDAuNDQ0MzMgLTkuMTM3NSw3Ljg1NDY3IC0yNi4wNDM2NywxMi4yMjYzM2w2LjI3MDgzLDguNjE0MzNjMC42NDUsMC44ODg2NyAxLjY3NywxLjQxMTgzIDIuNzczNSwxLjQxMTgzYzAuMDM1ODMsMCAwLjA3MTY3LDAgMC4xMDc1LDBjNi4xOTkxNywtMC4xOTM1IDMzLjM4OTUsLTQuNzgwMTcgNDMuMzU4MzMsLTIyLjI5NTVjMC4yODY2NywtMC41MTYgMC40NDQzMywtMS4wOTY1IDAuNDQ0MzMsLTEuNjkxMzNjMCwtMzMuNzU1IC0xNC40NDA4MywtNzIuNzk5IC0yMS44NDQsLTc5LjYyODgzek02My43MTg4MywxMDYuNTY4MzNjLTYuNjIyLDAgLTExLjk5NywtNi4xNDE4MyAtMTEuOTk3LC0xMy43MDk4M2MwLC03LjU2OCA1LjM2NzgzLC0xMy43MDk4MyAxMS45OTcsLTEzLjcwOTgzYzYuNjI5MTcsMCAxMS45OTcsNi4xNDE4MyAxMS45OTcsMTMuNzA5ODNjMCw3LjU2OCAtNS4zNjc4MywxMy43MDk4MyAtMTEuOTk3LDEzLjcwOTgzek0xMDguMjgxMTcsMTA2LjU2ODMzYy02LjYyMiwwIC0xMS45OTcsLTYuMTQxODMgLTExLjk5NywtMTMuNzA5ODNjMCwtNy41NjggNS4zNjc4MywtMTMuNzA5ODMgMTEuOTk3LC0xMy43MDk4M2M2LjYyMiwwIDExLjk5Nyw2LjE0MTgzIDExLjk5NywxMy43MDk4M2MwLDcuNTY4IC01LjM3NSwxMy43MDk4MyAtMTEuOTk3LDEzLjcwOTgzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>
            {
              servers.map(server => (
                <div onClick={() => changeServer(server)}>
                  <Server key={server.id} name={server.serverInfo.serverName}/>
                </div>
              ))
            }
            <div onClick={handleOpen}>

            <Server tag={<AddIcon htmlColor="#43B581"/>} />
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
        <h2 className="serverModal__title">Create your server</h2>
        <p style={{textAlign : "center" , color : "gray" , fontSize : "15px" , margin : "10px" , fontWeight:"350"}}>
          Give your server personality with a name.
        </p>

        </div>
        <div style={{display : 'flex' , flexDirection : 'column'}}>
        <p style={{fontSize : '11px' , color : 'gray' , fontWeight : '700' , paddingBottom : '10px'}}>SERVER NAME</p>

        <input type="text" name="" id="" style={{width : '100%' , height : '35px' , border : "1px solid #bfbfbf" , outline: 'none'}} value={serverName} onChange={(e) => {setServerName(e.target.value)}}/>
      
        <button  style={{backgroundColor : '#677BC5' , padding : '13px 30px' , border : 'none' , borderRadius : '3px' , color : 'white' , fontWeight : '550' , alignSelf : 'flex-end' , margin : '20px 0px'}}
        onClick={handleCreate}
        >Create</button>

 
        </div>
    
      </div>
      </Modal>
        </div>
    )
}

export default Servers
