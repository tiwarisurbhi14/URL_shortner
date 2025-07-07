import { useState } from "react";
import { createShortUrl, updateShortUrl } from "../api/short_url.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [customSlug, setCustomSlug] = useState("");
  const [modalSlug, setModalSlug] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [existingShortUrl, setExistingShortUrl] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async () => {
    try {
      const response = await createShortUrl(url, customSlug || undefined);

      if (response.alreadyExists) {
        setExistingShortUrl(response.shortUrl);
        setShowModal(true);
      } else {
        setShortUrl(response.shortUrl);
      }

      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  const handleConfirmUpdate = async (newSlug) => {
    try {
      const updated = await updateShortUrl(
        url,
        newSlug && newSlug.trim() ? newSlug : undefined
      );
      setShortUrl(updated.shortUrl || updated);
      setShowModal(false);
      setCustomSlug("");
      setModalSlug("");
      queryClient.invalidateQueries({ queryKey: ["userUrls"] });
    } catch (err) {
      setError("Failed to update short URL.", err);
    }
  };

  const handleCancelUpdate = () => {
    setShortUrl(existingShortUrl);
    setShowModal(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4 relative">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Enter your URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onInput={(event) => setUrl(event.target.value)}
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {isAuthenticated && (
        <div className="mt-4">
          <label
            htmlFor="customSlug"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Custom URL (optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(event) => setCustomSlug(event.target.value)}
            placeholder="Enter custom URL(optional)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      >
        Shorten URL
      </button>

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray-50"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 ${
                copied
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-xl w-96 p-6 transform transition-all duration-300 scale-100 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-800">Short URL Already Exists</h2>
      </div>

      {/* Message */}
      <p className="text-sm text-gray-600 mb-4">
        This URL is already shortened. You can choose to:
        <ul className="list-disc list-inside text-gray-500 mt-2 space-y-1">
          <li>Enter a new custom URL</li>
          <li>Leave it blank to auto-generate</li>
        </ul>
      </p>

      {/* Input */}
      <input
        type="text"
        value={modalSlug}
        onChange={(e) => setModalSlug(e.target.value)}
        placeholder="New custom URL (optional)"
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none mb-6"
      />

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleCancelUpdate}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={() => handleConfirmUpdate(modalSlug)}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default UrlForm;
