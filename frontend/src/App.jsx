import { useState, useEffect, useRef } from "react";
import socket from "./socket";

function App() {
  const [roomId, setRoomId] = useState("");
  const [status, setStatus] = useState("Not Connected");
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const peerConnection = useRef(null);
const dataChannel = useRef(null);

  useEffect(() => {
  socket.on("user-joined", (message) => {
    console.log("RECEIVED:", message);

    setLogs((prev) => [...prev, message]);
  });

  return () => {
    socket.off("user-joined");
  };
}, []);
const initializePeer = () => {
  peerConnection.current = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  });

  setLogs((prev) => [
    ...prev,
    "RTCPeerConnection initialized",
  ]);
};
  const joinRoom = () => {
    if (!roomId.trim()) {
      alert("Enter a Room ID");
      return;
    }

    socket.emit("join-room", roomId);

    setStatus(`Connected to Room ${roomId}`);

    setLogs((prev) => [
      ...prev,
      `Joined room ${roomId}`,
      "Room join request sent to server",
    ]);
  };

 const createOffer = () => {
  initializePeer();

  setStatus("Peer Connection Created");

  setLogs((prev) => [
    ...prev,
    "Peer connection ready",
  ]);
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setProgress(25);

    setLogs((prev) => [
      ...prev,
      `Selected file: ${file.name}`,
    ]);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "50px",
        fontFamily: "Arial",
      }}
    >
      <h1>P2P Web Share</h1>

      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "10px",
        }}
      />

      <div>
        <button
          onClick={joinRoom}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
          }}
        >
          Join Room
        </button>

        <button
          onClick={createOffer}
          style={{
            padding: "10px 20px",
          }}
        >
          Create Offer
        </button>
      </div>

      <div
        style={{
          marginTop: "25px",
          padding: "20px",
          width: "280px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2>Room Status</h2>
        <p>{status}</p>
      </div>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <input type="file" onChange={handleFileChange} />

        {selectedFile && (
          <div
            style={{
              marginTop: "15px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              width: "320px",
            }}
          >
            <h3>Selected File</h3>

            <p>
              <strong>Name:</strong> {selectedFile.name}
            </p>

            <p>
              <strong>Size:</strong>{" "}
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>

            <p>
              <strong>Type:</strong> {selectedFile.type || "Unknown"}
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
          width: "320px",
          textAlign: "center",
        }}
      >
        <h3>Transfer Progress</h3>

        <div
          style={{
            width: "100%",
            height: "20px",
            backgroundColor: "#ddd",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#4CAF50",
              transition: "0.3s",
            }}
          />
        </div>

        <p>{progress}% Completed</p>
      </div>

      <div
        style={{
          marginTop: "20px",
          width: "320px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <h3>Activity Log</h3>

        <button
          onClick={() => setLogs([])}
          style={{
            padding: "6px 12px",
            marginBottom: "10px",
            cursor: "pointer",
          }}
        >
          Clear Log
        </button>

        {logs.length === 0 ? (
          <p>No activity yet</p>
        ) : (
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;