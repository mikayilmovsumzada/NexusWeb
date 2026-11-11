import type { EducationContent } from "../en/education";

export const educationContent: EducationContent = {
  meta: {
    title: "Təhsil",
    description:
      "NexusWeb Təhsil: kibertəhlükəsizlik, süni intellekt və proqramlaşdırma üzrə praktik kurslar. Qruplar hazırda formalaşır. Burada həmçinin texniki məqalələr, dərsliklər və faydalı materiallar paylaşılır.",
  },

  hero: {
    eyebrow: "NexusWeb Təhsil",
    title: "Kibertəhlükəsizlik, süni intellekt və proqramlaşdırma kursları.",
    description:
      "Yalnız oxumağa deyil, etməyə yönəlmiş praktik kurslar. İlk qruplar hazırda formalaşır: kursa müraciət edin, başlama tarixi, cədvəl və şərtlər barədə sizinlə əlaqə saxlayacağıq.",
    enroll: "Kursa yazılın",
    browse: "Kurslara baxın",
  },

  principlesHeading: { eyebrow: "Necə öyrədirik", title: "Yadda qalan təhsil." },

  principles: [
    { icon: "flask", title: "Əvvəlcə praktika", body: "Hər mövzu sizin özünüzün qurduğu, sındırdığı və ya qoruduğu bir şeylə bitməlidir." },
    { icon: "shield", title: "Standart olaraq etik", body: "Təhlükəsizlik məzmunu müdafiə və öyrənmə məqsədilə, qanuni laboratoriya mühitlərində öyrədilir." },
    { icon: "layers", title: "Real layihələrdən", body: "Dərslər ContextPulse AI kimi həqiqətən qurduğumuz məhsullara əsaslanır." },
  ],

  coursesHeading: {
    eyebrow: "Kurslar",
    title: "Üç kurs, bir praktik yanaşma.",
    description:
      "Qruplar hazırda formalaşır. Aşağıdakı mövzular hər kursun əhatə etməsi planlaşdırılan mövzulardır; yekun tədris planını kurs başlamazdan əvvəl müraciət edənlərlə paylaşacağıq.",
  },

  labels: { topics: "Kursda əhatə olunacaq mövzular", formats: "Formatlar", enroll: "Bu kursa yazılın" },

  courses: [
    {
      id: "cybersecurity",
      icon: "shield",
      accent: "pulse",
      title: "Kibertəhlükəsizlik",
      summary: "Şəbəkələrdən təhlükəsiz tətbiq dizaynına qədər müdafiə təhlükəsizliyinin əsasları.",
      status: "forming",
      topics: [
        "Təhlükəsizlik üçün şəbəkə əsasları",
        "Veb tətbiqlərin təhlükəsizliyinin əsasları",
        "Təhlükəsiz autentifikasiya və sessiya idarəsi",
        "Kiçik layihələr üçün təhdid modelləşdirməsi",
        "Capture-the-flag tipli təcrübə laboratoriyaları",
      ],
      formats: ["Dərslər", "Laboratoriyalar"],
    },
    {
      id: "ai",
      icon: "brain",
      accent: "violet",
      title: "Süni intellekt",
      summary: "AI modellərindən real proqram təminatında məsuliyyətlə istifadə, o cümlədən məxfilik və nəticənin yoxlanılması.",
      status: "forming",
      topics: [
        "Böyük dil modelləri tətbiqlərə necə inteqrasiya olunur",
        "Prompt dizaynı və model cavabının yoxlanılması",
        "AI funksiyaları üçün məxfiliyə həssas məlumat emalı",
        "AI xidmətləri işləmədikdə ehtiyat mexanizmlərin qurulması",
      ],
      formats: ["Dərslər", "Layihə işi"],
    },
    {
      id: "programming",
      icon: "code",
      accent: "signal",
      title: "Proqramlaşdırma və proqram təminatı",
      summary: "Təmiz, test olunmuş, dayanıqlı proqram təminatı yazmaq və onu istifadəyə vermək.",
      status: "forming",
      topics: [
        "Python və backend API-ları",
        "TypeScript ilə müasir veb interfeyslər",
        "Testləşdirmə və davamlı inteqrasiya",
        "Versiya nəzarəti və Git ilə birgə iş",
      ],
      formats: ["Dərslər", "Layihələr"],
    },
  ],

  resources: {
    eyebrow: "Texniki məqalələr və dərsliklər",
    title: "Oxuyun, izləyin, tətbiq edin.",
    description:
      "Öz məqalə və dərsliklərimiz, digər platformalarda paylaşdığımız yazılar və başqa yerlərdə tapdığımız faydalı materiallar, hamısı bir yerdə.",
    kinds: { article: "Məqalə", tutorial: "Dərslik", curated: "Tövsiyə" },
    emptyTitle: "İlk yazılar yoldadır",
    emptyBody: "Məqalələr, dərsliklər və tövsiyə etdiyimiz materiallar dərc etdikcə və topladıqca burada görünəcək.",
    prev: "Əvvəlki",
    next: "Növbəti",
    open: "Aç",
    listLabel: "Məqalələr və dərsliklər",
  },

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
