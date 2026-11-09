import type { CommunityContent } from "../en/community";

export const communityContent: CommunityContent = {
  meta: {
    title: "İcma",
    description:
      "NexusWeb icması formalaşır: proqramçıların, təhlükəsizlik həvəskarlarının, tələbələrin və yaradıcıların bilik paylaşdığı və birlikdə qurduğu məkan.",
  },

  hero: {
    eyebrow: "NexusWeb İcması",
    title: "Öz insanlarınızı tapın. Birlikdə nəsə qurun.",
    description:
      "NexusWeb-in texnologiyaya maraqlı insanların bilik mübadiləsi etdiyi, ideyaları müzakirə etdiyi və real layihələr üzərində əməkdaşlıq etdiyi məkana çevrilməsini istəyirik. İcma yenicə formalaşır — bu o deməkdir ki, ilk üzvlər onun necə olacağını müəyyən edir.",
    cta: "İştirak yolları",
  },

  audience: {
    eyebrow: "Kimlər üçündür",
    title: "Qurmağa marağı olan hər kəs üçün.",
    groups: [
      { icon: "code", title: "Proqramçılar", body: "Mənalı layihələr üzərində işləmək və digər yaradıcılardan öyrənmək istəyənlər." },
      { icon: "shield", title: "Təhlükəsizlik həvəskarları", body: "Etik, praktik kibertəhlükəsizlik və təhlükəsiz mühəndisliklə maraqlananlar." },
      { icon: "graduation", title: "Tələbələr", body: "Real təcrübə, mentorlar və inkişaf üçün məkan axtaranlar." },
      { icon: "brain", title: "AI tədqiqatçıları", body: "Süni intellektin insanlara necə kömək edə biləcəyini məsuliyyətlə sınaqdan keçirənlər." },
      { icon: "lightbulb", title: "Yaradıcılar və dizaynerlər", body: "Texniki işə ideya, dizayn və ünsiyyət bacarıqları gətirənlər." },
      { icon: "users", title: "Gələcək əməkdaşlar", body: "Layihə, ideya və ya təşəbbüs üzərində tərəfdaş olmaq istəyən hər kəs." },
    ],
  },

  today: {
    eyebrow: "Bu gün qoşulun",
    title: "Elə indi iştirak etməyin real yolları.",
    description: "Hələ forum və ya çat serveri yoxdur — əksini iddia etməyəcəyik. Bu gün həqiqətən edə biləcəkləriniz bunlardır:",
  },

  ways: [
    {
      icon: "git",
      title: "ContextPulse AI-ı GitHub-da izləyin",
      body: "İnkişafı canlı izləmək üçün repozitoriyaya ulduz verin və ya onu izləməyə başlayın.",
      action: "repo",
    },
    {
      icon: "message",
      title: "Problem bildirin və ideya paylaşın",
      body: "Rəy, xəta hesabatı və ya funksiya ideyası ilə repozitoriyada issue açın.",
      action: "issues",
    },
    {
      icon: "handshake",
      title: "Əməkdaşlıq təklif edin",
      body: "Töhfə verə biləcəyiniz layihə, bacarıq və ya ideya var? Bizimlə əlaqə saxlayın və danışın.",
      action: "contact",
    },
  ],

  actionLabels: { repo: "Repozitoriyanı aç", issues: "Issue açın", contact: "Bizimlə əlaqə" },
  followTitle: "NexusWeb-i izləyin",

  roadmap: {
    eyebrow: "Növbəti addımlar",
    title: "İcma necə böyüyəcək",
    items: [
      { title: "Açıq repozitoriyalar", status: "live", body: "İşimiz GitHub-da açıqdır — hər kəs izləyə və töhfə verə bilər." },
      { title: "İcma məkanı", status: "planned", body: "Kifayət qədər insan olduqda müzakirələr üçün xüsusi məkan." },
      { title: "Birgə layihələr", status: "planned", body: "Üzvlərin ideyadan hazır məhsula qədər qoşula biləcəyi layihələr." },
      { title: "Tədbirlər və təhsil qrupları", status: "exploring", body: "Seminarlar, birgə öyrənmə sessiyaları və qurma günləri — əvvəlcə onlayn." },
    ],
  },

  valuesTitle: "İcma dəyərləri",
  values: [
    "Biliyinizi səxavətlə paylaşın.",
    "Nəyi bildiyiniz və bilmədiyiniz barədə dürüst olun.",
    "İnsanların məxfiliyinə və vaxtına hörmət edin.",
    "Təhlükəsizlik biliklərindən etik və qanuni istifadə edin.",
  ],

  cta: {
    eyebrow: "Buradan başlayın",
    title: "İlk üzvlər hər şeyi formalaşdırır.",
    description: "Özünüzü təqdim edin, nə üzərində işlədiyinizi danışın və birlikdə nə qura biləcəyimizi kəşf edək.",
    introduce: "Özünüzü təqdim edin",
    github: "GitHub-da izləyin",
  },
};
