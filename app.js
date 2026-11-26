(function () {
  "use strict";

  const app = document.getElementById("app");
  const EXAMS = window.EXAMS;

  /* ---------- Прогресс (тек осы браузерде сақталады) ---------- */
  const STORE_KEY = "daiyndyq-progress-v1";
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  function saveBest(key, score) {
    try {
      const p = loadProgress();
      if (!(key in p) || score > p[key]) p[key] = score;
      localStorage.setItem(STORE_KEY, JSON.stringify(p));
    } catch (e) { /* storage unavailable */ }
  }

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const countQuestions = (exam) => Object.values(exam.streams)
    .reduce((n, st) => n + st.subjects.reduce((m, s) => m + s.questions.length, 0), 0);

  /* ---------- Басты бет ---------- */
  function renderHome() {
    const total = countQuestions(EXAMS.nis) + countQuestions(EXAMS.bil);
    app.innerHTML = `
      <section class="hero">
        <div>
          <span class="eyebrow">НИШ · БИЛ · 2027</span>
          <h1>Арманыңдағы мектепке <span>бірге</span> дайындалайық</h1>
          <p>Назарбаев Зияткерлік мектептері мен Білім-инновация лицейлерінің емтихандарына арналған тапсырмалар, түсіндірмелер және өз прогресіңді бақылау — бір жерде.</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="#/tasks">Тапсырмаларды бастау →</a>
            <a class="btn btn--ghost" href="#about">Емтихан туралы</a>
          </div>
        </div>
        <div class="hero__art" aria-hidden="true">
          <div class="hero__pill"><i class="ic-bur">📐</i> Математика · 3x + 7 = 22</div>
          <div class="hero__pill"><i class="ic-oli">🧩</i> Логика · 1, 1, 2, 3, 5, ?</div>
          <div class="hero__pill"><i class="ic-lav">⚖️</i> Сандық сипаттамалар · А ? B</div>
        </div>
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
            <a class="btn btn--primary" href="#/tasks/nis">НИШ тапсырмалары →</a>
          </article>
          <article class="card exam-card exam-card--bil">
            <span class="exam-card__badge">БИЛ</span>
            <h3>Білім-инновация лицейлері</h3>
            <ul>
              <li>Қазақ тілінде</li>
              <li>Математика және логика</li>
              <li>Қазақ тілі</li>
            </ul>
            <a class="btn btn--olive" href="#/tasks/bil">БИЛ тапсырмалары →</a>
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
          <div class="card feature"><i class="ic-lav">📈</i><h3>Прогресс</h3><p>Әр пән бойынша ең жақсы нәтижең сақталып, көрсетіліп тұрады.</p></div>
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
          <div class="card step"><h3>Нәтижеңді жақсарт</h3><p>Әлсіз пәндерге қайта оралып, прогресс жолағын толтыр.</p></div>
        </div>
      </section>

      <section class="section faq">
        <div class="section__head">
          <span class="eyebrow">Сұрақтар</span>
          <h2>Жиі қойылатын сұрақтар</h2>
        </div>
        <details><summary>НИШ пен БИЛ емтихандарының айырмашылығы неде?</summary><p>НИШ емтиханы қазақ немесе орыс тілінде өтеді және алты бағытты қамтиды. БИЛ емтиханы қазақ тілінде өтеді: математика, логика және қазақ тілі.</p></details>
        <details><summary>Тіркелу керек пе?</summary><p>Жоқ. Тапсырмаларды бірден шеше бересің, нәтижелерің осы құрылғыдағы браузерде сақталады.</p></details>
        <details><summary>Тапсырмалар қаншалықты жиі толықтырылады?</summary><p>Тапсырмалар базасы үнемі толықтырылып отырады. Жаңа пәндер мен сынақ нұсқалары қосылады.</p></details>
      </section>

      <section class="section">
        <div class="cta">
          <div>
            <h2>Бүгін бірінші тапсырманы шеш!</h2>
            <p>Күніне 15 минут жүйелі дайындық үлкен нәтиже береді.</p>
          </div>
          <a class="btn" href="#/tasks">Бастау →</a>
        </div>
      </section>
    `;
  }

  /* ---------- Тапсырмалар: бағыт таңдау ---------- */
  function renderTasksRoot() {
    app.innerHTML = `
      <div class="breadcrumbs"><a href="#/">Басты бет</a> / Тапсырмалар</div>
      <h1 class="page-title">Тапсырмалар</h1>
      <p class="page-sub">Дайындалатын бағытыңды таңда.</p>
      <div class="grid grid--2">
        <a class="card exam-card exam-card--nis" href="#/tasks/nis">
          <span class="exam-card__badge">НИШ</span>
          <h3>${esc(EXAMS.nis.full)}</h3>
          <p>Қазақша және орысша · 6 пән</p>
        </a>
        <a class="card exam-card exam-card--bil" href="#/tasks/bil">
          <span class="exam-card__badge">БИЛ</span>
          <h3>${esc(EXAMS.bil.full)}</h3>
          <p>Қазақша · 3 пән: қазақ тілі, математика, логика</p>
        </a>
      </div>
    `;
  }

  /* ---------- Пәндер тізімі ---------- */
  function renderSubjects(examId, streamId) {
    const exam = EXAMS[examId];
    const streamIds = Object.keys(exam.streams);
    if (!streamId || !exam.streams[streamId]) streamId = streamIds[0];
    const stream = exam.streams[streamId];
    const progress = loadProgress();

    const switcher = streamIds.length > 1
      ? `<div class="lang-switch">${streamIds.map((s) =>
          `<a href="#/tasks/${examId}/${s}" class="${s === streamId ? "active" : ""}">${esc(exam.streams[s].label)}</a>`).join("")}</div>`
      : "";

    app.innerHTML = `
      <div class="breadcrumbs"><a href="#/">Басты бет</a> / <a href="#/tasks">Тапсырмалар</a> / ${esc(exam.title)}</div>
      <h1 class="page-title">${esc(exam.title)} тапсырмалары</h1>
      <p class="page-sub">${esc(exam.full)}${streamIds.length > 1 ? " · оқу тілін таңда" : " · қазақ тілінде"}</p>
      ${switcher}
      <div class="grid grid--3">
        ${stream.subjects.map((s) => {
          const key = `${examId}.${streamId}.${s.id}`;
          const best = progress[key];
          const pct = best == null ? 0 : Math.round((best / s.questions.length) * 100);
          return `
            <a class="card subject" href="#/quiz/${examId}/${streamId}/${s.id}">
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

  /* ---------- Тест ---------- */
  function renderQuiz(examId, streamId, subjectId) {
    const exam = EXAMS[examId];
    const stream = exam && exam.streams[streamId];
    const subject = stream && stream.subjects.find((s) => s.id === subjectId);
    if (!subject) return renderNotFound();

    const ru = streamId === "ru";
    const t = ru
      ? { q: "Вопрос", next: "Следующий →", finish: "Завершить", right: "Верно!", wrong: "Неверно.", again: "Пройти снова", back: "К предметам", done: "Тест завершён", score: "Правильных ответов" }
      : { q: "Сұрақ", next: "Келесі →", finish: "Аяқтау", right: "Дұрыс!", wrong: "Қате.", again: "Қайта шешу", back: "Пәндерге оралу", done: "Тест аяқталды", score: "Дұрыс жауаптар" };

    const backHref = `#/tasks/${examId}/${streamId}`;
    let index = 0;
    let correct = 0;
    const letters = ["A", "B", "C", "D", "E"];

    function header() {
      return `<div class="breadcrumbs"><a href="#/tasks">Тапсырмалар</a> / <a href="${backHref}">${esc(exam.title)} · ${esc(stream.label)}</a> / ${esc(subject.title)}</div>`;
    }

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
      const pct = Math.round((correct / total) * 100);
      app.innerHTML = `
        ${header()}
        <div class="quiz">
          <div class="card result">
            <div class="result__score" style="background:conic-gradient(var(--olive) ${pct}%, var(--lavender-soft) 0)">
              <span style="background:#fff;width:118px;height:118px;border-radius:50%;display:grid;place-items:center">${correct}/${total}</span>
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

  function renderNotFound() {
    app.innerHTML = `
      <div class="card result">
        <h2>Бет табылмады</h2>
        <p>Мұндай бет жоқ немесе жойылған.</p>
        <a class="btn btn--primary" href="#/">Басты бетке</a>
      </div>`;
  }

  /* ---------- Маршрутизация ---------- */
  function setActiveNav(key) {
    document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === key));
  }

  function router() {
    const hash = location.hash || "#/";
    if (!hash.startsWith("#/")) { // ішкі якорьлар (#about)
      if (!app.innerHTML.trim()) { setActiveNav("home"); renderHome(); document.querySelector(hash)?.scrollIntoView(); }
      return;
    }
    const parts = hash.slice(2).split("/").filter(Boolean);

    if (parts.length === 0) { setActiveNav("home"); renderHome(); }
    else if (parts[0] === "tasks" && parts.length === 1) { setActiveNav("tasks"); renderTasksRoot(); }
    else if (parts[0] === "tasks" && EXAMS[parts[1]]) { setActiveNav(parts[1]); renderSubjects(parts[1], parts[2]); }
    else if (parts[0] === "quiz" && EXAMS[parts[1]]) { setActiveNav(parts[1]); renderQuiz(parts[1], parts[2], parts[3]); }
    else { setActiveNav(""); renderNotFound(); }

    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", () => {
    if (location.hash.startsWith("#/") || !location.hash) router();
  });
  router();
})();
