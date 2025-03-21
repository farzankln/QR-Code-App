import { useContext, useRef } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import QRCodeContext from "../context/QRContext";

function QrCodeSection() {
  const qrCodeContext = useContext(QRCodeContext);
  const svgRef = useRef(null);

  const downloadQRCode = async () => {
    const { fileType } = qrCodeContext;

    if (fileType === "svg") {
      const svgElement = svgRef.current;
      if (!svgElement) return;

      svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgData], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.svg";
      link.click();

      URL.revokeObjectURL(url);
    } else {
      const node = qrCodeContext.qrCodeRef.current;
      if (!node) return;

      const downloadImage = (dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `qr-code.${fileType}`;
        link.click();
      };

      const handleError = (error) => {
        console.error("Error generating QR code:", error);
      };

      if (fileType === "png") {
        htmlToImage.toPng(node).then(downloadImage).catch(handleError);
      } else if (fileType === "jpeg") {
        htmlToImage.toJpeg(node).then(downloadImage).catch(handleError);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center h-full">
      <div className="w-full bg-gray-700 p-6 rounded-lg flex items-center justify-center flex-1">
        {qrCodeContext.qrIsVisible && (
          <div ref={qrCodeContext.qrCodeRef} className="p-4 bg-white rounded-md">
            <QRCode
              ref={svgRef}
              className="md:w-52 md:h-52 w-40 h-40"
              value={qrCodeContext.url}
            />
          </div>
        )}
      </div>

      <div className="w-full flex md:gap-4 gap-3">
        <button
          className="px-5 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-md flex-1 transition duration-200"
          onClick={downloadQRCode}
        >
          Download
        </button>

        <select
          className="bg-gray-700 text-white border border-gray-500 rounded-lg md:w-1/5 w-1/4 cursor-pointer transition duration-200 ease-in-out 
            hover:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-center"
          value={qrCodeContext.fileType}
          onChange={(e) => qrCodeContext.setFileType(e.target.value)}
        >
          {["png", "jpeg", "svg"].map((type) => (
            <option key={type} value={type} className="text-white bg-gray-800">
              {type.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default QrCodeSection;
