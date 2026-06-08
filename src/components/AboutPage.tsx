import React from 'react';
import { Target, Users, Code, Award, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div id="about-us-area" className="w-full text-left max-w-4xl mx-auto py-4 space-y-8">
      {/* Hero Banner Grid Section */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 sm:p-10 rounded-3xl shadow-sm space-y-6">
        <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-md inline-block">
          Our Mission Statement
        </span>
        <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
          Pioneering dynamic utility suites for digital craft and user experience practitioners.
        </h2>
        <p className="text-neutral-600 dark:text-neutral-350 text-sm sm:text-base leading-relaxed">
          Welcome to the <strong>Design Color Suite</strong>—a modular developer workspace engineered to make web styling efficient, intuitive, and beautiful. Founded by a visual developer, we strive to remove technical friction in modern frontend scaling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Values card */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-neutral-850 dark:text-neutral-100 uppercase tracking-widest flex items-center space-x-2">
            <Target size={16} className="text-indigo-500" />
            <span>Product Values</span>
          </h3>
          <ul className="space-y-3.5 text-xs font-semibold text-neutral-500 dark:text-neutral-450 leading-relaxed">
            <li className="flex items-start space-x-2">
              <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Absolute Precision:</strong> Mathematical color ratios based on HSL vectors and contrast luminances.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Speed First Layouts:</strong> Zero runtime weights. No database lags. Clean instant clipboard copy.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Pure Accessibility:</strong> Dedicated contrast validations matching strict WCAG compliance guidelines.</span>
            </li>
          </ul>
        </div>

        {/* Technical Stack card */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-neutral-850 dark:text-neutral-100 uppercase tracking-widest flex items-center space-x-2">
            <Code size={16} className="text-pink-500" />
            <span>Dynamic Engineering Stack</span>
          </h3>
          <div className="space-y-3">
            <p className="text-xs text-neutral-500 leading-relaxed">
              Our core compiler handles mathematical color conversions directly client-side, reducing unnecessary network overhead.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Vite SPA', 'React 18+', 'Tailwind CSS v4', 'Framer Motion', 'Lucide Vector Icons'].map((tech) => (
                <span
                  key={tech}
                  className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800 rounded-lg text-[10px] font-bold text-neutral-500 dark:text-neutral-400 py-1 px-2.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leadership structure statement card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-neutral-850 dark:text-neutral-100 uppercase tracking-widest flex items-center space-x-2">
          <Users size={16} className="text-teal-500" />
          <span>Meet the Creator</span>
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed">
          The studio is designed and developed by <strong>Nikhil</strong>, a passionate UI architect and frontend engineer. Nikhil believes in creating tools that empower creatives to design high-quality interfaces with ease. Every pixel and line of color-math is crafted with extreme care to maintain elegant workspaces.
        </p>
      </div>
    </div>
  );
}
