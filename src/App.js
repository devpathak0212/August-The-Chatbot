// src/App.js
import React, { useEffect, useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import Chat from "./Chat";
import "./index.css";  // added

function App() {
  const [user, setUser] = useState(localStorage.getItem("userId") || null);
  const [page, setPage] = useState("signin"); // default page

  useEffect(() => {
    if (user) setPage("chat");
  }, [user]);

  return (
    <div>
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "signin" && <Signin setPage={setPage} setUser={setUser} />}
      {page === "chat" && <Chat />}
    </div>
  );
}

export default App;
