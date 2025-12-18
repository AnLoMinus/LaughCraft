const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

const modal = $("#modal");
const modalTitle = $("#modalTitle");
const modalContent = $("#modalContent");
const sideLinks = $("#sideLinks");
const openRawBtn = $("#openRaw");

let currentKey = "about";
let contentMap = {
  about:   { title: "אודות 🧩", file: "./content/about.md" },
  curriculum: { title: "מסלולים 📚", file: "./content/curriculum.md" },
  methods: { title: "שיטה 🧪", file: "./content/methods.md" },
  deck:    { title: "דק קלפים 🃏", file: "./content/deck.md" },
};

function setStamp(){
  const now = new Date();
  const opts = { timeZone: "Asia/Jerusalem", year:"numeric", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit", second:"2-digit" };
  const pretty = now.toLocaleString("he-IL", opts);
  $("#timeStamp").textContent = `🕰️ עודכן: ${pretty} (Asia/Jerusalem) • 📅 י״ט דצמבר? לא — 18.12.2025 • 📅 כ״ז בכסלו תשפ״ו`;
  $("#buildStamp").textContent = "Build: 18.12.2025";
}
setStamp();
setInterval(setStamp, 1000);

function escapeHtml(s){
  return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

/* Markdown mini-renderer (קצר, מהיר, עובד בלי ספריות) */
function mdToHtml(md){
  let lines = md.replace(/\r/g,"").split("\n");

  // code fences
  let html = "";
  let inCode = false;
  let codeLang = "";
  for (let i=0;i<lines.length;i++){
    let line = lines[i];

    const fence = line.match(/^```(.*)$/);
    if (fence){
      if (!inCode){
        inCode = true;
        codeLang = fence[1]?.trim() || "";
        html += `<pre><code data-lang="${escapeHtml(codeLang)}">`;
      } else {
        inCode = false;
        html += `</code></pre>`;
      }
      continue;
    }

    if (inCode){
      html += escapeHtml(line) + "\n";
      continue;
    }

    // headings
    if (/^###\s+/.test(line)) { html += `<h3>${escapeHtml(line.replace(/^###\s+/,""))}</h3>`; continue; }
    if (/^##\s+/.test(line))  { html += `<h2>${escapeHtml(line.replace(/^##\s+/,""))}</h2>`; continue; }
    if (/^#\s+/.test(line))   { html += `<h1>${escapeHtml(line.replace(/^#\s+/,""))}</h1>`; continue; }

    // blockquote
    if (/^>\s+/.test(line)){
      html += `<blockquote>${escapeHtml(line.replace(/^>\s+/,""))}</blockquote>`;
      continue;
    }

    // lists
    if (/^\-\s+/.test(line)){
      // gather contiguous list items
      html += "<ul>";
      while (i < lines.length && /^\-\s+/.test(lines[i])){
        html += `<li>${inlineMd(escapeHtml(lines[i].replace(/^\-\s+/,"")))}</li>`;
        i++;
      }
      i--;
      html += "</ul>";
      continue;
    }

    // numbered lists
    if (/^\d+\.\s+/.test(line)){
      html += "<ol>";
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])){
        html += `<li>${inlineMd(escapeHtml(lines[i].replace(/^\d+\.\s+/,"")))}</li>`;
        i++;
      }
      i--;
      html += "</ol>";
      continue;
    }

    // paragraph
    if (line.trim().length === 0){ html += "<div style='height:8px'></div>"; continue; }
    html += `<p>${inlineMd(escapeHtml(line))}</p>`;
  }

  return html;
}

function inlineMd(s){
  // bold **x**
  s = s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  // italic *x*
  s = s.replace(/\*(.+?)\*/g, "<i>$1</i>");
  // inline code `x`
  s = s.replace(/`(.+?)`/g, "<code>$1</code>");
  // links [t](u)
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank" rel="noreferrer">$1</a>`);
  return s;
}

async function openModal(key){
  currentKey = key;
  const meta = contentMap[key];
  modalTitle.textContent = meta.title;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");

  // side links
  sideLinks.innerHTML = "";
  Object.keys(contentMap).forEach(k=>{
    const b = document.createElement("button");
    b.textContent = contentMap[k].title;
    b.addEventListener("click", ()=>openModal(k));
    sideLinks.appendChild(b);
  });

  // load md
  const res = await fetch(meta.file, { cache: "no-store" });
  const md = await res.text();
  modalContent.innerHTML = mdToHtml(md);

  // open raw
  openRawBtn.onclick = () => window.open(meta.file, "_blank");
}

function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
}

$$("[data-open]").forEach(el=>{
  el.addEventListener("click", ()=>openModal(el.getAttribute("data-open")));
});
$$("[data-close]").forEach(el=>{
  el.addEventListener("click", closeModal);
});
document.addEventListener("keydown", (e)=>{
  if (e.key === "Escape") closeModal();
});

$("#copyLink").addEventListener("click", async ()=>{
  await navigator.clipboard.writeText(window.location.href);
  $("#copyLink").textContent = "הועתק ✅";
  setTimeout(()=>$("#copyLink").textContent = "העתק לינק 🔗", 1200);
});

$("#toggleDir").addEventListener("click", ()=>{
  const html = document.documentElement;
  const dir = html.getAttribute("dir") || "rtl";
  const next = dir === "rtl" ? "ltr" : "rtl";
  html.setAttribute("dir", next);
  html.setAttribute("lang", next === "rtl" ? "he" : "en");
});

async function loadCurriculum(){
  try{
    const res = await fetch("./assets/data/curriculum.json", { cache: "no-store" });
    const data = await res.json();
    $("#statTracks").textContent = data.tracks?.length || 4;
    const lessons = (data.tracks||[]).reduce((acc,t)=>acc+(t.items?.length||0),0);
    $("#statLessons").textContent = lessons || 12;
  } catch(e){
    // נשאר סטטי אם אין קובץ
  }
}
loadCurriculum();