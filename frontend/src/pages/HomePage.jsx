import UrlForm from "../components/UrlForm";

const HomePage = () => {
  return (
    <div
      className="min-h-screen w-screen flex-col flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black
"
    >
      <h1 className="text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 text-transparent bg-clip-text drop-shadow-lg animate-fade-in">
        nanoURL
      </h1>

      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;
