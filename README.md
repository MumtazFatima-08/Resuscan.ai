# ResuScan.ai 📄

> **Analyze your resume. Find the gaps. Improve your chances.**

ResuScan.ai is a lightweight web-based resume analyzer that extracts text from PDF resumes, checks resume content against configured rules and skill patterns, generates an ATS-style score, and provides actionable improvement suggestions.

## ✨ What It Does

- 📄 Accepts PDF resumes for analysis
- 🔎 Extracts and processes resume text
- ✅ Performs basic resume validation
- 🧠 Detects relevant skills from resume content
- ❌ Highlights missing skills
- 📊 Generates an ATS-style score
- 💡 Provides resume improvement suggestions
- 🌐 Presents results through a simple web interface

## 🔄 How It Works

```text
        PDF Resume
             │
             ▼
      Text Extraction
             │
             ▼
     Resume Validation
             │
             ▼
   Skills & Content Checks
             │
             ▼
      Score Calculation
             │
             ▼
     Suggestions & Results
```

The Flask backend receives the uploaded PDF, extracts its text using **PyPDF2**, and applies the application's configured checks and skill patterns to produce the analysis results.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Python, Flask |
| PDF Processing | PyPDF2 |

## 📁 Project Structure

```text
Resuscan.ai/
│
├── backend/
│   └── app.py
│
├── frontend/
│   └── ...
│
└── README.md
```

## 🚀 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/MumtazFatima-08/Resuscan.ai.git
cd Resuscan.ai
```

### 2. Start the backend

```bash
cd backend
python -m venv .venv
```

**Windows:**

```bash
.venv\Scripts\activate
```

Install dependencies and start the Flask application:

```bash
pip install -r requirements.txt
python app.py
```

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
python -m http.server 5500
```

Then open:

```text
http://127.0.0.1:5500
```

## ⚠️ Limitations

ResuScan.ai is a **project-level resume analysis tool**, not a commercial ATS or production recruitment platform.

The results can be affected by:

- PDF formatting and text extraction quality
- Different ways of writing or naming skills
- Rule-based scoring limitations
- Lack of semantic job-description understanding

The generated ATS-style score should therefore be treated as an **indicative project score**, not as a score produced by a real commercial ATS.

## 🔮 Future Improvements

- NLP-based semantic resume analysis
- Job-description matching
- More robust scoring and evaluation
- Resume history and side-by-side comparison
- Better handling of complex PDF layouts
- LLM-assisted, context-aware suggestions
- Public deployment

## 👤 Author

**Mumtaz Fatima**  
CSE (AI & ML) Student
