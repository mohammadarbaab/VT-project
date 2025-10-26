# 🎬 Full-Stack Engineer — Evaluation Task  
## Project: VT-Project (AI Video Transcriber)

---

### 🧠 **Goal**

Build a simple web app that lets a user upload a video (≤ 250 MB) via a drop zone, saves it to **Firebase Storage**, transcribes the video via **AssemblyAI**, displays the transcript on the same page, and is hosted publicly.  

This project evaluates **end-to-end full-stack skills** — frontend development, cloud storage integration, transcription API integration, deployment, and documentation.

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

---

## ⚙️ **Setup & Run Instructions**

### 🧩 Clone the Repository
```bash
git clone https://github.com/mohammadarbaab/VT-Project.git
cd VT-Project