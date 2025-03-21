import QrCodeSection from "./qrCodeSection";
import UrlSection from "./urlSection";

const QRCodeApp = () => {
  return (
    <main className="relative w-screen min-h-screen bg-gray-900 text-white md:p-8 p-4   flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text mb-8">
        QR Code Generator
      </h1>
      <section className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full max-w-4xl">
        <div className="bg-gray-800 border border-gray-700 rounded-lg md:p-6 p-4 shadow-lg flex-1 md:h-96 h-80">
          <UrlSection />
        </div>
        <div className="bg-gray-800 border border-gray-700 rounded-lg md:p-6 p-4 shadow-lg flex-1 md:h-96 h-80">
          <QrCodeSection />
        </div>
      </section>
    </main>
  );
};

export default QRCodeApp;
