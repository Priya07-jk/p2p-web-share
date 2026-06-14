import { useState } from "react";

function App() {
  const [roomId, setRoomId] = useState("");
  const [status, setStatus] = useState("Not Connected");
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const joinRoom = () => {
    console.log("Joining room:", roomId);
    setStatus("Connected");
  };

  const createOffer = () => {
    console.log("Creating offer...");
    setStatus("Offer Created");
    setProgress(65);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setProgress(25);
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
          width: "260px",
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
              width: "300px",
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
              <strong>Type:</strong> {selectedFile.type}
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "20px",
          width: "300px",
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
            }}
          />
        </div>

        <p>{progress}% Completed</p>
      </div>
    </div>
  );
}

export default App;