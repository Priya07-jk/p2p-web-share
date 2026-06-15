# P2P Web Share
A browser-based peer-to-peer file sharing application built using React, Node.js, Socket.IO, and WebRTC.

## Features
* Real-time room-based connection
* WebRTC peer-to-peer communication
* Socket.IO signaling server
* Data channel for file transfer
* File selection and sharing
* Transfer progress tracking
* Activity logs for connection events
* Automatic file download on receiver side

## Tech Stack
### Frontend
* React
* Vite
* WebRTC API
### Backend
* Node.js
* Express
* Socket.IO
## How It Works
1. Users join the same room using a Room ID.
2. Socket.IO is used for signaling.
3. WebRTC establishes a direct peer-to-peer connection.
4. A data channel is created between peers.
5. Files are transferred directly between browsers without passing through the server.
6. The receiver automatically downloads the received file.

## Installation
### Clone Repository

```bash
git clone https://github.com/Priya07-jk/p2p-web-share.git
cd p2p-web-share
```
### Backend Setup
```bash
cd backend
npm install
npm start
```
### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Usage
1. Open the application in two browser tabs.
2. Enter the same Room ID in both tabs.
3. Click **Join Room** on both tabs.
4. Click **Create Offer** on one tab.
5. Wait until both peers are connected.
6. Select a file and click **Send File**.
7. The file will be received and downloaded automatically on the other peer.

## Project Structure
```text
p2p-web-share/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── socket.js
│   └── package.json
│
└── README.md
```
## Future Improvements

* Drag and drop file upload
* Multiple file transfer support
* Large file chunking
* Transfer speed display
* File preview support
* Secure encrypted file sharing



