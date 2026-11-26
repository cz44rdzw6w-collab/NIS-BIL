(function () {
  "use strict";

  const app = document.getElementById("app");
  const EXAMS = window.EXAMS;
  const EXAM_IDS = ["nis", "bil"];

  /* ================= Сақтау (тек осы браузерде) ================= */
  const PROGRESS_KEY = "daiyndyq-progress-v1";
  const TRACKER_KEY = "daiyndyq-tracker-v1";

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
    return { date: EXAMS[examId].examDate, days: t.days || {}, todos: t.todos || [] };
  }
  function saveTracker(examId, data) {
    const all = read(TRACKER_KEY, {});
    all[examId] = { days: data.days, todos: data.todos };
    write(TRACKER_KEY, all);
  }

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
          <span class="eyebrow">НИШ · БИЛ · 2027</span>
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
          <div class="card feature"><i class="ic-lav">📅</i><h3>Трекер</h3><p>НИШ пен БИЛ үшін бөлек: кері санақ, дайындық күнтізбесі және мақсаттар.</p></div>
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

  function renderTracker(examId) {
    const exam = EXAMS[examId];
    const data = loadTracker(examId);
    let view = new Date(); view.setDate(1);

    const firstStream = Object.values(exam.streams)[0];
    const defaultStream = Object.keys(exam.streams)[0];

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

    function todosHTML() {
      if (!data.todos.length) return `<p class="empty">Әзірге мақсат жоқ. Мысалы: «Логикадан 10 есеп шығару» деп жазып қос.</p>`;
      return `<ul class="todos">${data.todos.map((t, i) => `
        <li class="${t.done ? "is-done" : ""}">
          <label><input type="checkbox" data-todo="${i}" ${t.done ? "checked" : ""}><span>${esc(t.text)}</span></label>
          <button class="todo__del" data-del="${i}" aria-label="Өшіру">✕</button>
        </li>`).join("")}</ul>`;
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
      const doneTodos = data.todos.filter((t) => t.done).length;
      app.innerHTML = `
        <div class="breadcrumbs"><a href="#home">Басты бет</a> / Трекер / ${esc(exam.title)}</div>
        <h1 class="page-title">Дайындық трекері</h1>
        <p class="page-sub">НИШ пен БИЛ трекерлері бөлек жүргізіледі. Деректер осы құрылғыда сақталады.</p>
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
          <section class="card">
            <div class="card__title"><h3>Дайындық күнтізбесі</h3></div>
            <div class="tstats">${statsHTML()}</div>
            <button class="btn btn--primary btn--block" id="mark-today">${data.days[dayKey(new Date())] ? "✓ Бүгін белгіленді" : "Бүгін дайындалдым"}</button>
            <div class="cal">${calendarHTML()}</div>
          </section>

          <section class="card">
            <div class="card__title"><h3>Мақсаттар</h3><span class="chip">${doneTodos}/${data.todos.length}</span></div>
            <form class="todo-form" id="todo-form">
              <input type="text" id="todo-input-${examId}" placeholder="Жаңа мақсат…" maxlength="120" autocomplete="off">
              <button class="btn btn--olive" type="submit">Қосу</button>
            </form>
            ${todosHTML()}
          </section>
        </div>

        <section class="card tracker-subjects">
          <div class="card__title"><h3>Пәндер бойынша нәтиже</h3><a href="#${examId}" class="chip chip--link">Тапсырмаларға →</a></div>
          <p class="muted">Әр пән бойынша тесттегі ең жақсы нәтижең.</p>
          <div class="tsubj-list">${subjectsHTML()}</div>
        </section>
      `;
      bind();
      startTicker();
    }

    function bind() {
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
      app.querySelector("#todo-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const input = app.querySelector(`#todo-input-${examId}`);
        const text = input.value.trim();
        if (!text) return;
        data.todos.push({ text, done: false });
        saveTracker(examId, data);
        draw();
        app.querySelector(`#todo-input-${examId}`).focus();
      });
      app.querySelectorAll("[data-todo]").forEach((c) => c.addEventListener("change", () => {
        data.todos[Number(c.dataset.todo)].done = c.checked;
        saveTracker(examId, data);
        draw();
      }));
      app.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => {
        data.todos.splice(Number(b.dataset.del), 1);
        saveTracker(examId, data);
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
