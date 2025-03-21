import { useState, useRef } from "react";
import QRCodeContext from "./context/QRContext.jsx";
import QRCodeApp from "./components/QRCodeApp.jsx";

function App() {
  const [url, setUrl] = useState("");
  const [qrIsVisible, setQrIsVisible] = useState(false);
  const [fileType, setFileType] = useState("png");

  const qrCodeRef = useRef(null);

  return (
    <div>
      <QRCodeContext.Provider
        value={{
          url,
          setUrl,
          qrIsVisible,
          setQrIsVisible,
          fileType,
          setFileType,
          qrCodeRef,
        }}
      >
        <QRCodeApp />
      </QRCodeContext.Provider>
    </div>
  );
}

export default App;
