// import React, { useState } from "react";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "./firebaseConfig";

// function App() {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [url, setUrl] = useState("");

//   const handleUpload = () => {
//     if (!file) return alert("Please select a video file first!");

//     const storageRef = ref(storage, `videos/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const prog = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(prog);
//       },
//       (error) => console.error(error),
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setUrl(downloadURL);
//         });
//       }
//     );
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>🎥 Video Upload App</h2>
//       <input
//         type="file"
//         accept="video/*"
//         onChange={(e) => setFile(e.target.files[0])}
//       />
//       <br />
//       <button onClick={handleUpload} style={{ marginTop: "10px" }}>
//         Upload
//       </button>
//       <p>Progress: {progress}%</p>
//       {url && (
//         <div>
//           <h3>Uploaded Video URL:</h3>
//           <a href={url} target="_blank" rel="noreferrer">
//             {url}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


// import React, { useState } from "react";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "./firebaseConfig";

// export default function VideoUpload() {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [url, setUrl] = useState("");
//   const [error, setError] = useState("");

//   // file size limit = 250 MB
//   const MAX_SIZE = 20 * 1024 * 1024; // bytes

//   const handleChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     // ✅ check file type
//     if (!selected.type.startsWith("video/")) {
//       setError("Sirf video files upload kar sakte ho.");
//       setFile(null);
//       return;
//     }

//     // ✅ check file size limit
//     if (selected.size > MAX_SIZE) {
//       setError("File bahut badi hai! Max 250 MB allowed.");
//       setFile(null);
//       return;
//     }

//     // ✅ if sab sahi hai
//     setFile(selected);
//     setError("");
//   };

//   const handleUpload = () => {
//     if (!file) {
//       alert("Pehle koi video select karo!");
//       return;
//     }

//     const storageRef = ref(storage, `videos/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // ✅ track progress
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const prog =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setProgress(prog.toFixed(0)); // round %
//       },
//       (err) => {
//         console.error(err);
//         setError("Upload me error aaya!");
//       },
//       () => {
//         // ✅ upload complete → get download URL
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setUrl(downloadURL);
//           setProgress(100);
//         });
//       }
//     );
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: "auto", fontFamily: "sans-serif" }}>
//       <h2>🎥 Video Upload (with Progress & Limit)</h2>

//       <input type="file" accept="video/*" onChange={handleChange} />
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <button onClick={handleUpload} disabled={!file}>
//         Upload
//       </button>

//       {progress > 0 && (
//         <div style={{ marginTop: 10 }}>
//           <p>Progress: {progress}%</p>
//           <div
//             style={{
//               width: "100%",
//               height: 10,
//               background: "#eee",
//               borderRadius: 5,
//               overflow: "hidden",
//             }}
//           >
//             <div
//               style={{
//                 width: `${progress}%`,
//                 height: "100%",
//                 background: "#4f46e5",
//                 transition: "width 0.3s",
//               }}
//             ></div>
//           </div>
//         </div>
//       )}

//       {url && (
//         <div style={{ marginTop: 20 }}>
//           <p>✅ Uploaded Video URL:</p>
//           <a href={url} target="_blank" rel="noreferrer">
//             {url}
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "./firebaseConfig";
// // import Navbar from "./Components/Navbar";
// import Home from "./Components/Home";

// export default function VideoUpload() {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [url, setUrl] = useState("");
//   const [error, setError] = useState("");
//   const [transcript, setTranscript] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ File size limit (250MB)
//   const MAX_SIZE = 250 * 1024 * 1024;

//   const handleChange = (e) => {
//     const selected = e.target.files[0];
//     if (!selected) return;

//     if (!selected.type.startsWith("video/")) {
//       setError("❌ Sirf video files upload kar sakte ho.");
//       setFile(null);
//       return;
//     }

//     if (selected.size > MAX_SIZE) {
//       setError("❌ File bahut badi hai! Max 250MB allowed.");
//       setFile(null);
//       return;
//     }

//     setFile(selected);
//     setError("");
//   };

//   const handleUpload = () => {
//     if (!file) {
//       alert("Pehle koi video select karo!");
//       return;
//     }

//     const storageRef = ref(storage, `videos/${file.name}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setProgress(prog.toFixed(0));
//       },
//       (err) => {
//         console.error(err);
//         setError("Upload me error aaya!");
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setUrl(downloadURL);
//           setProgress(100);
//         });
//       }
//     );
//   };

//   // 🧠 Transcribe Function
//   const handleTranscribe = async () => {
//     if (!url) return alert("Pehle video upload karo!");

//     setLoading(true);
//     setTranscript("");

//     try {
//       const response = await fetch("http://localhost:5000/transcribe", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ videoUrl: url }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setTranscript(data.text);
//       } else {
//         setError(data.error || "Transcription failed!");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Server se connect nahi ho paya!");
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <Home/>
//       <div style={{ maxWidth: 500, margin: "auto", fontFamily: "sans-serif" }}>

//         <h2 className="">🎥 Video Upload + Transcription</h2>

//         <input type="file" accept="video/*" onChange={handleChange} />
//         {error && <p style={{ color: "red" }}>{error}</p>}

//         <button onClick={handleUpload} disabled={!file}>
//           Upload
//         </button>

//         {progress > 0 && (
//           <div style={{ marginTop: 10 }}>
//             <p>Progress: {progress}%</p>
//             <div
//               style={{
//                 width: "100%",
//                 height: 10,
//                 background: "#eee",
//                 borderRadius: 5,
//                 overflow: "hidden",
//               }}
//             >
//               <div
//                 style={{
//                   width: `${progress}%`,
//                   height: "100%",
//                   background: "#4f46e5",
//                   transition: "width 0.3s",
//                 }}
//               ></div>
//             </div>
//           </div>
//         )}

//         {url && (
//           <div style={{ marginTop: 20 }}>
//             <p>✅ Uploaded Video:</p>
//             <video src={url} controls width="100%" style={{ borderRadius: 10 }} />
//             <button
//               onClick={handleTranscribe}
//               style={{ marginTop: 10 }}
//               disabled={loading}
//             >
//               {loading ? "Transcribing..." : "🧠 Transcribe Audio"}
//             </button>
//           </div>
//         )}

//         {transcript && (
//           <div
//             style={{
//               background: "#f3f4f6",
//               padding: 15,
//               borderRadius: 10,
//               marginTop: 20,
//             }}
//           >
//             <h4>📝 Transcription Result:</h4>
//             <p>{transcript}</p>
//           </div>
//         )}
//       </div></>
//   );
// }


import VideoUpload from "./Components/VideoUpload";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function App() {
  return (
    <>
    <Navbar/>
    <VideoUpload />
    <Footer />
    </>
  );
}
