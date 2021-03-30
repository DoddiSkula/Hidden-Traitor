import React, { useState, useEffect } from "react";
import openSocket  from "socket.io-client";
const ENDPOINT = "http://localhost:4000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = openSocket(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });

    return () => socket.disconnect();

  }, []);

  return (
    <p>
      It's {response}
    </p>
  );
}

export default App;