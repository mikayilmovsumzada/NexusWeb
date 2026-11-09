import type { EducationContent } from "../en/education";

export const educationContent: EducationContent = {
  meta: {
    title: "Təhsil",
    description:
      "NexusWeb Təhsil hazırlanır: kibertəhlükəsizlik, süni intellekt və proqramlaşdırma üzrə planlaşdırılan praktik dərsliklər, laboratoriyalar və kurslar. Hələ heç bir kurs dərc olunmayıb.",
  },

  hero: {
    eyebrow: "NexusWeb Təhsil",
    title: "Praktik texnologiya təhsili — tezliklə.",
    description:
      "Yalnız oxumağa deyil, etməyə yönəlmiş təhsil platforması hazırlayırıq: kibertəhlükəsizlik, süni intellekt və proqramlaşdırma üzrə dərsliklər, praktik laboratoriyalar və layihə izahları. Hələ heç nə dərc olunmayıb. Bu səhifə nəyi planlaşdırdığımızı göstərir ki, nə gözləyəcəyinizi biləsiniz.",
    cta: "Planlaşdırılan istiqamətlərə baxın",
  },

  principlesHeading: { eyebrow: "Necə öyrədəcəyik", title: "Yadda qalan təhsil." },

  principles: [
    { icon: "flask", title: "Əvvəlcə praktika", body: "Hər mövzu sizin özünüzün qurduğu, sındırdığı və ya qoruduğu bir şeylə bitməlidir." },
    { icon: "shield", title: "Standart olaraq etik", body: "Təhlükəsizlik məzmunu müdafiə və öyrənmə məqsədilə, qanuni laboratoriya mühitlərində öyrədilir." },
    { icon: "layers", title: "Real layihələrdən", body: "Dərslər ContextPulse AI kimi həqiqətən qurduğumuz məhsullara əsaslanır." },
  ],

  tracksHeading: {
    eyebrow: "Planlaşdırılan təhsil istiqamətləri",
    title: "Nələri əhatə etməyi planlaşdırırıq.",
    description:
      "Planlaşdırdığımız mövzuları görmək üçün istiqaməti açın. Bunlar dərc olunmuş dərslər deyil, niyyətlərdir — məzmun yayımlandıqca hər istiqamət aydın şəkildə qeyd olunacaq.",
  },

  labels: { availableLessons: "Mövcud dərslər", plannedTopics: "Planlaşdırılan mövzular", formats: "Formatlar" },

  tracks: [
    {
      id: "cybersecurity",
      icon: "shield",
      accent: "pulse",
      title: "Kibertəhlükəsizlik",
      summary: "Şəbəkələrdən təhlükəsiz tətbiq dizaynına qədər müdafiə təhlükəsizliyinin əsasları.",
      status: "planned",
      plannedTopics: [
        "Təhlükəsizlik üçün şəbəkə əsasları",
        "Veb tətbiqlərin təhlükəsizliyinin əsasları",
        "Təhlükəsiz autentifikasiya və sessiya idarəsi",
        "Kiçik layihələr üçün təhdid modelləşdirməsi",
        "Capture-the-flag tipli təcrübə laboratoriyaları",
      ],
      formats: ["Dərsliklər", "Laboratoriyalar"],
    },
    {
      id: "ai",
      icon: "brain",
      accent: "violet",
      title: "Süni intellekt",
      summary: "AI modellərindən real proqram təminatında məsuliyyətlə istifadə — məxfilik və nəticənin yoxlanılması daxil.",
      status: "planned",
      plannedTopics: [
        "Böyük dil modelləri tətbiqlərə necə inteqrasiya olunur",
        "Prompt dizaynı və model cavabının yoxlanılması",
        "AI funksiyaları üçün məxfiliyə həssas məlumat emalı",
        "AI xidmətləri işləmədikdə ehtiyat mexanizmlərin qurulması",
      ],
      formats: ["Bələdçilər", "Layihə izahları"],
    },
    {
      id: "programming",
      icon: "code",
      accent: "signal",
      title: "Proqramlaşdırma və proqram təminatı",
      summary: "Təmiz, test olunmuş, dayanıqlı proqram təminatı yazmaq — və onu istifadəyə vermək.",
      status: "planned",
      plannedTopics: [
        "Python və backend API-ları",
        "TypeScript ilə müasir veb interfeyslər",
        "Testləşdirmə və davamlı inteqrasiya",
        "Versiya nəzarəti və Git ilə birgə iş",
      ],
      formats: ["Kurslar", "Dərsliklər"],
    },
    {
      id: "tutorials",
      icon: "book",
      accent: "pulse",
      title: "Texniki məqalələr və dərsliklər",
      summary: "Konkret alətlər, üsullar və problemlər haqqında fokuslanmış, praktik yazılar.",
      status: "planned",
      plannedTopics: [
        "Addım-addım texniki bələdçilər",
        "Təhlükəsizlik və süni intellekt anlayışlarının izahı",
        "Məhsullarımızı qurarkən öyrəndiklərimiz",
      ],
      formats: ["Məqalələr", "Bələdçilər"],
    },
    {
      id: "projects",
      icon: "terminal",
      accent: "violet",
      title: "Praktik layihələr",
      summary: "Bir neçə istiqamətdən bacarıqları real bir şeydə birləşdirən istiqamətləndirilmiş layihələr.",
      status: "planned",
      plannedTopics: [
        "Birlikdə qurmaq üçün layihə izahları",
        "ContextPulse AI necə dizayn edilib və qurulub",
        "Müstəqil təcrübə üçün açıq tapşırıqlar",
      ],
      formats: ["Laboratoriyalar", "İzahlar"],
    },
  ],

  cta: {
    eyebrow: "Tədris planını birlikdə quraq",
    title: "Nəyi öyrənmək istərdiniz?",
    description: "İnsanlara həqiqətən lazım olan dərsləri hazırlamağa üstünlük veririk. Hansı mövzuların sizə ən çox kömək edəcəyini bizə yazın.",
    emailSubject: "NexusWeb Təhsil üçün mövzu təklifi",
    suggestByEmail: "E-poçtla mövzu təklif edin",
    suggest: "Mövzu təklif edin",
    community: "İcmaya qoşulun",
  },
};
