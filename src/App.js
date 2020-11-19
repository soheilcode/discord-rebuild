import React , {useEffect, useState} from 'react';
import  {useSelector , useDispatch} from 'react-redux'
import {selectUser} from './features/userSlice'
import './App.css';
import Chat from './Chat'
import Sidebar from './Sidebar';
import Login from './Login'
import { auth } from './firebase';
import {login , logout} from './features/userSlice'
import Servers from './Servers'
import { selectChannelId } from './features/channelSlice';


function App() {

  //redux stuff
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const channelId = useSelector(selectChannelId)

  //watch window width , if < 700 mobile is true
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
          setWidth(window.innerWidth);
      }
  useEffect(() => {
          window.addEventListener('resize', handleWindowSizeChange);
          return () => {
              window.removeEventListener('resize', handleWindowSizeChange);
          }
      }, []);
  let mobile = width < 700

  //watch auth and save to redux
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      
      if(authUser) {
        dispatch(login({
          uid : authUser.uid ,
          photo : authUser.photoURL ,
          email : authUser.email ,
          name : authUser.displayName
        }))
        
      }else {
        dispatch(logout())
      }
    })
  
  }, [dispatch])

  return (
    <div className="app">
 
      {
        user ? (
          <>
            {
              mobile ?
              (channelId ? <Chat/> : 
              <>
                <Servers />
                <Sidebar />
              </>)
              :
              (<>
                <Servers />
                <Sidebar />
                <Chat />
              </>)
            }        
          </>
        ) : (
          <Login />
        )
      }

      
    </div>
  );
}

export default App;
