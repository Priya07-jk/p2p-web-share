import { useState } from "react";
import socket from "./socket";

function App() {
  const [roomId, setRoomId] = useState("");

  const joinRoom = () => {
    if (!roomId) return;

    socket.emit("join-room", roomId);

    alert(`Joined room: ${roomId}`);
  };

  return (
    <div>
      <h1>P2P Web Share</h1>

      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />

      <button onClick={joinRoom}>
        Join Room
      </button>
    </div>
  );
}

export default App;