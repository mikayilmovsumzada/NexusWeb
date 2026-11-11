import type { HomeContent } from "../en/home";

export const homeContent: HomeContent = {
  meta: { title: "Ana səhifə" },

  hero: {
    eyebrow: "Yeni formalaşan texnologiya ekosistemi",
    title: "Ağılları birləşdiririk. Gələcəyi qururuq.",
    description:
      "İddialı ideyaların rəqəmsal məhsullara, biliyin imkana çevrildiyi və insanların gələcəyi birlikdə qurduğu, yeni formalaşan texnologiya ekosistemi.",
    primaryCta: { label: "Ekosistemimizi kəşf edin", href: "#ecosystem" },
    secondaryCta: { label: "ContextPulse AI ilə tanış olun", href: "/products/contextpulse-ai" },
    focusLabel: "Fəaliyyət sahələri",
    focusTags: ["Kibertəhlükəsizlik", "Süni intellekt", "Proqram təminatı", "Texnologiya təhsili"],
  },

  ecosystem: {
    eyebrow: "Ekosistemimiz",
    title: "Üç sütun, vahid əlaqəli sistem.",
    description:
      "NexusWeb məhsullar, təhsil və icma üzərində qurulub. Hər sütun digərlərini qidalandırır: qurduğumuz şey öyrədilən mövzuya çevrilir, birlikdə öyrəndiyimiz insanlar isə növbəti nəyin qurulacağını müəyyən edir.",
    pillars: [
      {
        key: "products",
        icon: "boxes",
        accent: "pulse",
        name: "NexusWeb Məhsulları",
        status: "in-development",
        statusNote: "İlk məhsul aktiv şəkildə hazırlanır",
        body: "Praktik problemləri həll edən orijinal proqram təminatı — diqqətlə dizayn olunur, açıq şəkildə qurulur və hansı mərhələdə olduğu dürüst göstərilir.",
        points: ["İlk məhsulumuz ContextPulse AI-dır", "Açıq repozitoriyalar və inkişaf yenilikləri", "Ekosistem böyüdükcə yeni məhsullar"],
        href: "/products",
        linkLabel: "Məhsullarımıza baxın",
      },
      {
        key: "education",
        icon: "graduation",
        accent: "violet",
        name: "NexusWeb Təhsil",
        status: "forming",
        statusNote: "Qruplar formalaşır",
        body: "Əlçatan və praktik texnologiya təhsili: kibertəhlükəsizlik, proqramlaşdırma və süni intellekt, yalnız nəzəriyyə ilə deyil, real layihələr üzərində.",
        points: ["Kibertəhlükəsizlik, süni intellekt və proqramlaşdırma kursları", "Texniki məqalələr və dərsliklər", "Faydalı materialların seçkisi"],
        href: "/learn",
        linkLabel: "Kurslara baxın",
      },
      {
        key: "community",
        icon: "users",
        accent: "signal",
        name: "NexusWeb İcması",
        status: "forming",
        statusNote: "İlk günlər — onu birlikdə formalaşdıraq",
        body: "Proqramçıların, təhlükəsizlik həvəskarlarının, tələbələrin və yaradıcıların bilik paylaşdığı, ideyaları müzakirə etdiyi və birlikdə qurduğu məkan.",
        points: ["GitHub-da izləyin və töhfə verin", "Məhsullarımız haqqında rəy bildirin", "Əməkdaşlıq və layihə təklif edin"],
        href: "/community",
        linkLabel: "İcma vizyonu ilə tanış olun",
      },
    ],
  },

  featured: {
    eyebrow: "Seçilmiş məhsul",
    title: "ContextPulse AI",
    tagline: "Harada qaldığınızı dəqiq xatırlayın.",
    description:
      "Fasilələr proqramçının fikir axınını qırır. ContextPulse AI IDE və pull request metadatası əsasında nə üzərində işlədiyinizi xatırladır — son dəyişdirdiyiniz funksiyanı, uğursuz testi, həll olunmamış rəyi — ki, işə daha tez qayıdasınız.",
    principles: [
      { icon: "eye-off", title: "Ekran görüntüsü yox, klaviatura izlənməsi yox", body: "Yalnız metadata ilə işləmək üçün nəzərdə tutulub. Mənbə kodunun məzmunu oxunmur." },
      { icon: "brain", title: "AI dəstəkli kontekst bərpası", body: "Qayıtdığınız zaman son iş kontekstinizin qısa, yoxlanılmış xatırlatması." },
      { icon: "users", title: "Nəzarət yox, komanda üzrə məlumat", body: "Rəhbərlər tıxanmaları yalnız komanda səviyyəsində və kifayət qədər insan bildirdikdən sonra görür." },
    ],
    explore: "ContextPulse AI-ı kəşf edin",
    github: "GitHub-da baxın",
  },

  focus: {
    eyebrow: "Diqqət mərkəzimiz",
    title: "Enerjimizi nəyə sərf edirik.",
    description:
      "Dərindən öyrənə və faydalı nəsə qura biləcəyimiz bir neçə sahəyə fokuslanırıq — yeni nəsil texnologiya mütəxəssislərinin daha yaxşı resurslara ehtiyac duyduğu sahələrə.",
    areas: [
      {
        icon: "shield",
        title: "Kibertəhlükəsizlik",
        body: "Qurduğumuz hər şeydə təhlükəsizliyə həssas mühəndislik, yeni başlayanlar üçün isə praktik və etik təhlükəsizlik təhsili.",
      },
      {
        icon: "brain",
        title: "Süni intellekt",
        body: "Süni intellekti həqiqətən fayda verdiyi yerdə tətbiq edirik — məxfilik və yoxlanıla bilən nəticə sonradan deyil, ilkin tələb kimi.",
      },
      {
        icon: "code",
        title: "Proqram mühəndisliyi",
        body: "Təmiz, dayanıqlı, test olunmuş proqram təminatı — və onun ilk prototipdən istehsal qərarlarına qədər necə yarandığını paylaşmaq.",
      },
    ],
  },

  building: {
    eyebrow: "Nə qururuq",
    title: "Vəziyyətə şəffaf baxış.",
    description: "Şişirdilmiş yol xəritələri yoxdur. Bu gün nə mövcuddur, nə hazırlanır və nə hələ plandır — budur.",
    items: [
      {
        title: "ContextPulse AI",
        status: "in-development",
        body: "FastAPI backend, AI ilə yaradılan kontekst xatırlatmaları, komanda səviyyəsində K-anonim tıxanma məlumatları və ikidilli (Azərbaycan / İngilis) interfeysi olan işlək prototip.",
        href: "/products/contextpulse-ai",
      },
      {
        title: "NexusWeb saytı",
        status: "live",
        body: "Hazırda oxuduğunuz sayt: ekosistemin açıq evi, gələcək məhsullar və təhsil məzmunu üçün təkrar istifadə oluna bilən təməl kimi qurulub.",
      },
      {
        title: "NexusWeb Təhsil",
        status: "forming",
        body: "Kibertəhlükəsizlik, süni intellekt və proqramlaşdırma kursları. İlk qruplar formalaşır, müraciətlər qəbul olunur.",
        href: "/learn",
      },
      {
        title: "NexusWeb İcması",
        status: "forming",
        body: "Hazırda icma açıq repozitoriyamız ətrafında toplanır. Xüsusi məkanlar onları dolduracaq insanlar olduqda yaranacaq.",
        href: "/community",
      },
    ],
  },

  join: {
    eyebrow: "Yola qoşulun",
    title: "Lap əvvəldən bunun bir parçası olun.",
    description:
      "NexusWeb açıq şəkildə böyüyür. ContextPulse AI-ın inkişafını izləyin, rəy bildirin və ya birlikdə nəsə qurmaq istəyirsinizsə, bizimlə əlaqə saxlayın.",
    github: "GitHub-da izləyin",
    community: "İcmaya qoşulun",
    contact: "Bizimlə əlaqə",
  },
};
