import type { ContextPulseContent } from "../en/contextpulse";

export const contextPulseContent: ContextPulseContent = {
  meta: {
    title: "ContextPulse AI",
    description:
      "ContextPulse AI — NexusWeb-in hazırladığı, məxfiliyi ön planda tutan proqramçı kontekst bərpası aləti. Aktiv inkişaf mərhələsindədir. Ekran görüntüsü yox, klaviatura izlənməsi yox, mənbə kodu oxunmur.",
    ogSubtitle: "Proqramçılar üçün AI dəstəkli kontekst bərpası — insanları izləmək üçün deyil, dəstəkləmək üçün.",
  },

  overview: {
    eyebrow: "NexusWeb Məhsulları",
    title: "ContextPulse AI",
    tagline: "Proqramçılar üçün AI dəstəkli kontekst bərpası — insanları izləmək üçün deyil, dəstəkləmək üçün.",
    description:
      "ContextPulse AI məxfiliyi ön planda tutan proqramçı iş axını və kontekst bərpası alətidir. Toplantıdan və ya fasilədən qayıdanda harada qaldığınızı xatırladır. Komanda təkrar-təkrar tıxandıqda isə rəhbərlərə bu nümunəni görməyə kömək edir — heç kimi nəzarət obyektinə çevirmədən.",
    summary: "Süni intellektlə işləyən, məxfiliyi ön planda tutan proqramçı iş axını və kontekst bərpası həlli.",
    statusLine: "Aktiv inkişaf mərhələsində",
    demoCta: "Canlı demonu sınayın",
    demoUnavailable: "Canlı demo tezliklə",
    repoCta: "GitHub-da baxın",
    earlyAccessCta: "Erkən giriş",
  },

  demo: {
    eyebrow: "Canlı demo",
    title: "ContextPulse AI-ı sınayın",
    intro:
      "ContextPulse AI-ı interaktiv proqramçı və menecer iş axını simulyasiyası vasitəsilə kəşf edin. İş fasilələrinin, kontekst bərpasının və komanda səviyyəsindəki məlumatların hazırkı prototipdə necə əks olunduğunu görün.",
    notice: "İnteraktiv prototip — hazırda aktiv inkişaf mərhələsindədir. Demo funksionallığı dəyişə bilər.",
    experiences: [
      {
        icon: "code",
        title: "Proqramçı təcrübəsi",
        body: "Proqramçı panelinə daxil olun, fasiləni simulyasiya edin və son iş kontekstiniz haqqında qısa xatırlatma alın — AI tərəfindən, AI xidməti əlçatan olmadıqda isə təhlükəsiz hazır mətnlə yazılır. Sonra fasilənin səbəbini anonim qeyd edin.",
      },
      {
        icon: "radar",
        title: "Menecer təcrübəsi",
        body: "Menecer panelinə daxil olaraq komanda səviyyəsindəki tıxanma kateqoriyalarını görün — yalnız kifayət qədər insan bildirdikdən sonra göstərilir — onlar üzrə tədbirləri izləyin və bütün komandaya elan göndərin.",
      },
    ],
    credentialsNote: "Demo giriş məlumatları tətbiqin öz giriş ekranında göstərilir.",
    cta: "Canlı demonu sınayın",
    newTabHint: "ContextPulse AI tətbiqini yeni pəncərədə açır.",
    unavailableTitle: "Canlı demo hələ mövcud deyil",
    unavailableBody:
      "ContextPulse AI tətbiqi hələ ictimai serverdə yerləşdirilməyib — təhlükəsiz ictimai demo işə düşən kimi linki burada paylaşacağıq. Bu arada repozitoriyanın README faylı prototipi öz kompüterinizdə necə işə salmağı izah edir.",
    unavailableLink: "Lokal olaraq necə işə salmaq olar",
  },

  problem: {
    eyebrow: "Problem",
    title: "Fasilələr baha başa gəlir — adi həllər isə vəziyyəti daha da pisləşdirir.",
    points: [
      {
        icon: "workflow",
        title: "İtirilmiş kontekst",
        body: "Toplantıdan, fasilədən və ya tapşırıq dəyişikliyindən sonra proqramçılar nə etdiklərini bərpa etməyə vaxt sərf edir: hansı funksiya, hansı xəta, hansı rəy şərhi.",
      },
      {
        icon: "radar",
        title: "Görünməyən tıxanmalar",
        body: "Komanda rəhbərləri işin niyə dayandığını — yavaş rəylər, qeyri-sabit CI, aydın olmayan tələblər — çox vaxt artıq problemə çevriləndə görürlər.",
      },
      {
        icon: "eye-off",
        title: "Nəzarət əks nəticə verir",
        body: "Ekran görüntüləri, klaviatura qeydləri və fərdi aktivlik balları etimadı sarsıdır, etik və hüquqi problemlər yaradır.",
      },
    ],
  },

  solution: {
    eyebrow: "Təklif olunan həll",
    title: "Bir dövrənin iki tərəfi.",
    sides: [
      {
        label: "Proqramçılar üçün",
        title: "Hesabat yox, xatırlatma",
        body: "Qayıtdığınız zaman AI ilə yaradılan xülasə son iş kontekstinizi bərpa edir: son dəyişdirdiyiniz funksiya, açıq xəta, uğursuz test, pull request-də həll olunmamış şərhlər.",
      },
      {
        label: "Komanda rəhbərləri üçün",
        title: "İnsanlar yox, nümunələr",
        body: "Proqramçılar fasilənin səbəbini anonim qeyd edə bilər. Rəhbərlər tıxanma kateqoriyalarını yalnız komanda səviyyəsində və eyni səbəbi kifayət qədər insan bildirdikdən sonra görür.",
      },
      {
        label: "Dövrəni qapamaq",
        title: "Proqramçıların görə biləcəyi tədbirlər",
        body: "Rəhbərlər görünən tıxanmalar üzrə tədbirləri izləyə və bütün komandaya elan göndərə bilər — bunlar hər proqramçının panelində canlı görünür.",
      },
    ],
  },

  implemented: {
    eyebrow: "Bu gün nə işləyir",
    title: "Hazırkı prototipin imkanları",
    description:
      "Bu funksiyalar bu gün açıq repozitoriyada mövcuddur. Onlar demo məlumatlarla işləyən prototip kimi fəaliyyət göstərir — buraxılmış məhsul kimi deyil.",
    items: [
      {
        icon: "lock",
        title: "Yalnız metadata qəbulu",
        body: "API ekran qeydi, klaviatura məzmunu və ya mənbə kodu qeyd olunan hadisələri, eləcə də sxemdə olmayan istənilən sahəni (məsələn, source_code) rədd edir.",
      },
      {
        icon: "brain",
        title: "Yoxlanılmış AI xatırlatmaları",
        body: "Xatırlatmalar Gemini və ya Claude tərəfindən yazılır, sonra kodla yoxlanılır. Cavabda metadatada olmayan fayl, funksiya, xəta kodu və ya PR qeyd olunarsa, təhlükəsiz ehtiyat mətn istifadə olunur.",
      },
      {
        icon: "users",
        title: "K-anonim komanda görünüşü",
        body: "Tıxanma kateqoriyası rəhbərə yalnız ən azı beş proqramçı onu bildirdikdən sonra görünür. Bundan az olduqda dəqiq say göstərilmədən gizli kimi qeyd olunur.",
      },
      {
        icon: "radar",
        title: "Tədbir izləmə",
        body: "Rəhbərlər görünən tıxanmalara status, məsul komanda və qeyd təyin edə bilər. Gizli qruplar üzərində tədbir açmaq server tərəfindən rədd edilir.",
      },
      {
        icon: "message",
        title: "Komanda elanları",
        body: "Komandaya ünvanlanmış mesajlar Server-Sent Events vasitəsilə proqramçı panellərində canlı görünür. Onları ayrıca bir şəxsə ünvanlamaq mümkün deyil.",
      },
      {
        icon: "compass",
        title: "İkidilli interfeys",
        body: "Azərbaycan və İngilis dilləri — AI xatırlatmaları da daxil olmaqla.",
      },
    ],
  },

  principles: {
    eyebrow: "Dizayndan məxfilik",
    title: "Proqramçıları dəstəkləyin. Onları izləməyin.",
    description: "Məxfilik sonda əlavə olunan funksiya deyil — o, sistemin ümumiyyətlə nəyi toplaya biləcəyini müəyyən edir.",
    rules: [
      "Ekran görüntüsü və ekran qeydi yoxdur.",
      "Klaviatura məzmunu toplanmır.",
      "Şəxsi mənbə kodu oxunmur.",
      "Rəhbərin görünüşündə fərdi identifikator yoxdur.",
      "Kiçik qruplar gizli qalır ki, fərdlər ayırd edilə bilməsin.",
      "AI modelinə yalnız yoxlanılmış metadata göndərilir.",
    ],
  },

  limitations: {
    title: "Dürüst məhdudiyyətlər",
    intro: "Hazırkı prototipin hələ etmədikləri:",
    items: [
      "Hələ IDE genişləndirməsi yoxdur — IDE hadisələri hazırda simulyator skripti ilə yaradılır.",
      "Demo üçün SQLite istifadə olunur; istehsal üçün verilənlər bazası planlaşdırılır.",
      "K-anonimlik zamanla aparılan müşahidələrdən tam qorumur.",
      "Demo hesablar və parollar yalnız lokal sınaq üçündür.",
    ],
  },

  nationalContext: {
    eyebrow: "Milli kontekst",
    title: "Azərbaycanın rəqəmsal və süni intellekt prioritetləri ilə bir istiqamətdə.",
    description:
      "ContextPulse AI Azərbaycanda hazırlanan, proqram komandaları üçün süni intellekt alətidir. Onun məqsədləri, yəni süni intellektdən məsuliyyətli və məxfiliyi qoruyan şəkildə istifadə və daha məhsuldar rəqəmsal iş, aşağıdakı dövlət sənədlərinin müəyyən etdiyi istiqamətlə üst-üstə düşür.",
    disclaimer:
      "Yalnız kontekst üçün göstərilir. ContextPulse AI müstəqil layihədir; bu sənədlərin burada sadalanması onun hər hansı dövlət orqanı tərəfindən təsdiqləndiyi demək deyil.",
    sourceLink: "Rəsmi mətn",
    items: [
      {
        kind: "Prezidentin 530 nömrəli Sərəncamı",
        date: "19 mart 2025",
        title: "“Azərbaycan Respublikasının 2025–2028-ci illər üçün süni intellekt Strategiyası”nın təsdiq edilməsi haqqında",
        url: "https://mincom.gov.az/storage/pages/3533/azerbaycan-respublikasinin-2025-2028-ci-iller-ucun-suni-intellekt-strategiyasinin-tesdiq-edilmesi-haqqinda.pdf",
      },
      {
        kind: "Prezidentin 1464 nömrəli Fərmanı",
        date: "11 oktyabr 2021",
        title:
          "“Azərbaycan Respublikasında rəqəmsallaşma, innovasiya, yüksək texnologiyalar və rabitə sahəsində idarəetmənin təkmilləşdirilməsi ilə bağlı bəzi tədbirlər haqqında”",
      },
      {
        kind: "Prezidentin Sərəncamı",
        date: "27 fevral 2026",
        title:
          "“Azərbaycan Respublikasında rəqəmsal inkişafın sürətləndirilməsinə dair 2026–2028-ci illər üçün Fəaliyyət Planı”nın təsdiq edilməsi haqqında",
        url: "https://president.az/az/articles/view/71719",
      },
    ],
  },

  status: {
    value: "in-development",
    heading: "İnkişaf statusu",
    summary:
      "ContextPulse AI aktiv inkişaf mərhələsindədir. Bu, işlək prototipdir — kommersiya məqsədilə buraxılmış və ya istehsala hazır məhsul deyil. Performans və ya vaxta qənaət göstəricilərini düzgün ölçməyənədək dərc etmirik.",
  },

  demos: {
    eyebrow: "Məhsul nümayişləri",
    title: "Onu işdə görün.",
    description: "İşlək prototipin ekran görüntüləri və izah videoları.",
    placeholders: ["Proqramçı paneli", "Komanda rəhbəri paneli", "İzah videosu"],
    noteStart: "Prototip inkişaf etdikcə nümayiş materialları burada dərc olunacaq. O vaxta qədər",
    noteLink: "repozitoriyanın README faylı",
    noteEnd: "demonu lokal olaraq necə işə salmağı izah edir.",
  },

  journeyHeading: {
    eyebrow: "İnkişaf yolu",
    title: "İndiyədək necə inkişaf edib.",
    description: "Açıq commit tarixçəsindən mərhələlər.",
  },

  journey: [
    { date: "Okt 2026", title: "İlk prototip", body: "Mock məlumatlarla Streamlit prototipi kontekst bərpası ideyasını araşdırır." },
    { date: "Okt 2026", title: "Etibarlı AI xatırlatmaları", body: "Ehtiyat AI modelləri, vaxt limitləri, cavab yoxlayıcısı və avtomatlaşdırılmış testlər əlavə olunur." },
    { date: "Okt 2026", title: "Menecer paneli", body: "Tıxanmalar üzrə tədbir izləmə və komandaya elanlar rəy dövrəsini qapayır." },
    { date: "Okt 2026", title: "İnterfeysin yenilənməsi", body: "Yeni marşrutlar, rol portalı, hüquqi səhifələr və lokal şriftlər." },
    { date: "Noy 2026", title: "Server tərəfli autentifikasiya", body: "İkinci yenilənmə giriş yoxlamalarını serverə köçürür və test dəstini yeniləyir." },
    { date: "Noy 2026", title: "Bir neçə AI provayderi", body: "Gemini ilə yanaşı Claude modelləri də dəstəklənir, provayder sırası tənzimlənə bilir." },
    { date: "Noy 2026", title: "Təhlükəsizlik auditi düzəlişləri", body: "Təhlükəsizlik yoxlamasında aşkarlanan kritik problemlər, o cümlədən açarla hadisə qəbulu düzəldilir." },
  ],

  team: {
    eyebrow: "Layihə komandası",
    title: "ContextPulse AI-ın arxasındakı insanlar.",
    note: "ContextPulse AI-ın ilkin konsepsiyasını Nuran Əliyev təklif edib. Layihə birgə şəkildə bu şəxslər tərəfindən hazırlanıb:",
    members: [
      { name: "Nuran Əliyev", note: "İlkin konsepsiyanı təklif edib" },
      { name: "Elgün Hüseynli" },
      { name: "Mikayıl Mövsümzadə" },
    ],
    builtWith: "İstifadə olunan texnologiyalar",
  },

  earlyAccess: {
    eyebrow: "Erkən giriş",
    titleOpen: "Erkən giriş siyahısına qoşulun.",
    titleClosed: "Erkən giriş hələ açılmayıb.",
    bodyOpen: "ContextPulse AI-ı sınamaq və nəyin işlədiyini dürüst bildirmək istəyən proqramçılar və komandalar axtarırıq.",
    bodyClosed:
      "Prototip real komandalar üçün hazır olduqda beta-sınaq proqramı açacağıq. O vaxta qədər irəliləyişi izləməyin ən yaxşı yolu açıq repozitoriyadır",
    bodyClosedEmail: " — və ya bizdən e-poçtla xəbər verməyimizi xahiş edin.",
    request: "Erkən giriş istəyin",
    watch: "GitHub-da izləyin",
    emailMe: "Açılanda mənə e-poçt göndərin",
    emailSubject: "ContextPulse AI erkən giriş",
    emailBody: "Salam, NexusWeb komandası!\n\nContextPulse AI üçün erkən giriş açılanda mənə xəbər verin, zəhmət olmasa.\n",
  },
};
