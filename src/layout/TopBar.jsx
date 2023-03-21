import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AuthContext } from "../store";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import {
  Avatar,
  Container,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { db } from "../config/firebase";
import {
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
export default function TopBar() {
  const [user] = useAuthState(auth);
  const { dispatch } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("email"), limit(50));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let users = [];
      QuerySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUsers(users);
    });
    return () => unsubscribe;
  }, []);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const signOut = () => {
    auth.signOut();
  };
  const handleChat = (id) => {
    let status = user.uid === id ? "public" : "private";
    dispatch({
      type: "CHAT_OPEN",
      payload: { status: status, senderId: status === "private" ? id : null },
    });
  };

  return (
    <Container>
      <Box item sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              React Chat
            </Typography>
            {user ? (
              <Button variant="contained" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <Button variant="contained" onClick={googleSignIn}>
                Sign In
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container>
        <Grid lg={4} md={4} sm={12}>
          <Card sx={{ height: "100%", overflow: "scroll" }}>
            <List>
              {users?.map((item) => (
                <ListItemButton
                  key={item.id}
                  onClick={() => handleChat(item.id)}
                >
                  <ListItemAvatar>
                    <Avatar src={item.photoURL} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.displayName}
                    secondary={item.email}
                  />
                </ListItemButton>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid lg={8} md={8} sm={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}
