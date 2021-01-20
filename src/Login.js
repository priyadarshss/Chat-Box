import { Button } from '@material-ui/core'
import React from 'react'
import "./Login.css"
import Logo from "./Logo.png"
import { auth, provider} from "./firebase"
import { actionTypes } from './reducer'
import {useStateValue} from "./StateProvider"

function Login() {
    const [{}, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <div className="login">
            <div className="login_container">
                <img src={Logo} alt="" />
                
                <div className="login_text">
                    <h2>Sign-in to Chat Box</h2>
                </div>

                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
