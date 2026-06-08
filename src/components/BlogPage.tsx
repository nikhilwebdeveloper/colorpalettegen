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
    readTime: '6 min read',
    category: 'Color Psychology',
    excerpt: 'Explore how different wavelengths and base hues activate cognitive responses, influencing product trust and click-through rates in landing pages.',
    bannerGradient: 'from-pink-500 to-rose-600',
    content: [
      'Color is not merely an aesthetic decoration; it is a neurological shortcut that communicates value, trust, and function in less than a decisecond. In software design, choosing a palette is equivalent to setting the emotional climate of your interface. Let’s scientifically dissect how wavelengths influence psychological schemas.',
      'Red and high-saturation oranges act as stimulants. They increase heart rates and summon feelings of urgency, which is why crimson is the universal choice for destruction alerts and high-intensity discount buttons. However, when overused, it induces ocular fatigue and cognitive resistance.',
      'Blue occupies the opposite end of the sensory spectrum. Associated with the sky and ocean, it triggers the release of calming neurotransmitters. It is no accident that dominant online institutions—financial houses, communication systems, and social grids—employ cobalt and deep navy to cement systemic reliability.',
      'To build a highly effective product, map colors intentionally to user operations. Use soft neutrals for background canvas areas to reduce tension, trustable blues for basic interaction states, and keep vibrant accents exclusively for primary conversion points.'
    ]
  },
  {
    id: 'art-2',
    title: 'Mastering the 60-30-10 Rule for Balanced App Layouts',
    slug: 'mastering-60-30-10-rule',
    author: 'Nikhil',
    date: 'May 18, 2026',
    readTime: '5 min read',
    category: 'Color Theory',
    excerpt: 'A timeless interior design rule that governs digital space. Learn how 60% dominant, 30% secondary, and 10% accent structures keep content legible.',
    bannerGradient: 'from-blue-500 to-indigo-600',
    content: [
      'Have you ever landed on an interface that felt completely chaotic, yet used beautiful colors? The issue was likely not the choice of colors, but their structural proportion. The 60-30-10 guide is an algebraic ratio imported from classical interior architecture to maintain pristine digital harmony.',
      'Sixty percent of your visual real estate must be the dominant background shade (typically off-whites, soft slates, or dark background canvases). This generates the breathing room or negative space that prevents intellectual sensory overload.',
      'Thirty percent goes to secondary system assets—borders, inactive tabs, auxiliary cards, and medium-scale typography. This is usually a variant of your base or a highly cohesive neutral.',
      'The remaining ten percent is your glorious absolute accent. This bright beacon is reserved purely for your hero CTA buttons, unread badges, active indicators, and high-impact switches. By strictly reserving your highlight color, you ensure it holds immediate gravity when viewed.'
    ]
  },
  {
    id: 'art-3',
    title: 'Designing for Accessibility: WCAG Contrast Guidelines Demystified',
    slug: 'designing-accessibility-wcag-contrast',
    author: 'Nikhil',
    date: 'May 22, 2026',
    readTime: '8 min read',
    category: 'Web Accessibility',
    excerpt: 'An updated deep dive into AAA and AA compliance ratios. Check your body text, heading components, and visual contrast margins with expert ease.',
    bannerGradient: 'from-teal-500 to-emerald-600',
    content: [
      'Design without digital accessibility is simply beautiful exclusion. Under the World Wide Web Consortium (W3C), creating a modern tool means strictly validating text legibility ratios across all light levels and screens.',
      'The WCAG 2.1 standard requires a minimum contrast ratio of 4.5:1 for normal body text and 3:1 for large display headers (AA compliance). To reach optimal AAA compliance, the threshold jumps to 7:1 for normal text. Our Color Palette Generator includes built-in real-time "Aa" indicators to verify this instantly.',
      'To avoid contrast issues, avoid pairing pure light gray text on pure white boards, or deep crimson text on dark slates. Use calculation formulas based on relative luminance to automatically decide whether dark or light text works best.',
      'Remember, high accessibility is not just for users with permanent visual impairments. It benefits everyone when reading your app outdoors in direct sunshine, on low-end screens, or at late hours in high-tension environments.'
    ]
  },
  {
    id: 'art-4',
    title: 'How to Implement Tailwind CSS Dynamic Color Themes at Scale',
    slug: 'tailwind-css-dynamic-color-themes',
    author: 'Nikhil',
    date: 'May 25, 2026',
    readTime: '7 min read',
    category: 'Tailwind CSS',
    excerpt: 'Step-by-step tutorial on translating hex outputs into CSS custom properties and tailwind config values for multi-tenant SaaS panels.',
    bannerGradient: 'from-violet-500 to-fuchsia-600',
    content: [
      'Tailwind CSS has revolutionized styling, but modular dynamic theme switches can still introduce setup complexity. The secret to writing scalable themes lies in shifting from static theme classes to flexible CSS Custom Properties.',
      'Define a centralized theme schema in your global stylesheet utilizing modern CSS variables (e.g., `--color-primary-500`). In your Tailwind v4 config or `@theme` block, assign variables instead of hard-coded values.',
      'By configuring your framework around variables, changing your entire global palette at runtime becomes as simple as updating a single class or attribute on your document root node.',
      'This method remains incredibly lightweight, avoids bloating your compiled stylesheet file sizes, and makes dynamic UI customization completely painless.'
    ]
  },
  {
    id: 'art-5',
    title: 'The Art of Minimalist Typography and Column Sizing',
    slug: 'art-minimalist-typography',
    author: 'Nikhil',
    date: 'May 27, 2026',
    readTime: '4 min read',
    category: 'Typography',
    excerpt: 'Why typographic tracking, custom font heights, and responsive margins make or break user readability in design workspaces.',
    bannerGradient: 'from-amber-500 to-orange-600',
    content: [
      'The finest digital designs often feel completely invisible. Typographic spacing acts as structural guide rails that let users digest information instantly without conscious friction.',
      'When mixing display typography, pair rigid, high-character modular headlines (like Space Grotesk) with neutral, versatile sans-serif body copy (like Inter). Keep line lengths constrained between 50 and 75 characters per row for optimal scanning speed.',
      'Adjust line heights proportionally. As text sizes scale up, line heights should adjust down to prevent paragraph blocks from feeling loose and disconnected. Conversely, small notes and metadata need extra breathing room to remain highly legible.',
      'Always structure your hierarchies around clear headings, subheadings, and paragraphs to create a seamless natural flow throughout your interface.'
    ]
  },
  {
    id: 'art-6',
    title: 'Unlocking Conversions: Landing Page Palette Optimization',
    slug: 'landing-page-palette-optimization',
    author: 'Nikhil',
    date: 'May 29, 2026',
    readTime: '6 min read',
    category: 'Conversion Rate',
    excerpt: 'How leading software companies manipulate shade boundaries and button tints to influence buyer decision matrices.',
    bannerGradient: 'from-cyan-500 to-blue-600',
    content: [
      'A great landing page functions like a well-choreographed visual journey. The strategic placement of color serves as the map that directs your user’s attention directly toward your main business goals.',
      'Use high-contrast focus blocks to highlight key benefits and features. Keep auxiliary text subtle and low-impact, allowing your call-to-action buttons to pop instantly on the screen.',
      'By pairing primary actions with strong, contrasting background colors, you can naturally guide users through your conversion funnel and significantly improve sign-up rates.',
      'Always remember to test your color combinations under different lighting conditions and across a variety of screens to ensure a consistent, high-quality user experience.'
    ]
  },
  {
    id: 'art-7',
    title: 'Understanding Tint and Shade Algorithms in Code',
    slug: 'understanding-tint-shade-algorithms',
    author: 'Nikhil',
    date: 'June 01, 2026',
    readTime: '5 min read',
    category: 'Color Math',
    excerpt: 'A math-heavy guide on blending vectors with pure white or pure black in RGB and HSL space to programmatically build palettes.',
    bannerGradient: 'from-purple-500 to-indigo-700',
    content: [
      'Generating tints and shades programmatically is a fundamental skill for UI tooling. While it might seem like a simple color adjustment, the math behind cohesive blending is actually quite fascinating.',
      'By converting RGB values into HSL space, you can easily shift lightness values up or down to create cohesive variations of your base color.',
      'This algorithmic approach ensures that your generated variations maintain consistent saturation levels and feel highly polished across your entire user interface.',
      'Implementing these formulas in your code allows for beautiful, dynamic color customization that feels incredibly fluid and responsive to user input.'
    ]
  },
  {
    id: 'art-8',
    title: 'The Evolution of Dark Mode: Beyond #000000 Black',
    slug: 'evolution-of-dark-mode',
    author: 'Nikhil',
    date: 'June 03, 2026',
    readTime: '6 min read',
    category: 'UI Trends',
    excerpt: 'Why pitch-black interfaces can cause high visual strain and how warm, dark charcoal tones create much better premium dark modes.',
    bannerGradient: 'from-neutral-800 to-neutral-950',
    content: [
      'Dark mode has quickly become an industry standard, but creating a truly premium dark theme requires much more than simply swapping backgrounds to pure black.',
      'Using pure black (#050505) mixed with stark white text can create very high contrast that leads to rapid eye fatigue. Instead, modern dark themes employ deep, warm grays and subtle charcoal tones to create a much softer visual experience.',
      'These warmer dark bases provide a much gentler reading environment, allowing your brand colors to feel rich and integrated without overwhelming the viewer.',
      'Pairing these muted dark tones with clean, readable typography is the key to designing exceptionally polished, premium dark experiences.'
    ]
  },
  {
    id: 'art-9',
    title: 'Generating Responsive CSS Shadows for Complex Component Trees',
    slug: 'responsive-css-shadows',
    author: 'Nikhil',
    date: 'June 06, 2026',
    readTime: '7 min read',
    category: 'Advanced CSS',
    excerpt: 'An deep exploration of box shadow levels, light source alignment, and ambient key shadows to give depth to modern web tools.',
    bannerGradient: 'from-red-500 to-amber-600',
    content: [
      'Shadows are essential for creating visual depth and hierarchy on the flat digital screen, but managing multiple shadow levels across a complex app can easily become disorganized.',
      'A robust system should establish clear elevation steps—ranging from subtle, flat cards up to highly elevated modern dialog boxes.',
      'By aligning all shadows to a consistent, simulated light source, you can create a highly coherent environment that feels remarkably intuitive to navigate.',
      'Using these structured shadow systems is the secret to building high-end interfaces that feel incredibly solid, satisfying, and premium to use.'
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
