// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SKILLS = [
  {
    group: "Mobile",
    items: ["Kotlin", "Jetpack Compose", "React Native", "TypeScript", "Expo / EAS", "Android Studio"]
  },
  {
    group: "Backend",
    items: ["Java / Spring Boot", "C# / .NET Core", "Node.js / Express", "REST APIs", "Microservicios"]
  },
  {
    group: "Datos & Cloud",
    items: ["SQL Server", "Firebase / Firestore", "AWS S3 / LocalStack", "Docker", "Data Analysis"]
  },
  {
    group: "IA & Otros",
    items: ["Google Gemini API", "Firebase AI", "Git / GitHub", "MVVM Architecture", "Retrofit / OkHttp"]
  }
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function createTechTags(techArray) {
  return techArray
    .map(t => `<span class="tech-tag">${t}</span>`)
    .join('');
}

// ─── RENDERERS ────────────────────────────────────────────────────────────────
function renderFeaturedProject(project) {
  const href = project.links.frontend || project.links.main;
  return `
    <a href="${href}" target="_blank" rel="noopener" class="project-card featured">
      <div class="project-body">
        <span class="project-icon">${project.icon}</span>
        <div class="project-title">${project.title}</div>
        <p class="project-desc">${project.description}</p>
        <div class="tech-stack">${createTechTags(project.tech)}</div>
      </div>
      <div class="project-diagram">
        <div class="arch-label">Arquitectura del sistema</div>
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
          <div>◎ SQL Server (Persistencia)</div>
          <div>◎ Google Gemini (Análisis IA)</div>
        </div>
      </div>
      <span class="project-link">↗</span>
    </a>
  `;
}

function renderProject(project) {
  const href = project.links.main || Object.values(project.links)[0];
  return `
    <a href="${href}" target="_blank" rel="noopener" class="project-card">
      <span class="project-icon">${project.icon}</span>
      <div class="project-title">${project.title}</div>
      <p class="project-desc">${project.description}</p>
      <div class="tech-stack">${createTechTags(project.tech)}</div>
      <span class="project-link">↗</span>
    </a>
  `;
}

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
  // Load projects
  const res = await fetch('./data/projects.json');
  const projects = await res.json();

  const grid = document.getElementById('projects-grid');
  grid.innerHTML = projects
    .map(p => p.featured ? renderFeaturedProject(p) : renderProject(p))
    .join('');

  // Render skills
  document.getElementById('skills-grid').innerHTML = renderSkills();
}

document.addEventListener('DOMContentLoaded', init);
