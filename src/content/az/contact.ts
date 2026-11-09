import type { ContactContent } from "../en/contact";

export const contactContent: ContactContent = {
  meta: {
    title: "Əlaqə",
    description: "Ümumi suallar, əməkdaşlıq imkanları və ya layihə müzakirələri üçün NexusWeb ilə əlaqə saxlayın.",
  },

  hero: {
    eyebrow: "Əlaqə",
    title: "Gəlin danışaq.",
    description:
      "Sualınız, ideyanız və ya ağlınızda bir layihə varsa, sizdən eşitmək istərdik. Kiçik komandayıq, ona görə cavab bir neçə gün çəkə bilər — amma hər mesaj oxunur.",
  },

  helpTitle: "Necə kömək edə bilərik?",
  reasons: [
    { icon: "mail", title: "Ümumi suallar", body: "NexusWeb, məhsullarımız və ya planlarımız haqqında suallar.", subject: "Ümumi sual" },
    {
      icon: "handshake",
      title: "Əməkdaşlıq",
      body: "Bacarıqlarınızla töhfə vermək, birlikdə məhsul qurmaq və ya bir təşəbbüsdə tərəfdaş olmaq istəyirsiniz?",
      subject: "Əməkdaşlıq imkanı",
    },
    {
      icon: "rocket",
      title: "Layihə müzakirələri",
      body: "Həll etməyə dəyər bir probleminiz və ya birlikdə araşdırmaq istədiyiniz ideyanız var?",
      subject: "Layihə müzakirəsi",
    },
  ],
  emailAboutThis: "Bu barədə e-poçt yazın",

  elsewhere: "Digər kanallar",
  emailLabel: "E-poçt:",
  issuesLink: "GitHub issue-ları vasitəsilə ContextPulse AI rəyi",

  formTitle: "Bizə mesaj göndərin",
  formRequired: "Bütün sahələr məcburidir.",

  form: {
    topics: ["Ümumi sual", "Əməkdaşlıq imkanı", "Layihə müzakirəsi", "ContextPulse AI rəyi"],
    name: "Adınız",
    email: "E-poçtunuz",
    emailHint: "Sizə cavab yaza bilməyimiz üçün.",
    topic: "Mövzu",
    message: "Mesaj",
    placeholder: "Özünüz və ağlınızdakı fikir haqqında bir az yazın.",
    missing: "Zəhmət olmasa, adınızı, düzgün e-poçt ünvanınızı və mesajınızı yazın.",
    sending: "Göndərilir…",
    sent: "Təşəkkürlər! Mesajınız qəbul olundu. Sizə e-poçt ünvanınıza cavab yazacağıq.",
    sendAnother: "Yeni mesaj göndər",
    rateLimited: "Qısa müddətdə çox mesaj göndərildi. Zəhmət olmasa, bir az sonra yenidən cəhd edin.",
    failed: "Mesajınız göndərilmədi. Yenidən cəhd edin və ya bizə e-poçtla yazın.",
    submit: "Mesajı göndər",
    how: "Mesajınız təhlükəsiz saxlanılır və yalnız NexusWeb komandası tərəfindən oxunur. E-poçt ünvanınızdan yalnız cavab yazmaq üçün istifadə edirik.",
  },
};
