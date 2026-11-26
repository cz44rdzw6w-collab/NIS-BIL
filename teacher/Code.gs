/**
 * НИШ · БИЛ дайындық платформасы: мұғалімге арналған Google Sheets скрипті.
 *
 * Оқушылар сайтта ҮБС нәтижесін сақтағанда немесе күнделікті мақсатын орындағанда,
 * сайт осы скриптке дерек жібереді, ал скрипт оны кестеге жазады.
 *
 * Орнату нұсқаулығы: teacher/README.md
 */

// Сайттағы пәндер (id, кестедегі атауы)
const SUBJECTS = [
  ["math", "Математика"],
  ["quant", "Сандық сипаттамалар"],
  ["science", "Жаратылыстану"],
  ["kazakh", "Қазақ тілі"],
  ["russian", "Орыс тілі"],
  ["english", "Ағылшын тілі"],
  ["logic", "Логика"],
];
const EXAMS = { nis: "НИШ", bil: "БИЛ" };

const UBS_SHEET = "ҮБС нәтижелері";
const UBS_HEADERS = ["Жіберілген уақыт", "Аты-жөні", "Сыныбы", "Бағыт", "ҮБС күні"]
  .concat(SUBJECTS.map((s) => s[1] + ", %"))
  .concat(["Орташа, %", "Ең әлсіз пән", "Балдар", "Серия (күн)", "key"]);

const DAY_SHEET = "Күнделікті мақсаттар";
const DAY_HEADERS = ["Жіберілген уақыт", "Аты-жөні", "Сыныбы", "Бағыт", "Күні", "Орындалған пәндер", "Серия (күн)", "key"];

/** Бір рет қолмен іске қосыңыз: беттерді, тақырыптарды және түстерді дайындайды. */
function setup() {
  getSheet_(UBS_SHEET, UBS_HEADERS);
  getSheet_(DAY_SHEET, DAY_HEADERS);
  const first = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (first.getName() === "Sheet1" || first.getName() === "Лист1" || first.getName() === "Парақ1") {
    if (first.getLastRow() === 0) SpreadsheetApp.getActiveSpreadsheet().deleteSheet(first);
  }
}

/** Сайттан келетін деректер. */
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (d.type === "ubs") saveUbs_(d);
      else if (d.type === "day") saveDay_(d);
      else throw new Error("белгісіз түр");
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

/** Сілтеме жұмыс істейтінін браузерден тексеру үшін. */
function doGet() {
  return json_({ ok: true, message: "Скрипт жұмыс істеп тұр" });
}

function saveUbs_(d) {
  const sh = getSheet_(UBS_SHEET, UBS_HEADERS);
  const scores = d.scores || {};
  const pcts = SUBJECTS.map((s) => {
    const v = scores[s[0]];
    if (!v || !(Number(v.m) > 0)) return "";
    return Math.max(0, Math.min(100, Math.round((Number(v.s) / Number(v.m)) * 100)));
  });
  const filled = pcts.filter((p) => p !== "");
  if (!filled.length) throw new Error("балл жоқ");
  const avg = Math.round(filled.reduce((a, b) => a + b, 0) / filled.length);
  let weakest = "";
  if (filled.length > 1) {
    let min = 101;
    pcts.forEach((p, i) => { if (p !== "" && p < min) { min = p; weakest = SUBJECTS[i][1]; } });
  }
  const details = SUBJECTS.filter((s) => scores[s[0]])
    .map((s) => s[1] + " " + num_(scores[s[0]].s) + "/" + num_(scores[s[0]].m)).join("; ");
  const date = day_(d.date);
  const key = [text_(d.sid, 64), d.exam, date].join("|");
  const row = [new Date(), text_(d.name, 60), text_(d.className, 20), EXAMS[d.exam] || "", date]
    .concat(pcts).concat([avg, weakest, details, int_(d.streak), key]);
  upsert_(sh, key, row);
}

function saveDay_(d) {
  const sh = getSheet_(DAY_SHEET, DAY_HEADERS);
  const names = (d.subjects || []).map((id) => {
    const s = SUBJECTS.filter((x) => x[0] === id)[0];
    return s ? s[1] : "";
  }).filter(String).join(", ");
  const date = day_(d.date);
  const key = [text_(d.sid, 64), d.exam, date].join("|");
  const row = [new Date(), text_(d.name, 60), text_(d.className, 20), EXAMS[d.exam] || "", date,
    names || "Белгіленді", int_(d.streak), key];
  upsert_(sh, key, row);
}

/* ---------- Көмекші функциялар ---------- */

function getSheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (sh) return sh;
  sh = ss.insertSheet(name);
  sh.appendRow(headers);
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#7a1f3d").setFontColor("#ffffff");
  sh.hideColumns(headers.length); // key бағаны
  sh.getRange("A:A").setNumberFormat("dd.MM.yyyy HH:mm");
  if (name === UBS_SHEET) {
    // Пайыз бағандарын бояу: < 50 қызыл, 50–74 сары, ≥ 75 жасыл
    const first = 6, count = SUBJECTS.length + 1;
    const range = sh.getRange(2, first, 1000, count);
    sh.setConditionalFormatRules([
      SpreadsheetApp.newConditionalFormatRule().whenNumberLessThan(50).setBackground("#f6d5dd").setRanges([range]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenNumberBetween(50, 74).setBackground("#fbefc9").setRanges([range]).build(),
      SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(75).setBackground("#e1e9c8").setRanges([range]).build(),
    ]);
  }
  sh.autoResizeColumns(1, headers.length - 1);
  return sh;
}

// Бір оқушының бір күнгі жазбасы қайта келсе, жаңа жол қоспай, бұрынғысын жаңартады
function upsert_(sh, key, row) {
  const keyCol = row.length;
  const last = sh.getLastRow();
  if (last > 1) {
    const keys = sh.getRange(2, keyCol, last - 1, 1).getValues();
    for (let i = 0; i < keys.length; i++) {
      if (keys[i][0] === key) { sh.getRange(i + 2, 1, 1, row.length).setValues([row]); return; }
    }
  }
  sh.appendRow(row);
}

// Мәтінді қысқартады және кестеде формула ретінде орындалмауын қамтамасыз етеді
function text_(v, max) {
  let s = String(v == null ? "" : v).replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}
function num_(v) { const n = Number(v); return isFinite(n) ? Math.max(0, Math.min(1000, n)) : 0; }
function int_(v) { const n = parseInt(v, 10); return isFinite(n) ? Math.max(0, Math.min(10000, n)) : 0; }
function day_(v) { return /^\d{4}-\d{2}-\d{2}$/.test(String(v)) ? String(v) : ""; }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
