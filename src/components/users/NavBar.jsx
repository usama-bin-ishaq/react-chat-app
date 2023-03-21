import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
export default function NavBar() {
    const [user] = useAuthState(auth);
    console.log(user)
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    };

    const signOut = () => {
        auth.signOut();
    };
    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            React Chat
                        </Typography>
                        {user ? (
                            <Button variant="contained" onClick={signOut}>Sign Out</Button>
                        ) : (
                            <Button variant="contained" onClick={googleSignIn}>Sign In</Button>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <Outlet />
        </Container>
    );
}
