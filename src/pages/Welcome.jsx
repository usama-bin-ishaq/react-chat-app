import React, { useEffect } from 'react'
//** mui
import { Box, Button, Typography } from '@mui/material'
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
//** components
import { auth } from "../config/firebase";
import { db } from '../config/firebase';
const Welcome = () => {
    const [user] = useAuthState(auth);
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log(result.user)
            // The signed-in user info.
            const { email, phoneNumber, photoURL, uid, displayName } = result.user;
            console.log(email, phoneNumber, photoURL, uid, displayName)
            const cityRef = doc(db, 'users', uid);
            setDoc(cityRef, { email, phoneNumber, photoURL, displayName }, { merge: true });
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error?.customData?.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    };
    const signOut = () => {
        auth.signOut();
    };

    return (
        <> <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Typography variant='h2'>
                Welcome to React Chat.
            </Typography>
            <img src="" />
            <Typography>
                Sign in with Google to chat with with your fellow React Developers.
            </Typography>


            {user ? (


                <Button variant="contained" onClick={signOut}>Sign Out</Button>
            ) : (
                <Button variant="contained" onClick={googleSignIn}>Sign In</Button>
            )}
        </Box>
        </>
    )
}

export default Welcome