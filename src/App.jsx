

//** mui
import { CssBaseline } from "@mui/material";
// ** sdk
import { useAuthState } from "react-firebase-hooks/auth";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
//** from components
import Welcome from "./pages/Welcome";
import ChatBox from "./components/chatbox/ChatBox";
import TopBar from "./layout/TopBar";
import { auth } from "./config/firebase";
import { Provider } from "./store";



function App() {
  const [user] = useAuthState(auth);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TopBar />,
      children: [
        {
          path: "/",
          element: !user ? <Welcome /> : <ChatBox />
        }
      ]
    }
  ])

  return (

    <Provider>
      <CssBaseline />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
