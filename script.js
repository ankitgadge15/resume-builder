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
        { degree: "Master of Business Administration (MBA)", institution: "State Business School", year: "2014" }
    ],
    skills: ["Strategic Leadership", "Agile & Scrum", "Risk Management", "Budgeting"]
};

window.onload = () => {
    previewTheme(1);
    addExperience();
    addEducation();
};

function previewTheme(id) {
    currentTheme = id;
    const themes = ['classic', 'modern', 'minimal', 'corporate', 'elegant'];
    document.body.className = 'theme-' + themes[id - 1];
    const previewBox = document.getElementById('livePreview');
    previewBox.innerHTML = buildResumeHTML(dummyData);
    setTimeout(() => autoScaleFont(previewBox), 50);
}

// Fixed navigation
function goToForm() {
    document.getElementById('themeSection').classList.remove('active');
    document.getElementById('formSection').classList.add('active');
}
function goBackToThemes() {
    document.getElementById('formSection').classList.remove('active');
    document.getElementById('themeSection').classList.add('active');
}
function editData() {
    document.getElementById('resumeSection').classList.remove('active');
    document.getElementById('formSection').classList.add('active');
}

function addExperience() {
    const container = document.getElementById('experienceEntries');
    const div = document.createElement('div');
    div.className = 'entry-card';
    div.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()" style="position:absolute; right:10px; top:10px; background:none; border:none; color:red; cursor:pointer;">&times;</button>
        <div class="form-group-row">
            <input type="text" class="exp-position" placeholder="Job Title" required>
            <input type="text" class="exp-duration" placeholder="Duration" required>
        </div>
        <textarea class="exp-desc" rows="2" placeholder="Responsibilities (comma separated)"></textarea>
    `;
    container.appendChild(div);
}

function addEducation() {
    const container = document.getElementById('educationEntries');
    const div = document.createElement('div');
    div.className = 'entry-card';
    div.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()" style="position:absolute; right:10px; top:10px; background:none; border:none; color:red; cursor:pointer;">&times;</button>
        <div class="form-group-row">
            <input type="text" class="edu-degree" placeholder="Degree" required>
            <input type="text" class="edu-year" placeholder="Year" required>
        </div>
        <input type="text" class="edu-institution" placeholder="Institution" required>
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
            <p>${data.phone} | ${data.email}</p>
        </div>
        <div class="res-section-title">Summary</div>
        <p>${data.summary}</p>
        <div class="res-section-title">Experience</div>
        ${data.experience.map(exp => `
            <div style="margin-bottom:10px">
                <strong>${exp.position}</strong> (${exp.duration})
                <ul style="margin-left:20px; font-size:0.9em">${exp.description.split(',').map(d => `<li>${d.trim()}</li>`).join('')}</ul>
            </div>
        `).join('')}
        <div class="res-section-title">Education</div>
        ${data.education.map(edu => `<p><strong>${edu.degree}</strong> - ${edu.institution} (${edu.year})</p>`).join('')}
        <div class="res-section-title">Skills</div>
        <p>${data.skills.join(', ')}</p>
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
    html2pdf().set({
        margin: 0,
        filename: 'resume.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save();
}