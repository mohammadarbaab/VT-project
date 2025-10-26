// // import React, { useState } from "react";
// // import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// // import { storage } from "../firebaseConfig";

// // export default function VideoUpload() {
// //   const [file, setFile] = useState(null);
// //   const [progress, setProgress] = useState(0);
// //   const [url, setUrl] = useState("");
// //   const [error, setError] = useState("");
// //   const [transcript, setTranscript] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   // ✅ File size limit (250MB)
// //   const MAX_SIZE = 250 * 1024 * 1024;

// //   const handleChange = (e) => {
// //     const selected = e.target.files[0];
// //     if (!selected) return;

// //     if (!selected.type.startsWith("video/")) {
// //       setError("❌ Sirf video files upload kar sakte ho.");
// //       setFile(null);
// //       return;
// //     }

// //     if (selected.size > MAX_SIZE) {
// //       setError("❌ File bahut badi hai! Max 250MB allowed.");
// //       setFile(null);
// //       return;
// //     }

// //     setFile(selected);
// //     setError("");
// //   };

// //   const handleUpload = () => {
// //     if (!file) {
// //       alert("Pehle koi video select karo!");
// //       return;
// //     }

// //     const storageRef = ref(storage, `videos/${file.name}`);
// //     const uploadTask = uploadBytesResumable(storageRef, file);

// //     uploadTask.on(
// //       "state_changed",
// //       (snapshot) => {
// //         const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// //         setProgress(prog.toFixed(0));
// //       },
// //       (err) => {
// //         console.error(err);
// //         setError("Upload me error aaya!");
// //       },
// //       () => {
// //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
// //           setUrl(downloadURL);
// //           setProgress(100);
// //         });
// //       }
// //     );
// //   };

// //   // 🧠 Transcribe Function
// //   const handleTranscribe = async () => {
// //     if (!url) return alert("Pehle video upload karo!");

// //     setLoading(true);
// //     setTranscript("");

// //     try {
// //       const response = await fetch("http://localhost:5000/transcribe", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ videoUrl: url }),
// //       });

// //       const data = await response.json();
// //       if (response.ok) {
// //         setTranscript(data.text);
// //       } else {
// //         setError(data.error || "Transcription failed!");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setError("Server se connect nahi ho paya!");
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <div style={{ maxWidth: 500, margin: "auto", fontFamily: "sans-serif" }}>
// //       <h2>🎥 Video Upload + Transcription</h2>

// //       <input type="file" accept="video/*" onChange={handleChange} />
// //       {error && <p style={{ color: "red" }}>{error}</p>}

// //       <button onClick={handleUpload} disabled={!file}>
// //         Upload
// //       </button>

// //       {progress > 0 && (
// //         <div style={{ marginTop: 10 }}>
// //           <p>Progress: {progress}%</p>
// //           <div
// //             style={{
// //               width: "100%",
// //               height: 10,
// //               background: "#eee",
// //               borderRadius: 5,
// //               overflow: "hidden",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 width: `${progress}%`,
// //                 height: "100%",
// //                 background: "#4f46e5",
// //                 transition: "width 0.3s",
// //               }}
// //             ></div>
// //           </div>
// //         </div>
// //       )}

// //       {url && (
// //         <div style={{ marginTop: 20 }}>
// //           <p>✅ Uploaded Video:</p>
// //           <video src={url} controls width="100%" style={{ borderRadius: 10 }} />
// //           <button
// //             onClick={handleTranscribe}
// //             style={{ marginTop: 10 }}
// //             disabled={loading}
// //           >
// //             {loading ? "Transcribing..." : "🧠 Transcribe Audio"}
// //           </button>
// //         </div>
// //       )}

// //       {transcript && (
// //         <div
// //           style={{
// //             background: "#f3f4f6",
// //             padding: 15,
// //             borderRadius: 10,
// //             marginTop: 20,
// //           }}
// //         >
// //           <h4>📝 Transcription Result:</h4>
// //           <p>{transcript}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// // import React, { useState } from "react";
// // import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// // import { storage } from "../firebaseConfig"; // ✅ change according to your file path
// // import {
// //   Upload,
// //   Play,
// //   FileText,
// //   AlertCircle,
// //   CheckCircle2,
// //   Loader2,
// // } from "lucide-react";

// // export default function VideoUpload() {
// //   const [file, setFile] = useState(null);
// //   const [progress, setProgress] = useState(0);
// //   const [url, setUrl] = useState("");
// //   const [error, setError] = useState("");
// //   const [transcript, setTranscript] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [uploadComplete, setUploadComplete] = useState(false);

// //   // ✅ File size limit (250MB)
// //   const MAX_SIZE = 250 * 1024 * 1024;

// //   const handleChange = (e) => {
// //     const selected = e.target.files?.[0];
// //     if (!selected) return;

// //     if (!selected.type.startsWith("video/")) {
// //       setError("❌ Only video files are allowed.");
// //       setFile(null);
// //       return;
// //     }

// //     if (selected.size > MAX_SIZE) {
// //       setError("❌ File is too large! Maximum 250MB allowed.");
// //       setFile(null);
// //       return;
// //     }

// //     setFile(selected);
// //     setError("");
// //     setUploadComplete(false);
// //   };

// //   const handleUpload = () => {
// //     if (!file) {
// //       setError("Please select a video file first!");
// //       return;
// //     }

// //     const storageRef = ref(storage, `videos/${file.name}`);
// //     const uploadTask = uploadBytesResumable(storageRef, file);

// //     uploadTask.on(
// //       "state_changed",
// //       (snapshot) => {
// //         const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// //         setProgress(prog.toFixed(0));
// //       },
// //       (err) => {
// //         console.error(err);
// //         setError("Upload failed. Please try again.");
// //       },
// //       () => {
// //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
// //           setUrl(downloadURL);
// //           setProgress(100);
// //           setUploadComplete(true);
// //         });
// //       }
// //     );
// //   };

// //   // 🧠 Transcribe Function
// //   const handleTranscribe = async () => {
// //     if (!url) return setError("Please upload a video first!");

// //     setLoading(true);
// //     setTranscript("");

// //     try {
// //       const response = await fetch("http://localhost:5000/transcribe", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ videoUrl: url }),
// //       });

// //       const data = await response.json();
// //       if (response.ok) {
// //         setTranscript(data.text);
// //       } else {
// //         setError(data.error || "Transcription failed!");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setError("Could not connect to server!");
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <>
// //    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-900 dark:to-blue-950 py-10 px-6">
// //       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
// //         {/* LEFT SIDE - Upload Section */}
// //         <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6">
// //           <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
// //             <Upload className="w-6 h-6 text-blue-500" /> Upload Your Video
// //           </h2>

// //           <label className="block mb-6">
// //             <input
// //               type="file"
// //               accept="video/*"
// //               onChange={handleChange}
// //               className="hidden"
// //               id="file-input"
// //             />
// //             <label
// //               htmlFor="file-input"
// //               className="flex items-center justify-center w-full px-6 py-10 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition"
// //             >
// //               <div className="text-center">
// //                 <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
// //                 <p className="font-medium text-slate-700 dark:text-slate-300">
// //                   {file ? file.name : "Click or drag to upload video"}
// //                 </p>
// //                 <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
// //                   MP4, WebM up to 250MB
// //                 </p>
// //               </div>
// //             </label>
// //           </label>

// //           {error && (
// //             <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 rounded-lg flex items-start gap-2 mb-4">
// //               <AlertCircle className="w-5 h-5 text-red-600" />
// //               <p className="text-sm text-red-700">{error}</p>
// //             </div>
// //           )}

// //           <button
// //             onClick={handleUpload}
// //             disabled={!file || uploadComplete}
// //             className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold flex items-center justify-center gap-2 transition"
// //           >
// //             {uploadComplete ? (
// //               <>
// //                 <CheckCircle2 className="w-5 h-5" /> Upload Complete
// //               </>
// //             ) : (
// //               <>
// //                 <Upload className="w-5 h-5" /> Upload Video
// //               </>
// //             )}
// //           </button>

// //           {progress > 0 && progress < 100 && (
// //             <div className="mt-4">
// //               <div className="flex justify-between text-sm mb-1">
// //                 <span>Uploading...</span>
// //                 <span>{progress}%</span>
// //               </div>
// //               <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
// //                 <div
// //                   className="h-full bg-blue-600 rounded-full transition-all duration-300"
// //                   style={{ width: `${progress}%` }}
// //                 ></div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* RIGHT SIDE - Video Preview + Transcript */}
// //         <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 flex flex-col justify-between">
// //           {url ? (
// //             <>
// //               <div>
// //                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
// //                   <Play className="w-6 h-6 text-green-500" /> Preview & Transcribe
// //                 </h2>

// //                 <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-slate-900">
// //                   <video src={url} controls className="w-full h-full object-cover" />
// //                 </div>

// //                 <button
// //                   onClick={handleTranscribe}
// //                   disabled={loading}
// //                   className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
// //                 >
// //                   {loading ? (
// //                     <>
// //                       <Loader2 className="w-5 h-5 animate-spin" /> Transcribing...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <FileText className="w-5 h-5" /> Get Transcript
// //                     </>
// //                   )}
// //                 </button>
// //               </div>

// //               {transcript && (
// //                 <div className="mt-6 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
// //                   <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white flex items-center gap-2">
// //                     <FileText className="w-5 h-5 text-purple-600" /> Transcript
// //                   </h3>
// //                   <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
// //                     {transcript}
// //                   </p>
// //                   <button
// //                     onClick={() => {
// //                       navigator.clipboard.writeText(transcript);
// //                       alert("Transcript copied!");
// //                     }}
// //                     className="mt-3 text-sm px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition"
// //                   >
// //                     Copy Transcript
// //                   </button>
// //                 </div>
// //               )}
// //             </>
// //           ) : (
// //             <div className="flex flex-col justify-center items-center h-full text-center text-slate-500 dark:text-slate-400">
// //               <Play className="w-10 h-10 mb-3" />
// //               <p>Upload a video to preview and transcribe.</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div></>
// //   );
// // }



// import React, { useState } from "react";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebaseConfig"; // ✅ adjust path
// import {
//   Upload,
//   Play,
//   FileText,
//   AlertCircle,
//   CheckCircle2,
//   Loader2,
// } from "lucide-react";

// export default function VideoUpload() {
//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0);
//   const [url, setUrl] = useState("");
//   const [error, setError] = useState("");
//   const [transcript, setTranscript] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploadComplete, setUploadComplete] = useState(false);
//   const [aspectRatio, setAspectRatio] = useState(16 / 9); // ✅ dynamic video ratio

//   const MAX_SIZE = 250 * 1024 * 1024; // 250MB limit

//   const handleChange = (e) => {
//     const selected = e.target.files?.[0];
//     if (!selected) return;

//     if (!selected.type.startsWith("video/")) {
//       setError("❌ Only video files are allowed.");
//       setFile(null);
//       return;
//     }

//     if (selected.size > MAX_SIZE) {
//       setError("❌ File is too large! Maximum 250MB allowed.");
//       setFile(null);
//       return;
//     }

//     setFile(selected);
//     setError("");
//     setUploadComplete(false);
//   };

//   const handleUpload = () => {
//     if (!file) {
//       setError("Please select a video file first!");
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
//         setError("Upload failed. Please try again.");
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           setUrl(downloadURL);
//           setProgress(100);
//           setUploadComplete(true);
//         });
//       }
//     );
//   };

//   const handleTranscribe = async () => {
//     if (!url) return setError("Please upload a video first!");

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
//       setError("Could not connect to server!");
//     }

//     setLoading(false);
//   };

//   // ✅ Detect actual video aspect ratio to prevent cropping
//   const handleLoadedMetadata = (e) => {
//     const video = e.target;
//     const ratio = video.videoWidth / video.videoHeight;
//     setAspectRatio(ratio);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-900 dark:to-blue-950 py-10 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* LEFT SIDE - Upload Section */}
//         <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6">
//           <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
//             <Upload className="w-6 h-6 text-blue-500" /> Upload Your Video
//           </h2>

//           <label className="block mb-6">
//             <input
//               type="file"
//               accept="video/*"
//               onChange={handleChange}
//               className="hidden"
//               id="file-input"
//             />
//             <label
//               htmlFor="file-input"
//               className="flex items-center justify-center w-full px-6 py-10 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition"
//             >
//               <div className="text-center">
//                 <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
//                 <p className="font-medium text-slate-700 dark:text-slate-300">
//                   {file ? file.name : "Click or drag to upload video"}
//                 </p>
//                 <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
//                   MP4, WebM up to 250MB
//                 </p>
//               </div>
//             </label>
//           </label>

//           {error && (
//             <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 rounded-lg flex items-start gap-2 mb-4">
//               <AlertCircle className="w-5 h-5 text-red-600" />
//               <p className="text-sm text-red-700">{error}</p>
//             </div>
//           )}

//           <button
//             onClick={handleUpload}
//             disabled={!file || uploadComplete}
//             className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold flex items-center justify-center gap-2 transition"
//           >
//             {uploadComplete ? (
//               <>
//                 <CheckCircle2 className="w-5 h-5" /> Upload Complete
//               </>
//             ) : (
//               <>
//                 <Upload className="w-5 h-5" /> Upload Video
//               </>
//             )}
//           </button>

//           {progress > 0 && progress < 100 && (
//             <div className="mt-4">
//               <div className="flex justify-between text-sm mb-1">
//                 <span>Uploading...</span>
//                 <span>{progress}%</span>
//               </div>
//               <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
//                 <div
//                   className="h-full bg-blue-600 rounded-full transition-all duration-300"
//                   style={{ width: `${progress}%` }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* RIGHT SIDE - Video Preview + Transcript */}
//         <div className="bg-white dark:bg-slate-800 shadow-lg rounded-2xl p-6 flex flex-col justify-between">
//           {url ? (
//             <>
//               <div>
//                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
//                   <Play className="w-6 h-6 text-green-500" /> Preview & Transcribe
//                 </h2>

//                 {/* ✅ Responsive, no-crop video */}
//                 <div
//                   className="relative w-full bg-slate-900 rounded-lg overflow-hidden mb-4 flex items-center justify-center"
//                   style={{ aspectRatio }}
//                 >
//                   <video
//                     src={url}
//                     controls
//                     onLoadedMetadata={handleLoadedMetadata}
//                     className="w-full h-full object-contain"
//                   />
//                 </div>

//                 <button
//                   onClick={handleTranscribe}
//                   disabled={loading}
//                   className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition"
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="w-5 h-5 animate-spin" /> Transcribing...
//                     </>
//                   ) : (
//                     <>
//                       <FileText className="w-5 h-5" /> Get Transcript
//                     </>
//                   )}
//                 </button>
//               </div>

//               {transcript && (
//                 <div className="mt-6 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
//                   <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white flex items-center gap-2">
//                     <FileText className="w-5 h-5 text-purple-600" /> Transcript
//                   </h3>
//                   <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">
//                     {transcript}
//                   </p>
//                   <button
//                     onClick={() => {
//                       navigator.clipboard.writeText(transcript);
//                       alert("Transcript copied!");
//                     }}
//                     className="mt-3 text-sm px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition"
//                   >
//                     Copy Transcript
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="flex flex-col justify-center items-center h-full text-center text-slate-500 dark:text-slate-400">
//               <Play className="w-10 h-10 mb-3" />
//               <p>Upload a video to preview and transcribe.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useCallback } from 'react';

// // Mock transcript data
// const MOCK_TRANSCRIPT = `[00:00:00] Welcome to our AI Video Transcription Tool demonstration.

// [00:00:05] This is a sample transcript generated by our powerful Assembly AI integration.

// [00:00:15] The technology uses advanced machine learning algorithms to accurately convert speech to text.

// [00:00:25] You can upload videos in various formats including MP4, MOV, AVI, and more.

// [00:00:35] The transcription process is fast, reliable, and provides timestamps for easy navigation.

// [00:00:45] Thank you for using our AI Video Transcription service!`;

// const AIVideoTranscriber = () => {
//   const [isUploading, setIsUploading] = useState(false);
//   const [isUploadSuccess, setIsUploadSuccess] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const [file, setFile] = useState(null);

//   // Handle file upload
//   const handleFileUpload = useCallback((selectedFile) => {
//     if (selectedFile) {
//       setFile(selectedFile);
//       setIsUploading(true);
      
//       // Simulate upload process
//       setTimeout(() => {
//         setIsUploading(false);
//         setIsUploadSuccess(true);
        
//         // Reset success message after 3 seconds
//         setTimeout(() => {
//           setIsUploadSuccess(false);
//         }, 3000);
//       }, 2000);
//     }
//   }, []);

//   // Handle drag and drop
//   const handleDrop = useCallback((e) => {
//     e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile && droppedFile.type.startsWith('video/')) {
//       handleFileUpload(droppedFile);
//     }
//   }, [handleFileUpload]);

//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//   }, []);

//   // Handle file input change
//   const handleFileInput = useCallback((e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       handleFileUpload(selectedFile);
//     }
//   }, [handleFileUpload]);

//   // Generate transcript
//   const generateTranscript = useCallback(() => {
//     setIsGenerating(true);
    
//     // Simulate API call to Assembly AI
//     setTimeout(() => {
//       setTranscript(MOCK_TRANSCRIPT);
//       setIsGenerating(false);
//     }, 3000);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
//       {/* Navbar */}
     

//       {/* Hero Section */}
//       <section className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
//             Upload Your Video & Get Instant Transcript
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
//             Powered by Assembly AI — Accurate, Fast, and Intelligent Video Transcription.
//           </p>

//           {/* Video Upload Section */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl">
//             {/* Upload Area */}
//             <div
//               className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
//                 isUploading 
//                   ? 'border-blue-400 bg-blue-50' 
//                   : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
//               }`}
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onClick={() => document.getElementById('file-input').click()}
//             >
//               {isUploading ? (
//                 <div className="flex flex-col items-center justify-center">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
//                   <p className="text-lg font-medium text-gray-700">Uploading...</p>
//                 </div>
//               ) : (
//                 <>
//                   <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
//                     <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                   </div>
//                   <p className="text-xl font-semibold text-gray-700 mb-2">
//                     Drag and drop your video file here
//                   </p>
//                   <p className="text-gray-500 mb-4">or</p>
//                   <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
//                     Choose File
//                   </button>
//                   <p className="text-sm text-gray-400 mt-4">
//                     Supports MP4, MOV, AVI, and other video formats
//                   </p>
//                 </>
//               )}
//             </div>

//             {/* Hidden file input */}
//             <input
//               id="file-input"
//               type="file"
//               accept="video/*"
//               onChange={handleFileInput}
//               className="hidden"
//             />

//             {/* Upload Success Notification */}
//             {isUploadSuccess && (
//               <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-center animate-fade-in">
//                 <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//                 <span className="text-green-700 font-medium">Upload Successful!</span>
//               </div>
//             )}

//             {/* File Info */}
//             {file && !isUploading && (
//               <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                 <p className="text-gray-700">
//                   <span className="font-semibold">Selected file:</span> {file.name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Generate Transcript Button */}
//           {file && !isUploading && (
//             <div className="text-center mb-8">
//               <button
//                 onClick={generateTranscript}
//                 disabled={isGenerating}
//                 className={`px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
//                   isGenerating
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
//                 } text-white shadow-lg`}
//               >
//                 {isGenerating ? (
//                   <div className="flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
//                     Generating Transcript...
//                   </div>
//                 ) : (
//                   'Generate Transcript'
//                 )}
//               </button>
//             </div>
//           )}

//           {/* Transcript Section */}
//           {transcript && (
//             <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//                 Your Transcript
//               </h2>
//               <div className="bg-gray-100 rounded-lg p-6 max-h-96 overflow-y-auto">
//                 <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed">
//                   {transcript}
//                 </pre>
//               </div>
//               <div className="mt-4 flex justify-center space-x-4">
//                 <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200">
//                   Download Transcript
//                 </button>
//                 <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
//                   Copy to Clipboard
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
     
//     </div>
//   );
// };

// export default AIVideoTranscriber;



import React, { useState, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig"; // ✅ your Firebase config path

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
      const response = await fetch("http://localhost:5000/transcribe", {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Upload Your Video & Get Instant Transcript
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
            Powered by Assembly AI — Accurate, Fast, and Intelligent Video Transcription.
          </p>

          {/* Upload Section */}
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300 hover:shadow-2xl`}
          >
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
                isUploading
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
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
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
                className={`px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                  isGenerating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105"
                } text-white shadow-lg`}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Generating Transcript...
                  </div>
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
