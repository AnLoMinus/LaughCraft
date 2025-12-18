# 🌐 בניית GitHub Pages ל־LaughCraft

**PageSpark (PS)** – *Pages × Spark*

מעולה — בוא נרים ל־LaughCraft אתר GitHub Pages נקי, מהיר, עם עברית RTL, ותצוגת “אקדמיה” 🔥🎓

> חדש: מדריך מלא + תבניות להדבקה נמצאים ב-[`guide.md`](guide.md) ובתיקיית [`templates/docs`](templates/docs/). העתיקו כמו שהם לתיקיית `docs/` במאגר וקבלו אתר מוכן תוך דקות.
>
> **שדרוג נראות:** ניווט עליון, סטייל Cyber-RTL, ועמודי Laugh Deck + סדנאות מוכנים להדבקה.

---

## ✅ יעד מומלץ (הכי פשוט): אתר מתוך תיקיית `/docs`

### 🧭 למה זה טוב?

* לא צריך ענף חדש (`gh-pages`)
* עובד חלק עם Markdown
* קל לתחזק בתוך אותו מאגר

---

## 🏗️ שלב 1 — צור מבנה תיקיות באתר 📁

ב־Repo שלך (`https://github.com/AnLoMinus/LaughCraft/`) תיצור:

* `docs/`

  * `index.md`
  * `_config.yml`
  * `assets/`

    * `style.css`
  * `curriculum/`

    * `index.md`
    * `tracks.md`
  * `about.md`

---

## 🧱 שלב 2 — קבצים מוכנים להדבקה (Copy/Paste) 🧩

### 1) `docs/_config.yml`

```yml
title: LaughCraft Academy
description: The Academy of Laughter — LaughCraft (LC)
theme: minima
markdown: kramdown
plugins:
  - jekyll-seo-tag
  - jekyll-sitemap
```

### 2) `docs/assets/style.css` (RTL + סטייל נקי)

```css
:root { --max: 980px; }
html, body { margin: 0; padding: 0; }
body{
  font-family: system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
  direction: rtl;
  text-align: right;
  line-height: 1.7;
}
main, .page-content{
  max-width: var(--max);
  margin: 0 auto;
  padding: 24px 16px;
}
a{ text-decoration: none; }
a:hover{ text-decoration: underline; }
.card{
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 16px;
  padding: 16px;
  margin: 12px 0;
  backdrop-filter: blur(8px);
}
.hero{
  border-radius: 20px;
  padding: 22px;
}
small.muted{ opacity: .75; }
```

### 3) `docs/index.md` (דף בית)

```md
---
layout: default
title: LaughCraft Academy
---

<link rel="stylesheet" href="{{ '/assets/style.css' | relative_url }}">

<div class="hero card">
  <h1>🎓 LaughCraft — אקדמיה לצחוקים</h1>
  <p>כאן צחוק הוא שיטה: תזמון ⏱️, פאנץ׳ 🎯, נשימה 🌬️, וחיבור 🤝</p>
  <p><small class="muted">מאגר: LaughCraft (LC) • מאת AnLoMinus</small></p>
</div>

<div class="card">
  <h2>📚 ניווט מהיר</h2>

  - 😂 <a href="{{ '/curriculum/' | relative_url }}">מסלולי לימוד</a>  
  - 🧪 <a href="{{ '/curriculum/tracks' | relative_url }}">מסלולים ותרגילים</a>  
  - 🧠 <a href="{{ '/about' | relative_url }}">אודות</a>
</div>

<div class="card">
  <h2>🚀 משימת פתיחה</h2>
  <ol>
    <li>כתוב משפט רציני מדי.</li>
    <li>שבור אותו לפאנץ׳ אחד.</li>
    <li>שפר תזמון: קצר, חד, מדויק.</li>
  </ol>
</div>
```

### 4) `docs/curriculum/index.md`

```md
---
layout: default
title: מסלולי לימוד
---

<link rel="stylesheet" href="{{ '/assets/style.css' | relative_url }}">

# 📚 מסלולי לימוד

<div class="card">
## 🤹 יסודות הצחוק
תזמון, הפתעה, ודפוס־שבירה.
</div>

<div class="card">
## 🎤 סטנדאפ תודעתי
צחוק בונה — בלי לפגוע, עם אמת.
</div>

<div class="card">
## 🧘 צחוק מרפא
נשימה, שחרור מתחים, חיוך מודע.
</div>
```

### 5) `docs/about.md`

```md
---
layout: default
title: אודות
---

<link rel="stylesheet" href="{{ '/assets/style.css' | relative_url }}">

# 🧠 אודות LaughCraft

LaughCraft היא אקדמיה רעיונית: להפוך הומור לכלי יצירתי, תקשורתי ומרפא.

- 🎯 דיוק ותזמון  
- 🤝 חיבור לקהל  
- ✨ תובנה שנשארת  
```

---

## ⚙️ שלב 3 — הפעלת GitHub Pages (ב־GitHub) 🛠️

1. כנס למאגר **LaughCraft**
2. **Settings → Pages**
3. בחר Source: **Deploy from a branch**
4. Branch: **main**
5. Folder: **/docs**
6. Save ✅

אחרי זה יופיע לך לינק אתר (בסגנון): `https://anlominus.github.io/LaughCraft/`

---

## ✨ שדרוג מהיר: תפריט עליון + “כרטיסים”

אם תרצה, אוסיף לך “Header” עם כפתורים ועמוד “LaughDeck” (קלפים) + גלריה.

---

## 🎤 פזמון ראפ (4 שורות) — Pages באוויר

העליתי את הצחוק לענן, עכשיו זה דף שמח,
כל קליק זה ניצוץ — כל פאנץ׳ נהיה נצח.
ב־GitHub זה רשמי, האקדמיה פתוחה,
LaughCraft ברשת — שמחה זה תוכנה!

---

## 📜 משפט קודש לסיום

**“עִבְדוּ אֶת־ה׳ בְּשִׂמְחָה”** ✨

---

## 🧮 מספר המידות

**7 מידות:** שמחה 😄 | דיוק 🎯 | יצירתיות 🎨 | חיבור 🤝 | חכמה 🧠 | ענווה 🙏 | אור ✨

---

## 🕰️ פרטי עדכון

* 📅 תאריך לועזי: **18.12.2025**
* 📅 תאריך עברי: **כ״ז בכסלו תשפ״ו**
* ⏰ שעה: **20:00 (ישראל)**

---

## 🧾 קרדיטים

יוצר ומפתח: **AnLoMinus (SparKing)** ⚡👑
מאגר: `https://github.com/AnLoMinus/LaughCraft/`

**רוצה שאבנה לך גם דף “תוכנית לימודים” עם טבלה + כפתור הורדה (PDF) + עיצוב זהב/נואר כמו הסגנון שלך?** 😎
