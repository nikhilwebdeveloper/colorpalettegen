import React from 'react';
import { ShieldCheck, Info, Mail, Lock } from 'lucide-react';

export default function PrivacyPage() {
  const lastUpdated = "June 08, 2026";

  return (
    <div id="privacy-policy-area" className="w-full text-left max-w-4xl mx-auto py-4 space-y-6">
      {/* Title Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 sm:p-10 rounded-3xl shadow-sm text-neutral-800 dark:text-neutral-100">
        <div className="flex items-center space-x-2 text-indigo-500 mb-3">
          <ShieldCheck size={28} />
          <span className="text-xs uppercase font-extrabold tracking-widest">Trust and Compliance Registry</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
          Privacy Policy
        </h2>
        <p className="text-xs text-neutral-400 mt-2 font-bold uppercase tracking-wider">
          Last Revised: {lastUpdated}
        </p>
      </div>

      {/* Accordion list details */}
      <div className="space-y-4">
        
        {/* Section 1 */}
        <section className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm sm:text-base font-bold text-neutral-850 dark:text-neutral-100 mb-2 flex items-center space-x-2">
            <span className="w-5 h-5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 text-[11px] rounded-lg flex items-center justify-center font-bold">1</span>
            <span>Data Collection and Physical Storage</span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed pl-7">
            Aesthetic Design Studio is designed as a client-side utility workspace. We do <strong>not</strong> host custom registration backend servers or collect user email logs to use basic features. Your saved color palettes, system preferences (including Dark Mode states), and customized font selectors are safely cached directly in your browser's persistent sandbox using the <code>localStorage</code> API. Because this data remains contained entirely within your device, we cannot view, transfer, or disclose your custom workspace layouts.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm sm:text-base font-bold text-neutral-850 dark:text-neutral-100 mb-2 flex items-center space-x-2">
            <span className="w-5 h-5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 text-[11px] rounded-lg flex items-center justify-center font-bold">2</span>
            <span>Google AdSense & Cookies Disclosures</span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed pl-7">
            This platform uses third-party advertising partners, specifically <strong>Google AdSense</strong>, to serve relevant digital placements when you browse our tools. Google, as an external service provider, employs unique device identifiers and cookies (such as the DoubleClick cookie file) to intelligently display customized offers to users of this site based on visits across the global internet grid. You have the choice to withdraw consensus for personalized trackers at any moment by visiting the Google Ad and Content Network privacy guidelines.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm sm:text-base font-bold text-neutral-850 dark:text-neutral-100 mb-2 flex items-center space-x-2">
            <span className="w-5 h-5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 text-[11px] rounded-lg flex items-center justify-center font-bold">3</span>
            <span>Standard Server Log Tracking</span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed pl-7">
            Our hosting servers collect basic access log information. This log comprises Internet Protocol (IP) addresses, device hardware specs, referring exit pages, timezone anchors, browser versions, and cumulative click navigation paths. This data is strictly compiled to analyze overall traffic trends, safely detect infrastructure security breaches, and streamline performance. It is never cross-referenced with your personal data assets.
          </p>
        </section>

        {/* Section 4 */}
        <section className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 rounded-2xl shadow-sm">
          <h3 className="text-sm sm:text-base font-bold text-neutral-850 dark:text-neutral-100 mb-2 flex items-center space-x-2">
            <span className="w-5 h-5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 text-[11px] rounded-lg flex items-center justify-center font-bold">4</span>
            <span>Contact Information</span>
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed pl-7 flex flex-col space-y-2">
            <span>
              If you have any detailed inquiries regarding this document or our local sandbox mechanics, please contact the administrator directly at:
            </span>
            <span className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs mt-2">
              <Mail size={14} />
              <span>rajsain4861@gmail.com</span>
            </span>
          </p>
        </section>
      </div>
    </div>
  );
}
