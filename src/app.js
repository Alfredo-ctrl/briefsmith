const input = document.querySelector("#ideaInput");
const buildButton = document.querySelector("#buildBrief");
const exampleButton = document.querySelector("#loadExample");
const example = input.value;
let uiLang = "en";

const uiCopy = {
  en: {
    brand: "BriefSmith",
    briefNav: "Brief",
    exportNav: "Export",
    eyebrow: "AI project planning tool",
    headline: "Turn a messy idea into a buildable project brief.",
    lede: "BriefSmith extracts the user, problem, AI angle, MVP scope, risks, and next steps from rough notes. It is built for students, builders, and portfolio projects that need clarity fast.",
    briefScore: "Brief score",
    scoreStrong: "Strong enough to prototype.",
    scoreWeak: "Needs a little more detail.",
    roughIdea: "Rough Idea",
    loadExample: "Load Example",
    buildBrief: "Build Brief",
    promise: "Promise",
    audience: "Audience",
    aiAngle: "AI Angle",
    mvpScope: "MVP Scope",
    risks: "Risks"
  },
  es: {
    brand: "BriefSmith",
    briefNav: "Brief",
    exportNav: "Exportar",
    eyebrow: "Planeador de proyectos IA",
    headline: "Convierte una idea caotica en un brief construible.",
    lede: "BriefSmith extrae usuario, problema, angulo de IA, MVP, riesgos y siguientes pasos desde notas sueltas. Esta pensado para estudiantes, builders y proyectos de portfolio.",
    briefScore: "Puntaje",
    scoreStrong: "Listo para prototipar.",
    scoreWeak: "Necesita un poco mas de detalle.",
    roughIdea: "Idea cruda",
    loadExample: "Cargar ejemplo",
    buildBrief: "Crear brief",
    promise: "Promesa",
    audience: "Audiencia",
    aiAngle: "Angulo IA",
    mvpScope: "Alcance MVP",
    risks: "Riesgos"
  }
};

function applyUiLanguage(nextLang) {
  uiLang = nextLang;
  document.documentElement.lang = uiLang;
  const toggle = document.querySelector(".language-switch");
  if (toggle) toggle.setAttribute("aria-pressed", String(uiLang === "es"));
  document.querySelectorAll("[data-i18n]").forEach(node => {
    const value = uiCopy[uiLang][node.dataset.i18n];
    if (value) node.textContent = value;
  });
  render();
}

function render() {
  const brief = window.BriefSmith.buildBrief(input.value);
  const text = window.BriefSmith.formatBrief(brief);

  document.querySelector("#score").textContent = brief.score;
  document.querySelector("#scoreText").textContent = brief.score >= 80 ? uiCopy[uiLang].scoreStrong : uiCopy[uiLang].scoreWeak;
  document.querySelector("#briefTitle").textContent = brief.title;
  document.querySelector("#lensTag").textContent = brief.lens;
  document.querySelector("#promise").textContent = brief.promise;
  document.querySelector("#audience").textContent = brief.audience;
  document.querySelector("#aiAngle").textContent = brief.aiAngle;
  renderList("#mvp", brief.mvpScope);
  renderList("#risks", brief.risks);
  document.querySelector("#textOutput").textContent = text;
}

function renderList(selector, items) {
  const target = document.querySelector(selector);
  target.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    target.appendChild(li);
  });
}

buildButton.addEventListener("click", render);
exampleButton.addEventListener("click", () => {
  input.value = example;
  render();
});

document.querySelector(".language-switch")?.addEventListener("click", () => {
  applyUiLanguage(uiLang === "en" ? "es" : "en");
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.16 });

document.querySelectorAll("[data-reveal]").forEach(node => revealObserver.observe(node));
applyUiLanguage(uiLang);
render();
