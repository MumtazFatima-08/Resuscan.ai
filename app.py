from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
import io
import re

app = Flask(__name__)
CORS(app)

# Enhanced Skill Sets
SKILL_DATA = {
    "tech": ["python", "machine learning", "fastapi", "aws", "react", "javascript", "sql", "pytorch", "tensorflow"],
    "marketing": ["seo", "google analytics", "meta ads", "branding", "copywriting", "content strategy"],
    "design": ["figma", "ui/ux", "adobe xd", "photoshop", "canva", "prototyping"]
}

def mask_pii(text):
    text = re.sub(r'[\w\.-]+@[\w\.-]+', "[EMAIL MASKED]", text)
    text = re.sub(r'\+?\d{10,12}', "[PHONE MASKED]", text)
    return text

@app.route("/analyze", methods=["POST"])
def analyze():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    try:
        reader = PyPDF2.PdfReader(io.BytesIO(file.read()))
        text = "".join([page.extract_text().lower() for page in reader.pages])

        if not any(m in text for m in ["education", "experience", "skills"]):
            return jsonify({"error": "This doesn't look like a professional resume."}), 400

        # Analysis Logic
        detected_skills = [s for s in (SKILL_DATA["tech"] + SKILL_DATA["marketing"] + SKILL_DATA["design"]) if s in text]
        
        # Smart Roadmap
        suggestions = ["💡 Tip: Keep it under 2 pages."]
        if any(s in text for s in SKILL_DATA["tech"]):
            domain = "Tech"
            suggestions.append("🚀 Tech Roadmap: Learn Cloud Deployment (AWS/Azure) next.")
            suggestions.append("🚀 Tip: Highlight your GitHub projects prominently.")
        elif any(s in text for s in SKILL_DATA["marketing"]):
            domain = "Marketing"
            suggestions.append("📈 Marketing Roadmap: Get certified in Google Search Ads.")
            suggestions.append("📈 Tip: Use hard numbers (e.g., 20% growth).")
        else:
            domain = "General"
            suggestions.append("✍️ Tip: Use industry-specific power verbs.")

        score = min(max(int((len(detected_skills) / 10) * 100), 20), 98)

        return jsonify({
            "score": score,
            "skills_found": detected_skills[:10],
            "skills_missing": ["Docker", "Kubernetes", "Redis"] if domain == "Tech" else ["Market Research", "SEO"],
            "suggestions": suggestions,
            "masked_preview": mask_pii(text[:350]),
            "domain": domain
        })
    except:
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)