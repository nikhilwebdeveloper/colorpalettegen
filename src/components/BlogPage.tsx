import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, User, ArrowRight, Search, ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  bannerGradient: string;
}

const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Psychology of Color in UI Design: Building Emotional Connections',
    slug: 'psychology-of-color-ui-design',
    author: 'Nikhil',
    date: 'May 15, 2026',
    readTime: '12 min read',
    category: 'Color Psychology',
    excerpt: 'Explore how different wavelengths and base hues activate cognitive responses, influencing product trust and click-through rates in landing pages.',
    bannerGradient: 'from-pink-500 to-rose-600',
    content: [
      'Color is not merely an aesthetic decoration; it is a neurological shortcut that communicates value, trust, and function in less than a decisecond. In software design, choosing a palette is equivalent to setting the emotional climate of your interface. When a user lands on a webpage, before their brain can parse a single word of copy or render the icon shapes, they have already formed an emotional baseline driven by the atmospheric wavelength mix of the background and primary call-to-actions.',
      'From a physiological standpoint, different colors trigger specific neural pathways. Red and high-saturation oranges act as physical stimulants. They have the longest wavelengths in the visible spectrum and require significant ocular lens adjustment to focus, which physically increases heart rates and summons feelings of urgency. This is why crimson is the universal choice for alert systems, system errors, destruction confirmation dialogs, and high-intensity countdown banners. However, when crimson or scarlet is overused across non-urgent layout areas, it leads to user fatigue, subconscious anxiety, and an elevated bounce rate as the brain enters a slight state of sensory defense.',
      'Conversely, blue occupies the cool end of the spectrum with shorter, high-frequency wavelengths. It is easily focused by the human eye and is universally associated with the sky and ocean depth. Upon exposure to blue tones, the parasympathetic nervous system triggers the release of calming hormones, relaxing eye muscles and reducing tension. It is a deliberate, highly calculated decision that dominant financial boards, enterprise communication applications, and global social networks employ deep blues and slate grays as their primary theme vectors. This establishes clear systemic reliability, institutional trust, and digital authority without triggering structural skepticism.',
      'To build a highly effective product, map colors intentionally to user operations. Use soft, desaturated neutrals for background canvas areas to reduce visual noise. Treat these background slates as empty stages. Keep vibrant, high-saturation color accents exclusively for call-to-action triggers, conversion metrics, and active state indicators. By establishing a rigid color-to-action mapping, you train your users\' muscle memory, allowing them to navigate your application seamlessly without reading wordy helper tooltips.',
      'Additionally, take cultural variance and regional demographics into consideration. While white represents pristine purity and modern minimalism in many Western design spaces, it signifies mourning across some Eastern heritages. Similarly, green serves as a solid symbol of environmental growth and biological safety in many cultures, whereas in financial markets worldwide, it marks positive performance. By matching your color scheme to the psychological schemas of your specific target audience, you eliminate cognitive friction and make your user onboarding feel incredibly native.'
    ]
  },
  {
    id: 'art-2',
    title: 'Mastering the 60-30-10 Rule for Balanced App Layouts',
    slug: 'mastering-60-30-10-rule',
    author: 'Nikhil',
    date: 'May 18, 2026',
    readTime: '10 min read',
    category: 'Color Theory',
    excerpt: 'A timeless interior design rule that governs digital space. Learn how 60% dominant, 30% secondary, and 10% accent structures keep content legible.',
    bannerGradient: 'from-blue-500 to-indigo-600',
    content: [
      'Have you ever landed on an interface that utilized beautiful, professionally curated color palettes, yet felt completely chaotic and exhausting to digest? The issue was likely not the choice of colors themselves, but their relative spatial proportions. The 60-30-10 rule is an algebraic formula imported from classical interior architecture and color theory to maintain pristine digital harmony and effortless structural chunking on screens.',
      'This rule states that your layout should be meticulously divided into three specific weight tiers. Sixty percent of your visual real estate must be dedicated to the dominant setting. In modern digital interfaces, this dominant setting represents the background canvas itself. Whether you are building an ultra-clean minimalist light theme or a cozy warm dark mode, sixty percent of the screen must be represented by soft off-whites, neutral zincs, or deep organic charcoals. This generates the safe breathing pocket, or negative space, that helps the user\'s eyes relax and find focus.',
      'Thirty percent of your spatial composition is allocated to your secondary structural components. These are the elements that frame your content—card backdrops, navigation blocks, inactive tabs, modal contours, visual borders, and auxiliary sub-headers. Typically, this secondary weight is a close relative of your primary setting; for instance, a slightly darker slate card on a lighter slate background in dark mode, or a soft gray button backing on a clean white page in light mode. This secondary tier populates the layout with structure, establishing clear boundaries and content groups.',
      'The remaining ten percent is your absolute, glorious accent highlight. This is your brand\'s beacon of high-contrast energy. Because it is strictly constrained to just one-tenth of the layout, it carries immediate, high-priority gravity whenever it is displayed on the viewport. This accent is reserved purely for your master CTA buttons, active state toggles, unread notifications, checkout buttons, and key progress checkpoints. If you dilute this ten percent by spreading the highlight across headers, background shapes, or decorative graphics, it loses its magnetic attraction, rendering the visual hierarchy flat and ineffective.',
      'To implement this rule programmatically in modern CSS frameworks like Tailwind CSS, establish a design token scale that maps to these proportions. Assign your canvas utility classes (`bg-slate-50` or `bg-neutral-950`) to provide the sixty percent base. Map your card backdrops and form containers with secondary colors to fill the thirty percent. Finally, restrict your primary brand accent classes (`bg-indigo-600` or `text-sky-500`) to your focus triggers. This mathematical approach guarantees web pages that feel exceptionally balanced, organic, and professional.'
    ]
  },
  {
    id: 'art-3',
    title: 'Designing for Accessibility: WCAG Contrast Guidelines Demystified',
    slug: 'designing-accessibility-wcag-contrast',
    author: 'Nikhil',
    date: 'May 22, 2026',
    readTime: '14 min read',
    category: 'Web Accessibility',
    excerpt: 'An updated deep dive into AAA and AA compliance ratios. Check your body text, heading components, and visual contrast margins with expert ease.',
    bannerGradient: 'from-teal-500 to-emerald-600',
    content: [
      'Design without web accessibility is quite simply beautiful exclusion. In the modern era of frontend design, accessibility guidelines are no longer optional side-features; they are critical regulatory standards. Overseen by the W3C consortium, Web Content Accessibility Guidelines (WCAG) ensure that digital spaces remain easily navigable and legible for individuals across all physical and sensory conditions.',
      'The WCAG 2.1 framework measures accessibility using contrast ratios, which quantify the difference in relative luminance between your foreground text and background canvas. The standard establishes three testing thresholds: Level A, Level AA (the standard industry standard), and Level AAA (the gold standard for high-performance interfaces). to achieve AA compliance, normal body text (under 18pt or 14pt bold) must maintain a contrast ratio of at least 4.5:1. For large display headings (18pt and above), the threshold relaxes slightly to 3:1.',
      'If you aim for pristine AAA compliance, the structural limits tighten. Normal body copy must maintain an absolute contrast ratio of 7:1 against its backing, while large headings require a minimum of 4.5:1. Balancing these requirements requires deep color math. Our Color Suite utilities solve this by computing exact luminance formulas: `L = 0.2126 * R + 0.7152 * G + 0.0722 * B`, where each color component is linearized to make contrast verification instantaneous.',
      'Common contrast pitfalls include pairing medium-gray text on a white card, putting yellow indicators on a light green background, or overlaying red warning icons on a deep charcoal card. These choices look sleek to some in high-end studio monitors, but they become completely illegible to a user walking down the street in bright sunlight, a senior citizen on a low-end display, or anyone with deuteranopia (red-green color blindness).',
      'By baking contrast checkers into your core workflow, you build apps that are universally readable. Accessibility is not just an empathetic gesture; it expands your real-world market reach and ensures your pages perform better on search engine index bots, which heavily penalize layouts with low contrast, overlap elements, or microscopic font sizes.'
    ]
  },
  {
    id: 'art-4',
    title: 'How to Implement Tailwind CSS Dynamic Color Themes at Scale',
    slug: 'tailwind-css-dynamic-color-themes',
    author: 'Nikhil',
    date: 'May 25, 2026',
    readTime: '13 min read',
    category: 'Tailwind CSS',
    excerpt: 'Step-by-step tutorial on translating hex outputs into CSS custom properties and tailwind config values for multi-tenant SaaS panels.',
    bannerGradient: 'from-violet-500 to-fuchsia-600',
    content: [
      'Tailwind CSS has speeded up frontend styling, but building modular, completely dynamic multi-tenant software palettes can still introduce significant architecture questions. The classic approach of hard-coding colors like `bg-blue-600` or `text-zinc-800` into your React elements makes runtime color changes impossible. The secret to writing high-performance, dynamic interfaces lies in shifting from static theme configurations to CSS Custom Properties (CSS variables).',
      'Under this architecture, you declare logical CSS variables in your index stylesheet inside a primary class list or on the `:root` element. For example, instead of naming the color, name the function: `--color-primary`, `--color-background`, or `--color-surface`. When mapping your layout, you style elements with functional abstractions: `bg-[var(--color-primary)]` or, better yet, map these variables inside your Tailwind theme block.',
      'In Tailwind CSS v4, this mapping is simpler than ever. By adding `@theme { --color-brand-primary: var(--color-primary); }` to your CSS entry point, you can write native utility classes like `bg-brand-primary` while the active value is fetched dynamically from the active runtime variable. When a custom user or tenant switches their color scheme, your application merely needs to write JS to set these variables: `document.documentElement.style.setProperty(\'--color-primary\', userSelectHex)`.',
      'This variable-driven strategy carries three major benefits: first, it prevents theme flickering as server-side rendered pages load; second, it keeps your compiled CSS bundle exceptionally thin; and third, it allows for infinite, completely customized color customization without editing or re-compiling a single line of your application code.',
      'When integrating this at scale, configure sensible falbacks inside your stylesheet. If a variable fails to load or is corrupt, fallback styles will maintain baseline contrast and usability, keeping your customer dashboards robust and accessible.'
    ]
  },
  {
    id: 'art-5',
    title: 'The Art of Minimalist Typography and Column Sizing',
    slug: 'art-minimalist-typography',
    author: 'Nikhil',
    date: 'May 27, 2026',
    readTime: '11 min read',
    category: 'Typography',
    excerpt: 'Why typographic tracking, custom font heights, and responsive margins make or break user readability in design workspaces.',
    bannerGradient: 'from-amber-500 to-orange-600',
    content: [
      'The finest digital designs often feel completely invisible. Reading an interface should feel like listening to a calm, natural speech; typographic tracking, letter widths, line intervals, and margins serve as the subtle guidance that helps the human brain absorb complex content without cognitive fatigue.',
      'To achieve elegant visual cadence, focus on font pairings. The gold standard for modern utility tools is to pairing a highly characterful, modern display font (such as Space Grotesk, Syne, or outfit) for large headings, and pairing it with a highly structured, perfectly neutral sans-serif (such as Inter or Geist) for dense paragraphs and action text. This generates immediate, distinct typographic hierarchy.',
      'Crucial to high-performance layouts is column sizing and measure. Legibility research confirms that the human eye is happiest reading between 50 to 75 characters per line (including spaces). If your text container stretches wider, reading becomes an exercise in head-tracking, which tires the reader and causes them to drop off. If the measure is too narrow, the eye has to jump back and forth too frequently, breaking reading flow.',
      'Adjust line height, or leading, proportionally to scale. As you scale a font\'s size up (for example, to 40px headers), shrink the relative line height to around `1.1` or `1.2`. Tall display letters with loose vertical spacing look disjointed and separate. Conversely, when structuring micro-meta copy (like 11px table logs), expand the line height to `1.5` and add subtle tracking (`tracking-wide`) to keep small characters from blurring together on lower-end screens.',
      'Always secure your layouts on a consistent vertical baseline grid. Keeping your vertical spacing (paddles, margins, and line structures) mapped to multiples of 4px or 8px establishes an incredibly solid, balanced, and predictable digital canvas.'
    ]
  },
  {
    id: 'art-6',
    title: 'Unlocking Conversions: Landing Page Palette Optimization',
    slug: 'landing-page-palette-optimization',
    author: 'Nikhil',
    date: 'May 29, 2026',
    readTime: '11 min read',
    category: 'Conversion Rate',
    excerpt: 'How leading software companies manipulate shade boundaries and button tints to influence buyer decision matrices.',
    bannerGradient: 'from-cyan-500 to-blue-600',
    content: [
      'A great landing page is more than a display of product features; it is a meticulously choreographed narrative journey. The strategic placement of colors, light levels, and border highlights acts as the visual architecture that points your users\' eyes toward your major call-to-actions and product propositions.',
      'A powerful design principle used by top-tier marketing designers is the Isolation Effect (or Von Restorff Effect). This psychological rule states that when multiple similar items are grouped, the item that differs from the rest is the most memorable. Translating this to your page template: if your background is white, your cards are soft gray, and your general UI borders use a neutral scheme, your main conversion targets must utilize a distinct, vibrant, high-contrast tone that exists nowhere else on the page.',
      'Furthermore, optimize the hierarchy of your interactive inputs. Primary, action-oriented items (like "Start Free Trial") should use your primary brand highlight color. Secondary, optional items (like "Watch Live Demo") should remain styled as outline buttons or neutral text triggers. This clean visual scale helps direct user action without inducing decision anxiety.',
      'Always test your buttons under varied conditions. A bright blue action button might feel gorgeous in your modern office, but when a user visits your landing page on a mobile device under direct outdoor sunlight, does that button maintain high contrast? By checking color contrasts across diverse lighting levels, you verify high conversion performance under any real-world condition.',
      'In addition, study how pricing grids and plan headers use colored badges (such as "Most Popular" or "Best Value"). Giving these badges a high-contrast background or light-border glow immediately acts as a magnet to guide prospective buyers toward higher-value offerings.'
    ]
  },
  {
    id: 'art-7',
    title: 'Understanding Tint and Shade Algorithms in Code',
    slug: 'understanding-tint-shade-algorithms',
    author: 'Nikhil',
    date: 'June 01, 2026',
    readTime: '12 min read',
    category: 'Color Math',
    excerpt: 'A math-heavy guide on blending vectors with pure white or pure black in RGB and HSL space to programmatically build palettes.',
    bannerGradient: 'from-purple-500 to-indigo-700',
    content: [
      'Generating consistent, clean tints and shades programmatically is a fundamental skill for design engineering. Many developers assume that altering a color\'s brightness is as simple as adding white or black to the RGB channels. In reality, linear math in RGB space often introduces muddy, oversaturated, or unnatural color variations.',
      'To build highly polished tints and shades, first understand color spaces. The RGB space (Red, Green, Blue) maps color directly to the physical hardware display, but it does not represent how the human brain perceives brightness or saturation. To manipulate color naturally, convert RGB into HSL space (Hue, Saturation, Lightness). In HSL, you can easily shift the Lightness parameter up or down while keeping Hue constant.',
      'To generate a tint (lightening a color), blend your base color with pure white. Mathematically, this is a linear interpolation (lerp) of RGB channels towards `255`: `C_tint = C_base + (255 - C_base) * factor`, where factor ranges from 0 to 1. To generate a shade (darkening a color), blend your base color with pure black, lerping your RGB channels toward `0`: `C_shade = C_base * (1 - factor)`.',
      'For exceptional brand palettes, implement a subtle Hue Shift during your tint and shade calculations. In nature, when objects are hit by bright sunlight, lightened surfaces do not merely get lighter; their hue shifts warmer (towards yellow). Conversely, shadowed areas shift cooler (towards deep blue). Shifting your hue by 1-3 degrees during calculations prevents shade sets from feeling flat or sterile.',
      'Our color tools handle these mathematical calculations transparently, giving developers beautiful, production-ready Tailwind palettes instantly. By embedding these programmatic palettes in your codebase, you can easily support smooth transitions, focus indicators, and border highlights.'
    ]
  },
  {
    id: 'art-8',
    title: 'The Evolution of Dark Mode: Beyond #000000 Black',
    slug: 'evolution-of-dark-mode',
    author: 'Nikhil',
    date: 'June 03, 2026',
    readTime: '11 min read',
    category: 'UI Trends',
    excerpt: 'Why pitch-black interfaces can cause high visual strain and how warm, dark charcoal tones create much better premium dark modes.',
    bannerGradient: 'from-neutral-800 to-neutral-950',
    content: [
      'Dark mode has quickly transitioned from a niche developer feature to a mandatory industry standard. However, creating a premium, professional dark mode involves much more than simply running a script to invert color values or setting your global background to `#000000` (pure pitch black).',
      'Using solid pitch black as your primary backdrop combined with pure white text creates an excessive contrast ratio of 21:1. This extreme contrast results in "blooming" or "haloing," where the white text appears to glow and bleed into surrounding dark pixels on high-brightness OLED and LCD displays. This leads to rapid eye fatigue, reading errors, and visual strain for many users.',
      'To create a premium dark interface, base your canvas around dark, deep slate or charcoal tones (such as `#0d0e12`, `#121214`, or zinc/neutral-900). These warmer, desaturated dark bases provide a significantly softer visual experience, allowing your primary content, typography, and brand colors to feel organically integrated.',
      'Furthermore, apply structural lightness to convey depth. In a traditional light theme, closer elements cast shadows and appear above distant blocks. In a dark theme, we represent elevation by making closer elements slightly lighter. A button or card floating at a higher level than the base canvas should be styled with a slightly lighter background (e.g., zinc-800) than the base background (zinc-950).',
      'By pairing these clean dark tones with high-contrast text accents, you maintain WCAG-compliant contrast levels while creating an eye-safe, exceptionally modern user interface that looks beautiful under low-light conditions.'
    ]
  },
  {
    id: 'art-9',
    title: 'Generating Responsive CSS Shadows for Complex Component Trees',
    slug: 'responsive-css-shadows',
    author: 'Nikhil',
    date: 'June 06, 2026',
    readTime: '12 min read',
    category: 'Advanced CSS',
    excerpt: 'An deep exploration of box shadow levels, light source alignment, and ambient key shadows to give depth to modern web tools.',
    bannerGradient: 'from-red-500 to-amber-600',
    content: [
      'Shadows are a powerful tool for establishing structural hierarchy, physical depth, and interaction feedback on the flat, two-dimensional coordinate system of digital screens. However, managing custom shadows across complex applications can quickly lead to inconsistent, heavy, or unaligned styles.',
      'A beautiful, realistic shadow is never constructed of a single dark border line. In the physical world, shadows are created of two distinct phenomena: ambient light occlusion (a soft, wide, highly desaturated shadow that surrounds the object in all directions) and a key light source (a sharper, offset shadow that drops down based on the light vector).',
      'To recreate this effect in CSS, build layered box-shadow styles. Instead of using a single value, stack multiple shadows within a single class declaration: `box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.06)`. The first, tight shadow represents the localized ambient occlusion, while the second, wider shadow represents the primary key offset.',
      'Align all shadows to a simulated light source (typically imagined slightly above and centered on the user). This ensures that card offsets, button highlights, and drop-downs drop consistently down towards the bottom of the page, creating a cohesive visual layout.',
      'Using our Box Shadow Configurator, you can dynamically customize and test these elevation presets. Mapping these presets into your design tokens ensures that hover states, modal alerts, and floating panels have appropriate levels of contrast, depth, and tactility.'
    ]
  }
];

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = ARTICLES.filter(art => 
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="blog-articles-area" className="w-full text-left max-w-6xl mx-auto py-4">
      {selectedArticle ? (
        // Detailed Article View
        <article id="article-detail" className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-3xl overflow-hidden shadow-sm">
          {/* Header Banner */}
          <div className={`bg-gradient-to-r ${selectedArticle.bannerGradient} h-52 sm:h-72 p-6 sm:p-10 flex flex-col justify-end text-white relative`}>
            <div className="absolute top-6 left-6">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-black/30 hover:bg-black/40 text-white text-xs font-bold py-2 px-4 rounded-xl backdrop-blur-md flex items-center space-x-1 border border-white/10 cursor-pointer"
              >
                <span>← Back to Articles</span>
              </button>
            </div>
            <div className="max-w-3xl">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-white/20 px-2.5 py-1 rounded-md inline-block mb-3 backdrop-blur-xs">
                {selectedArticle.category}
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                {selectedArticle.title}
              </h2>
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="px-6 sm:px-10 py-5 bg-neutral-50 dark:bg-neutral-950/40 border-b border-neutral-100 dark:border-neutral-850 flex flex-wrap gap-4 text-xs font-semibold text-neutral-500">
            <div className="flex items-center space-x-1.5">
              <User size={13} />
              <span>Written by {selectedArticle.author}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar size={13} />
              <span>Published on {selectedArticle.date}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock size={13} />
              <span>Read Time: {selectedArticle.readTime}</span>
            </div>
          </div>

          {/* Article Main Text body content */}
          <div className="px-6 sm:px-10 py-8 sm:py-12 max-w-3xl mx-auto space-y-6">
            {selectedArticle.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-neutral-750 dark:text-neutral-350 text-sm sm:text-base leading-relaxed tracking-normal"
              >
                {paragraph}
              </p>
            ))}

            {/* Simulated AdSense banner placeholder layout */}
            <div className="my-10 p-6 bg-neutral-50 dark:bg-neutral-950/60 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-center">
              <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 block mb-1">Sponsored Section</span>
              <div className="text-xs text-indigo-600/80 dark:text-indigo-400/80 font-bold">Spectral Design Tools Premium Bundle</div>
              <p className="text-[11px] text-neutral-400 mt-1">Unlock over 50+ dynamic color harmony engines and responsive shadows assets.</p>
            </div>

            {/* Bottom Back Button */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-850">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-sm active:scale-95 mx-auto"
              >
                <span>Back to Article List</span>
              </button>
            </div>
          </div>
        </article>
      ) : (
        // Article Grid View
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50">Web Design Knowledge Hub</h2>
              <p className="text-xs text-neutral-500 mt-1">Written specifically for developers & UI craft practitioners seeking cleaner applications styling metrics.</p>
            </div>

            {/* Quick Search articles bar */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold rounded-xl pl-9 pr-4 py-2 w-full md:w-60 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 shadow-xs"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                <Search size={13} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length === 0 ? (
              <div className="col-span-full py-20 text-center border border-dashed border-neutral-200 dark:border-neutral-805 rounded-3xl">
                <p className="text-sm font-semibold text-neutral-500">No articles match your search parameters</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-xs text-indigo-500 hover:underline mt-2 cursor-pointer font-bold"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-805 rounded-2xl overflow-hidden hover:shadow-lg hover:border-indigo-500/20 dark:hover:border-indigo-400/20 transition-all cursor-pointer flex flex-col justify-between"
                  style={{ contentVisibility: 'auto' }}
                >
                  <div>
                    {/* Header Banner small block */}
                    <div className={`h-3 bg-gradient-to-r ${article.bannerGradient}`} />
                    
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[9px] uppercase font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded-md">
                          {article.category}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium">{article.readTime}</span>
                      </div>

                      <h3 className="text-sm font-bold text-neutral-850 dark:text-neutral-100 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-450 transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-[11px] text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-neutral-100/40 dark:border-neutral-850/30 flex items-center justify-between text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    <span className="text-neutral-400 text-[10px] font-medium">By {article.author}</span>
                    <span className="flex items-center space-x-1">
                      <span>Read Full</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
