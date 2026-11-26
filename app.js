(function () {
  "use strict";

  const app = document.getElementById("app");
  const EXAMS = window.EXAMS;
  const EXAM_IDS = ["nis", "bil"];

  /* ================= Сақтау (тек осы браузерде) ================= */
  const PROGRESS_KEY = "daiyndyq-progress-v1";
  const TRACKER_KEY = "daiyndyq-tracker-v1";
  const PROFILE_KEY = "daiyndyq-profile-v1";

  function read(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; } catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }

  const loadProgress = () => read(PROGRESS_KEY, {});
  function saveBest(key, score) {
    const p = loadProgress();
    if (!(key in p) || score > p[key]) p[key] = score;
    write(PROGRESS_KEY, p);
  }

  function loadTracker(examId) {
    const all = read(TRACKER_KEY, {});
    const t = all[examId] || {};
    // Емтихан күні тұрақты: тек data/tasks.js ішіндегі examDate алынады
    return { date: EXAMS[examId].examDate, days: t.days || {}, todos: t.todos || [], ubs: t.ubs || [], week: trimWeek(t.week || {}), done: t.done || {} };
  }
  function trimWeek(week) {
    const out = {};
    Object.entries(week).forEach(([d, ids]) => { if (Array.isArray(ids) && ids.length) out[d] = ids.slice(0, MAX_PER_DAY); });
    return out;
  }
  function saveTracker(examId, data) {
    const all = read(TRACKER_KEY, {});
    all[examId] = { days: data.days, todos: data.todos, ubs: data.ubs, week: data.week, done: data.done };
    write(TRACKER_KEY, all);
  }

  const loadProfile = () => read(PROFILE_KEY, { name: "" });
  const saveProfile = (p) => write(PROFILE_KEY, p);

  /* ================= Көмекші функциялар ================= */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const countQuestions = (exam) => Object.values(exam.streams)
    .reduce((n, st) => n + st.subjects.reduce((m, s) => m + s.questions.length, 0), 0);

  const MONTHS = ["қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан"];
  const WEEKDAYS = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"];
  const pad = (n) => String(n).padStart(2, "0");
  const dayKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  function parseDay(str) { const [y, m, d] = str.split("-").map(Number); return new Date(y, m - 1, d); }
  const examMoment = (str) => { const d = parseDay(str); d.setHours(9, 0, 0, 0); return d; };
  const humanDate = (str) => { const d = parseDay(str); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  /* ================= Кері санақ таймері ================= */
  let ticker = null;

  function countdownHTML(dateStr, big) {
    return `
      <div class="countdown ${big ? "countdown--big" : ""}" data-target="${examMoment(dateStr).getTime()}">
        <div><b data-u="d">–</b><span>күн</span></div>
        <div><b data-u="h">–</b><span>сағат</span></div>
        <div><b data-u="m">–</b><span>минут</span></div>
        <div><b data-u="s">–</b><span>секунд</span></div>
      </div>`;
  }

  function tick() {
    const now = Date.now();
    document.querySelectorAll(".countdown").forEach((el) => {
      let diff = Math.max(0, Number(el.dataset.target) - now);
      const passed = diff === 0;
      el.classList.toggle("countdown--passed", passed);
      const d = Math.floor(diff / 86400000); diff -= d * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      el.querySelector('[data-u="d"]').textContent = d;
      el.querySelector('[data-u="h"]').textContent = pad(h);
      el.querySelector('[data-u="m"]').textContent = pad(m);
      el.querySelector('[data-u="s"]').textContent = pad(s);
    });
  }

  function startTicker() {
    stopTicker();
    if (document.querySelector(".countdown")) { tick(); ticker = setInterval(tick, 1000); }
  }
  function stopTicker() { if (ticker) { clearInterval(ticker); ticker = null; } }

  /* ================= Басты бет ================= */
  function renderHome() {
    const total = countQuestions(EXAMS.nis) + countQuestions(EXAMS.bil);
    const timerCard = (id) => {
      const t = loadTracker(id);
      return `
        <a class="card timer-card timer-card--${id}" href="#tracker-${id}">
          <div class="timer-card__head">
            <span class="exam-card__badge">${esc(EXAMS[id].title)}</span>
            <span class="timer-card__date">${humanDate(t.date)}</span>
          </div>
          ${countdownHTML(t.date)}
          <span class="timer-card__link">Трекерді ашу →</span>
        </a>`;
    };

    app.innerHTML = `
      <section class="hero">
        <div>
          <span class="eyebrow">${loadProfile().name ? `Сәлем, ${esc(loadProfile().name)}! 👋` : "НИШ · БИЛ · 2027"}</span>
          <h1>Арманыңдағы мектепке <span>бірге</span> дайындалайық</h1>
          <p>Назарбаев Зияткерлік мектептері мен Білім-инновация лицейлерінің емтихандарына арналған тапсырмалар, түсіндірмелер және өз прогресіңді бақылау бір жерде.</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="#tasks">Тапсырмаларды бастау →</a>
            <button class="btn btn--ghost" data-scroll="about">Емтихан туралы</button>
          </div>
        </div>
        <div class="hero__art" aria-hidden="true">
          <div class="hero__pill"><i class="ic-bur">📐</i> Математика · 3x + 7 = 22</div>
          <div class="hero__pill"><i class="ic-oli">🧩</i> Логика · 1, 1, 2, 3, 5, ?</div>
          <div class="hero__pill"><i class="ic-lav">⚖️</i> Сандық сипаттамалар · А ? B</div>
        </div>
      </section>

      <section class="section section--tight">
        <div class="section__head">
          <span class="eyebrow">Кері санақ</span>
          <h2>Емтиханға дейін қалды</h2>
        </div>
        <div class="grid grid--2">${timerCard("nis")}${timerCard("bil")}</div>
      </section>

      <div class="grid grid--4 stats">
        <div class="card stat"><b>2</b><span>емтихан бағыты</span></div>
        <div class="card stat"><b>9</b><span>пән</span></div>
        <div class="card stat"><b>${total}+</b><span>тапсырма</span></div>
        <div class="card stat"><b>2</b><span>оқу тілі</span></div>
      </div>

      <section class="section" id="about">
        <div class="section__head">
          <span class="eyebrow">Бағытыңды таңда</span>
          <h2>Қай емтиханға дайындаласың?</h2>
          <p>Әр бағыттың өз пәндері мен тапсырма форматы бар.</p>
        </div>
        <div class="grid grid--2">
          <article class="card exam-card exam-card--nis">
            <span class="exam-card__badge">НИШ · НЗМ</span>
            <h3>Назарбаев Зияткерлік мектептері</h3>
            <ul>
              <li>Қазақ және орыс тілдерінде</li>
              <li>Математика, сандық сипаттамалар, жаратылыстану</li>
              <li>Қазақ, орыс және ағылшын тілдері</li>
            </ul>
            <a class="btn btn--primary" href="#nis">НИШ тапсырмалары →</a>
          </article>
          <article class="card exam-card exam-card--bil">
            <span class="exam-card__badge">БИЛ</span>
            <h3>Білім-инновация лицейлері</h3>
            <ul>
              <li>Қазақ тілінде</li>
              <li>Математика және логика</li>
              <li>Қазақ тілі</li>
            </ul>
            <a class="btn btn--olive" href="#bil">БИЛ тапсырмалары →</a>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="section__head">
          <span class="eyebrow">Мүмкіндіктер</span>
          <h2>Платформада не бар?</h2>
        </div>
        <div class="grid grid--3">
          <div class="card feature"><i class="ic-bur">🎯</i><h3>Емтихан форматы</h3><p>Тапсырмалар нақты емтихан құрылымына сай пән бойынша топтастырылған.</p></div>
          <div class="card feature"><i class="ic-oli">💡</i><h3>Түсіндірмелер</h3><p>Әр сұрақтан кейін дұрыс жауап пен қысқаша шешім көрсетіледі.</p></div>
          <div class="card feature"><i class="ic-lav">📅</i><h3>Трекер және ҮБС талдауы</h3><p>ҮБС нәтижеңді енгіз: әлсіз пәніңді көрсетеді, ал мақсатты куратормен бірге өзің құрасың.</p></div>
        </div>
      </section>

      <section class="section">
        <div class="section__head">
          <span class="eyebrow">Қалай жұмыс істейді</span>
          <h2>Үш қадам</h2>
        </div>
        <div class="grid grid--3 steps">
          <div class="card step"><h3>Бағытты таңда</h3><p>НИШ немесе БИЛ, қажет болса оқу тілін көрсет.</p></div>
          <div class="card step"><h3>Пәнді шеш</h3><p>Тапсырмаларды орында, әр жауаптан кейін түсіндірмені оқы.</p></div>
          <div class="card step"><h3>Күн сайын белгіле</h3><p>Трекерде дайындалған күндеріңді белгілеп, қатарынан неше күн оқығаныңды көр.</p></div>
        </div>
      </section>

      <section class="section faq">
        <div class="section__head">
          <span class="eyebrow">Сұрақтар</span>
          <h2>Жиі қойылатын сұрақтар</h2>
        </div>
        <details><summary>НИШ пен БИЛ емтихандарының айырмашылығы неде?</summary><p>НИШ емтиханы қазақ немесе орыс тілінде өтеді және алты бағытты қамтиды. БИЛ емтиханы қазақ тілінде өтеді: математика, логика және қазақ тілі.</p></details>
        <details><summary>Тіркелу керек пе?</summary><p>Жоқ. Тапсырмаларды бірден шеше бересің, нәтижелерің мен трекерің осы құрылғыдағы браузерде сақталады.</p></details>
        <details><summary>Емтихан қашан өтеді?</summary><p>НИШ емтиханы: ${humanDate(EXAMS.nis.examDate)}. БИЛ емтиханы: ${humanDate(EXAMS.bil.examDate)}. Таймерлер осы күндерге қарай санайды.</p></details>
      </section>

      <section class="section">
        <div class="cta">
          <div>
            <h2>Бүгін бірінші тапсырманы шеш!</h2>
            <p>Күніне 15 минут жүйелі дайындық үлкен нәтиже береді.</p>
          </div>
          <a class="btn" href="#tasks">Бастау →</a>
        </div>
      </section>
    `;

    app.querySelector('[data-scroll="about"]').addEventListener("click", () =>
      document.getElementById("about").scrollIntoView({ behavior: "smooth" }));
  }

  /* ================= Тапсырмалар: бағыт таңдау ================= */
  function renderTasksRoot() {
    app.innerHTML = `
      <div class="breadcrumbs"><a href="#home">Басты бет</a> / Тапсырмалар</div>
      <h1 class="page-title">Тапсырмалар</h1>
      <p class="page-sub">Дайындалатын бағытыңды таңда.</p>
      <div class="grid grid--2">
        <a class="card exam-card exam-card--nis" href="#nis">
          <span class="exam-card__badge">НИШ</span>
          <h3>${esc(EXAMS.nis.full)}</h3>
          <p>Қазақша және орысша · 6 пән</p>
        </a>
        <a class="card exam-card exam-card--bil" href="#bil">
          <span class="exam-card__badge">БИЛ</span>
          <h3>${esc(EXAMS.bil.full)}</h3>
          <p>Қазақша · 3 пән: қазақ тілі, математика, логика</p>
        </a>
      </div>
    `;
  }

  /* ================= Пәндер тізімі ================= */
  function renderSubjects(examId, streamId) {
    const exam = EXAMS[examId];
    const streamIds = Object.keys(exam.streams);
    if (!streamId || !exam.streams[streamId]) streamId = streamIds[0];
    const stream = exam.streams[streamId];
    const progress = loadProgress();

    const switcher = streamIds.length > 1
      ? `<div class="lang-switch">${streamIds.map((s) =>
          `<a href="#${examId}-${s}" class="${s === streamId ? "active" : ""}">${esc(exam.streams[s].label)}</a>`).join("")}</div>`
      : "";

    app.innerHTML = `
      <div class="breadcrumbs"><a href="#home">Басты бет</a> / <a href="#tasks">Тапсырмалар</a> / ${esc(exam.title)}</div>
      <h1 class="page-title">${esc(exam.title)} тапсырмалары</h1>
      <p class="page-sub">${esc(exam.full)}${streamIds.length > 1 ? " · оқу тілін таңда" : " · қазақ тілінде"}</p>
      ${switcher}
      <div class="grid grid--3">
        ${stream.subjects.map((s) => {
          const best = progress[`${examId}.${streamId}.${s.id}`];
          const pct = best == null ? 0 : Math.round((best / s.questions.length) * 100);
          return `
            <a class="card subject" href="#quiz-${examId}-${streamId}-${s.id}">
              <div class="subject__icon ${s.color}">${s.icon}</div>
              <h3>${esc(s.title)}</h3>
              <div class="progress"><span style="width:${pct}%"></span></div>
              <div class="subject__meta">
                <span>${s.questions.length} тапсырма</span>
                <span>${best == null ? "Әлі шешілмеген" : `Ең жақсы: ${best}/${s.questions.length}`}</span>
              </div>
            </a>`;
        }).join("")}
      </div>
    `;
  }

  /* ================= Тест ================= */
  function renderQuiz(examId, streamId, subjectId) {
    const exam = EXAMS[examId];
    const stream = exam && exam.streams[streamId];
    const subject = stream && stream.subjects.find((s) => s.id === subjectId);
    if (!subject) return renderNotFound();

    const ru = streamId === "ru";
    const t = ru
      ? { q: "Вопрос", next: "Следующий →", finish: "Завершить", right: "Верно!", wrong: "Неверно.", again: "Пройти снова", back: "К предметам", done: "Тест завершён", score: "Правильных ответов" }
      : { q: "Сұрақ", next: "Келесі →", finish: "Аяқтау", right: "Дұрыс!", wrong: "Қате.", again: "Қайта шешу", back: "Пәндерге оралу", done: "Тест аяқталды", score: "Дұрыс жауаптар" };

    const backHref = `#${examId}-${streamId}`;
    let index = 0;
    let correct = 0;
    const letters = ["A", "B", "C", "D", "E"];

    const header = () =>
      `<div class="breadcrumbs"><a href="#tasks">Тапсырмалар</a> / <a href="${backHref}">${esc(exam.title)} · ${esc(stream.label)}</a> / ${esc(subject.title)}</div>`;

    function showQuestion() {
      const item = subject.questions[index];
      const pct = Math.round((index / subject.questions.length) * 100);
      app.innerHTML = `
        ${header()}
        <div class="quiz">
          <div class="quiz__top">
            <span>${subject.icon} ${esc(subject.title)}</span>
            <span>${t.q} ${index + 1} / ${subject.questions.length}</span>
          </div>
          <div class="progress" style="margin-bottom:18px"><span style="width:${pct}%"></span></div>
          <div class="card quiz__card">
            <p class="quiz__q">${esc(item.q)}</p>
            <div class="options">
              ${item.options.map((o, i) => `<button class="option" data-i="${i}"><b>${letters[i]}</b>${esc(o)}</button>`).join("")}
            </div>
            <div id="feedback"></div>
            <div class="quiz__nav">
              <button class="btn btn--primary" id="next" disabled>${index === subject.questions.length - 1 ? t.finish : t.next}</button>
            </div>
          </div>
        </div>`;

      const buttons = app.querySelectorAll(".option");
      buttons.forEach((btn) => btn.addEventListener("click", () => {
        const chosen = Number(btn.dataset.i);
        const ok = chosen === item.answer;
        if (ok) correct++;
        buttons.forEach((b) => {
          b.disabled = true;
          const i = Number(b.dataset.i);
          if (i === item.answer) b.classList.add("correct");
          else if (i === chosen) b.classList.add("wrong");
        });
        app.querySelector("#feedback").innerHTML =
          `<div class="explain ${ok ? "" : "bad"}"><strong>${ok ? t.right : t.wrong}</strong> ${esc(item.explain || "")}</div>`;
        app.querySelector("#next").disabled = false;
      }));

      app.querySelector("#next").addEventListener("click", () => {
        index++;
        if (index < subject.questions.length) showQuestion();
        else showResult();
      });
    }

    function showResult() {
      const total = subject.questions.length;
      saveBest(`${examId}.${streamId}.${subjectId}`, correct);
      markToday(examId);
      const pct = Math.round((correct / total) * 100);
      app.innerHTML = `
        ${header()}
        <div class="quiz">
          <div class="card result">
            <div class="result__score" style="background:conic-gradient(var(--olive) ${pct}%, var(--lavender-soft) 0)">
              <span>${correct}/${total}</span>
            </div>
            <h2>${t.done}</h2>
            <p>${t.score}: ${pct}%</p>
            <div class="hero__actions">
              <button class="btn btn--primary" id="again">${t.again}</button>
              <a class="btn btn--ghost" href="${backHref}">${t.back}</a>
            </div>
          </div>
        </div>`;
      app.querySelector("#again").addEventListener("click", () => { index = 0; correct = 0; showQuestion(); });
    }

    showQuestion();
  }

  /* ================= Трекер (НИШ және БИЛ бөлек) ================= */
  function markToday(examId) {
    const data = loadTracker(examId);
    data.days[dayKey(new Date())] = true;
    saveTracker(examId, data);
  }

  function streakOf(days) {
    const d = new Date();
    if (!days[dayKey(d)]) d.setDate(d.getDate() - 1); // бүгін әлі белгіленбесе, кешеден бастап санаймыз
    let n = 0;
    while (days[dayKey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }

  function bestOfSubject(examId, subjectId, progress) {
    // НИШ-те қазақша және орысша нәтижелердің ең жақсысы алынады
    let pct = 0, tried = false;
    Object.entries(EXAMS[examId].streams).forEach(([sid, st]) => {
      const s = st.subjects.find((x) => x.id === subjectId);
      const v = s && progress[`${examId}.${sid}.${subjectId}`];
      if (v == null) return;
      tried = true;
      pct = Math.max(pct, Math.round((v / s.questions.length) * 100));
    });
    return { pct, tried };
  }

  /* ---------- ҮБС талдауы және мотивация ---------- */
  const MAX_PER_DAY = 2; // күніне ең көбі 2 пән, артық жүктеме болмас үшін
  const DAY_NAMES = ["Дүйсенбі", "Сейсенбі", "Сәрсенбі", "Бейсенбі", "Жұма", "Сенбі", "Жексенбі"];

  // ҮБС жазбасынан пән бойынша пайыздарды есептейді: { subjectId: pct }
  function ubsPercents(entry) {
    const out = {};
    if (!entry) return out;
    Object.entries(entry.scores).forEach(([id, v]) => { if (v.m > 0) out[id] = Math.round((v.s / v.m) * 100); });
    return out;
  }
  const avgOf = (obj) => { const v = Object.values(obj); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : 0; };
  const levelOf = (pct) => (pct < 50 ? "low" : pct < 75 ? "mid" : "high");

  function buildPlan(subjects, latest, prev, name, daysLeft) {
    const cur = ubsPercents(latest);
    const ranked = subjects.filter((s) => cur[s.id] != null).sort((a, b) => cur[a.id] - cur[b.id]);
    if (!ranked.length) return null;

    const avg = avgOf(cur);
    const prevPct = ubsPercents(prev);
    const common = ranked.filter((s) => prevPct[s.id] != null);
    const delta = common.length
      ? Math.round(common.reduce((a, s) => a + cur[s.id] - prevPct[s.id], 0) / common.length)
      : null;

    const who = name ? `${name}, ` : "";
    const headline = avg >= 85 ? `${who}керемет нәтиже! Енді осы деңгейді ұстап тұру маңызды.`
      : avg >= 70 ? `${who}жақсы нәтиже! Аздап күш салсаң, ең жоғары деңгейге шығасың.`
      : avg >= 50 ? `${who}негізің бар! Әлсіз пәндерге көңіл бөлсең, нәтиже тез өседі.`
      : `${who}бастысы тоқтамау. Күн сайынғы шағын қадам үлкен нәтиже береді.`;

    const lines = [];
    if (delta != null && delta > 0) lines.push(`Өткен ҮБС-пен салыстырғанда орта есеппен +${delta}% өстің 📈 Осылай жалғастыр!`);
    else if (delta != null && delta < 0) lines.push(`Өткен жолдан ${Math.abs(delta)}% төмендедің. Уайымдама: бұл қай жерге көңіл бөлу керегін көрсетеді.`);
    else if (delta === 0) lines.push("Нәтижең тұрақты. Енді келесі деңгейге көтерілу уақыты.");
    const best = ranked[ranked.length - 1];
    if (ranked.length > 1) lines.push(`Ең мықты пәнің: ${best.title} (${cur[best.id]}%). Бұл деңгейді сақта.`);
    if (daysLeft > 0) lines.push(`Емтиханға ${daysLeft} күн (шамамен ${Math.ceil(daysLeft / 7)} апта) қалды. Әр апта маңызды.`);

    const W = ranked[0];
    return { headline: cap(headline), lines, weakest: W, weakPct: cur[W.id], ranked, cur, avg, delta };
  }
  function renderTracker(examId) {
    const exam = EXAMS[examId];
    const data = loadTracker(examId);
    const profile = loadProfile();
    let view = new Date(); view.setDate(1);
    let editingName = !profile.name;
    let pendingDelete = null;
    const todayIdx = (new Date().getDay() + 6) % 7;
    let openDay = todayIdx;

    const firstStream = Object.values(exam.streams)[0];
    const defaultStream = Object.keys(exam.streams)[0];
    const subjects = firstStream.subjects;
    const subjectById = (id) => subjects.find((s) => s.id === id);

    function profileHTML() {
      if (editingName) {
        return `
          <form class="card profile profile--edit" id="name-form">
            <label for="profile-name"><strong>Аты-жөнің</strong><span>Жоспар мен мотивация саған арнап жазылады.</span></label>
            <div class="todo-form">
              <input type="text" id="profile-name" value="${esc(profile.name)}" placeholder="Мысалы: Айгерім Серікова" maxlength="60" autocomplete="name">
              <button class="btn btn--primary" type="submit">Сақтау</button>
            </div>
          </form>`;
      }
      return `
        <div class="card profile">
          <span class="profile__avatar">${esc(profile.name.trim().charAt(0).toUpperCase())}</span>
          <div class="profile__text"><span>Оқушы</span><strong>${esc(profile.name)}</strong></div>
          <button class="chip chip--btn" id="name-edit">Өзгерту</button>
        </div>`;
    }

    function ubsFormHTML() {
      const last = data.ubs[data.ubs.length - 1];
      return `
        <details class="ubs-form-wrap" ${data.ubs.length ? "" : "open"}>
          <summary class="btn btn--olive">+ Жаңа ҮБС нәтижесін енгізу</summary>
          <form id="ubs-form" class="ubs-form">
            <label class="ubs-date" for="ubs-date-${examId}">ҮБС күні
              <input type="date" id="ubs-date-${examId}" value="${dayKey(new Date())}" max="${dayKey(new Date())}" required>
            </label>
            <div class="ubs-rows">
              <div class="ubs-row ubs-row--head"><span>Пән</span><span>Балл</span><span>Максимум</span></div>
              ${subjects.map((s) => {
                const m = last && last.scores[s.id] ? last.scores[s.id].m : "";
                return `
                <div class="ubs-row">
                  <label for="ubs-s-${examId}-${s.id}">${s.icon} ${esc(s.title)}</label>
                  <input type="number" inputmode="decimal" min="0" step="0.5" id="ubs-s-${examId}-${s.id}" data-ubs-s="${s.id}" placeholder="–">
                  <input type="number" inputmode="decimal" min="1" step="0.5" id="ubs-m-${examId}-${s.id}" data-ubs-m="${s.id}" value="${m}" placeholder="мыс. 20" aria-label="${esc(s.title)}: максимум балл">
                </div>`;
              }).join("")}
            </div>
            <p class="form-hint">Тапсырмаған пәнді бос қалдыр. Максимум балл келесі жолы есте қалады.</p>
            <p class="form-error" id="ubs-error" hidden></p>
            <button class="btn btn--primary btn--block" type="submit">Нәтижені сақтау</button>
          </form>
        </details>`;
    }

    function ubsResultsHTML() {
      if (!data.ubs.length) return `<p class="empty">Әзірге ҮБС нәтижесі жоқ. Соңғы ҮБС балдарыңды енгізсең, әлсіз пәніңді тауып, жеке жоспар құрамын.</p>`;
      const latest = data.ubs[data.ubs.length - 1];
      const prev = data.ubs[data.ubs.length - 2];
      const cur = ubsPercents(latest), was = ubsPercents(prev);
      const ranked = subjects.filter((s) => cur[s.id] != null).sort((a, b) => cur[a.id] - cur[b.id]);
      const weakest = ranked[0];
      const rows = subjects.filter((s) => cur[s.id] != null).map((s) => {
        const pct = cur[s.id], sc = latest.scores[s.id];
        const d = was[s.id] != null ? pct - was[s.id] : null;
        const dHTML = d == null ? "" : `<span class="delta ${d > 0 ? "up" : d < 0 ? "down" : ""}">${d > 0 ? "▲ +" : d < 0 ? "▼ " : "● "}${d}%</span>`;
        return `
          <div class="ubs-bar">
            <div class="ubs-bar__top">
              <span>${s.icon} ${esc(s.title)} ${s === weakest && ranked.length > 1 ? `<span class="tag">Назар аудар</span>` : ""}</span>
              <span class="ubs-bar__nums">${dHTML}<b>${sc.s}/${sc.m}</b> · ${pct}%</span>
            </div>
            <div class="bar bar--${levelOf(pct)}"><span style="width:${pct}%"></span></div>
          </div>`;
      }).join("");
      const history = data.ubs.map((u, i) => ({ u, i })).reverse().map(({ u, i }) => `
        <li>
          <span><b>ҮБС ${i + 1}</b> · ${humanDate(u.date)}</span>
          <span class="history__right">орташа ${avgOf(ubsPercents(u))}%
            <button class="todo__del ${pendingDelete === i ? "is-confirm" : ""}" data-ubs-del="${i}" aria-label="ҮБС ${i + 1} өшіру">${pendingDelete === i ? "Өшіру?" : "✕"}</button>
          </span>
        </li>`).join("");
      return `
        <p class="muted">Соңғы ҮБС ${data.ubs.length}: ${humanDate(latest.date)}${prev ? " · өткен ҮБС-пен салыстыру" : ""}</p>
        <div class="ubs-bars">${rows}</div>
        <details class="history"><summary>ҮБС тарихы (${data.ubs.length})</summary><ul>${history}</ul></details>`;
    }

    function planHTML() {
      const latest = data.ubs[data.ubs.length - 1];
      const daysLeft = Math.ceil((examMoment(data.date) - Date.now()) / 86400000);
      const plan = latest && buildPlan(subjects, latest, data.ubs[data.ubs.length - 2], profile.name.trim(), daysLeft);
      if (!plan) {
        return `
          <section class="card plan plan--empty">
            <div class="card__title"><h3>Талдау және мотивация</h3></div>
            <p class="empty">ҮБС нәтижесін енгізгеннен кейін осы жерде нәтижеңнің талдауы мен мотивация пайда болады.</p>
          </section>`;
      }
      return `
        <section class="card plan">
          <div class="card__title"><h3>Талдау және мотивация</h3></div>
          <div class="motivation">
            <p class="motivation__head">${esc(plan.headline)}</p>
            <ul>${plan.lines.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
            <div class="focus">
              <span class="subject__icon ${plan.weakest.color}">${plan.weakest.icon}</span>
              <div><span>Көбірек көңіл бөлетін пән</span><strong>${esc(plan.weakest.title)} · ${plan.weakPct}%</strong></div>
              <a class="btn btn--primary" href="#quiz-${examId}-${defaultStream}-${plan.weakest.id}">Тапсырмалар →</a>
            </div>
          </div>
          <div class="curator-tip">
            <span aria-hidden="true">🤝</span>
            <div>
              <strong>Мақсатыңды куратормен бірге құр</strong>
              <p>ҮБС нәтижеңді куратормен қарап шығып, қай күні қай пәнге дайындалатыныңды бірге шешіңдер. Сосын төмендегі «Мақсаттар» бөлімінде белгіле.</p>
              <button class="chip chip--btn" id="go-week">Мақсат құру ↓</button>
            </div>
          </div>
        </section>`;
    }

    function weakestId() {
      const last = data.ubs[data.ubs.length - 1];
      if (!last) return null;
      const cur = ubsPercents(last);
      const r = subjects.filter((s) => cur[s.id] != null).sort((a, b) => cur[a.id] - cur[b.id]);
      return r.length > 1 ? r[0].id : null;
    }

    // Осы аптадағы i-ші күннің күні (0 = дүйсенбі)
    function dateOfWeekday(i) {
      const d = new Date();
      d.setDate(d.getDate() - todayIdx + i);
      return dayKey(d);
    }

    // Duolingo сияқты серия: бүгінгі мақсаттар орындалса ми жанады, орындалмаса сөнеді
    function streakHTML() {
      const todayKey = dayKey(new Date());
      const picked = data.week[todayIdx] || [];
      const done = data.done[todayKey] || [];
      const lit = !!data.days[todayKey];
      const streak = streakOf(data.days);
      const state = lit ? "lit" : streak > 0 ? "warn" : "off";
      const msg = lit ? "Ми жанып тұр! Ертең де жалғастыр."
        : streak > 0 ? "Бүгінгі мақсатыңды орында, әйтпесе ми сөніп қалады!"
        : "Ми сөніп тұр. Бүгінгі мақсатыңды орындап, қайта жақ!";
      const n = picked.filter((id) => done.includes(id)).length;
      const dots = DAY_NAMES.map((name, i) => {
        const k = dateOfWeekday(i);
        const ok = !!data.days[k];
        const cls = ["streak__dot", ok ? "is-done" : "", i === todayIdx ? "is-today" : "", i > todayIdx ? "is-future" : ""].join(" ");
        return `<span class="streak__day"><small>${WEEKDAYS[i]}</small><i class="${cls}" aria-label="${name}: ${ok ? "орындалды" : "орындалмаған"}">${ok ? "✓" : ""}</i></span>`;
      }).join("");
      const today = picked.length ? `
          <div class="streak__today">
            <div class="streak__today-head"><span>Бүгінгі мақсаттар</span><b>${n}/${picked.length}</b></div>
            ${picked.map((id) => {
              const sj = subjectById(id); if (!sj) return "";
              const ok = done.includes(id);
              return `<button class="streak__goal ${ok ? "is-done" : ""}" data-done-subj="${id}" aria-pressed="${ok}">
                  <span>${sj.icon} ${esc(sj.title)}</span><em>${ok ? "✓ Орындадым" : "Орындадым"}</em>
                </button>`;
            }).join("")}
          </div>`
        : `<p class="streak__hint">Бүгінге (${DAY_NAMES[todayIdx].toLowerCase()}) пән таңдалмаған. Төменнен күнді ашып, 2 пәнге дейін таңда.</p>`;
      return `
        <div class="streak streak--${state}">
          <div class="streak__top">
            <div class="streak__brain" aria-hidden="true"><span>🧠</span></div>
            <div class="streak__count">
              <b>${streak}</b>
              <span>күн қатарынан</span>
            </div>
          </div>
          <p class="streak__msg">${msg}</p>
          <div class="streak__week">${dots}</div>
          ${today}
        </div>`;
    }

    function weekHTML() {
      const weak = weakestId();
      const total = Object.values(data.week).reduce((n, d) => n + d.length, 0);
      const days = DAY_NAMES.map((name, i) => {
        const picked = data.week[i] || [];
        const open = i === openDay;
        const doneThatDay = i <= todayIdx ? (data.done[dateOfWeekday(i)] || []) : [];
        const tags = picked.length
          ? picked.map((id) => { const s = subjectById(id); const ok = doneThatDay.includes(id); return s ? `<span class="day__tag ${ok ? "is-done" : ""}">${ok ? "✓ " : ""}${s.icon} ${esc(s.title)}</span>` : ""; }).join("")
          : `<span class="day__none">Пән таңдалмаған</span>`;
        const full = picked.length >= MAX_PER_DAY;
        const body = open ? `
          <div class="day__body" id="day-body-${i}">
            <p class="day__hint ${full ? "is-full" : ""}">${full ? `✓ ${MAX_PER_DAY} пән таңдалды. Басқа пәнді таңдау үшін біреуін алып таста.` : `Күніне ең көбі ${MAX_PER_DAY} пән таңда (${picked.length}/${MAX_PER_DAY})`}</p>
            ${subjects.map((s) => {
              const on = picked.includes(s.id);
              const locked = full && !on;
              return `
              <label class="pick ${locked ? "is-locked" : ""}" for="pick-${examId}-${i}-${s.id}">
                <input type="checkbox" id="pick-${examId}-${i}-${s.id}" data-pick="${i}:${s.id}" ${on ? "checked" : ""} ${locked ? "disabled" : ""}>
                <span class="subject__icon ${s.color}">${s.icon}</span>
                <span class="pick__title">${esc(s.title)}${s.id === weak ? ` <span class="tag">Назар аудар</span>` : ""}</span>
              </label>`;
            }).join("")}
          </div>` : "";
        return `
          <div class="day ${open ? "is-open" : ""} ${i === todayIdx ? "is-today" : ""}">
            <button class="day__head" data-open-day="${i}" aria-expanded="${open}" aria-controls="day-body-${i}">
              <span class="day__name">${name}${i === todayIdx ? " <em>бүгін</em>" : ""}</span>
              <span class="day__count">${picked.length ? `${picked.length}/${MAX_PER_DAY}` : ""}</span>
              <span class="day__chev" aria-hidden="true">›</span>
            </button>
            ${open ? "" : `<div class="day__tags">${tags}</div>`}
            ${body}
          </div>`;
      }).join("");
      return `
        <section class="card weekplan" id="weekplan">
          <div class="card__title"><h3>Мақсаттар</h3>${total ? `<span class="chip">аптасына ${total} сабақ</span>` : ""}</div>
          <p class="muted">Аптаның әр күнін бас та, сол күні дайындалатын пәндерді белгіле: күніне ең көбі ${MAX_PER_DAY} пән. Мақсатыңды куратормен ақылдасып құр.</p>
          ${streakHTML()}
          <div class="days">${days}</div>
        </section>`;
    }

    function calendarHTML() {
      const y = view.getFullYear(), m = view.getMonth();
      const offset = (new Date(y, m, 1).getDay() + 6) % 7; // дүйсенбіден басталады
      const daysIn = new Date(y, m + 1, 0).getDate();
      const today = dayKey(new Date());
      const exDay = data.date;
      let cells = "";
      for (let i = 0; i < offset; i++) cells += `<span class="cal__cell cal__cell--empty"></span>`;
      for (let d = 1; d <= daysIn; d++) {
        const k = `${y}-${pad(m + 1)}-${pad(d)}`;
        const cls = ["cal__cell"];
        if (data.days[k]) cls.push("is-done");
        if (k === today) cls.push("is-today");
        if (k === exDay) cls.push("is-exam");
        const future = k > today;
        cells += `<button class="${cls.join(" ")}" data-day="${k}" ${future ? "disabled" : ""} aria-pressed="${!!data.days[k]}" aria-label="${d} ${MONTHS[m]}">${d}</button>`;
      }
      return `
        <div class="cal__head">
          <button class="cal__nav" data-cal="-1" aria-label="Алдыңғы ай">‹</button>
          <strong>${cap(MONTHS[m])} ${y}</strong>
          <button class="cal__nav" data-cal="1" aria-label="Келесі ай">›</button>
        </div>
        <div class="cal__grid">${WEEKDAYS.map((w) => `<span class="cal__wd">${w}</span>`).join("")}${cells}</div>
        <div class="cal__legend"><span><i class="lg-done"></i>Дайындалдым</span><span><i class="lg-today"></i>Бүгін</span><span><i class="lg-exam"></i>Емтихан</span></div>`;
    }

    function statsHTML() {
      const all = Object.keys(data.days).filter((k) => data.days[k]);
      const ym = dayKey(new Date()).slice(0, 7);
      const month = all.filter((k) => k.startsWith(ym)).length;
      return `
        <div class="tstat"><b>${streakOf(data.days)}</b><span>күн қатарынан</span></div>
        <div class="tstat"><b>${month}</b><span>күн осы айда</span></div>
        <div class="tstat"><b>${all.length}</b><span>күн барлығы</span></div>`;
    }

    function subjectsHTML() {
      const progress = loadProgress();
      return firstStream.subjects.map((s) => {
        const r = bestOfSubject(examId, s.id, progress);
        const pct = r.pct;
        return `
          <a class="tsubj" href="#quiz-${examId}-${defaultStream}-${s.id}">
            <span class="subject__icon ${s.color}">${s.icon}</span>
            <span class="tsubj__body">
              <span class="tsubj__row"><strong>${esc(s.title)}</strong><em>${r.tried ? pct + "%" : "–"}</em></span>
              <span class="progress"><span style="width:${pct}%"></span></span>
            </span>
          </a>`;
      }).join("");
    }

    function draw() {
      app.innerHTML = `
        <div class="breadcrumbs"><a href="#home">Басты бет</a> / Трекер / ${esc(exam.title)}</div>
        <h1 class="page-title">Дайындық трекері</h1>
        <p class="page-sub">НИШ пен БИЛ трекерлері бөлек жүргізіледі. Деректер осы құрылғыда сақталады.</p>
        ${profileHTML()}
        <div class="lang-switch">
          ${EXAM_IDS.map((id) => `<a href="#tracker-${id}" class="${id === examId ? "active" : ""}">${esc(EXAMS[id].title)}</a>`).join("")}
        </div>

        <section class="card tracker-hero tracker-hero--${examId}">
          <div class="tracker-hero__top">
            <div>
              <span class="eyebrow">${esc(exam.full)}</span>
              <h2>Емтиханға дейін</h2>
            </div>
            <div class="date-field">
              <span>Емтихан күні</span>
              <strong class="date-badge">📅 ${humanDate(data.date)}</strong>
            </div>
          </div>
          ${countdownHTML(data.date, true)}
          <p class="tracker-hero__note">${humanDate(data.date)}, сағат 09:00</p>
        </section>

        <div class="grid grid--2 tracker-grid">
          <section class="card ubs">
            <div class="card__title"><h3>ҮБС нәтижелері</h3>${data.ubs.length ? `<span class="chip">${data.ubs.length} ҮБС</span>` : ""}</div>
            ${ubsResultsHTML()}
            ${ubsFormHTML()}
          </section>
          ${planHTML()}
        </div>

        ${weekHTML()}

        <div class="grid grid--2 tracker-grid">
          <section class="card">
            <div class="card__title"><h3>Дайындық күнтізбесі</h3></div>
            <div class="tstats">${statsHTML()}</div>
            <button class="btn btn--primary btn--block" id="mark-today">${data.days[dayKey(new Date())] ? "✓ Бүгін белгіленді" : "Бүгін дайындалдым"}</button>
            <div class="cal">${calendarHTML()}</div>
          </section>

          <section class="card tracker-subjects">
            <div class="card__title"><h3>Пәндер бойынша нәтиже</h3><a href="#${examId}" class="chip chip--link">Тапсырмаларға →</a></div>
            <p class="muted">Әр пән бойынша тесттегі ең жақсы нәтижең.</p>
            <div class="tsubj-list">${subjectsHTML()}</div>
          </section>
        </div>
      `;
      bind();
      startTicker();
    }

    function bind() {
      const nameForm = app.querySelector("#name-form");
      if (nameForm) nameForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = app.querySelector("#profile-name").value.trim().replace(/\s+/g, " ");
        if (!name) return;
        profile.name = name;
        saveProfile(profile);
        editingName = false;
        draw();
      });
      const nameEdit = app.querySelector("#name-edit");
      if (nameEdit) nameEdit.addEventListener("click", () => { editingName = true; draw(); app.querySelector("#profile-name").focus(); });

      app.querySelector("#ubs-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const err = app.querySelector("#ubs-error");
        const scores = {};
        let problem = "";
        subjects.forEach((s) => {
          const sv = app.querySelector(`[data-ubs-s="${s.id}"]`).value;
          const mv = app.querySelector(`[data-ubs-m="${s.id}"]`).value;
          if (sv === "") return;
          const sc = Number(sv), mx = Number(mv);
          if (!(mx > 0)) problem = problem || `${s.title}: максимум балды жаз.`;
          else if (sc < 0 || sc > mx) problem = problem || `${s.title}: балл 0 мен ${mx} аралығында болуы керек.`;
          else scores[s.id] = { s: sc, m: mx };
        });
        if (!problem && !Object.keys(scores).length) problem = "Кемінде бір пәннің баллын жаз.";
        if (problem) { err.textContent = problem; err.hidden = false; return; }
        const date = app.querySelector(`#ubs-date-${examId}`).value || dayKey(new Date());
        data.ubs.push({ date, scores });
        data.ubs.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
        saveTracker(examId, data);
        pendingDelete = null;
        draw();
        app.querySelector(".plan").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      app.querySelectorAll("[data-ubs-del]").forEach((b) => b.addEventListener("click", () => {
        const i = Number(b.dataset.ubsDel);
        if (pendingDelete === i) { data.ubs.splice(i, 1); pendingDelete = null; saveTracker(examId, data); }
        else pendingDelete = i;
        draw();
        const h = app.querySelector(".history"); if (h && data.ubs.length) h.open = true;
      }));
      const goWeek = app.querySelector("#go-week");
      if (goWeek) goWeek.addEventListener("click", () =>
        app.querySelector("#weekplan").scrollIntoView({ behavior: "smooth", block: "start" }));

      app.querySelectorAll("[data-done-subj]").forEach((b) => b.addEventListener("click", () => {
        const k = dayKey(new Date());
        const id = b.dataset.doneSubj;
        const set = new Set(data.done[k] || []);
        if (set.has(id)) set.delete(id); else set.add(id);
        data.done[k] = [...set];
        if (!data.done[k].length) delete data.done[k];
        const picked = data.week[todayIdx] || [];
        // Бүгінгі барлық пән орындалса, ми жанады (күнтізбеде белгіленеді); біреуі алынса, сөнеді
        if (picked.every((x) => set.has(x))) data.days[k] = true; else delete data.days[k];
        saveTracker(examId, data);
        draw();
      }));
      app.querySelectorAll("[data-open-day]").forEach((b) => b.addEventListener("click", () => {
        const i = Number(b.dataset.openDay);
        openDay = openDay === i ? -1 : i;
        draw();
      }));
      app.querySelectorAll("[data-pick]").forEach((c) => c.addEventListener("change", () => {
        const [day, id] = c.dataset.pick.split(":");
        const chosen = new Set(data.week[day] || []);
        if (c.checked && chosen.size >= MAX_PER_DAY) { c.checked = false; return; }
        if (c.checked) chosen.add(id); else chosen.delete(id);
        data.week[day] = subjects.map((s) => s.id).filter((sid) => chosen.has(sid)); // пәндер ретін сақтаймыз
        if (!data.week[day].length) delete data.week[day];
        saveTracker(examId, data);
        draw();
      }));

      app.querySelector("#mark-today").addEventListener("click", () => {
        const k = dayKey(new Date());
        if (data.days[k]) delete data.days[k]; else data.days[k] = true;
        saveTracker(examId, data);
        draw();
      });
      app.querySelectorAll("[data-day]").forEach((b) => b.addEventListener("click", () => {
        const k = b.dataset.day;
        if (data.days[k]) delete data.days[k]; else data.days[k] = true;
        saveTracker(examId, data);
        draw();
      }));
      app.querySelectorAll("[data-cal]").forEach((b) => b.addEventListener("click", () => {
        view.setMonth(view.getMonth() + Number(b.dataset.cal));
        draw();
      }));
    }

    draw();
  }

  function renderNotFound() {
    app.innerHTML = `
      <div class="card result">
        <h2>Бет табылмады</h2>
        <p>Мұндай бет жоқ немесе жойылған.</p>
        <a class="btn btn--primary" href="#home">Басты бетке</a>
      </div>`;
  }

  /* ================= Маршрутизация =================
   * #home, #tasks, #nis, #nis-kz, #nis-ru, #bil,
   * #quiz-nis-kz-math, #tracker-nis, #tracker-bil
   */
  function setActiveNav(key) {
    document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === key));
  }

  function router() {
    stopTicker();
    const route = (location.hash || "").replace(/^#\/?/, "").replace(/\//g, "-");
    const parts = route.split("-").filter(Boolean);
    const head = parts[0] || "home";

    if (head === "home") { setActiveNav("home"); renderHome(); }
    else if (head === "tasks" && parts.length === 1) { setActiveNav("tasks"); renderTasksRoot(); }
    else if (head === "tasks" && EXAMS[parts[1]]) { setActiveNav(parts[1]); renderSubjects(parts[1], parts[2]); }
    else if (EXAMS[head]) { setActiveNav(head); renderSubjects(head, parts[1]); }
    else if (head === "quiz" && EXAMS[parts[1]]) { setActiveNav(parts[1]); renderQuiz(parts[1], parts[2], parts[3]); }
    else if (head === "tracker") { const id = EXAMS[parts[1]] ? parts[1] : "nis"; setActiveNav("tracker"); renderTracker(id); }
    else { setActiveNav(""); renderNotFound(); }

    startTicker();
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", router);
  router();
})();
