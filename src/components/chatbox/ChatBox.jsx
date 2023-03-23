import { Box } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { AuthContext } from "../../store";
import { useAuthState } from "react-firebase-hooks/auth";
const ChatBox = () => {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const [statusMessages, setStatusMessages] = useState([]);
  const { state } = useContext(AuthContext);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      setStatusMessages(messages);
    });
    return () => unsubscribe;
  }, []);

  const newMessages = useMemo(() => {
    let message;
    if (state.chatOpen == "public") {
      message = messages?.filter((item) => !item.senderId);
    } else {
      message = messages?.filter(
        ({ senderId, uid }) => senderId === user.uid || uid === user.uid
      );

      console.log(message);
    }
    return message;
  }, [messages, state.senderId]);
  console.log(messages);
  return (
    <Container
      maxWidth="xxl"
      sx={{ backgroundColor: "#1C2C4C", height: "90vh", overflow: "scroll" }}
    >
      <Box>
        {newMessages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Box>
      <span ref={scroll} />
      <SendMessage scroll={scroll} />
    </Container>
  );
};

export default ChatBox;

// import { Box } from '@mui/material';
// import { Container } from '@mui/system'
// import React, { useState, useEffect } from 'react'
// import Message from './Message';
// import SendMessage from './SendMessage';
// import {
//     query,
//     collection,
//     orderBy,
//     onSnapshot,
//     limit,
// } from "firebase/firestore";
// import { db } from "../../config/firebase";
// const ChatBox = () => {

//     const [messages, setMessages] = useState([])
//     useEffect(() => {
//         const q = query(
//             collection(db, "messages"),
//             orderBy("createdAt"),
//             limit(50)
//         );
//         const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
//             let messages = [];
//             QuerySnapshot.forEach((doc) => {
//                 messages.push({ ...doc.data(), id: doc.id });
//             });
//             console.log(messages)
//             setMessages(messages);
//         });
//         return () => unsubscribe;
//     }, []);
//     return (
//         <Container maxWidth="xxl" sx={{ backgroundColor: "#1C2C4C", height: "90vh", overflow: "scroll" }}>
//             <Box>
//                 {messages?.map((message) => (
//                     <Message key={message.id} message={message} />
//                 ))}
//             </Box>
//             <SendMessage />
//         </Container>
//     )
// }

// export default ChatBox
