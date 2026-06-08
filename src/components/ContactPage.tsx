import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please fill in all requested fields.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div id="contact-us-area" className="w-full text-left max-w-5xl mx-auto py-4 grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Contact details / text side (Left) */}
      <div className="md:col-span-5 flex flex-col space-y-6 justify-between">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 rounded-2xl shadow-sm space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 px-3 py-1 rounded-md inline-block">
            Get In Touch
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 leading-tight">
            We value your suggestions and feedback.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
            Have ideas for new harmonizers or customized layout tools? We constantly refine our interface parameters. Please drop us a message using this secure hub.
          </p>
        </div>

        {/* Dynamic Support Coordinates cards */}
        <div className="space-y-4">
          {/* Email card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-4.5 rounded-xl shadow-xs flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-500">
              <Mail size={16} />
            </div>
            <div>
              <span className="text-[10px] text-neutral-450 uppercase tracking-widest block font-bold">Email Coordinate</span>
              <a href="mailto:rajsain4861@gmail.com" className="text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:underline">
                rajsain4861@gmail.com
              </a>
            </div>
          </div>

          {/* Location card */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-4.5 rounded-xl shadow-xs flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-indigo-500">
              <MapPin size={16} />
            </div>
            <div>
              <span className="text-[10px] text-neutral-450 uppercase tracking-widest block font-bold">Operational Base</span>
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                New Delhi, India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Form Column (Right) */}
      <div className="md:col-span-7">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 p-6 sm:p-8 rounded-2xl shadow-sm">
          {submitted ? (
            <div id="contact-success-card" className="flex flex-col items-center justify-center py-10 text-center space-y-4">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-full animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-md sm:text-lg font-bold text-neutral-850 dark:text-neutral-100">Message Dispatched!</h3>
              <p className="text-xs text-neutral-500 max-w-xs">
                Your engineering feedback request has been archived successfully. Raj will research your topic and reply within 24 working hours.
              </p>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-850 pb-3">
                <h3 className="text-md font-bold text-neutral-800 dark:text-neutral-100 flex items-center space-x-1.5">
                  <MessageSquare size={16} className="text-indigo-500" />
                  <span>Send Secure Message</span>
                </h3>
                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={10} className="text-amber-500" />
                  <span>Avg Reply: 24h</span>
                </span>
              </div>

              {errorMsg && (
                <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-100 dark:border-rose-950 px-4 py-2.5 rounded-xl text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Your Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Raj"
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Email Coordinates</label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@provider.com"
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              {/* Purpose list */}
              <div>
                <label htmlFor="contact-purpose" className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Topic Purpose</label>
                <select
                  id="contact-purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
                >
                  <option value="Feedback">Feature Proposal</option>
                  <option value="Bug">Report Layout Bug</option>
                  <option value="Customization">Custom Colors Inquiry</option>
                  <option value="Partnership">Partnership Idea</option>
                </select>
              </div>

              {/* Message content */}
              <div>
                <label htmlFor="contact-message" className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">Message Content</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help your styling systems?"
                  rows={4}
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-250 dark:border-neutral-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-md shadow-indigo-500/10 cursor-pointer active:scale-98 transition-all"
              >
                <Send size={12} />
                <span>Submit Detailed Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
