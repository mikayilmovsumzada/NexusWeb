# NexusWeb — Rəsmi sayt

> **Where Ideas, People & Technology Connect.**

**NexusWeb**-in açıq saytı. NexusWeb üç sütun üzərində qurulan yeni texnologiya ekosistemidir: **Məhsullar**, **Təhsil** və **İcma**. İlk təqdim olunan məhsul **ContextPulse AI**-dır.

Bu repoda yalnız NexusWeb brend saytı var. ContextPulse AI tətbiqi öz reposunda saxlanılır ([mikayilmovsumzada/ContextPulse-AI](https://github.com/mikayilmovsumzada/ContextPulse-AI)) və texniki cəhətdən ayrıdır. Bu sayt məhsulu təqdim edir və ona keçid verir.

---

## Texnologiyalar

| Sahə | Seçim |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Cache Components) |
| Dil | TypeScript (strict) |
| Üslub | Tailwind CSS v4, dizayn tokenləri `src/app/globals.css`-də |
| İkonlar | `lucide-react` və daxili GitHub nişanı |
| Şriftlər | Space Grotesk (başlıqlar), Inter (mətn), JetBrains Mono (etiketlər), `next/font` ilə saytın özündən yüklənir |
| Backend | Açıq səhifələr statik hazırlanır. Əlaqə API-si və admin bölməsi Node.js serverində işləyir |
| Verilənlər bazası | SQLite, Node-un daxili `node:sqlite` modulu (əlavə paket yoxdur) |

Next.js və React-dən başqa yeganə runtime asılılığı `lucide-react`-dir.

## Başlamaq

**Node.js 24+** tələb olunur (`node:sqlite` üçün). Layihə Node 26 ilə hazırlanıb.

```bash
npm install
cp .env.example .env.local   # istəyə görə, "Konfiqurasiya" bölməsinə bax
npm run dev                  # http://localhost:3000
```

Windows PowerShell-də `npm` skript xətası verirsə, `npm.cmd` yazın (məsələn `npm.cmd run dev`).

### Əmrlər

| Əmr | Nə edir |
|---|---|
| `npm run dev` | Avtomatik yenilənən development serveri |
| `npm run build` | Production build (açıq səhifələr statik hazırlanır, əlaqə API-si və admin serverdə işləyir) |
| `npm start` | Production build-i işə salır |
| `npm run lint` | ESLint (`eslint-config-next`, core-web-vitals + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run admin:setup` | Admin parolunu və iki mərhələli giriş açarını qurur və ya dəyişir ([Əlaqə formu və admin qutusu](#əlaqə-formu-və-admin-qutusu)) |

## Layihənin quruluşu

```text
src/
├── proxy.ts                     # Dil marşrutları + admin bölməsinin qorunması
├── app/
│   ├── [locale]/                # Bütün açıq səhifələr (locale = "en" | "az")
│   │   ├── layout.tsx           # Kök layout: <html lang>, şriftlər, tema skripti, header/footer
│   │   ├── page.tsx             # Ana səhifə
│   │   ├── about/  products/  products/contextpulse-ai/  learn/  community/  contact/
│   │   ├── opengraph-image.tsx  # Hər dil üçün sosial şəbəkə önizləməsi (1200×630)
│   │   ├── not-found.tsx        # Dilə uyğun 404
│   │   └── [...missing]/        # Naməlum ünvanlar → dilə uyğun 404
│   ├── admin/                   # Gizli müraciətlər qutusu (/admin, /admin/login)
│   ├── api/contact/             # Əlaqə formunun endpoint-i
│   ├── api/admin/               # Admin girişi, çıxışı və mesaj əməliyyatları
│   ├── sitemap.ts, robots.ts    # SEO (sitemap hər iki dili hreflang ilə göstərir)
│   ├── icon.svg, apple-icon.png # Favikonlar (NexusWeb nişanı, /brand-dən)
│   └── globals.css              # Qaranlıq və işıqlı tema üçün dizayn tokenləri
├── server/                      # Yalnız server kodu: db.ts, auth.ts, messages.ts, request.ts
├── i18n/
│   ├── config.ts                # Dillər, URL köməkçiləri (client, server və proxy üçün təhlükəsiz)
│   ├── server.ts                # getLocale() / getContent(), next/root-params ilə
│   └── LocaleLink.tsx           # Cari dili saxlayan next/link
├── components/
│   ├── admin/                   # CopyEmail
│   ├── layout/                  # SiteHeader, SiteFooter, ThemeToggle, LanguageSwitcher, InlineScript
│   ├── sections/                # PageHero, CtaBand, ProductCard, ContactForm
│   ├── ui/                      # ButtonBase, Button (ButtonLink), Badge, Card, Section, Disclosure, Icon, Logo, SocialLinks
│   └── visuals/                 # NetworkCanvas, EcosystemDiagram, ReminderIllustration
├── config/site.ts               # Bütün linklər, əlaqə məlumatları və funksiya açarları
├── content/
│   ├── en/                      # İngilis mətnləri: ui, home, about, products, contextpulse, education, community, contact
│   ├── az/                      # Azərbaycan mətnləri, en/ ilə tip yoxlamasından keçir
│   ├── products.ts              # Məhsul reyestri (dildən asılı deyil)
│   ├── types.ts                 # Ortaq tiplər (Status, Product, Feature…)
│   └── index.ts                 # getContentFor(locale)
└── lib/                         # cn(), tema skripti, metadata və OG köməkçiləri
scripts/admin-setup.mjs          # Admin parolu və 2FA açarı
brand/                           # Loqo faylları (SVG/PNG)
```

## Konfiqurasiya

Bütün xarici linklər və əlaqə məlumatları `.env.local`-da (nümunə: `.env.example`) təyin olunur və `src/config/site.ts`-də oxunur. **Boş dəyərlər saytda göstərilmir.** Sayt heç vaxt boş link, saxta ünvan və ya heç nə etməyən düymə göstərmir.

| Dəyişən | Təyin olunanda | Boş olanda |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Kanonik URL-lər, sitemap, OG şəkillərinin ünvanları | `http://localhost:3000` istifadə olunur. **Production-da mütləq təyin edin.** |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Əlaqə səhifəsində və "bu barədə yazın" linklərində göstərilir | `src/config/site.ts`-dəki ünvan istifadə olunur |
| `NEXT_PUBLIC_GITHUB_URL`, `_LINKEDIN_URL`, `_X_URL`, `_DISCORD_URL`, `_YOUTUBE_URL`, `_INSTAGRAM_URL` | Footer, İcma və Əlaqə səhifələrində göstərilir | GitHub, LinkedIn və Instagram `src/config/site.ts`-dəki dəyərləri istifadə edir, qalanları gizlədilir |
| `NEXT_PUBLIC_CONTEXTPULSE_REPO_URL` | ContextPulse reposunun linki | Mövcud açıq repo istifadə olunur |
| `NEXT_PUBLIC_CONTEXTPULSE_DEMO_URL` | "Try Live Demo" düyməsini aktivləşdirir (ContextPulse tətbiqini yeni tabda açır). Bax: [ContextPulse AI canlı demo](#contextpulse-ai-canlı-demo) | Səhifədə "Canlı demo hələ mövcud deyil" göstərilir |
| `NEXT_PUBLIC_CONTEXTPULSE_BETA_URL` | "Erkən giriş istə" düyməsini aktivləşdirir (sizin idarə etdiyiniz formaya link) | Səhifədə erkən girişin hələ açılmadığı yazılır |

`NEXT_PUBLIC_*` dəyərləri **build zamanı** koda yazılır. Dəyişdikdən sonra yenidən build edin. Bu dəyişənlərə heç vaxt gizli məlumat yazmayın.

Bütün xarici URL-lər `src/config/url.ts`-dən keçir:
- `https://` olmalıdır. Sadə `http://` yalnız `localhost`, `127.0.0.1`, `[::1]` və `*.localhost` üçün qəbul olunur.
- `javascript:`, `data:`, `file:`, nisbi yollar, içində istifadəçi adı/parol olan və xətalı URL-lər rədd edilir.
- Rədd edilən dəyər "təyin olunmayıb" sayılır və build logunda `[config] Ignoring <NAME>: <reason>.` yazılır.

### Əlaqə formu və admin qutusu

`/contact` səhifəsindəki form `POST /api/contact`-a göndərilir. Mesaj lokal SQLite bazasında saxlanılır (`data/nexusweb.db`). **Heç bir mail göndərilmir** və heç bir kənar xidmət iştirak etmir. Mesajları gizli admin qutusunda, **`/admin`** ünvanında oxuyursunuz. Orada mesajları oxunmuş və ya oxunmamış kimi işarələyə, silə və cavab yaza bilərsiniz:

- **Gmail-də cavab yaz:** Gmail-in yazma pəncərəsini yeni tabda açır. Ünvan, mövzu və sitat gətirilmiş mesaj artıq doldurulmuş olur.
- **Mail proqramı:** kompüterdə qurulmuş e-poçt proqramını (Outlook, Mail…) açır.
- **E-poçtu kopyala:** ünvanı hər hansı başqa poçt xidmətinə yapışdırmaq üçün.

**Yalnız server ayarları.** Bunlar heç vaxt `NEXT_PUBLIC_` ilə başlamamalıdır. Lokal olaraq `.env.local`-a, serverdə mühit dəyişənlərinə yazılır:

| Dəyişən | Məqsəd |
|---|---|
| `ADMIN_PASSWORD_HASH` | Admin parolunun scrypt hash-i. `npm run admin:setup` yazır. |
| `ADMIN_TOTP_SECRET` | Authenticator tətbiqi üçün iki mərhələli giriş açarı. `npm run admin:setup` yazır. |
| `ADMIN_ALLOWED_IPS` | İstəyə görə, vergüllə ayrılmış IP-lər. Təyin olunanda bütün digər IP-lər giriş səhifəsi də daxil olmaqla `403 Forbidden` alır. |
| `TRUST_PROXY` | Production-da nginx/Caddy arxasında `1` yazın ki, ziyarətçinin real IP-si `X-Real-IP`-dən oxunsun. |
| `NEXUSWEB_DATA_DIR` | İstəyə görə, bazanın qovluğu. Default: `./data` (git-ə daxil edilmir). |

`ADMIN_PASSWORD_HASH` və ya `ADMIN_TOTP_SECRET` yoxdursa, `/admin` **404** qaytarır, yəni admin bölməsi ümumiyyətlə mövcud olmur.

**Girişi qurmaq (bir dəfə):**

```bash
npm run admin:setup
```

1. Ən azı 12 simvolluq parolu iki dəfə yazın. Yazılan görünmür və yalnız hash saxlanılır.
2. Çıxan açarı authenticator tətbiqinə (Google Authenticator, Microsoft Authenticator, 2FAS…) "Enter a setup key" vasitəsilə əlavə edin.
3. Saytı yenidən başladın və `/admin/login` ünvanını açın.

Parolu dəyişmək üçün əmri yenidən işlədin; 2FA açarı saxlanılır. Yeni açar üçün `-- --new-2fa`, `.env.local`-a yazmaq əvəzinə dəyərləri server üçün ekrana çıxarmaq üçün `-- --print` əlavə edin.

**Necə qorunur:**

- Etibarlı sessiyası olmayan ziyarətçilər `/admin` və `/api/admin/*` ünvanlarında `403 Forbidden` alır. Bu `src/proxy.ts`-də yoxlanılır və hər səhifədə, hər handler-də yenidən təkrarlanır.
- Giriş üçün həm parol (scrypt, sabit vaxtlı müqayisə), **həm də** 6 rəqəmli birdəfəlik kod (TOTP) lazımdır. Hər kod yalnız bir dəfə işləyir.
- Bir IP-dən 15 dəqiqə ərzində 5 uğursuz cəhddən sonra həmin IP bloklanır. Bütün IP-lərdən birlikdə 25 uğursuz cəhddən sonra giriş 15 dəqiqəlik bağlanır. Uğursuz cəhdlər IP ilə loglanır.
- Sessiyalar 256 bitlik təsadüfi tokenlərdir. Bazada yalnız onların SHA-256 hash-i saxlanılır. Sessiya 8 saatdan sonra bitir, çıxış onu silir və eyni anda ən çox 5 sessiya aktiv ola bilər. Kuki `__Host-` prefiksli, `HttpOnly`, `Secure` və `SameSite=Strict`-dir.
- Bütün admin əməliyyatları və əlaqə formu eyni mənbəli `Origin` başlığı tələb edir (CSRF qoruması).
- Admin cavabları `no-store` və `noindex`-dir.
- Əlaqə API-sinin limitləri:
  - Yalnız JSON qəbul olunur, ən çox 16 KB.
  - Ciddi yoxlama və uzunluq limitləri.
  - "Honeypot" sahəsi botları tutur.
  - Bir IP-dən saatda ən çox 5, ümumilikdə gündə ən çox 300 mesaj.
  - İdarəetmə simvolları silinir. Mesajlar HTML kimi yox, yalnız mətn kimi göstərilir.
- Ziyarətçinin IP-si saxlanılmır, yalnız duzlanmış (salted) hash-i saxlanılır və "göndərən #…" kimi göstərilir. Bu, eyni göndərənin təkrar mesajlarını tanımağa imkan verir.

**Daha sərt qoruma:** evdə və ya ofisdə sabit IP-niz varsa, `ADMIN_ALLOWED_IPS`-i təyin edin. Onda başqa heç kim giriş səhifəsini belə görə bilməz. IP-niz tez-tez dəyişirsə, sabit çıxış IP-si olan VPN istifadə edin (məsələn serverə WireGuard və ya Tailscale) və yalnız həmin IP-yə icazə verin.

**Ehtiyat nüsxə:** bütün müraciətlər `data/nexusweb.db` faylındadır (iş zamanı yanında `-wal`/`-shm` faylları da olur). Onu vaxtaşırı təhlükəsiz yerə köçürün.

## ContextPulse AI canlı demo

NexusWeb ContextPulse AI-ı **təqdim edir**. ContextPulse tətbiqinin özü (Python/FastAPI, öz frontend-i, AI inteqrasiyaları, proqramçı və menecer panelləri) **ayrı layihədir**. O, bu sayta köçürülmür, iframe ilə yerləşdirilmir və yenidən yazılmır.

```text
https://nexusweb.az                            NexusWeb (bu repo)
https://nexusweb.az/products/contextpulse-ai   Məhsul səhifəsi → "Try Live Demo"
https://contextpulse.nexusweb.az               ContextPulse tətbiqi (ayrıca yerləşdirilir)
```

Bu domenlər **planlaşdırılan** arxitekturadır. 2026-cı ilin noyabr ayı etibarilə `contextpulse.nexusweb.az` hələ işləmir, yəni açıq demo hələ yoxdur.

**Düymə necə işləyir**

- `NEXT_PUBLIC_CONTEXTPULSE_DEMO_URL`-də düzgün URL olanda məhsul səhifəsinin yuxarı hissəsində və "Canlı demo" bölməsində **Try Live Demo** düyməsi görünür. Bu, `target="_blank"` və `rel="noopener noreferrer"` ilə adi xarici linkdir. Ekran oxuyucular üçün onun yeni tabda açıldığı da bildirilir.
- Dəyişən yoxdursa və ya xətalıdırsa, yuxarı hissədə **"Canlı demo tezliklə"**, aşağıda isə **"Canlı demo hələ mövcud deyil"** paneli göstərilir. Paneldə tətbiqi lokal işə salmaq üçün repo README-sinə aydın işarələnmiş link var. Ziyarətçi heç vaxt xəbərsiz şəkildə GitHub-a yönləndirilmir.
- Dəyişəni yalnız tətbiq **işləyəndə və əlçatan olanda** təyin edin. Sayt bunu build zamanı yoxlaya bilmir.

**Lokal test**

1. ContextPulse-u öz qovluğundan işə salın: `python -m uvicorn app.main:app --port 8001`.
2. Bu layihədə `.env.local` faylına `NEXT_PUBLIC_CONTEXTPULSE_DEMO_URL=http://localhost:8001` yazın.
3. `npm run dev` (və ya `npm run build && npm start`) işlədin, sonra `/products/contextpulse-ai` səhifəsini açın.

**Production**

`npm run build`-dan **əvvəl** serverdə `NEXT_PUBLIC_CONTEXTPULSE_DEMO_URL=https://contextpulse.nexusweb.az` təyin edin (`.env.production.local` və ya mühit dəyişəni), sonra saytı yenidən build edib başladın.

**ContextPulse demosunu açıq etməzdən əvvəl**

ContextPulse reposunda açıq demo üçün tələb olunan qoruma artıq əlavə olunub: hər ziyarətçi üçün ayrı demo məlumatı və sıfırlama, IP üzrə sorğu limiti, AI xərc limitləri, təhlükəsizlik başlıqları (CSP), `/docs`-u söndürmək imkanı və sabitlənmiş CDN versiyaları. Ayarlar onun öz README-sində və `.env.example`-ında təsvir olunub. Qalan addımlar:

| Sahə | Nə etmək lazımdır |
|---|---|
| Yerləşdirmə | ContextPulse-u `contextpulse.nexusweb.az` subdomenində HTTPS reverse proxy arxasında işə salın |
| API açarları | Gemini/Claude açarlarını yalnız serverin gizli dəyişənlərində saxlayın və provayderdə xərc limiti və ya xəbərdarlıq qurun. Alternativ: açarsız işə salın, tətbiq hazır mətnlərlə işləyir |
| Demo məlumatları | `DEMO_*` dəyərlərini təyin edin və demoda real məlumat saxlamayın |
| Frontend | Tailwind CDN və brauzerdə Babel production üçün nəzərdə tutulmayıb. Gələcəkdə frontend-i əvvəlcədən build etmək tövsiyə olunur |
| Pulsuz alternativ | Yalnız `static/` qovluğu brauzerdə **oflayn demo rejimi** işlədir (backend və AI çağırışı yoxdur). Risksiz açıq demo üçün subdomendə statik fayl kimi yerləşdirilə bilər |

## Məzmunu redaktə etmək

- **Mətnlər:** hər səhifə mətnini `src/content/en/*.ts` (ingilis) və `src/content/az/*.ts` (Azərbaycan) fayllarından oxuyur. Həmin faylları redaktə edin, komponentlərə toxunmaq lazım deyil. Azərbaycan modulları ingilis modullarına görə tiplənib, ona görə əskik və ya səhv yazılmış açar `npm run typecheck`-də xəta verir.
- **Statuslar:** ortaq `Status` dəyərlərindən istifadə edin (`live`, `in-development`, `planned`, `exploring`, `forming`). `StatusBadge` statusu həmişə mətn kimi də göstərir, ona görə məna yalnız rəngdən asılı olmur.
- **Məhsul əlavə etmək:**
  1. `src/content/products.ts` reyestrinə yeni element əlavə edin. Onun adını, şüarını və təsvirini həm `content/en/products.ts`, həm də `content/az/products.ts` faylında `items[slug]` altında yazın. Məhsul `/products` səhifəsində avtomatik görünəcək.
  2. `src/app/[locale]/products/<slug>/page.tsx` faylını yaradın. `PageHero`, `FeatureGrid`, `CtaBand` və digər komponentlərdən istifadə edə bilərsiniz.
  3. Xüsusi sosial şəbəkə önizləməsi istəyirsinizsə, yanına `opengraph-image.tsx` əlavə edin.
  4. Məhsul ünvanları reyestrdən götürülür, ona görə sitemap onu avtomatik əlavə edir.
- **Təhsil məzmununu dərc etmək:** `src/content/education.ts`-də bir istiqamətə `lessons: [{ title, href }]` əlavə edin və onun `status`-unu dəyişin. Onda istiqamət "planlaşdırılan mövzular" əvəzinə dərsləri göstərəcək. Dərs səhifələrini `src/app/[locale]/learn/…` altında yaradın.
- **ContextPulse AI ekran görüntüləri:** şəkilləri `public/products/contextpulse-ai/` qovluğuna qoyun və `src/app/[locale]/products/contextpulse-ai/page.tsx` faylının yuxarısındakı `media` massivinə hər iki dildə alt mətni ilə əlavə edin. Qalereya "tezliklə" panellərini əvəz edəcək.
- **ContextPulse haqqında yazılanları dəqiq saxlayın:** `src/content/{en,az}/contextpulse.ts` yalnız açıq repoda bu gün mövcud olan funksiyaları təsvir edir (2026-cı ilin noyabrında README və commit tarixçəsi ilə yoxlanılıb). Məhsul dəyişdikcə onu yeniləyin.

## Dillər (ingilis / Azərbaycan)

| URL | Dil |
|---|---|
| `/`, `/about`, `/products/contextpulse-ai` … | İngilis (default, prefikssiz) |
| `/az`, `/az/about`, `/az/products/contextpulse-ai` … | Azərbaycan |
| `/en/...` | Prefikssiz ingilis ünvanına daimi yönləndirilir |

- **Necə işləyir:** bütün səhifələr `app/[locale]` altındadır. `src/proxy.ts` prefikssiz ünvanları daxildə `/en/...`-ə yönləndirir, ona görə ingilis səhifələrinin URL-ləri təmiz qalır. Server Component-lər dili `next/root-params` ilə oxuyur (`src/i18n/server.ts`-dəki `getLocale()` / `getContent()`), ona görə dili prop kimi ötürmək lazım olmur. Hər səhifə hər iki dil üçün əvvəlcədən hazırlanır.
- **Dil dəyişdirici:** header-dəki (və mobil menyudakı) EN / AZ düyməsi eyni səhifənin digər dildəki versiyasına aparır. Seçim `NEXT_LOCALE` kukisində saxlanılır və Azərbaycan dilini seçən ziyarətçilər prefikssiz ünvandan avtomatik `/az/...`-a yönləndirilir. Dil heç vaxt brauzer ayarından təxmin edilmir: kimsə başqasını seçənə qədər ingilis dili default qalır.
- **Linklər:** `/about` kimi dilsiz yollarla `LocaleLink` (və ya `ButtonLink`) istifadə edin. Onlar `/az` prefiksini avtomatik əlavə edir.
- **SEO:** hər səhifənin kanonik URL-i, `hreflang` alternativləri (`en`, `az`, `x-default`), uyğun `og:locale`-i və öz dilində sosial şəbəkə şəkli var. Sitemap hər iki dili göstərir.
- **Yeni dil əlavə etmək:** onu `src/i18n/config.ts`-də `locales` və `localeMeta`-ya əlavə edin, `Content` tipində `src/content/<kod>/` yaradın və `src/content/index.ts`-də qeydiyyatdan keçirin.
- **Tərcümənin yoxlanması:** Azərbaycan mətnləri bu sayt üçün yazılıb. Sayt açılmazdan əvvəl ana dili Azərbaycan dili olan biri onları oxuyub yoxlasın.

## İşıqlı və qaranlıq tema

- **Dəyişdirici:** header-dəki günəş/ay düyməsi. Brauzer View Transitions API-ni dəstəkləyirsə, yeni tema düymədən dairə şəklində yayılır. Dəstəkləmirsə, rənglər yumşaq keçidlə dəyişir. "Azaldılmış hərəkət" ayarı açıqdırsa, dəyişiklik dərhal olur.
- **Default:** ziyarətçinin əməliyyat sisteminin ayarı. Ziyarətçi tema seçənə qədər sayt bu ayarı izləyir. Seçim sonra `localStorage`-da (`nw-theme`) saxlanılır.
- **Yanıb-sönmə yoxdur:** `<head>`-dəki kiçik skript (`src/lib/theme.ts`) ilk görüntüdən əvvəl `<html>`-ə `data-theme` yazır.
- **Rənglər necə uyğunlaşır:** işıqlı tema `globals.css`-də eyni dizayn tokenlərini (`ink-*`, `text`, `muted`, `pulse-*`, …) yenidən təyin edir, ona görə hər komponent temaya xüsusi kod olmadan uyğunlaşır. Lazım olan nadir hallar üçün `light:` Tailwind variantı var (loqo yazısının rənglərində istifadə olunur). Arxa fon animasiyası və diaqram da tema tokenlərini oxuyur.

## Dizayn sistemi

- **Tokenlər** (`globals.css`-də `@theme`):
  - `ink-*`: səth rəngləri, qaraya yaxından tünd göyə qədər.
  - `pulse-*`: elektrik mavisi, əsas rəng.
  - `violet-*`: ikinci dərəcəli rəng.
  - `signal-*`: "əlaqə" vurğusu üçün mavi-yaşıl.
  - `text`, `muted`, `subtle` və `line`.
  - `:root[data-theme="light"]` hamısını işıqlı tema üçün yenidən təyin edir.
- **Köməkçi siniflər:** `.bg-grid` (mühəndis şəbəkəsi), `.glass` (buzlu şüşə səthi), `.edge-glow` (qradiyentli nazik kənar), `.text-gradient`.
- **Sütun rəngləri:** Məhsullar `pulse`, Təhsil `violet`, İcma `signal` rəngindən istifadə edir.
- **Motiv:** bir-birinə bağlı düyünlər. Loqoda, `NetworkCanvas` arxa fonunda, `EcosystemDiagram`-da və OG şəkillərində görünür.

Bu tokenlər və komponentlər gələcək NexusWeb məhsullarında da istifadə oluna biləcək şəkildə qurulub.

## Əlçatanlıq və performans

- Semantik bölgələr, hər səhifədə bir `h1`, adlandırılmış bölmələr, "məzmuna keç" linki və görünən fokus haşiyələri.
- Mobil menyuda `aria-expanded`/`aria-controls` var. Menyu Escape ilə (fokus düyməyə qayıdır), səhifə dəyişəndə və ekran ölçüsü dəyişəndə bağlanır, açıq olanda isə səhifənin sürüşdürülməsini bloklayır.
- Açılan təhsil bölmələri JavaScript-siz, yerli `<details>/<summary>` ilə işləyir.
- `prefers-reduced-motion` hər yerdə nəzərə alınır: arxa fon tək statik kadr çəkir, CSS animasiyaları söndürülür.
- Arxa fon animasiyası ekrandan kənarda olanda və ya tab gizli olanda dayanır, düyün sayı və DPR (ən çox 2) məhduddur.
- Açıq səhifələr statik HTML kimi əvvəlcədən hazırlanır. Şriftlər saytın özündən yüklənir. Saytda analitika və izləmə yoxdur.
- Təhlükəsizlik başlıqları `next.config.ts`-də təyin olunur: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` və HSTS. `X-Powered-By` başlığı söndürülüb.

## Yerləşdirmə (öz serveriniz + domeniniz)

Əlaqə API-si və admin qutusu səbəbindən sayta Node.js serveri lazımdır. İstənilən kiçik Linux VPS kifayətdir: 1 vCPU və 1 GB RAM. Vercel və ya başqa platforma lazım deyil.

**1. Domen.** Domen qeydiyyatçısında serverin açıq IP-sinə yönələn DNS qeydləri yaradın:

| Tip | Ad | Dəyər |
|---|---|---|
| `A` | `@` | `<serverin IPv4-ü>` |
| `A` | `www` | `<serverin IPv4-ü>` |
| `AAAA` | `@`, `www` | `<serverin IPv6-sı>` (yalnız serverdə varsa) |

**2. Server.** Node.js 24 və ya daha yeni versiyanı (`node:sqlite` daxildir), nginx və certbot quraşdırın. Sonra adi istifadəçi kimi (root yox):

```bash
git clone https://github.com/mikayilmovsumzada/NexusWeb-.git nexusweb && cd nexusweb
npm ci
npm run admin:setup -- --print   # çıxan dəyərləri .env.production.local-a yazın
npm run build
```

`.env.production.local` (icazələr `600`):

```bash
NEXT_PUBLIC_SITE_URL=https://example.az
TRUST_PROXY=1
ADMIN_PASSWORD_HASH=...
ADMIN_TOTP_SECRET=...
# ADMIN_ALLOWED_IPS=203.0.113.7
```

**3. Xidmət kimi işə salmaq.** `/etc/systemd/system/nexusweb.service`:

```ini
[Unit]
Description=NexusWeb
After=network.target

[Service]
User=nexusweb
WorkingDirectory=/home/nexusweb/nexusweb
ExecStart=/usr/bin/npx next start -H 127.0.0.1 -p 3000
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

`-H 127.0.0.1` vacibdir. Tətbiqə **yalnız nginx vasitəsilə** çatmaq mümkün olmalıdır. Əks halda kimsə `X-Real-IP` başlığını saxtalaşdırıb IP qaydalarından yan keçə bilər. Sonra bunu işlədin:

```bash
sudo systemctl enable --now nexusweb
```

**4. nginx + HTTPS.** `/etc/nginx/sites-available/nexusweb`:

```nginx
server {
    server_name example.az www.example.az;
    client_max_body_size 64k;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
    }
}
```

`X-Real-IP $remote_addr` ziyarətçinin göndərdiyi hər şeyin **üzərinə yazır**. Saytı aktivləşdirin, sonra sertifikatı əlavə edin:

```bash
sudo certbot --nginx -d example.az -d www.example.az
```

certbot sertifikatı avtomatik yeniləyir.

**5. Firewall.** Yalnız SSH, 80 və 443 portlarını açın (məsələn `ufw allow OpenSSH`, `ufw allow 'Nginx Full'`, `ufw enable`). 3000 portu xaricdən bağlı qalmalıdır.

**Yeniləmə:** `git pull && npm ci && npm run build && sudo systemctl restart nexusweb`. `data/` qovluğu toxunulmaz qalır.

---

## Hələ lazım olanlar: real məlumat və materiallar

Sayt indi işləyir, amma bunlar üçün NexusWeb komandasından real məlumat lazımdır:

| Nə | Harada | İndiki vəziyyət |
|---|---|---|
| Production domeni və server | `NEXT_PUBLIC_SITE_URL`, [Yerləşdirmə](#yerləşdirmə-öz-serveriniz--domeniniz) | Metadata-da localhost URL-ləri istifadə olunur |
| Admin girişi | `npm run admin:setup` | `/admin` 404 qaytarır |
| Digər sosial profillər (X, Discord, YouTube) | `NEXT_PUBLIC_*_URL` | Gizlədilib |
| ContextPulse AI ekran görüntüləri / demo videosu | `public/products/contextpulse-ai/` + `contextPulseContent.media` | "Tezliklə" panelləri |
| Yerləşdirilmiş ContextPulse demosu | ContextPulse-u `https://contextpulse.nexusweb.az`-da işə salın, sonra `NEXT_PUBLIC_CONTEXTPULSE_DEMO_URL`-i təyin edin | "Canlı demo hələ mövcud deyil" vəziyyəti |
| Erkən giriş / beta forması (istəyə görə) | `NEXT_PUBLIC_CONTEXTPULSE_BETA_URL` | Qeydiyyatın hələ açılmadığı yazılır |
| Komanda şəkilləri və ya profil linkləri (istəyə görə) | `contextPulseContent.team` | Baş hərflərlə avatarlar, yalnız adlar, uydurma vəzifə yoxdur |
| Son loqo (istəyə görə) | `src/components/ui/Logo.tsx`, `src/app/icon.svg` | Bu sayt üçün hazırlanmış orijinal düyün loqosu |
| Təhsil məzmunu | `src/content/education.ts` | Bütün istiqamətlər "Planlaşdırılır" kimi işarələnib |
| İcma məkanı (forum/Discord) | `NEXT_PUBLIC_DISCORD_URL` və `community.ts` yol xəritəsi | "Planlaşdırılır" kimi işarələnib |
| Gizlilik siyasəti səhifəsi | Yeni səhifə | **İndi tövsiyə olunur:** əlaqə formu adları, e-poçt ünvanlarını və mesajları saxlayır |

## Məzmun prinsipləri

- Uydurma istifadəçi, müştəri, tərəfdaş, investor, rəy və ya rəqəm yoxdur.
- Planlaşdırılan funksiyalar **Planlaşdırılır**, **Tezliklə** və ya **Hazırlanır** kimi işarələnir. Heç vaxt mövcud kimi təqdim olunmur.
- NexusWeb qeydiyyatdan keçmiş şirkət kimi yox, yeni yaranan müstəqil təşəbbüs kimi təsvir olunur.
- ContextPulse AI komandası təqdim olunduğu kimi göstərilir. Orijinal ideya Nuran Əliyevə aiddir, heç bir vəzifə və ya rol uydurulmayıb.
