import {
  Container,
  Grid,
  TextField,
  FormHelperText,
  Button,
  Card,
  InputAdornment,
} from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { auth, db } from "../../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AuthContext } from "../../store";

const SendMessage = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const { state } = useContext(AuthContext);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, displayName, photoURL } = auth.currentUser;

    const { senderId, chatOpen } = state; //destructive
    let body = {};
    chatOpen === "private" && (body.senderId = senderId);
    console.log(body, state);
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      ...body,
    });
    setMessage("");
    scroll.current.scrollIntoView({ bahavior: "smooth" });
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <form onSubmit={(event) => sendMessage(event)}>
        <Card sx={{ p: 2, backgroundColor: "#4C768D" }}>
          <TextField
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="filled"
            label="start your caht..."
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#353945",
                      fontSize: "12px",
                      fontStyle: "lowercase",
                      py: "10px",
                      px: "15px",
                      textTransform: "capitalize",
                    }}
                  >
                    send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Card>
      </form>
    </Container>
  );
};

export default SendMessage;
