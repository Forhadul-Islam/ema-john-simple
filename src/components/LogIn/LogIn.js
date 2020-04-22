import React from 'react';
import Auth from './useAuth';
import './LogIn.css'
import { useState } from 'react';


const LogIn = () => {
    const auth = Auth();

    const signInForm = () => {

    }
    const handleSignIn = () => {
        auth.signInWithGoogle()
            .then(res => {
                window.location.pathname = "/review"
            })
    }

    const [user, setUser] = useState({
        name: '',
        email: '',
        photo: '',
        existingUser: false
    })
    const handleSwitch = (event) => {
        const createUser = { ...user }
        createUser.existingUser = event.target.checked;
        setUser(createUser)
    }


    return (
        <div id="loginContainer">

            <div>
                <label style={{
                    color: "#f09603", fontSize: "18px", fontWeight: "bold"
                }} htmlFor="switch">
                    Already have an account?
                    <input onChange={handleSwitch} type="checkbox" name="logIn" id="switch" />
                  LogIn
                 </label>
                <form style={{ display: user.existingUser ? "block" : "none" }} action={signInForm}>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" placeholder="Enter your email" />
                    <br />
                    <label htmlFor="password">password: </label>
                    <input type="password" id="password" placeholder="password" />
                    <br />
                    <input type="checkbox" id="rememberCheck" /> <label htmlFor="rememberCheck">Remember me</label>
                    <br />
                    <input className="logInBtn" type="submit" value="Log in" />
                </form>
                <form style={{ display: user.existingUser ? "none" : "block" }} action={signInForm}>
                    <label htmlFor="name">User name: </label>
                    <input type="text" id="name" placeholder="Enter your name" />
                    <br />
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" placeholder="Enter your email" />
                    <br />
                    <label htmlFor="password">password: </label>
                    <input type="password" id="password" placeholder="password" />
                    <br />
                    <input className="logInBtn" type="submit" value="Create Account" />
                </form>

                <div>

                    {auth.user ? <button className="logInBtn" onClick={auth.signOut}>Sign Out </button> :
                        <div><p className="or">Or</p> <button className="logInBtn" onClick={handleSignIn}>Sign in with google</button></div>
                    }
                </div>
            </div>
        </div >
    );
};

export default LogIn;