/**
 * Currículo — Laercio Wasques
 * Gráficos alinhados ao perfil de Controladoria
 */

const SKILLS_BARS = [
  { label: "Demonstrações financeiras", value: 95 },
  { label: "Fechamento e reporte", value: 93 },
  { label: "SAP / Oracle / Protheus", value: 90 },
  { label: "Gestão de custos", value: 88 },
  { label: "Auditoria e controles", value: 87 },
  { label: "Inglês profissional", value: 85 },
];

const RADAR_LABELS = [
  "Controladoria",
  "Contabilidade",
  "Custos",
  "Automação",
  "Auditoria",
  "Projetos",
];

const RADAR_DATA = [95, 92, 90, 88, 87, 86];

const GOLD = "#b5a67c";
const GOLD_RGBA = "rgba(181, 166, 124, 0.35)";

function renderSkillBars() {
  const container = document.getElementById("skillBars");
  if (!container) return;

  container.innerHTML = SKILLS_BARS.map(
    (skill) => `
    <div class="skill-bar-item">
      <div class="skill-bar-header">
        <span>${skill.label}</span>
        <span>${skill.value}%</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" data-value="${skill.value}" role="progressbar" aria-valuenow="${skill.value}" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  `
  ).join("");
}

function animateSkillBars() {
  const fills = document.querySelectorAll(".skill-bar-fill");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const value = el.getAttribute("data-value");
        requestAnimationFrame(() => {
          el.style.width = `${value}%`;
        });
        observer.unobserve(el);
      });
    },
    { threshold: 0.2 }
  );

  fills.forEach((fill) => observer.observe(fill));
}

function initRadarChart() {
  const canvas = document.getElementById("skillsRadar");
  if (!canvas || typeof Chart === "undefined") return;

  const ctx = canvas.getContext("2d");

  new Chart(ctx, {
    type: "radar",
    data: {
      labels: RADAR_LABELS,
      datasets: [
        {
          label: "Competências",
          data: RADAR_DATA,
          backgroundColor: GOLD_RGBA,
          borderColor: GOLD,
          borderWidth: 2,
          pointBackgroundColor: GOLD,
          pointBorderColor: "#000",
          pointHoverBackgroundColor: "#000",
          pointHoverBorderColor: GOLD,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            color: "#888",
            backdropColor: "transparent",
            font: { size: 10, family: "Montserrat" },
          },
          grid: { color: "rgba(0,0,0,0.08)" },
          angleLines: { color: "rgba(0,0,0,0.08)" },
          pointLabels: {
            color: "#333",
            font: { size: 11, weight: "600", family: "Montserrat" },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#000",
          titleFont: { family: "Montserrat" },
          bodyFont: { family: "Montserrat" },
          callbacks: {
            label: (ctx) => ` ${ctx.parsed.r}%`,
          },
        },
      },
      animation: {
        duration: 1200,
        easing: "easeOutQuart",
      },
    },
  });
}

function animateCounters() {
  const counters = document.querySelectorAll(".stat-value[data-count]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initScrollReveal() {
  const sections = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener("DOMContentLoaded", () => {
  renderSkillBars();
  animateSkillBars();
  initRadarChart();
  animateCounters();
  initScrollReveal();
});
