// ─── SKILLS DATA ──────────────────────────────────────────────────────────────
const SKILLS = [
  {
    group: "Mobile",
    items: ["Kotlin", "Jetpack Compose", "React Native", "Expo / EAS", "Android Studio"]
  },
  {
    group: "Backend",
    items: ["Java / Spring Boot", "C# / .NET Core", "Node.js / TypeScript", "Python / Qt", "REST APIs"]
  },
  {
    group: "Databases & Cloud",
    items: ["SQL Server", "Oracle Database", "MySQL", "Firebase / Firestore", "AWS S3 / Lambda"]
  },
  {
    group: "Tools & Practices",
    items: ["Docker", "Git / GitHub", "Scrum / Agile", "Google Cloud Platform", "MVVM Architecture"]
  },
  {
    group: "AI & Other",
    items: ["Google Gemini API", "Firebase AI", "Retrofit / OkHttp", "Room", "FCM Push Notifications"]
  }
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function techTags(arr) {
  return arr.map(t => `<span class="tech-tag">${t}</span>`).join('');
}

// ─── PROJECT RENDERERS ────────────────────────────────────────────────────────
function renderFeaturedProject(p) {
  const href = p.links.frontend || p.links.main || '#';
  return `
    <a href="${href}" target="_blank" rel="noopener" class="project-card featured">
      <div class="project-body">
        <span class="project-icon">${p.icon}</span>
        <div class="project-title">${p.title}</div>
        <p class="project-desc">${p.description}</p>
        <div class="tech-stack">${techTags(p.tech)}</div>
        <div class="project-repo-links">
          <a href="${p.links.frontend}" target="_blank" rel="noopener" class="repo-link">↗ Mobile repo</a>
          <a href="${p.links.backend}" target="_blank" rel="noopener" class="repo-link">↗ Backend repo</a>
        </div>
      </div>
      <div class="project-diagram">
        <div class="arch-label">System Architecture</div>
        <div class="arch-row">
          <span class="arch-box mobile">Android App</span>
          <span class="arch-arrow">←→</span>
          <span class="arch-box backend">.NET Core API</span>
        </div>
        <div class="arch-row" style="margin-left:16px;">
          <span class="arch-arrow" style="transform:rotate(90deg);">↕</span>
        </div>
        <div class="arch-row">
          <span class="arch-box ai">Gemini AI</span>
          <span class="arch-arrow" style="margin-left:12px;">←</span>
          <span class="arch-box db">SQL Server</span>
        </div>
        <div class="arch-detail">
          <div>◎ Kotlin + Jetpack Compose (Mobile)</div>
          <div>◎ C# .NET Core (Backend)</div>
          <div>◎ SQL Server (Persistence)</div>
          <div>◎ Google Gemini (AI Analysis)</div>
          <div>◎ FCM (Push Notifications)</div>
        </div>
      </div>
      <span class="project-link">↗</span>
    </a>
  `;
}

function renderProject(p) {
  const href = p.links.main || '#';
  const linkLabel = p.links.main ? '↗' : '🔒 Private';
  const isPrivate = !p.links.main;
  return `
    <${isPrivate ? 'div' : `a href="${href}" target="_blank" rel="noopener"`} class="project-card${isPrivate ? ' no-link' : ''}">
      <span class="project-icon">${p.icon}</span>
      <div class="project-title">${p.title}</div>
      <p class="project-desc">${p.description}</p>
      <div class="tech-stack">${techTags(p.tech)}</div>
      <span class="project-link">${linkLabel}</span>
    </${isPrivate ? 'div' : 'a'}>
  `;
}

// ─── EXPERIENCE RENDERER ──────────────────────────────────────────────────────
function renderExperience(exp) {
  return `
    <div class="exp-card">
      <div class="exp-header">
        <div>
          <div class="exp-role">${exp.role}</div>
          <div class="exp-company">${exp.company} · ${exp.location}</div>
        </div>
        <div class="exp-period">${exp.period}</div>
      </div>
      <ul class="exp-highlights">
        ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
      <div class="tech-stack" style="margin-top:1rem;">${techTags(exp.tech)}</div>
    </div>
  `;
}

// ─── SKILLS RENDERER ──────────────────────────────────────────────────────────
function renderSkills() {
  return SKILLS.map(({ group, items }) => `
    <div class="skill-group">
      <div class="skill-group-title">${group}</div>
      <ul class="skill-list">
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
async function init() {
  const [projects, experience] = await Promise.all([
    fetch('./data/projects.json').then(r => r.json()),
    fetch('./data/experience.json').then(r => r.json())
  ]);

  // Projects
  document.getElementById('projects-grid').innerHTML = projects
    .map(p => p.featured ? renderFeaturedProject(p) : renderProject(p))
    .join('');

  // Experience
  document.getElementById('experience-list').innerHTML = experience
    .map(renderExperience)
    .join('');

  // Skills
  document.getElementById('skills-grid').innerHTML = renderSkills();
}

document.addEventListener('DOMContentLoaded', init);
