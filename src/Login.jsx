import { Button } from '@material-ui/core'
import { auth, provider } from './firebase'
import React from 'react'
import './Login.css'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'
function Login() {
    const dispatch = useDispatch()
    const signIn = () => {
        auth.signInWithPopup(provider).catch(err => console.log(err.message))
    }
    const signInTest = () => {
        dispatch(login({
            uid : 'testuser_id',
            photo : 'https://dbcms.s3.amazonaws.com/devbridgecom/bcms/image/2e55fef562634550bcdf79ce4ec8e947/testing_860.jpg',
            email : 'test@email.com' ,
            name : 'Test User'
          }))
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://discord.com/assets/94db9c3c1eba8a38a1fcf4f223294185.png" alt="discord-logo"/>
            </div>
            <Button onClick={signIn}>Sign In With Google</Button>
            <Button onClick={signInTest}>Test Mode Sign In</Button>
        </div>
    )
}

export default Login
