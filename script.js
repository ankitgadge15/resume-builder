let currentTheme = 1;
let experienceCount = 1;
let educationCount = 1;

// Theme Selection Logic
function selectTheme(themeId) {
    currentTheme = themeId;
    
    // Switch sections
    document.getElementById('themeSection').classList.remove('active');
    document.getElementById('formSection').classList.add('active');
    
    // Apply theme class to body
    const themes = ['classic', 'modern', 'minimal', 'corporate', 'elegant'];
    document.body.className = 'theme-' + themes[themeId - 1];
}

// Add Dynamic Experience Fields
function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceEntries');
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <label>Position ${experienceCount}</label>
            <button type="button" class="btn" style="background:#dc3545; color:white; padding:5px 10px;" onclick="this.parentElement.parentElement.remove()">X</button>
        </div>
        <input type="text" class="exp-position" placeholder="Position">
        <label>Duration</label>
        <input type="text" class="exp-duration" placeholder="Duration">
        <label>Description (comma-separated for bullets)</label>
        <textarea class="exp-desc" rows="3" placeholder="Description"></textarea>
    `;
    container.appendChild(div);
}

// Add Dynamic Education Fields
function addEducation() {
    educationCount++;
    const container = document.getElementById('educationEntries');
    const div = document.createElement('div');
    div.className = 'form-group';
    div.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
            <label>Degree ${educationCount}</label>
            <button type="button" class="btn" style="background:#dc3545; color:white; padding:5px 10px;" onclick="this.parentElement.parentElement.remove()">X</button>
        </div>
        <input type="text" class="edu-degree" placeholder="Degree">
        <label>Institution</label>
        <input type="text" class="edu-institution" placeholder="Institution">
        <label>Year</label>
        <input type="text" class="edu-year" placeholder="Year">
    `;
    container.appendChild(div);
}

// Handle Form Submission
document.getElementById('resumeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateResume();
    document.getElementById('formSection').classList.remove('active');
    document.getElementById('resumeSection').classList.add('active');
});

// Generate Resume HTML
function generateResume() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const summary = document.getElementById('summary').value;
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s);

    // Process Experience
    let expHTML = '';
    const expPositions = document.querySelectorAll('.exp-position');
    const expDurations = document.querySelectorAll('.exp-duration');
    const expDescs = document.querySelectorAll('.exp-desc');
    
    for (let i = 0; i < expPositions.length; i++) {
        if(expPositions[i].value) {
            const bullets = expDescs[i].value.split(',').map(b => b.trim() ? `<li>${b.trim()}</li>` : '').join('');
            expHTML += `
                <div class="timeline-item">
                    <h3>${expPositions[i].value}</h3>
                    <p style="font-style:italic; color:#666;">${expDurations[i].value}</p>
                    <ul style="margin-top:5px; margin-left:20px;">${bullets}</ul>
                </div>
            `;
        }
    }

    // Process Education
    let eduHTML = '';
    const eduDegrees = document.querySelectorAll('.edu-degree');
    const eduInstitutions = document.querySelectorAll('.edu-institution');
    const eduYears = document.querySelectorAll('.edu-year');
    
    for (let i = 0; i < eduDegrees.length; i++) {
        if(eduDegrees[i].value) {
            eduHTML += `
                <div style="margin-bottom: 10px;">
                    <p><strong>${eduDegrees[i].value}</strong></p>
                    <p>${eduInstitutions[i].value} <span style="float:right;">${eduYears[i].value}</span></p>
                </div>`;
        }
    }

    // Process Skills
    const skillsHTML = skills.length > 0 ? 
        `<div class="skills-list">
            ${skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
        </div>` : '';

    // Assemble Resume
    // Note: The template literals below use backticks (`) and ${var} syntax
    const resumeHTML = `
        <div class="resume-header">
            <h1>${name}</h1>
            <h2>${title}</h2>
            <p>${phone} | ${email}</p>
        </div>
        
        ${summary ? `
        <div class="summary">
            <h3 style="border-bottom:1px solid #ccc; padding-bottom:5px; margin-bottom:10px;">Professional Summary</h3>
            <p>${summary}</p>
        </div>` : ''}
        
        <div class="experience">
            <h3 style="border-bottom:1px solid #ccc; padding-bottom:5px; margin-bottom:10px;">Experience</h3>
            <div class="timeline">${expHTML}</div>
        </div>
        
        <div class="education">
            <h3 style="border-bottom:1px solid #ccc; padding-bottom:5px; margin-bottom:10px;">Education</h3>
            ${eduHTML}
        </div>
        
        <div class="skills">
            <h3 style="border-bottom:1px solid #ccc; padding-bottom:5px; margin-bottom:10px;">Skills</h3>
            ${skillsHTML}
        </div>
    `;
    
    document.getElementById('resume').innerHTML = resumeHTML;
}

// PDF Export Function
function exportPDF() {
    const element = document.getElementById('resume');
    const opt = {
        margin:       0.5,
        filename:     'my-resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    // Promise-based usage
    html2pdf().set(opt).from(element).save();
}
