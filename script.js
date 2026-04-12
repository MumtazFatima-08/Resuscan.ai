let lastData = null;

const fileInp = document.getElementById('fileInp');
fileInp.onchange = () => { if(fileInp.files[0]) document.getElementById('file-name').innerText = fileInp.files[0].name; };

async function startAnalysis() {
    if(!fileInp.files[0]) return alert("Select a PDF first!");
    const fd = new FormData(); fd.append('file', fileInp.files[0]);

    // Reset UI
    document.getElementById('bar').style.width = "100%";
    document.getElementById('status-text').innerText = "Processing Data...";

    try {
        const res = await fetch('http://127.0.0.1:5000/analyze', { method: 'POST', body: fd });
        const data = await res.json();
        if(data.error) return alert(data.error);

        lastData = data;
        
        // Trigger Confetti for high scores!
        if(data.score > 70) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#06b6d4', '#a855f7'] });
        }

        // Update UI
        document.getElementById('score-val').innerText = data.score + "%";
        document.getElementById('suggestions-box').innerHTML = data.suggestions.map(s => `• ${s}`).join('<br>');
        document.getElementById('skills-list').innerHTML = data.skills_found.map(s => `<span class="tag tag-green">${s.toUpperCase()}</span>`).join('');
        document.getElementById('missing-list').innerHTML = data.skills_missing.map(s => `<span class="tag tag-red">${s.toUpperCase()}</span>`).join('');
        
        // PII Masking Preview
        document.getElementById('preview-text').innerHTML = `<p style="font-size:8px; color:#4ade80; padding:15px; text-align:left;">${data.masked_preview}...</p>`;
        document.getElementById('status-text').innerText = "Verified & Protected ✅";

        // Save to History (Basic LocalStorage)
        saveToHistory(fileInp.files[0].name, data.score);

    } catch (e) { alert("Server Error. Check if Python is running!"); }
}

function saveToHistory(name, score) {
    const historyList = document.getElementById('history-list');
    const date = new Date().toLocaleDateString();
    if(historyList.innerText.includes("No recent")) historyList.innerHTML = "";
    historyList.innerHTML += `<div style="padding:10px; border-bottom:1px solid rgba(255,255,255,0.05); display:flex; justify-content:space-between;">
        <span>${name}</span> <strong>${score}%</strong> <span>${date}</span>
    </div>`;
}

function downloadReport() {
    if(!lastData) return alert("Analyze first!");
    const content = `RESUSCAN REPORT\nDomain: ${lastData.domain}\nScore: ${lastData.score}%\n\nSuggestions:\n${lastData.suggestions.join('\n')}`;
    const blob = new Blob([content], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = "Resume_Analysis.txt"; a.click();
}