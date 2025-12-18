const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalContent = $("#modalContent");
const sideLinks = $("#sideLinks");
const openRawBtn = $("#openRaw");

let currentKey = "about";
const contentMap = {
  about: { title: "אודות 🧩", file: "content/about.html" },
  curriculum: { title: "מסלולים 📚", file: "content/curriculum.html" },
  methods: { title: "שיטה 🧪", file: "content/methods.html" },
  deck: { title: "דק קלפים 🃏", file: "content/deck.html" },
};

function setStamp() {
  const stamp = $("#timeStamp");
  const buildStamp = $("#buildStamp");
  if (!stamp && !buildStamp) return;

  const now = new Date();
  const opts = {
    timeZone: "Asia/Jerusalem",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const pretty = now.toLocaleString("he-IL", opts);

  if (stamp) {
    stamp.textContent = `🕰️ עודכן: ${pretty} (Asia/Jerusalem) • 📅 י״ט דצמבר? לא — 18.12.2025 • 📅 כ״ז בכסלו תשפ״ו`;
  }
  if (buildStamp) {
    buildStamp.textContent = "Build: 18.12.2025";
  }
}

function initStampInterval() {
  if (!$("#timeStamp") && !$("#buildStamp")) return;
  setStamp();
  setInterval(setStamp, 1000);
}

function buildSideLinks() {
  if (!sideLinks) return;
  sideLinks.innerHTML = "";
  Object.keys(contentMap).forEach((key) => {
    const button = document.createElement("button");
    button.textContent = contentMap[key].title;
    button.addEventListener("click", () => openModal(key));
    sideLinks.appendChild(button);
  });
}

async function openModal(key) {
  if (!modal || !modalTitle || !modalContent) return;
  const meta = contentMap[key];
  if (!meta) return;

  currentKey = key;
  modalTitle.textContent = meta.title;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  buildSideLinks();

  try {
    const res = await fetch(meta.file, { cache: "no-store" });
    if (!res.ok) throw new Error(`Cannot load ${meta.file}`);
    const html = await res.text();
    modalContent.innerHTML = html;
    if (openRawBtn) {
      openRawBtn.onclick = () => window.open(meta.file, "_blank");
    }
  } catch (err) {
    modalContent.innerHTML = `<p class="muted">לא הצלחתי לטעון את התוכן (${meta.file}).</p>`;
    // eslint-disable-next-line no-console
    console.error(err);
  }
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

function setupModal() {
  if (!modal) return;
  $$('[data-open]').forEach((el) => {
    const key = el.getAttribute("data-open");
    if (!contentMap[key]) return;
    el.addEventListener("click", () => openModal(key));
  });

  $$('[data-close]').forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function setupCopyLink() {
  const copyBtn = $("#copyLink");
  if (!copyBtn) return;
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyBtn.textContent = "הועתק ✅";
      setTimeout(() => (copyBtn.textContent = "העתק לינק 🔗"), 1200);
    } catch (err) {
      copyBtn.textContent = "שגיאה";
      setTimeout(() => (copyBtn.textContent = "העתק לינק 🔗"), 1200);
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });
}

function setupDirToggle() {
  const toggleBtn = $("#toggleDir");
  if (!toggleBtn) return;
  toggleBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const dir = html.getAttribute("dir") || "rtl";
    const next = dir === "rtl" ? "ltr" : "rtl";
    html.setAttribute("dir", next);
    html.setAttribute("lang", next === "rtl" ? "he" : "en");
  });
}

async function loadCurriculumStats() {
  const statTracks = $("#statTracks");
  const statLessons = $("#statLessons");
  if (!statTracks && !statLessons) return;

  try {
    const res = await fetch("assets/data/curriculum.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Missing curriculum data");
    const data = await res.json();
    if (statTracks) statTracks.textContent = data.tracks?.length || 4;
    if (statLessons) {
      const lessons = (data.tracks || []).reduce((acc, track) => acc + (track.items?.length || 0), 0);
      statLessons.textContent = lessons || 12;
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("Using static fallback for stats", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initStampInterval();
  setupModal();
  setupCopyLink();
  setupDirToggle();
  loadCurriculumStats();
});
