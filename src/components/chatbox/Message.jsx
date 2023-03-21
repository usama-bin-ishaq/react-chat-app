import {
  Avatar,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
//props  props.message or {message}
const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <Container maxWidth="xl" disableGutters sx={{ my: 1 }}>
      <Box sx={{ direction: message.uid !== user.uid ? "ltr" : "rtl" }}>
        <Card
          sx={{
            backgroundColor: "#7CC5D9",
            maxWidth: 450,
            width: "100%",
            background: message.uid === user.uid ? "" : "white",
          }}
        >
          <CardContent>
            <Stack direction={"row"} spacing={1}>
              <Avatar src={message.avatar} alt="R" />
              <Box>
                <Typography variant="subtitle1" color="text.secondary">
                  {message.name}
                </Typography>
                <Typography variant="subtitle2">{message.text}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Message;
