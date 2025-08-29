import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [media, setMedia] = useState(null);

  const handleDownload = async () => {
    const res = await fetch("https://backend-e3yu.onrender.com/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    setMedia(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Instagram Downloader</h1>

      <input
        type="text"
        placeholder="Paste Instagram URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 rounded w-80"
      />

      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Fetch
      </button>

      {media && (
        <div className="mt-6 text-center">
          {media.type === "IMAGE" ? (
            <img
              src={media.media_url}
              alt="Instagram content"
              className="max-w-sm rounded-lg"
            />
          ) : (
            <video controls className="max-w-sm rounded-lg">
              <source src={media.media_url} type="video/mp4" />
            </video>
          )}

          <a
            href={media.media_url}
            download
            className="block mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Download
          </a>
        </div>
      )}
    </div>
  );
}
