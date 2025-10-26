import React, { useState, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";

const AIVideoTranscriber = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  const MAX_SIZE = 250 * 1024 * 1024; // 250MB

  // Handle file upload (Firebase)
  const handleFileUpload = useCallback((selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("video/")) {
      setError("❌ Only video files are allowed.");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      setError("❌ File too large! Max 250MB.");
      return;
    }

    setFile(selectedFile);
    setError("");
    setIsUploading(true);

    const storageRef = ref(storage, `videos/${selectedFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog.toFixed(0));
      },
      (err) => {
        console.error(err);
        setError("Upload failed. Try again.");
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoUrl(downloadURL);
          setIsUploading(false);
          setIsUploadSuccess(true);
          setTimeout(() => setIsUploadSuccess(false), 3000);
        });
      }
    );
  }, []);

  const handleFileInput = useCallback(
    (e) => {
      const selectedFile = e.target.files[0];
      handleFileUpload(selectedFile);
    },
    [handleFileUpload]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      handleFileUpload(droppedFile);
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e) => e.preventDefault(), []);

  // Generate transcript using backend API
  const generateTranscript = useCallback(async () => {
    if (!videoUrl) {
      setError("Please upload a video first!");
      return;
    }

    setIsGenerating(true);
    setError("");
    setTranscript("");

    try {
      const response = await fetch("https://vt-backend-production.up.railway.app/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl }),
      });

      const data = await response.json();
      if (response.ok) {
        setTranscript(data.text);
      } else {
        setError(data.error || "Transcription failed!");
      }
    } catch (err) {
      console.error(err);
      setError("Server connection failed!");
    } finally {
      setIsGenerating(false);
    }
  }, [videoUrl]);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-emerald-200 flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Upload Your Video & Get Instant Transcript
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Powered by Assembly AI — Accurate, Fast, and Intelligent Video
            Transcription.
          </p>

          {/* Upload Section */}
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300 hover:shadow-2xl`}
          >
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${isUploading
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("file-input").click()}
            >
              {isUploading ? (
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-lg font-medium text-gray-700">
                    Uploading... {progress}%
                  </p>
                </div>
              ) : (
                <>
                  <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    Drag and drop your video file here
                  </p>
                  <p className="text-gray-500 mb-4">or</p>
                  <button className="bg-black text-white px-8 py-3 rounded-lg font-medium">
                    Choose File
                  </button>

                  <p className="text-sm text-gray-400 mt-4">
                    Supports MP4, MOV, AVI up to 250MB
                  </p>
                </>
              )}
            </div>

            <input
              id="file-input"
              type="file"
              accept="video/*"
              onChange={handleFileInput}
              className="hidden"
            />

            {isUploadSuccess && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-green-700 font-medium">
                  Upload Successful!
                </span>
              </div>
            )}

            {file && !isUploading && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <span className="font-semibold">Selected file:</span>{" "}
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Generate Transcript Button */}
          {videoUrl && !isUploading && (
            <div className="text-center mb-8">
              <button
                onClick={generateTranscript}
                disabled={isGenerating}
                className={`px-8 py-3.5 rounded-lg font-medium text-lg transition-colors duration-300
    ${isGenerating
                    ? "bg-black text-white cursor-not-allowed"
                    : "bg-black text-white hover:bg-green-600 hover:text-white"
                  }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>Generating...</span>
                  </span>
                ) : (
                  "Generate Transcript"
                )}
              </button>
            </div>
          )}

          {/* Transcript Section */}
          {transcript && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Your Transcript
              </h2>
              <div className="bg-gray-100 rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed">
                  {transcript}
                </pre>
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(transcript);
                    alert("Transcript copied!");
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Copy to Clipboard
                </button>
                <a
                  href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                    transcript
                  )}`}
                  download="transcript.txt"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  Download Transcript
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AIVideoTranscriber;
