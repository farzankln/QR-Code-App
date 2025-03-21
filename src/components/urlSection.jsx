import { useContext } from "react";
import QRCodeContext from "../context/QRContext";

const UrlSection = () => {
  const qrCodeContext = useContext(QRCodeContext);

  const handleQrCodeGenerator = () => {
    if (!qrCodeContext.url) return;
    qrCodeContext.setQrIsVisible(true);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <textarea
        className="w-full flex-1 p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 outline-none resize-none"
        placeholder="Enter a URL ..."
        value={qrCodeContext.url}
        onChange={(e) => qrCodeContext.setUrl(e.target.value)}
      />
      <button
        className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md w-full"
        onClick={handleQrCodeGenerator}
      >
        Generate QR Code
      </button>
    </div>
  );
};

export default UrlSection;