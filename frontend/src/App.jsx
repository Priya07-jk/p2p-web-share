import { useState } from "react";

function App() {
  const [roomId, setRoomId] = useState("");
  const [status, setStatus] = useState("Not Connected");

  const joinRoom = () => {
    console.log("Joining room:", roomId);
    setStatus("Connected");
  };

  const createOffer = () => {
    console.log("Creating offer...");
    setStatus("Offer Created");
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
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "250px",
          textAlign: "center",
        }}
      >
        <h3>Room Status</h3>
        <p>{status}</p>
      </div>
    </div>
  );
}

export default App;