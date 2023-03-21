import { createContext, useReducer, useEffect } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { db, auth } from "../config/firebase";
export const AuthContext = createContext();
const initialState = {
  user: null,
  loading: "",
  token: "",
  chatOpen: "",
  senderId: "",
};
const reducer = (state, action) => {
  // action -> type and paylaod
  switch (action.type) {
    case "CREATAE":
      return state;
      break;
    case "DELETE":
      return state;
      break;
    case "UPDATE":
      return state;
      break;

    case "READ":
      return state;
      break;
    case "CHAT_OPEN":
      const { status, senderId } = action.payload;
      return { ...state, chatOpen: status, senderId: senderId };
      break;

    default:
      return state;
  }
};
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // useEffect(() => {
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access Google APIs.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       console.log(result.user, 'rthis result')
  //       // The signed-in user info.
  //       const user = result.user;
  //       const cityRef = doc(db, 'users', user.uid);
  //       setDoc(cityRef, user, { merge: true });
  //     }).catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // }, [auth])
  return (
    <AuthContext.Provider value={{ dispatch, state }}>
      {children}
    </AuthContext.Provider>
  );
};
