import React from 'react'
import { Button } from '@mui/material'
import { auth, provider } from '../firebase'
import { useContext } from 'react'
import { StateContext } from '../context/StateProvider'

function Login() {
    const [{}, dispatch] = useContext(StateContext)
    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: 'SET_USER',
                user: result.user
            })
        })
        .catch(err => console.log(err.message))
    }
  return (
    <div className='login'>
        <div className="login-container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Whatsapp_logo_svg.png/600px-Whatsapp_logo_svg.png" alt="" width="200"/>
            <div className="login-text">
               <h1>WhatsApp Web</h1> 
            </div>

            <Button onClick={signIn}>
                Sign In With Google
            </Button>
        </div>
    </div>
  )
}

export default Login