let currentTheme = 1;

const dummyData = {
    name: "Johnathan Doe",
    title: "Project Management Director",
    phone: "+1 555-010-9988",
    email: "john.doe@example.com",
    summary: "Dynamic Project Director with 10+ years of experience leading multi-million dollar digital initiatives. Expert in Agile methodologies, cross-functional team leadership, and driving 40% year-over-year operational efficiency increases.",
    experience: [
        { position: "Director of Operations", duration: "2018 - Present", description: "Managed 50+ staff across 3 regions, Reduced overhead costs by 22%, Implemented enterprise-level SaaS solutions" },
        { position: "Senior Project Lead", duration: "2014 - 2018", description: "Delivered 12 major products on time, Specialized in stakeholder management, Increased client satisfaction by 15%" }
    ],
    education: [
        { degree: "Master of Business Administration (MBA)", institution: "State Business School", year: "2014" },
        { degree: "B.Sc. Computer Science", institution: "Tech University", year: "2012" }
    ],
    skills: ["Strategic Leadership", "Agile & Scrum", "Risk Management", "Budgeting", "Product Lifecycle", "Stakeholder Relations"]
};

// Initialize preview AND add initial form fields
window.onload = () => {
    previewTheme(1);
    addExperience(); // Add the first empty experience field
    addEducation();  // Add the first empty education field
};

function previewTheme(id) {
    currentTheme = id;
    const themes = ['classic', 'modern', 'minimal', 'corporate', 'elegant'];
    document.body.className = 'theme-' + themes[id - 1];
    
    const previewBox = document.getElementById('livePreview');
    previewBox.innerHTML = buildResumeHTML(dummyData);
    setTimeout(() => autoScaleFont(previewBox), 50);
}

function goToForm() {
    document.getElementById('themeSection').classList.remove('active');
    document.getElementById('formSection').classList.add('active');
}

function goBackToThemes() {
    document.getElementById('formSection').classList.remove('active');
    document.getElementById('themeSection').classList.add('active');
}

// FIXED: Now correctly targets the section IDs
function editData() {
    document.getElementById('resumeSection').classList.remove('active');
    document.getElementById('formSection').classList.add('active');
}

function addExperience() {
    const container = document.getElementById('experienceEntries');
    const div = document.createElement('div');
    div.className = 'entry-card';
    div.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()" style="position:absolute; right:10px; top:10px; background:none; border:none; color:red; cursor:pointer; font-size:1.2rem;">&times;</button>
        <div class="form-group-row">
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="exp-position" placeholder="e.g. Lead Designer" required>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" class="exp-duration" placeholder="e.g. 2020 - Present" required>
            </div>
        </div>
        <div class="form-group">
            <label>Description (comma separated for bullet points)</label>
            <textarea class="exp-desc" rows="2" placeholder="e.g. Led a team of 4, Increased sales by 10%"></textarea>
        </div>
    `;
    container.appendChild(div);
}

function addEducation() {
    const container = document.getElementById('educationEntries');
    const div = document.createElement('div');
    div.className = 'entry-card';
    div.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()" style="position:absolute; right:10px; top:10px; background:none; border:none; color:red; cursor:pointer; font-size:1.2rem;">&times;</button>
        <div class="form-group-row">
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="edu-degree" placeholder="e.g. Bachelor of Science" required>
            </div>
            <div class="form-group">
                <label>Year</label>
                <input type="text" class="edu-year" placeholder="e.g. 2018" required>
            </div>
        </div>
        <div class="form-group">
            <label>Institution</label>
            <input type="text" class="edu-institution" placeholder="e.g. Oxford University" required>
        </div>
    `;
    container.appendChild(div);
}

document.getElementById('resumeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('name').value,
        title: document.getElementById('title').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s),
        experience: Array.from(document.querySelectorAll('#experienceEntries .entry-card')).map(card => ({
            position: card.querySelector('.exp-position').value,
            duration: card.querySelector('.exp-duration').value,
            description: card.querySelector('.exp-desc').value
        })),
        education: Array.from(document.querySelectorAll('#educationEntries .entry-card')).map(card => ({
            degree: card.querySelector('.edu-degree').value,
            year: card.querySelector('.edu-year').value,
            institution: card.querySelector('.edu-institution').value
        }))
    };

    const target = document.getElementById('resume');
    target.style.fontSize = '16px'; 
    target.innerHTML = buildResumeHTML(data);
    
    document.getElementById('formSection').classList.remove('active');
    document.getElementById('resumeSection').classList.add('active');
    
    setTimeout(() => autoScaleFont(target), 100);
});

function buildResumeHTML(data) {
    return `
        <div class="resume-header">
            <h1>${data.name}</h1>
            <h2>${data.title}</h2>
            <p style="font-size:0.9rem">${data.phone} &nbsp; | &nbsp; ${data.email}</p>
        </div>
        
        <div class="res-section-title">Professional Summary</div>
        <p style="text-align: justify;">${data.summary}</p>
        
        <div class="res-section-title">Work Experience</div>
        ${data.experience.map(exp => `
            <div style="margin-bottom:12px">
                <div style="display:flex; justify-content:space-between; font-weight:bold;">
                    <span>${exp.position}</span>
                    <span>${exp.duration}</span>
                </div>
                <ul style="margin-left:20px; font-size:0.95em; margin-top:4px;">
                    ${exp.description.split(',').map(d => d.trim() ? `<li>${d}</li>` : '').join('')}
                </ul>
            </div>
        `).join('')}
        
        <div class="res-section-title">Education</div>
        ${data.education.map(edu => `
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span><strong>${edu.degree}</strong>, ${edu.institution}</span>
                <span>${edu.year}</span>
            </div>
        `).join('')}
        
        <div class="res-section-title">Technical Skills</div>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${data.skills.map(s => `<span style="background:#f1f5f9; padding:4px 10px; border:1px solid #e2e8f0; border-radius:4px; font-size:0.85rem">${s}</span>`).join('')}
        </div>
    `;
}

function autoScaleFont(element) {
    const limit = element.offsetHeight;
    let size = 16;
    while (element.scrollHeight > limit && size > 8) {
        size -= 0.5;
        element.style.fontSize = size + "px";
    }
}

function exportPDF() {
    const element = document.getElementById('resume');
    const opt = {
        margin: 0,
        filename: 'resume_A4.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}