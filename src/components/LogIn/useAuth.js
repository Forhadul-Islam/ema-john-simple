import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);


const AuthContext = createContext();
export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}

export function PrivateRoute({ children, ...rest }) {
    const auth = useAuth()
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

const getUser = user => {
    const { displayName, email, photoURL } = user;
    return { name: displayName, email, photo: photoURL };
}



const Auth = () => {
    const [user, setUser] = useState(null)
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(res => {
                const signedInUser = getUser(res.user);
                setUser(signedInUser);
            })
            .catch(error => {
                error = error.message;
                setUser(null);
                return error;
            })
    }
    const signOut = () => {
        firebase.auth().signOut()
            .then(res => {
                setUser(null);
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const createUser = getUser(user);
                setUser(createUser);
                //console.log(createUser)
            } else {
                // No user is signed in.
            }
        });
    }, [])

    return {
        user,
        signInWithGoogle,
        signOut
    }
}

export default Auth;