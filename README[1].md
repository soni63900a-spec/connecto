# LAN Connect — simple QR pairing

## Run on Windows
1. Install Node.js LTS: https://nodejs.org/
2. Extract this ZIP.
3. Open the `lan-connect-simple` folder.
4. Click the File Explorer address bar, type `cmd`, press Enter.
5. Run:
   ```
   npm install
   npm start
   ```
6. On the computer, open `http://localhost:3000`.
7. On the computer click **Create QR to connect**.
8. Connect the second phone to the same Wi-Fi and scan the QR using its camera.
9. Open the link shown by the camera. The two devices will pair.

Find the PC's Wi-Fi IPv4 address with `ipconfig`. If the QR link does not use that address, open the page on the PC using `http://PC-IP:3000` first, then create a new QR.

## Features
- QR link pairing for two devices
- Peer-to-peer WebRTC data channel
- Text chat
- File transfer
- Basic screen-track sending (requires HTTPS or localhost; remote screen display UI is not included)

## Notes
- The Node.js server is only used for signaling; chat and file bytes use the WebRTC data channel.
- Both devices should be on the same Wi-Fi. Router client isolation can prevent connections.
- QR scanning uses the phone's native camera, avoiding browser camera permission requirements.
- This is a starter project. Do not expose it publicly without adding authentication, room expiry, rate limiting, and HTTPS.
- Screen sharing requires a secure browser context (HTTPS or localhost). For a reliable screen-sharing experience, host behind HTTPS and add a remote video viewer.
