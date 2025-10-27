# 🎬 Full-Stack Engineer — Evaluation Task  
## Project: VT-Project (AI Video Transcriber)

---

### 🧠 **Goal**

Build a simple web app that lets a user upload a video (≤ 250 MB) via a drop zone, saves it to **Firebase Storage**, transcribes the video via **AssemblyAI**, displays the transcript on the same page, and is hosted publicly.  

This project evaluates **end-to-end full-stack skills** — frontend development, cloud storage integration, transcription API integration, deployment, and documentation.

---
## 🖼️ **Screenshots**

Below are a few screenshots demonstrating the app flow — from upload to transcription output.

### 🔹 Upload Page  
_User uploads a video using the drag-and-drop zone._

<img width="1366" height="768" alt="1st-Ui-Ss" src="https://github.com/user-attachments/assets/f63ccf8b-1de4-4b15-9ffd-216c9b810744" />

---

### 🔹 Upload Progress  
_Real-time upload progress shown with a progress bar._
<img width="1366" height="768" alt="2nd-ui-Ss" src="https://github.com/user-attachments/assets/050310d3-d6a9-4d96-ae9f-79351193dbbe" />

### 🔹 Upload Video with Firebase 
_Real-time upload progress shown with a progress bar._

<img width="1366" height="768" alt="3rd-Ui-Ss" src="https://github.com/user-attachments/assets/84971b6a-5e06-47e4-86d2-67f61028b233" />


### 🔹 Upload Video Done
_Once transcription is complete, the full text appears below._

<img width="1366" height="768" alt="4th-Ui-Ss" src="https://github.com/user-attachments/assets/f85fb2e1-ae5a-4777-b7d0-6984d0ee8268" />


### 🔹 Upload Video 
_Once transcription is complete, the full text appears below._
<img width="1366" height="768" alt="5th-Ui-Ss" src="https://github.com/user-attachments/assets/71b088bf-a0f3-4c2f-ab01-6dcf8428760c" />

### 🔹 Generate Text Start
_Once transcription is complete, the full text appears below._
<img width="1366" height="768" alt="6th-Ui-Ss" src="https://github.com/user-attachments/assets/0b3fae67-3cc8-4190-81c9-23f6f8ef3088" />

### 🔹 Generate Text Complete Just copy the text and Download the txt file
_Once transcription is complete, the full text appears below._
<img width="1366" height="768" alt="7th-ui-Ss" src="https://github.com/user-attachments/assets/ee559a3e-31c7-4c29-8272-1e292513cf8f" />

---

## ✅ **Deliverables**

1. ✅ **Public GitHub Repository:** [VT-Project Frontend (React)](https://github.com/mohammadarbaab/VT-Project)  
2. ✅ **Working Live App:** [https://vt-project-du6f.onrender.com](https://vt-project-du6f.onrender.com)  
3. ✅ **Connected Backend:** [https://vt-backend-production.up.railway.app](https://vt-backend-production.up.railway.app)  
4. ✅ **Comprehensive README & Checklist**  
5. 🎥 **Demo Video (Optional)** — showing upload → transcription flow  

---

## 🧩 **Functional Requirements**

### 1️⃣ Web Page / UI
- Single-page React UI with a **Drag & Drop Zone** + fallback file picker.  
- Accepts **only video files** up to **250MB**.  
- Shows **upload progress bar** during upload.  
- Displays **Firebase video URL** once uploaded.  
- Includes **“Generate Transcript”** button to start transcription.  
- Displays the **full transcript** dynamically on the same page.  
- Fully responsive UI using **Tailwind CSS**.  

---

### 2️⃣ Upload & Storage
- Implemented via **Firebase Storage** using Firebase SDK v9.  
- Video uploads securely to Firebase bucket.  
- Returns a public download URL once uploaded.  
- Unauthenticated uploads used for evaluation (security tradeoffs documented below).  
- URL automatically passed to backend for transcription.  

---

### 3️⃣ Transcription
- After upload, the frontend sends the Firebase video URL to the backend.  
- Backend (Express.js on Railway) sends the video URL to **AssemblyAI** for transcription.  
- Once complete, the transcript text is returned and displayed on-screen.  
- Includes user-friendly error messages for any failed steps.  

---

### 4️⃣ Hosting
- **Frontend hosted on Render:** [https://vt-project-du6f.onrender.com](https://vt-project-du6f.onrender.com)  
- **Backend hosted on Railway:** [https://vt-backend-production.up.railway.app](https://vt-backend-production.up.railway.app)  
- Both connected via environment variables.  

---

## 🧱 **Tech Stack**

| Layer | Technology |
|-------|-------------|
| **Frontend Framework** | React.js |
| **Styling** | Tailwind CSS |
| **Cloud Storage** | Firebase Storage |
| **Transcription API** | AssemblyAI |
| **Backend API** | Node.js + Express |
| **Deployment** | Render (Frontend), Railway (Backend) |
