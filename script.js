let currentTheme = 1;
let experienceCount = 1;
let educationCount = 1;

// 1. DUMMY DATA FOR PREVIEW
const dummyData = {
    name: "Johnathan Doe",
    title: "Senior Product Manager",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    summary: "Strategic and data-driven Product Manager with 7+ years of experience leading cross-functional teams to build innovative digital products. Skilled in Agile methodologies, user research, and market analysis.",
    experience: [
        { position: "Product Lead", duration: "2020 - Present", description: "Led a team of 10 developers and designers, Increased user retention by 25% through UX improvements" },
        { position: "Junior Analyst", duration: "2017 - 2020", description: "Conducted market research for new product lines, Assisted in quarterly financial planning" }
    ],
    education: [
        { degree: "MBA", institution: "Harvard Business School", year: "2017" },
        { degree: "B.Sc. Computer Science", institution: "University of Tech", year: "2015" }
    ],
    skills: ["Product Strategy", "Agile/Scrum", "Data Analysis", "Leadership", "Python", "JIRA"]
};

// 2. CORE FUNCTIONS
window.onload = function() {
    previewTheme(1); // Show Classic theme on load
};

function previewTheme(themeId) {
    currentTheme = themeId;
    
    // Apply body class for background vibes
    const themes = ['classic', 'modern', 'minimal', 'corporate', 'elegant'];
    document.body.className = 'theme-' + themes[themeId - 1];

    // Render the dummy data into the preview box
    const html = buildResumeHTML(dummyData);
    document.getElementById('livePreview').innerHTML = html;
}

function goToForm() {
    document.getElementById('themeSection').classList.remove('active');
    document.getElementById('formSection').classList.add('active');
}

function goBackToThemes() {
    document.getElementById('formSection').classList.remove('active');
    document.getElementById('themeSection').classList.add('active');
}

// 3. FORM HANDLING
function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceEntries');
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <label>Position ${experienceCount}</label>
            <button type="button" class="btn" style="background:#dc3545; color:white; padding:2px 8px; font-size:12px;" onclick="this.parentElement.parentElement.remove()">Remove</button>
        </div>
        <input type="text" class="exp-position" placeholder="e.g., Software Engineer">
        <label>Duration</label>
        <input type="text" class="exp-duration" placeholder="e.g., 2021-2023">
        <label>Description</label>
        <textarea class="exp-desc" rows="2" placeholder="e.g., Developed API endpoints..."></textarea>
    `;
    container.appendChild(div);
}

function addEducation() {
    educationCount++;
    const container = document.getElementById('educationEntries');
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <label>Degree ${educationCount}</label>
            <button type="button" class="btn" style="background:#dc3545; color:white; padding:2px 8px; font-size:12px;" onclick="this.parentElement.parentElement.remove()">Remove</button>
        </div>
        <input type="text" class="edu-degree" placeholder="Degree">
        <label>Institution</label>
        <input type="text" class="edu-institution" placeholder="Institution">
        <label>Year</label>
        <input type="text" class="edu-year" placeholder="Year">
    `;
    container.appendChild(div);
}

document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateFinalResume();
    document.getElementById('formSection').classList.remove('active');
    document.getElementById('resumeSection').classList.add('active');
});

// 4. HTML BUILDER (Reusable for both Preview and Final)
function buildResumeHTML(data) {
    // Generate Experience List
    let expHTML = data.experience.map(exp => {
        // Handle bullets if it's a string with commas, or just raw text
        let content = exp.description;
        if(content.includes(',')) {
            content = `<ul style="margin-left:20px; margin-top:5px;">${content.split(',').map(item => `<li>${item.trim()}</li>`).join('')}</ul>`;
        } else {
            content = `<p>${content}</p>`;
        }
        
        return `
            <div class="timeline-item">
                <h3 style="font-size:1.1em; margin-bottom:2px;">${exp.position}</h3>
                <p style="font-style:italic; color:#555; font-size:0.9em; margin-bottom:5px;">${exp.duration}</p>
                ${content}
            </div>
        `;
    }).join('');

    // Generate Education List
    let eduHTML = data.education.map(edu => `
        <div style="margin-bottom: 8px;">
            <p><strong>${edu.degree}</strong></p>
            <p style="font-size:0.9em;">${edu.institution} | ${edu.year}</p>
        </div>
    `).join('');

    // Generate Skills List
    let skillsHTML = data.skills.length > 0 ? 
        `<div style="display:flex; flex-wrap:wrap; gap:8px;">
            ${data.skills.map(s => `<span style="background:#eee; padding:4px 8px; border-radius:4px; font-size:0.85em;">${s}</span>`).join('')}
        </div>` : '';

    return `
        <div class="resume-header">
            <h1 style="margin-bottom:5px;">${data.name}</h1>
            <h2 style="font-size:1.2em; font-weight:normal; margin-bottom:10px;">${data.title}</h2>
            <p style="font-size:0.9em;">${data.phone} | ${data.email}</p>
        </div>
        
        ${data.summary ? `
        <div class="section-block" style="margin-bottom:20px;">
            <h3 style="border-bottom:1px solid #ccc; padding-bottom:5px; margin-bottom:10px; text-transform:uppercase; font-size:1em;">Summary</h3>
            <p>${data.summary}</p>
        </div>` : ''}
        
        <div class="section-block" style="margin-bottom:20px;">
            <h3 style="border-bottom:1px solid #ccc; padding-bottom:5px; margin-bottom:10px; text-transform:uppercase; font-size:1em;">Experience</h3>
            ${expHTML}
        </div>
        
        <div class="section-block" style="margin-bottom:20px;">
            <h3 style="border-bottom:1px solid #ccc; padding-bottom:5px; margin-bottom:10px; text-transform:uppercase; font-size:1em;">Education</h3>
            ${eduHTML}
        </div>
        
        <div class="section-block">
            <h3 style="border-bottom:1px solid #ccc; padding-bottom:5px; margin-bottom:10px; text-transform:uppercase; font-size:1em;">Skills</h3>
            ${skillsHTML}
        </div>
    `;
}

// 5. GENERATE FINAL RESUME FROM FORM
function generateFinalResume() {
    // Scrape data from form
    const formData = {
        name: document.getElementById('name').value,
        title: document.getElementById('title').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s),
        experience: [],
        education: []
    };

    // Scrape Experience
    const expPos = document.querySelectorAll('.exp-position');
    const expDur = document.querySelectorAll('.exp-duration');
    const expDesc = document.querySelectorAll('.exp-desc');
    for(let i=0; i<expPos.length; i++) {
        if(expPos[i].value) {
            formData.experience.push({
                position: expPos[i].value,
                duration: expDur[i].value,
                description: expDesc[i].value
            });
        }
    }

    // Scrape Education
    const eduDeg = document.querySelectorAll('.edu-degree');
    const eduInst = document.querySelectorAll('.edu-institution');
    const eduYear = document.querySelectorAll('.edu-year');
    for(let i=0; i<eduDeg.length; i++) {
        if(eduDeg[i].value) {
            formData.education.push({
                degree: eduDeg[i].value,
                institution: eduInst[i].value,
                year: eduYear[i].value
            });
        }
    }

    // Build and Inject
    document.getElementById('resume').innerHTML = buildResumeHTML(formData);
}

function exportPDF() {
    const element = document.getElementById('resume');
    const opt = {
        margin:       0.5,
        filename:     'resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}