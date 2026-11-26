/*
 * Тапсырмалар базасы.
 * Құрылымы: EXAMS[exam].streams[stream].subjects[] → questions[]
 *   q       — сұрақ мәтіні
 *   options — жауап нұсқалары
 *   answer  — дұрыс жауаптың индексі (0-ден басталады)
 *   explain — қысқаша түсіндірме
 * Жаңа сұрақ қосу үшін керекті пәннің questions массивіне объект қосыңыз.
 */
window.EXAMS = {
  nis: {
    title: "НИШ",
    full: "Назарбаев Зияткерлік мектептері",
    examDate: "2027-03-26", // емтихан күні
    streams: {
      kz: {
        label: "Қазақша",
        subjects: [
          {
            id: "math", icon: "📐", color: "ic-bur", title: "Математика",
            questions: [
              { q: "80 санының 25%-ы неге тең?", options: ["15", "20", "25", "40"], answer: 1, explain: "80 · 0,25 = 20." },
              { q: "Тіктөртбұрыштың ұзындығы 12 см, ені 5 см. Оның ауданы қанша?", options: ["17 см²", "34 см²", "60 см²", "65 см²"], answer: 2, explain: "Аудан = ұзындық · ен = 12 · 5 = 60 см²." },
              { q: "3x + 7 = 22 теңдеуін шешіңіз.", options: ["x = 3", "x = 5", "x = 7", "x = 15"], answer: 1, explain: "3x = 22 − 7 = 15, x = 15 : 3 = 5." }
            ]
          },
          {
            id: "quant", icon: "⚖️", color: "ic-lav", title: "Сандық сипаттамалар",
            questions: [
              { q: "Салыстырыңыз:\nА: 2³\nB: 3²", options: ["А үлкен", "B үлкен", "Тең", "Анықтау мүмкін емес"], answer: 1, explain: "2³ = 8, 3² = 9, сондықтан B үлкен." },
              { q: "Салыстырыңыз:\nА: 0,5 · 40\nB: 40 : 2", options: ["А үлкен", "B үлкен", "Тең", "Анықтау мүмкін емес"], answer: 2, explain: "0,5 · 40 = 20 және 40 : 2 = 20, яғни тең." },
              { q: "Заңдылықты табыңыз: 2, 6, 12, 20, 30, ?", options: ["38", "40", "42", "44"], answer: 2, explain: "Айырмалар: 4, 6, 8, 10, келесісі 12. 30 + 12 = 42." }
            ]
          },
          {
            id: "science", icon: "🔬", color: "ic-oli", title: "Жаратылыстану",
            questions: [
              { q: "Қалыпты атмосфералық қысымда су неше градуста қайнайды?", options: ["0 °C", "50 °C", "90 °C", "100 °C"], answer: 3, explain: "Қалыпты қысымда су 100 °C-та қайнайды." },
              { q: "Фотосинтез кезінде өсімдіктер қандай газ бөледі?", options: ["Көмірқышқыл газы", "Оттегі", "Азот", "Сутегі"], answer: 1, explain: "Өсімдіктер көмірқышқыл газын сіңіріп, оттегі бөледі." },
              { q: "Жерге ең жақын жұлдыз қайсы?", options: ["Сириус", "Полярлық жұлдыз", "Күн", "Вега"], answer: 2, explain: "Күн де жұлдыз және ол Жерге ең жақын." }
            ]
          },
          {
            id: "kazakh", icon: "📖", color: "ic-bur", title: "Қазақ тілі",
            questions: [
              { q: "Зат есімді табыңыз.", options: ["жүгірді", "кітап", "әдемі", "бес"], answer: 1, explain: "«Кітап» «не?» деген сұраққа жауап береді, сондықтан зат есім." },
              { q: "«Мектеп» сөзінің көпше түрі қалай жазылады?", options: ["мектепдер", "мектептар", "мектептер", "мектепләр"], answer: 2, explain: "Қатаң «п» дыбысынан кейін жіңішке сөзге «-тер» жалғанады." },
              { q: "«Батыл» сөзінің синонимін табыңыз.", options: ["ер жүрек", "қорқақ", "жалқау", "ақылды"], answer: 0, explain: "«Батыл» мен «ер жүрек» мағынасы жақын." }
            ]
          },
          {
            id: "russian", icon: "📝", color: "ic-lav", title: "Орыс тілі",
            questions: [
              { q: "«Кітап» сөзін орыс тіліне аударыңыз.", options: ["стол", "книга", "ручка", "окно"], answer: 1, explain: "Кітап — книга." },
              { q: "Зат есімді (существительное) табыңыз.", options: ["бегать", "красивый", "дом", "быстро"], answer: 2, explain: "«Дом» отвечает на вопрос «что?», это существительное." },
              { q: "Дұрыс жазылған сөзді таңдаңыз.", options: ["жызнь", "жизнь", "жезнь", "жызьн"], answer: 1, explain: "ЖИ-ШИ пиши с буквой И." }
            ]
          },
          {
            id: "english", icon: "🌍", color: "ic-oli", title: "Ағылшын тілі",
            questions: [], tests: [] // тесттер төменде қосылады
          }
        ]
      },
      ru: {
        label: "Орысша",
        subjects: [
          {
            id: "math", icon: "📐", color: "ic-bur", title: "Математика",
            questions: [
              { q: "Найдите 30% от 150.", options: ["30", "45", "50", "120"], answer: 1, explain: "150 · 0,3 = 45." },
              { q: "Периметр квадрата равен 36 см. Найдите его площадь.", options: ["36 см²", "72 см²", "81 см²", "144 см²"], answer: 2, explain: "Сторона = 36 : 4 = 9 см, площадь = 9² = 81 см²." },
              { q: "Решите уравнение 5x − 8 = 17.", options: ["x = 3", "x = 5", "x = 9", "x = 25"], answer: 1, explain: "5x = 25, x = 5." }
            ]
          },
          {
            id: "quant", icon: "⚖️", color: "ic-lav", title: "Количественные характеристики",
            questions: [
              { q: "Сравните:\nA: 15% от 200\nB: 20% от 150", options: ["A больше", "B больше", "Равны", "Нельзя определить"], answer: 2, explain: "15% от 200 = 30, 20% от 150 = 30. Величины равны." },
              { q: "Сравните:\nA: √81\nB: 2³", options: ["A больше", "B больше", "Равны", "Нельзя определить"], answer: 0, explain: "√81 = 9, 2³ = 8, значит A больше." },
              { q: "Продолжите ряд: 1, 4, 9, 16, ?", options: ["20", "24", "25", "32"], answer: 2, explain: "Это квадраты чисел: 1², 2², 3², 4², 5² = 25." }
            ]
          },
          {
            id: "science", icon: "🔬", color: "ic-oli", title: "Естествознание",
            questions: [
              { q: "Какой орган перекачивает кровь по организму?", options: ["Лёгкие", "Печень", "Сердце", "Почки"], answer: 2, explain: "Сердце работает как насос кровеносной системы." },
              { q: "В каком агрегатном состоянии находится лёд?", options: ["Жидком", "Твёрдом", "Газообразном", "Плазменном"], answer: 1, explain: "Лёд — твёрдое состояние воды." },
              { q: "Какая планета ближе всего к Солнцу?", options: ["Венера", "Земля", "Марс", "Меркурий"], answer: 3, explain: "Меркурий — первая планета от Солнца." }
            ]
          },
          {
            id: "kazakh", icon: "📖", color: "ic-bur", title: "Казахский язык",
            questions: [
              { q: "Переведите на казахский язык слово «книга».", options: ["қалам", "кітап", "дәптер", "үстел"], answer: 1, explain: "Книга — кітап." },
              { q: "Выберите правильное окончание: «Мен мектеп___ барамын».", options: ["-ке", "-ге", "-қа", "-да"], answer: 0, explain: "После глухого «п» в мягком слове — «-ке»: мектепке." },
              { q: "Как по-казахски «спасибо»?", options: ["Сәлем", "Кешіріңіз", "Рақмет", "Сау болыңыз"], answer: 2, explain: "Спасибо — рақмет." }
            ]
          },
          {
            id: "russian", icon: "📝", color: "ic-lav", title: "Русский язык",
            questions: [
              { q: "Какое слово пишется с мягким знаком на конце?", options: ["мяч_", "врач_", "ноч_", "луч_"], answer: 2, explain: "«Ночь» — существительное женского рода, после шипящего пишется Ь." },
              { q: "Подберите антоним к слову «горячий».", options: ["тёплый", "холодный", "жаркий", "кипящий"], answer: 1, explain: "Горячий — холодный." },
              { q: "Сколько слогов в слове «молоко»?", options: ["2", "3", "4", "6"], answer: 1, explain: "Мо-ло-ко: три гласных — три слога." }
            ]
          },
          {
            id: "english", icon: "🌍", color: "ic-oli", title: "Английский язык",
            questions: [], tests: [] // тесттер төменде қосылады
          }
        ]
      }
    }
  },

  bil: {
    title: "БИЛ",
    full: "Білім-инновация лицейлері",
    examDate: "2027-05-02", // емтихан күні
    streams: {
      kz: {
        label: "Қазақша",
        subjects: [
          {
            id: "kazakh", icon: "📖", color: "ic-bur", title: "Қазақ тілі",
            questions: [
              { q: "Етістікті табыңыз.", options: ["оқыды", "қызыл", "үй", "жеті"], answer: 0, explain: "«Оқыды» қимылды білдіреді, «не істеді?» сұрағына жауап береді." },
              { q: "«Ақ» сөзінің антонимі қайсы?", options: ["сары", "қара", "көк", "жасыл"], answer: 1, explain: "Ақ — қара: қарама-қарсы мағыналы сөздер." },
              { q: "«Айгүл кітап оқыды» сөйлеміндегі бастауышты табыңыз.", options: ["Айгүл", "кітап", "оқыды", "бастауыш жоқ"], answer: 0, explain: "«Кім?» сұрағына жауап беретін сөз — Айгүл." }
            ]
          },
          {
            id: "math", icon: "📐", color: "ic-lav", title: "Математика",
            questions: [
              { q: "Ең кіші жай сан қайсы?", options: ["0", "1", "2", "3"], answer: 2, explain: "Жай санның тек екі бөлгіші бар: 1 және өзі. Ең кішісі — 2." },
              { q: "48 : 6 + 4 · 3 = ?", options: ["20", "36", "28", "14"], answer: 0, explain: "Алдымен бөлу мен көбейту: 8 + 12 = 20." },
              { q: "Пойыз 3 сағатта 240 км жүрді. Оның жылдамдығы қанша?", options: ["60 км/сағ", "70 км/сағ", "80 км/сағ", "720 км/сағ"], answer: 2, explain: "v = S : t = 240 : 3 = 80 км/сағ." }
            ]
          },
          {
            id: "logic", icon: "🧩", color: "ic-oli", title: "Логика",
            questions: [
              { q: "Қатарды жалғастырыңыз: 1, 1, 2, 3, 5, 8, ?", options: ["11", "12", "13", "16"], answer: 2, explain: "Әр сан алдыңғы екеуінің қосындысы: 5 + 8 = 13." },
              { q: "Барлық мысықтар — жануар. Мұрат — мысық. Демек…", options: ["Мұрат — жануар", "Барлық жануар — мысық", "Мұрат — ит", "Ештеңе айтуға болмайды"], answer: 0, explain: "Мұрат мысықтар тобына кіреді, ал барлық мысықтар — жануар." },
              { q: "Бүгін сәрсенбі. 3 күннен кейін аптаның қай күні болады?", options: ["Жұма", "Сенбі", "Жексенбі", "Бейсенбі"], answer: 1, explain: "Бейсенбі → жұма → сенбі." }
            ]
          }
        ]
      }
    }
  }
};

/*
 * ============ Қосымша сұрақтар: тілдер ============
 * Q(сұрақ, [нұсқалар], "дұрыс нұсқаның мәтіні", "түсіндірме")
 * Дұрыс жауап мәтінмен беріледі, индекс өзі есептеледі.
 */
(function () {
  function Q(q, options, correct, explain) {
    const answer = options.indexOf(correct);
    if (answer < 0) throw new Error("Дұрыс жауап нұсқалардың ішінде жоқ: " + q);
    return { q, options, answer, explain };
  }
  function add(exam, stream, subjectId, list) {
    const s = window.EXAMS[exam].streams[stream].subjects.find((x) => x.id === subjectId);
    s.questions.push(...list);
  }

  /* ---------- НИШ · Қазақша ағын ---------- */
  add("nis", "kz", "kazakh", [
    Q("Біріккен сөзді табыңыз.", ["мектеп", "оқушы", "кітапхана", "жазды"], "кітапхана", "«Кітапхана» екі түбірден (кітап + хана) біріккен."),
    Q("Жұрнағы бар сөзді табыңыз.", ["үй", "егінші", "тау", "бала"], "егінші", "«Егін» түбіріне «-ші» жұрнағы жалғанып, жаңа сөз жасалған."),
    Q("Көмектес септігінде тұрған сөзді табыңыз.", ["досыма", "досымның", "досымды", "досыммен"], "досыммен", "Көмектес септігі «кіммен? немен?» сұрағына жауап береді, жалғауы -мен/-бен/-пен."),
    Q("Антоним сөздер жұбын табыңыз.", ["үлкен – зор", "жылдам – тез", "ыстық – суық", "әдемі – сұлу"], "ыстық – суық", "Антонимдер мағынасы қарама-қарсы сөздер."),
    Q("Өткен шақтағы етістікті табыңыз.", ["барады", "барды", "барар", "барсын"], "барды", "«Барды» қимылдың бұрын болғанын білдіреді."),
    Q("«Балалар аулада доп ойнады» сөйлеміндегі баяндауышты табыңыз.", ["Балалар", "аулада", "доп", "ойнады"], "ойнады", "Баяндауыш бастауыштың іс-әрекетін білдіреді: балалар не істеді? Ойнады."),
    Q("Буын саны ең көп сөзді табыңыз.", ["кітап", "мектеп", "балалардың", "дала"], "балалардың", "Ба-ла-лар-дың: төрт буын."),
    Q("Сын есімнің күшейтпелі шырайын табыңыз.", ["қызылырақ", "қып-қызыл", "қызғылт", "қызыл"], "қып-қызыл", "Күшейтпелі шырай сапаны күшейтіп көрсетеді: қып-қызыл, ап-ақ."),
    Q("Мақалды толықтырыңыз: «Өнер алды – ...»", ["ақыл", "білім", "қызыл тіл", "еңбек"], "қызыл тіл", "«Өнер алды – қызыл тіл» мақалы сөз өнерінің маңызын айтады."),
    Q("Реттік сан есімді табыңыз.", ["бесеу", "бес-бестен", "бестей", "бесінші"], "бесінші", "Реттік сан есім заттың ретін білдіреді, жұрнағы -ыншы/-інші/-ншы/-нші."),
  ]);

  add("nis", "kz", "russian", [
    Q("«Мектеп» сөзін орыс тіліне аударыңыз.", ["класс", "школа", "урок", "учитель"], "школа", "Мектеп – школа."),
    Q("«Стол» сөзінің көпше түрін табыңыз.", ["стола", "столом", "столы", "столов"], "столы", "Именительный падеж множественного числа: столы."),
    Q("Сын есімді (прилагательное) табыңыз.", ["читать", "синий", "книга", "быстро"], "синий", "«Синий» отвечает на вопрос «какой?»."),
    Q("Дұрыс тіркесті таңдаңыз: «... книга»", ["интересный", "интересная", "интересное", "интересные"], "интересная", "«Книга» – женский род, поэтому «интересная»."),
    Q("Өткен шақтағы етістікті табыңыз.", ["читаю", "буду читать", "читал", "читай"], "читал", "«Читал» – прошедшее время."),
    Q("«Большой» сөзінің антонимін табыңыз.", ["огромный", "маленький", "высокий", "широкий"], "маленький", "Большой – маленький."),
    Q("Дұрыс жазылғанын таңдаңыз: «Мальчик ... в школе».", ["учиться", "учится", "учитса", "учеться"], "учится", "Мальчик что делает? – учится (без Ь)."),
    Q("Сөйлемді толықтырыңыз: «Мы идём ... школу».", ["в", "на", "к", "у"], "в", "Идти куда? – в школу."),
    Q("«Сәлеметсіз бе» орысша қалай болады?", ["До свидания", "Спасибо", "Здравствуйте", "Извините"], "Здравствуйте", "Сәлеметсіз бе – Здравствуйте."),
    Q("«Ёлка» сөзінде неше әріп бар?", ["3", "4", "5", "6"], "4", "Ё-л-к-а: 4 әріп."),
  ]);


  /* ---------- НИШ · Орысша ағын ---------- */
  add("nis", "ru", "kazakh", [
    Q("Переведите на казахский язык слово «школа».", ["сынып", "мектеп", "сабақ", "мұғалім"], "мектеп", "Школа – мектеп."),
    Q("Как по-казахски «вода»?", ["нан", "ет", "су", "сүт"], "су", "Вода – су."),
    Q("Выберите правильную форму множественного числа слова «бала».", ["балалер", "балатар", "баладар", "балалар"], "балалар", "После гласной в твёрдом слове – окончание «-лар»."),
    Q("Закончите предложение: «Мен кітап ...» (я читаю книгу).", ["оқимын", "оқисың", "оқиды", "оқимыз"], "оқимын", "С местоимением «мен» – окончание «-мын»."),
    Q("Как по-казахски «красный»?", ["сары", "көк", "қызыл", "ақ"], "қызыл", "Красный – қызыл."),
    Q("Выберите окончание: «Біз саябақ... серуендедік» (мы гуляли в парке).", ["-та", "-да", "-те", "-тан"], "-та", "После глухого «қ» в твёрдом слове – «-та»: саябақта."),
    Q("Как по-казахски число 15?", ["он бес", "елу", "бес он", "он алты"], "он бес", "15 – он бес."),
    Q("Как по-казахски «мама»?", ["әке", "ана", "аға", "іні"], "ана", "Мама – ана."),
    Q("Что означает вопрос «Сен қайда тұрасың?»", ["Как тебя зовут?", "Сколько тебе лет?", "Где ты живёшь?", "Куда ты идёшь?"], "Где ты живёшь?", "Қайда – где, тұрасың – живёшь."),
    Q("Подберите антоним к слову «үлкен».", ["кіші", "биік", "ұзын", "жаңа"], "кіші", "Үлкен (большой) – кіші (маленький)."),
  ]);

  add("nis", "ru", "russian", [
    Q("В каком слове пишется Ъ?", ["сем_я", "под_езд", "вороб_и", "л_ют"], "под_езд", "Ъ пишется после приставки, оканчивающейся на согласную, перед е, ё, ю, я: подъезд."),
    Q("Определите падеж слова «сестрой» в предложении «Я горжусь сестрой».", ["дательный", "винительный", "творительный", "предложный"], "творительный", "Горжусь кем? – сестрой: творительный падеж."),
    Q("Укажите слово с приставкой.", ["ходьба", "подход", "ходок", "ходит"], "подход", "«Под-» – приставка: под-ход."),
    Q("Какое слово является наречием?", ["бег", "быстрый", "быстро", "бежать"], "быстро", "Наречие отвечает на вопрос «как?»: быстро."),
    Q("Как правильно написать: «(не)большой дом» в значении «маленький»?", ["не большой", "небольшой", "не-большой", "небольшёй"], "небольшой", "Если слово с НЕ можно заменить синонимом без НЕ (маленький), пишется слитно."),
    Q("Подберите синоним к слову «смелый».", ["храбрый", "трусливый", "весёлый", "сильный"], "храбрый", "Смелый – храбрый."),
    Q("Определите вид глагола «решить».", ["несовершенный", "совершенный", "возвратный", "безличный"], "совершенный", "Решить – что сделать? Совершенный вид."),
    Q("Укажите сложное слово.", ["переход", "пароход", "походка", "водитель"], "пароход", "Пароход образован из двух корней: пар + ход."),
    Q("Сколько грамматических основ в предложении «Солнце село, и стало темно»?", ["одна", "две", "три", "четыре"], "две", "1) солнце село; 2) стало темно."),
    Q("Какой частью речи является слово «пятый»?", ["прилагательное", "числительное", "наречие", "существительное"], "числительное", "«Пятый» – порядковое числительное."),
  ]);


  /* ---------- БИЛ · Қазақ тілі ---------- */
  add("bil", "kz", "kazakh", [
    Q("«Ержан жаңа кітапты оқыды» сөйлеміндегі анықтауышты табыңыз.", ["Ержан", "жаңа", "кітапты", "оқыды"], "жаңа", "Анықтауыш «қандай?» сұрағына жауап береді: қандай кітапты? – жаңа."),
    Q("Зат есім емес сөзді табыңыз.", ["қала", "көл", "әдемі", "кітап"], "әдемі", "«Әдемі» – сын есім, «қандай?» сұрағына жауап береді."),
    Q("Шығыс септігінде тұрған сөзді табыңыз.", ["үйге", "үйде", "үйден", "үйдің"], "үйден", "Шығыс септігі «қайдан? неден?» сұрағына жауап береді, жалғауы -дан/-ден/-тан/-тен/-нан/-нен."),
    Q("«Жұмсақ» сөзінің антонимі қайсы?", ["қатты", "жылы", "жеңіл", "тегіс"], "қатты", "Жұмсақ – қатты."),
    Q("Синонимдер жұбын табыңыз.", ["биік – аласа", "жылдам – шапшаң", "ащы – тәтті", "жақсы – жаман"], "жылдам – шапшаң", "Синонимдер мағынасы жақын сөздер: жылдам, шапшаң."),
    Q("Тек жіңішке дауыстылардан тұратын сөзді табыңыз.", ["кітап", "бала", "әдемі", "қала"], "әдемі", "Ә, е, і – жіңішке дауыстылар."),
    Q("«Еңбек» сөзінің барыс септігіндегі дұрыс түрі?", ["еңбекка", "еңбекге", "еңбекке", "еңбекқа"], "еңбекке", "Жіңішке сөз, соңы қатаң «к»: -ке жалғанады."),
    Q("Мақалды аяқтаңыз: «Отан – оттан да ...»", ["жылы", "ыстық", "қымбат", "биік"], "ыстық", "«Отан – оттан да ыстық» мақалы туған жерге деген сүйіспеншілікті білдіреді."),
    Q("Бұйрық райдағы етістікті табыңыз.", ["жазды", "жазады", "жаз", "жазған"], "жаз", "Бұйрық рай біреуге тапсырма береді: жаз, оқы, кел."),
    Q("Жіктеу есімдігін табыңыз.", ["бұл", "мен", "кім", "бәрі"], "мен", "Жіктеу есімдіктері: мен, сен, ол, біз, сіз, олар."),
  ]);
})();

/*
 * ============ Ағылшын тілі: тесттерге бөлу ============
 * Пәннің `tests` массиві болса, пән тесттерге бөлінеді (1-тест, 2-тест...).
 * Тест құрылымы:
 *   { id, title, fixedOrder, vocab: [W(...)], passages: { p1: { title, text } }, questions: [...] }
 *   Сұрақта `passage: "p1"` болса, сұрақ үстінде сол мәтін көрсетіледі.
 *   Сұрақта `words: [W(...)]` болса, «Қатемен жұмыс» бөлімінде аудармасы шығады.
 * W(ағылшынша, қазақша, орысша)
 */
(function () {
  function W(en, kz, ru) { return { en, kz, ru }; }
  window.W = W;
})();

/*
 * ============ Ағылшын тілі · 1-тест ============
 * Дереккөз: «Сборник тестов в НИШ. Английский язык», TEST 1 (мәтіндер мен сұрақтар өзгертусіз).
 * Жауаптар кітаптың жауап кестесі бойынша. Сөз аудармалары («words») платформа үшін қосылған.
 */
(function () {
  const W = window.W;
  // Тест алдындағы сөздік: мәтіндерде кездесетін сөздер, мәтін бойынша топталған (платформа құрастырған)
  const VOCAB = [
    { title: "The Cycling Club (1)", words: [
      W("organization", "ұйым", "организация"), W("member", "мүше", "член, участник"), W("promote", "насихаттау, қолдау", "продвигать"),
      W("cycle lane", "велосипед жолағы", "велодорожка"), W("participation", "қатысу", "участие"), W("regulations", "ережелер", "правила, нормы")] },
    { title: "Why cycle? (2)", words: [
      W("environment", "қоршаған орта", "окружающая среда"), W("traffic jam", "көлік кептелісі", "пробка"), W("pollution", "ластану", "загрязнение"),
      W("public transport", "қоғамдық көлік", "общественный транспорт"), W("combine", "біріктіру", "сочетать")] },
    { title: "Join our club! · Contact us! (3–4)", words: [
      W("social events", "көпшілік шаралар", "общественные мероприятия"), W("advice", "кеңес", "совет"), W("discount", "жеңілдік", "скидка"),
      W("repair", "жөндеу", "ремонт"), W("insurance", "сақтандыру", "страховка"), W("area", "аудан, өңір", "район, местность")] },
    { title: "Equipment (5)", words: [
      W("equipment", "құрал-жабдық", "снаряжение"), W("guarantee", "кепілдік беру", "гарантировать"), W("injury", "жарақат", "травма")] },
    { title: "Penguins (6–7)", words: [
      W("continent", "құрлық, материк", "материк"), W("wild", "жабайы", "дикий"), W("survive", "тірі қалу", "выживать"), W("layer", "қабат", "слой"),
      W("fat", "май", "жир"), W("habitat", "тіршілік ету орны, мекен", "место обитания"), W("predator", "жыртқыш", "хищник"),
      W("killer whale", "косатка (кит)", "косатка"), W("seal", "итбалық", "тюлень")] },
    { title: "Library hours (8)", words: [
      W("weekdays", "жұмыс күндері (дс–жм)", "будние дни"), W("till", "...дейін", "до")] },
    { title: "The United States (9–10)", words: [
      W("located", "орналасқан", "расположен"), W("plain", "жазық", "равнина"), W("desert", "шөл", "пустыня"), W("volcano", "жанартау", "вулкан"),
      W("rainforest", "тропикалық орман", "тропический лес"), W("chain of islands", "аралдар тізбегі", "цепь островов")] },
    { title: "School sign (11)", words: [
      W("entrance", "кіреберіс", "вход"), W("ahead", "алда", "впереди"), W("dead slow", "өте баяу", "очень медленно")] },
    { title: "What are the Banks? (12–14)", words: [
      W("savings account", "жинақ шоты", "сберегательный счёт"), W("earn", "табу (ақша)", "зарабатывать"), W("paycheck", "жалақы", "зарплата"),
      W("bill", "төлем шоты", "счёт (к оплате)"), W("lend / loan", "қарызға беру / несие", "давать взаймы / кредит"),
      W("borrow", "қарызға алу", "брать взаймы"), W("charging interest", "өсім (пайыз) алу", "начисление процентов")] },
    { title: "Message (15)", words: [
      W("by mistake", "байқамай, қателесіп", "по ошибке"), W("pick up (picked it up)", "алып кету", "взять, подобрать")] },
    { title: "The lifetime of a mosquito (16)", words: [
      W("stage", "кезең", "стадия"), W("hatch", "жұмыртқадан шығу", "вылупляться"), W("species", "түр", "вид"), W("lay eggs (lay their eggs)", "жұмыртқалау", "откладывать яйца"),
      W("standing water", "тоқтау су", "стоячая вода"), W("marsh / swamp", "батпақ", "болото")] },
    { title: "Gym sign (17)", words: [
      W("changing room", "киім ауыстыратын бөлме", "раздевалка"), W("locker", "құлыпталатын шкаф", "шкафчик"), W("staff", "қызметкерлер", "персонал"),
      W("remove", "алып кету", "убирать")] },
    { title: "Sleep (18–20)", words: [
      W("daily", "күнделікті", "ежедневно"), W("memory", "ес", "память"), W("alertness", "сергектік", "бодрость"), W("affect", "әсер ету", "влиять"),
      W("newborn infant", "жаңа туған нәресте", "новорождённый"), W("teenager", "жасөспірім", "подросток"), W("pregnant", "жүкті", "беременная"),
      W("elderly", "егде жастағы", "пожилой")] },
  ];

  const PASSAGES = {
    club: { title: "The Cycling Club — Who are we?", text:
      "The Cycling Club is a national organization with over 15,000 members. We promote cycling and are working to improve conditions for cycling. We want:\n\n" +
      "• more people on bikes\n• bike road safety lessons for all school children\n• more cycle lanes and safer roads\n• traffic lights for bikes\n• safe parking for bikes in cities and towns\n• regular car-free days\n• more participation in National Bike Week\n• new rules and regulations for car drivers" },
    why: { title: "Why cycle?", text:
      "Cycling is good for you and good for the environment. More people on bikes mean fewer traffic jams and other traffic problems and less air and noise pollution. More people on bikes also mean healthier and happier people – if the roads are safe. In addition, cycling is a cheap method of transport. If you can’t cycle all the way to work or college, combine a bike ride with public transport: you can take bikes on most trains and trams and on some buses." },
    join: { title: "Join our club! You get ...", text:
      "• all the news on our club website\n• regular bike rides and social events\n• free cycling maps\n• advice on safe cycling\n• discounts on safe cycling courses\n• discounts on bike repair courses\n• discounts on new bikes in bike shops around the country\n• cheap cycle insurance" },
    contact: { title: "Contact us! Tell us ...", text:
      "• ... what you think of cycling safety and transport in your area\n• ... what you would like to improve in your area\n• ... your ideas to get more people on their bikes!" },
    equipment: { kind: "notice", text: "The use of this equipment does not guarantee personal safety or freedom from physical injury" },
    penguins: { title: "Penguins", text:
      "Penguins are among the most popular of all birds. They only live in and around the South Pole and the continent of Antarctica. No wild penguins live at the North Pole. There are many different kinds of penguins. The largest penguin is called the Emperor Penguin and the smallest kind of penguin is the Little Blue Penguin. There are 17 different kinds of penguins in all and none of them can fly.\n\n" +
      "Penguins have to be able to survive in some of the Earth's coldest and windiest conditions. They are great swimmers and have thick layers of fat to protect them from the bitter cold. Even in their freezing cold habitats, penguins still have to watch out for predators such as killer whales and seals." },
    library: { kind: "notice", title: "LIBRARY HOURS", text: "OPEN\n9.AM TILL 5.30 WEEKDAYS\n9.30 A.M TILL 1 P.M SATURDAY" },
    usa: { title: "The United States", text:
      "The United States is a large country. It is the third largest in the whole world! It is located in a continent called North America. Parts of the United States touch three different oceans. The United States has tall mountains, wide plains, deserts, hills, rivers, lakes, volcanoes, and even rainforests! People from all over the world have come to live in the United States.\n\n" +
      "There are 50 states in the United States. The newest states, Alaska and Hawaii, are not connected to the other states. Alaska is the largest state and Hawaii is a chain of islands in the Pacific Ocean." },
    school: { kind: "notice", text: "School entrance ahead\ndead slow" },
    banks: { title: "What are the Banks?", text:
      "Banks are places where people can keep their money. Most people use banks to save money in their savings accounts and to pay money from their checking accounts. Today, when a person earns money from their job, their paycheck is often electronically deposited (put) into their savings or checking account. Then, he or she can pay their bills by writing checks from their checking accounts or pay online where their bills are electronically connected to their bank accounts.\n\n" +
      "Banks also give __12__ to people. Banks use the money that their customers deposit to lend to people to buy new houses, cars, or to start businesses among other reasons. The bank makes money from lending by charging interest. In other words, people have to pay back more than they borrowed. This amount depends on how risky the bank thinks the borrower is and how fast the loan is paid back among other things." },
    stefan: { kind: "message", text: "Stefan,\nI can’t find my hat. It’s a bit like yours so maybe you picked it up by mistake when we were doing our homework together last night.\nBella" },
    mosquito: { title: "The lifetime of a mosquito", text:
      "There are four stages in the lifetime of a mosquito: egg, larva, pupa, and adult. Mosquito eggs need water to hatch. Different species of mosquitoes prefer different places to lay their eggs. Some prefer to lay their eggs in standing water, such as water in old tires or buckets. Others like to lay their eggs in areas with a lot of organic material, like leaves and grass, so they lay their eggs in marshes and swamps. Some prefer fresh water; some like saltwater." },
    gym: { kind: "notice", text: "Gym changing rooms\nPlace personal items in lockers.\nStaff will remove anything on floor." },
    sleep: { title: "Sleep", text:
      "The National Sleep Foundation in the United States says that 7–9 hours of sleep daily is best for an adult. Seven to nine hours of sleep is good for memory, alertness, problem–solving, and health. Less than six hours of sleep affects the ability to think. Getting too much sleep may not be good for people either. Too much sleep is linked to sickness and depression. Babies need a lot more sleep than adults. A newborn infant needs up to 18 hours of sleep each day. A baby spends about nine hours in REM sleep. Five–year–olds need 11–13 hours of sleep each day. A five–year– old spends about 2 hours in REM sleep. Teenagers need 9–10 hours of sleep each day. Pregnant women need more sleep than other adults. Many people think that *elderly* people need less sleep than younger adults, but that is not true. Most adults do well with 7–9 hours of sleep." },
  };

  // answer: кітаптың жауап кестесі (A=0, B=1, C=2, D=3)
  const QUESTIONS = [
    { passage: "club", q: "What does the Cycling club want?", options: ["The club wants better safety for cyclists and fewer cars on the roads.", "The club wants special roads for cyclists.", "The club wants safety lessons for adults", "The club wants to earn more money"], answer: 0,
      explain: "Text: “more cycle lanes and safer roads”, “regular car-free days”.",
      words: [W("promote", "насихаттау, қолдау", "продвигать, поддерживать"), W("cycle lane", "велосипед жолағы", "велодорожка"), W("participation", "қатысу", "участие"), W("regulations", "ережелер", "правила, нормы")] },
    { passage: "why", q: "Find the true sentence", options: ["The Cycling Club is against public transport.", "More people on bikes cause traffic jams.", "Cycling is not expensive comparing with other transport.", "It is dangerous to cycle to work"], answer: 2,
      explain: "Text: “cycling is a cheap method of transport”.",
      words: [W("environment", "қоршаған орта", "окружающая среда"), W("traffic jam", "көлік кептелісі", "пробка"), W("pollution", "ластану", "загрязнение"), W("combine", "біріктіру", "сочетать")] },
    { passage: "join", q: "If you join the club, what will you NOT get?", options: ["Individual trainer", "Cheap cycle insurance", "Regular social events", "Free maps"], answer: 0,
      explain: "The list has insurance, social events and free maps, but no individual trainer.",
      words: [W("discount", "жеңілдік", "скидка"), W("insurance", "сақтандыру", "страховка"), W("advice", "кеңес", "совет"), W("trainer", "жаттықтырушы", "тренер")] },
    { passage: "contact", q: "Contacting the club, you can…", options: ["...share your ideas how to improve transportation system", "...tell what you think about modern automobiles", "...share your ideas how to get more people on their cars", "...tell what can be improved in your area"], answer: 3,
      explain: "Text: “what you would like to improve in your area”.",
      words: [W("improve", "жақсарту", "улучшать"), W("area", "аудан, өңір", "район, местность"), W("share", "бөлісу", "делиться")] },
    { passage: "equipment", q: "This equipment...", options: ["...is 100% safe", "...cannot promise safety", "...causes injury"], answer: 1,
      explain: "“does not guarantee personal safety” = cannot promise safety.",
      words: [W("equipment", "құрал-жабдық", "снаряжение, оборудование"), W("guarantee", "кепілдік беру", "гарантировать"), W("injury", "жарақат", "травма")] },
    { passage: "penguins", q: "Penguins are....", options: ["… all very large", "… great at flying", "… great at swimming", "… not birds"], answer: 2,
      explain: "Text: “They are great swimmers”.",
      words: [W("survive", "тірі қалу", "выживать"), W("layer", "қабат", "слой"), W("fat", "май", "жир"), W("bitter cold", "қатты суық", "сильный холод")] },
    { passage: "penguins", q: "Which of the following is NOT a PREDATOR of penguins?", options: ["Hawk", "Killer whale", "Seal", "None of these"], answer: 0,
      explain: "Text: “predators such as killer whales and seals”. Hawks are not mentioned.",
      words: [W("predator", "жыртқыш", "хищник"), W("hawk", "қаршыға", "ястреб"), W("killer whale", "косатка (кит)", "косатка"), W("seal", "итбалық", "тюлень")] },
    { passage: "library", q: "The library ...", options: ["closes later on Saturday", "is open 5 days a week", "is not open on Sunday", "is open everyday"], answer: 2,
      explain: "The sign shows weekdays and Saturday only, so it is closed on Sunday.",
      words: [W("weekdays", "жұмыс күндері (дс–жм)", "будние дни"), W("till", "...дейін", "до")] },
    { passage: "usa", q: "According to the text, which state of the United States is the newest and contain islands?", options: ["Alaska", "North America", "Pacific Ocean", "Hawaii"], answer: 3,
      explain: "Text: “Hawaii is a chain of islands in the Pacific Ocean”.",
      words: [W("newest", "ең жаңа", "самый новый"), W("chain of islands", "аралдар тізбегі", "цепь островов"), W("connected", "қосылған", "соединённый")] },
    { passage: "usa", q: "Find the true statement", options: ["The United States touches Pacific Ocean", "The United States doesn’t have rainforests", "Alaska and Hawaii are islands", "The United States is located in South America"], answer: 0,
      explain: "Text: “Parts of the United States touch three different oceans”, Hawaii is in the Pacific Ocean.",
      words: [W("located", "орналасқан", "расположен"), W("plain", "жазық", "равнина"), W("rainforest", "тропикалық орман", "тропический лес"), W("statement", "тұжырым", "утверждение")] },
    { passage: "school", q: "Who is this sign meant for?", options: ["children", "drivers", "teachers", "parents"], answer: 1,
      explain: "“Dead slow” is an instruction for drivers near a school.",
      words: [W("entrance", "кіреберіс", "вход"), W("ahead", "алда", "впереди"), W("dead slow", "өте баяу", "очень медленно"), W("meant for", "...ға арналған", "предназначен для")] },
    { passage: "banks", q: "What word is missing in paragraph 2?", options: ["houses", "loans", "cars", "prizes"], answer: 1,
      explain: "Banks “lend to people”, so they give loans.",
      words: [W("loan", "несие", "кредит, заём"), W("lend", "қарызға беру", "давать взаймы"), W("deposit", "салым салу", "вносить (вклад)"), W("customer", "клиент", "клиент")] },
    { passage: "banks", q: "Find the false sentence", options: ["Banks lend money to people", "Banks help people get jobs", "Banks provide a place for people to save their money", "Banks provide a place where people can pay their bills from"], answer: 1,
      explain: "The text says nothing about banks helping people get jobs.",
      words: [W("savings account", "жинақ шоты", "сберегательный счёт"), W("bill", "төлем шоты", "счёт (к оплате)"), W("provide", "қамтамасыз ету", "предоставлять"), W("false", "жалған, қате", "ложный, неверный")] },
    { passage: "banks", q: "How does \"interest\" work?", options: ["Banks require people to pay back money they borrowed very quickly", "Banks require people to pay back more money than they borrowed", "Banks require people to pay back the same amount they borrowed", "Banks pay people more money than they borrowed"], answer: 1,
      explain: "Text: “people have to pay back more than they borrowed”.",
      words: [W("interest", "пайыз, өсім", "проценты"), W("borrow", "қарызға алу", "брать взаймы"), W("pay back", "қайтару", "возвращать (долг)"), W("require", "талап ету", "требовать")] },
    { passage: "stefan", q: "Bella thinks…", options: ["she has found Stefan’s hat.", "Stefan has taken her hat.", "Stefan has lost his homework.", "Stefan has stolen her hat"], answer: 1,
      explain: "“maybe you picked it up by mistake”: she thinks Stefan took it by mistake (not stole it).",
      words: [W("by mistake", "байқамай, қателесіп", "по ошибке"), W("pick up", "алып кету", "взять, подобрать"), W("steal (stolen)", "ұрлау", "красть (украл)")] },
    { passage: "mosquito", q: "Where do mosquitoes lay their eggs?", options: ["In standing water.", "In marshes and swamps", "In fresh water.", "All of the above are correct."], answer: 3,
      explain: "The text names standing water, marshes and swamps, and fresh water.",
      words: [W("lay eggs (lay their eggs)", "жұмыртқалау", "откладывать яйца"), W("hatch", "жұмыртқадан шығу", "вылупляться"), W("standing water", "тоқтау су", "стоячая вода"), W("marsh / swamp", "батпақ", "болото")] },
    { passage: "gym", q: "What does it say?", options: ["If staff find items on the floor, they will remove them away in a locker.", "You must use lockers only with the permission of staff.", "Lockers are regularly checked by staff."], answer: 0,
      explain: "“Staff will remove anything on floor.”",
      words: [W("changing room", "киім ауыстыратын бөлме", "раздевалка"), W("locker", "құлыпталатын шкаф", "шкафчик"), W("staff", "қызметкерлер", "персонал"), W("remove", "алып кету", "убирать")] },
    { passage: "sleep", q: "How much sleep should an adult get?", options: ["6-8 hours.", "8 hours.", "7-9 hours.", "At least 9 hours."], answer: 2,
      explain: "Text: “7–9 hours of sleep daily is best for an adult”.",
      words: [W("daily", "күнделікті", "ежедневно"), W("alertness", "сергектік", "бодрость, внимательность"), W("ability", "қабілет", "способность")] },
    { passage: "sleep", q: "Which group needs the most sleep?", options: ["Babies", "Adults", "Pregnant women", "Elderly adults"], answer: 0,
      explain: "Text: “A newborn infant needs up to 18 hours of sleep each day.”",
      words: [W("newborn infant", "жаңа туған нәресте", "новорождённый"), W("pregnant", "жүкті", "беременная"), W("teenager", "жасөспірім", "подросток")] },
    { passage: "sleep", q: "The best synonym for elderly people are...", options: ["babies.", "children.", "teenagers.", "older adults."], answer: 3,
      explain: "Elderly = old, older adults.",
      words: [W("elderly", "егде жастағы", "пожилой"), W("synonym", "синоним", "синоним")] },
  ];

  ["kz", "ru"].forEach((stream) => {
    const s = window.EXAMS.nis.streams[stream].subjects.find((x) => x.id === "english");
    s.tests.push({
      id: "1", title: stream === "ru" ? "Тест 1" : "1-тест", subtitle: stream === "ru" ? "Работа с текстом · 40 минут" : "Мәтінмен жұмыс · 40 минут", fixedOrder: true,
      source: "«Сборник тестов в НИШ. Английский язык», TEST 1",
      vocab: VOCAB, passages: PASSAGES,
      questions: QUESTIONS.map((q) => Object.assign({}, q)),
    });
  });
})();

/*
 * ============ Ағылшын тілі · 2-тест ============
 * Дереккөз: «Сборник тестов в НИШ. Английский язык», TEST 2 (мәтіндер мен сұрақтар өзгертусіз).
 * Суретпен берілген хабарландырулар мен жарнамалар мәтінмен жазылды. Жауаптар кітаптың жауап кестесі бойынша.
 */
(function () {
  const W = window.W;
  // Тест алдындағы сөздік: мәтіндерде кездесетін сөздер, мәтін бойынша топталған (платформа құрастырған)
  const VOCAB = [
    { title: "Message 1 (1)", words: [
      W("outside", "сыртында", "снаружи, у входа"), W("text (v)", "SMS жазу", "написать сообщение"), W("be late", "кешігу", "опаздывать"), W("next", "келесі", "следующий")] },
    { title: "School trip (2)", words: [
      W("pupil", "оқушы", "ученик"), W("school trip", "мектеп саяхаты", "школьная поездка"), W("at the latest", "ең кешіктірмей", "не позднее")] },
    { title: "Language courses (3–6)", words: [
      W("level", "деңгей", "уровень"), W("skiing", "шаңғы тебу", "катание на лыжах"), W("full board", "толық тамақтану", "полный пансион"),
      W("intensive", "қарқынды, күшейтілген", "интенсивный"), W("examination centre", "емтихан орталығы", "экзаменационный центр"),
      W("short course", "қысқа курс", "краткий курс"), W("translation", "аударма", "перевод"), W("technical", "техникалық", "технический")] },
    { title: "Bicycle shop (7)", words: [
      W("repair", "жөндеу", "ремонт"), W("side entrance", "бүйір кіреберіс", "боковой вход"), W("front entrance", "алдыңғы кіреберіс", "главный вход"),
      W("sales", "сауда", "продажа")] },
    { title: "Label (8)", words: [
      W("refrigerator", "тоңазытқыш", "холодильник"), W("after opening", "ашқаннан кейін", "после вскрытия"), W("within", "ішінде", "в течение")] },
    { title: "Weather report (9–11)", words: [
      W("weather report", "ауа райы болжамы", "прогноз погоды"), W("degree", "градус", "градус"), W("clear", "ашық (аспан)", "ясно"),
      W("expect", "күту", "ожидать"), W("shower", "нөсер, қысқа жаңбыр", "ливень"), W("raining cats and dogs", "қатты жаңбыр жауу", "льёт как из ведра"),
      W("umbrella", "қолшатыр", "зонт")] },
    { title: "Message (12)", words: [
      W("homework", "үй тапсырмасы", "домашнее задание"), W("leave (left)", "қалдыру (қалдырды)", "оставить (оставила)"), W("lend", "қарызға беру", "давать взаймы")] },
    { title: "The Body Shop (13–15)", words: [
      W("object / purpose", "мақсат", "цель"), W("earn", "табу (ақша)", "зарабатывать"), W("feed", "асырау", "кормить"), W("rapidly", "өте жылдам", "быстро"),
      W("successful business", "сәтті бизнес", "успешный бизнес"), W("give up (giving up)", "бас тарту", "отказываться"), W("succeed", "табысқа жету", "добиться успеха"),
      W("unexpected", "күтпеген", "неожиданный")] },
    { title: "Norwich (16–17)", words: [
      W("capital", "астана, орталық", "столица"), W("known as", "...деп аталатын", "известный как"), W("exist", "болу, өмір сүру", "существовать"),
      W("village", "ауыл", "деревня"), W("beside", "жанында", "рядом с")] },
    { title: "Food poisoning (18–19)", words: [
      W("food poisoning", "тамақтан улану", "пищевое отравление"), W("staff", "қызметкерлер", "персонал"), W("a third", "үштен бір", "треть"),
      W("stuck (struck) down", "ауырып қалу", "слечь (заболеть)"), W("hospitalized", "ауруханаға жатқызылған", "госпитализирован")] },
    { title: "Swimming pool (20)", words: [
      W("timetable", "кесте", "расписание"), W("reception", "қабылдау орны", "ресепшен"), W("details", "толық мәлімет", "подробности")] },
  ];

  const PASSAGES = {
    sms: { kind: "message", title: "Message 1", text: "Peter,\nWe’re outside the cinema. Text if you’re going to be late and we’ll wait and watch the next film. If you’re not coming, we’ll go in now.\nStefan" },
    trip: { kind: "notice", text: "PUPILS SHOULD BRING MONEY FOR THE SCHOOL TRIP BY FRIDAY AT THE LATEST" },
    ads: { title: "In which picture can you find what you are looking for?", text:
      "A) INSTITUT FRANCAIS DES ALPES — FRENCH COURSES & SKIING MEGEVE\n• Morning: French, all levels\n• Afternoon: Skiing, all levels\n• 1 to 12 week courses\n• For adults from Dec 29th\n• All in one place and all included: Full board - Small classes - Ski-pass Mont-Blanc (680 km of ski-runs) + Ski insurance\nI.F.A. - B.P.15 - F.34660 COURNONTERRAL. Tel: +33 (4) 67 78 36 42. Fax: +33 (4) 67 78 36 47 (London Language Show Stand 62)\n\n" +
      "B) THE BRITISH INSTITUTE OF FLORENCE — ITALIAN and ART HISTORY\n• Regular short courses\n• Pre-university courses\n• Easter revision courses\n• One year ‘A’ Levels\n• Gap year packages\n• Summer with opera\nTel: +39 55 284031. Fax: +39 55 289557. Lungarno Guicciardini 9, 50125 Firenze, Italy\n\n" +
      "C) CAVILAM — French in France!\n• Open all year round\n• From 1 week up to 9 months\n• All levels\n• 110 nationalities\n• Intensive and mini-group courses\n• Examination centre\nCAVILAM, BP 2678/EU, 03206 Vichy - France. Fax: +33.4.70 97 99 80. Tel: +33.4.70 97 99 80\n\n" +
      "D) EUROTERM\nEuroterm Translations Ltd. is an internationally operating translation organisation which is capable of handling over 250 translation combinations, and specialised in legal, financial, medical, technical and commercial texts. We are offering you the possibility of becoming an agent and/or freelance translator in our network.\nIf you are interested, please call +31 30-XXXXXX for further information or write to the following address: Euroterm Translations Ltd. Herenstraat 23, 3512 KB Utrecht, The Netherlands." },
    bike: { kind: "notice", text: "Take bicycles for repair to side entrance of shop.\nFront entrance for sales only." },
    fridge: { kind: "notice", text: "AFTER OPENING, KEEP IT IN A REFRIGERATOR AND USE WITHIN TWO DAYS" },
    weather: { title: "", text: "Good morning, this is Anita Pierce with your Monday weather report. We couldn't ask for a better day for the first day of Spring. Right now it's fifteen degrees and clear. We're expecting blue skies throughout the day. Though there is only a ten percent chance of showers, this good weather can't last forever. It's raining cats and dogs up north, so we should see rain by morning. Don't forget your umbrella tomorrow. Now, stay tuned for local news." },
    janet: { kind: "message", title: "MESSAGE", text: "To: Lisa\nFrom: Janet\nLisa,\nHave you done your homework?\nI left my book at school! Can I use yours?" },
    bodyshop: { title: "The Body Shop", text:
      "When I opened the first 'Body Shop' in 1976 my only object was to earn enough to feed my children. Today 'The Body Shop' is an international company rapidly growing all around the world. In the years since we began I have learned a lot. Much of what I have learned will be found in this book, for I believe that we, as a company, have something worth saying about how to run a successful business without giving up what we really believe in.\n\n" +
      "It's not a normal business book, nor is it just about my life. The message is that to succeed in business you have to be different. Business can be fun, a business can be run with love and it can do good. In business, as in life, I need to enjoy myself, to have a feeling of family and to feel excited by the unexpected. I have always wanted the people who work for 'The Body Shop' to feel the same way." },
    norwich: { title: "Norwich", text: "Norwich, the capital of the part of Britain known as East Anglia, has existed as a place to live for more than two thousand years. It began as a small *village* beside the River Wensum." },
    poison: { title: "", text: "At least 100 children and staff are thought to be suffering from food poisoning after a Christmas meal. A third of all pupils - aged between nine and 13 – and 10 teachers were stuck down after eating a turkey lunch on Wednesday. Nobody is thought to have been hospitalized." },
    swim: { kind: "notice", text: "The summer swimming timetable has changed. Please ask at reception for details." },
  };

  // answer: кітаптың жауап кестесі, TEST 2 бағаны (A=0, B=1, C=2, D=3)
  const QUESTIONS = [
    { passage: "sms", q: "What should Peter do?", options: ["let Stefan know if he is delayed", "tell Stefan which film he wants to watch", "wait for Stefan inside the cinema"], answer: 0,
      explain: "“Text if you’re going to be late” = let Stefan know if he is delayed.",
      words: [W("text", "SMS жазу", "написать сообщение"), W("be late / delayed", "кешігу", "опаздывать, задерживаться"), W("outside", "сыртында", "снаружи, у входа")] },
    { passage: "trip", q: "What does it say?", options: ["Pupils are late paying for the school trip on Friday.", "Pupils have until Friday to pay for the school trip.", "Pupils should bring money to spend during Friday’s school trip."], answer: 1,
      explain: "“By Friday at the latest” = the last day to pay is Friday.",
      words: [W("at the latest", "ең кешіктірмей", "не позднее"), W("school trip", "мектеп саяхаты", "школьная поездка"), W("pupil", "оқушы", "ученик")] },
    { passage: "ads", q: "You want to learn French and enjoy winter sports at the same time.", options: ["A", "B", "C", "D"], answer: 0,
      explain: "A: “Morning: French… Afternoon: Skiing”.",
      words: [W("skiing", "шаңғы тебу", "катание на лыжах"), W("at the same time", "бір мезгілде", "одновременно"), W("full board", "толық тамақтану", "полный пансион")] },
    { passage: "ads", q: "A friend wants to learn French and take an examination at the end of the course.", options: ["A", "B", "C", "D"], answer: 2,
      explain: "C: CAVILAM is an “Examination centre”.",
      words: [W("examination centre", "емтихан орталығы", "экзаменационный центр"), W("intensive", "қарқынды", "интенсивный"), W("all year round", "жыл бойы", "круглый год")] },
    { passage: "ads", q: "You want to learn Italian but don’t have much time.", options: ["A", "B", "C", "D"], answer: 1,
      explain: "B: Italian, “Regular short courses”.",
      words: [W("short course", "қысқа курс", "краткий курс"), W("pre-university", "университетке дейінгі", "довузовский"), W("revision", "қайталау", "повторение")] },
    { passage: "ads", q: "You want to have a technical report translated into your language.", options: ["A", "B", "C", "D"], answer: 3,
      explain: "D: Euroterm Translations, “specialised in … technical … texts”.",
      words: [W("translate", "аудару", "переводить"), W("report", "есеп, баяндама", "отчёт, доклад"), W("freelance translator", "штаттан тыс аудармашы", "внештатный переводчик")] },
    { passage: "bike", q: "What does it say?", options: ["Use either entrance if you want to buy a bicycle.", "Use the side entrance if your bicycle needs mending.", "Use the side entrance if the front entrance is closed."], answer: 1,
      explain: "“Take bicycles for repair to side entrance” — mending = repair.",
      words: [W("repair / mend", "жөндеу", "ремонтировать, чинить"), W("side entrance", "бүйір кіреберіс", "боковой вход"), W("sales", "сауда", "продажа")] },
    { passage: "fridge", q: "", options: ["This product doesn’t need to be kept cool.", "This product can last for two days after you open it.", "This product must be put in a refrigerator immediately."], answer: 1,
      explain: "“Use within two days” after opening.",
      words: [W("refrigerator", "тоңазытқыш", "холодильник"), W("within", "ішінде", "в течение"), W("last", "сақталу, жарамды болу", "храниться, длиться")] },
    { passage: "weather", q: "Which season does this weather report take place in?", options: ["Summer", "Spring", "Winter", "Autumn"], answer: 1,
      explain: "“the first day of Spring”.",
      words: [W("season", "жыл мезгілі", "время года"), W("weather report", "ауа райы болжамы", "прогноз погоды")] },
    { passage: "weather", q: "What is the temperature now?", options: ["15°C", "20°C", "10°C", "17°C"], answer: 0,
      explain: "“Right now it's fifteen degrees”.",
      words: [W("degree", "градус", "градус"), W("clear", "ашық (аспан)", "ясно")] },
    { passage: "weather", q: "What kind of weather is predicted for tomorrow?", options: ["Sunny", "Cloudy", "Rainy", "Snowing"], answer: 2,
      explain: "“we should see rain by morning. Don't forget your umbrella tomorrow”.",
      words: [W("predict", "болжау", "прогнозировать"), W("shower", "нөсер, қысқа жаңбыр", "ливень"), W("raining cats and dogs", "қатты жаңбыр жауу", "льёт как из ведра")] },
    { passage: "janet", q: "What does Janet want Lisa to do?", options: ["Go to the school with her.", "Explain the homework.", "Lend her a book."], answer: 2,
      explain: "“I left my book at school! Can I use yours?”",
      words: [W("lend", "қарызға беру", "давать взаймы"), W("leave (left)", "қалдыру (қалдырды)", "оставить (оставила)")] },
    { passage: "bodyshop", q: "What is the writer's main purpose in writing this text?", options: ["To tell the reader her life story.", "To introduce her ideas to the reader.", "To explain how international companies operate.", "To invite to her shop"], answer: 1,
      explain: "She introduces the message of her book: “to succeed in business you have to be different”.",
      words: [W("purpose", "мақсат", "цель"), W("introduce", "таныстыру", "представлять"), W("operate", "жұмыс істеу", "работать, действовать")] },
    { passage: "bodyshop", q: "What would someone learn from this text?", options: ["How to make a lot of money.", "How to write a book about business.", "What the writer's book is about.", "How to start a business"], answer: 2,
      explain: "“Much of what I have learned will be found in this book” — the text describes the book.",
      words: [W("earn", "табу (ақша)", "зарабатывать"), W("rapidly", "өте жылдам", "быстро"), W("give up", "бас тарту", "отказываться")] },
    { passage: "bodyshop", q: "What kind of workers does the writer like to employ?", options: ["Workers who get on well with the public.", "Workers who have the same attitude as she does.", "Workers who have their own families.", "Workers who use her products"], answer: 1,
      explain: "“I have always wanted the people who work for 'The Body Shop' to feel the same way.”",
      words: [W("employ", "жұмысқа алу", "нанимать"), W("attitude", "көзқарас", "отношение, позиция"), W("get on well with", "тіл табысу", "ладить с")] },
    { passage: "norwich", q: "Find the false sentence", options: ["The River Wensum flows through East Anglia.", "People have lived by the River Wensum for at least 2,000 years", "Norwich was a capital of Britain", "Norwich is a part of East Anglia"], answer: 2,
      explain: "Norwich is the capital of East Anglia, not of Britain.",
      words: [W("capital", "астана", "столица"), W("exist", "өмір сүру, болу", "существовать"), W("beside", "жанында", "рядом с")] },
    { passage: "norwich", q: "Find the word with a similar meaning to the underlined word in the text.", options: ["city", "countryside", "desert", "island"], answer: 1,
      explain: "A village is in the countryside (ауыл — ауылдық жер).",
      words: [W("village", "ауыл", "деревня"), W("countryside", "ауылдық жер", "сельская местность"), W("similar", "ұқсас", "похожий")] },
    { passage: "poison", q: "Decide which headline goes best with this text", options: ["School dinner causes serious illness", "Meals for the homeless", "Christmas meal", "Turkey lunch"], answer: 0,
      explain: "The text is about pupils and teachers who got food poisoning after a school meal.",
      words: [W("food poisoning", "тамақтан улану", "пищевое отравление"), W("headline", "тақырып (жаңалық)", "заголовок"), W("hospitalized", "ауруханаға жатқызылған", "госпитализирован")] },
    { passage: "poison", q: "What proportion of pupils was stuck down after lunch on Wednesday?", options: ["3/10", "10/13", "1/9", "1/3"], answer: 3,
      explain: "“A third of all pupils” = 1/3.",
      words: [W("proportion", "үлес, бөлік", "доля"), W("a third", "үштен бір", "треть"), W("struck down", "ауырып қалу", "слечь (заболеть)")] },
    { passage: "swim", q: "", options: ["You can get information about new times from the receptionist.", "Tell the receptionist about any change in your details.", "The swimming pool is open at the usual times."], answer: 0,
      explain: "“Please ask at reception for details” of the new timetable.",
      words: [W("timetable", "кесте", "расписание"), W("reception", "қабылдау орны", "ресепшен"), W("details", "толық мәлімет", "подробности")] },
  ];

  ["kz", "ru"].forEach((stream) => {
    const s = window.EXAMS.nis.streams[stream].subjects.find((x) => x.id === "english");
    s.tests.push({
      id: "2", title: stream === "ru" ? "Тест 2" : "2-тест", subtitle: stream === "ru" ? "Работа с текстом · 40 минут" : "Мәтінмен жұмыс · 40 минут", fixedOrder: true,
      source: "«Сборник тестов в НИШ. Английский язык», TEST 2",
      vocab: VOCAB, passages: PASSAGES,
      questions: QUESTIONS.map((q) => Object.assign({}, q)),
    });
  });
})();
