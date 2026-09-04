# ResuScan.ai 📄

A resume analysis web application that extracts information from PDF resumes, identifies relevant skills, calculates an ATS-style score, and provides suggestions for improvement.

## Overview

ResuScan.ai is a lightweight project focused on automating basic resume analysis. It combines PDF text extraction with rule-based checks to turn a resume into a structured set of results.

## Features

- 📄 Upload PDF resumes
- ✅ Basic resume validation
- 🧠 Detect relevant skills from resume content
- ❌ Identify missing skills
- 📊 Generate an ATS-style score
- 💡 Provide improvement suggestions
- 🎨 Web-based user interface

## How It Works

```text
PDF Resume
    ↓
Text Extraction
    ↓
Resume Validation
    ↓
Skills & Section Analysis
    ↓
Score Calculation
    ↓
Suggestions & Results
```

The backend extracts text from the uploaded PDF using PyPDF2 and analyzes the extracted content using the application's configured checks and skill patterns.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **PDF Processing:** PyPDF2

## Project Structure

```text
Resuscan.ai/
│
├── backend/
│   └── app.py
├── frontend/
│   └── ...
└── README.md
```

## Run Locally

### 1. Start the backend

```bash
cd backend
python app.py
```

### 2. Start the frontend

In a separate terminal:

```bash
cd frontend
python -m http.server 5500
```

Open:

```text
http://127.0.0.1:5500
```

## Limitations

ResuScan.ai is a project-level resume analyzer rather than a full ATS or production-grade recruitment system.

Its analysis can be limited by:

- PDF formatting and extraction quality
- Resume wording and variations in skill names
- Rule-based scoring
- Lack of semantic understanding of job descriptions

The ATS-style score should therefore be treated as an indicative score, not an actual score from a commercial ATS platform.

## Future Improvements

- NLP-based semantic resume analysis
- Job-description matching
- More robust scoring and evaluation
- Resume history and comparison
- Improved extraction for complex PDF layouts
- LLM-assisted suggestions
- Public deployment

## Author

**Mumtaz Fatima**

CSE (AI & ML) Student
