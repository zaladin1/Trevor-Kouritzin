import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackAgentEvent } from '../lib/tracking';

interface NewsletterFormProps {
  variant?: 'light' | 'dark';
}

export default function NewsletterForm({ variant = 'light' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim() !== '') return;

    setError('');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubscribed(true);
    trackAgentEvent({
      event: 'newsletter_subscribe',
      entityType: 'newsletter',
      label: 'evidence-insights',
    });
  };

  if (subscribed) {
    return (
      <div
        className={`flex items-center gap-3 p-4 border ${
          variant === 'dark'
            ? 'bg-white/10 border-white/25 text-white'
            : 'bg-[#F5F4F0] border-[#0B0C0E]/20 text-[#0B0C0E]'
        }`}
        role="status"
      >
        <CheckCircle2 className="w-5 h-5 text-[#163A5F] shrink-0" aria-hidden="true" />
        <p className="text-sm font-medium">
          Subscribed. New research breakdowns will arrive at {email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5" noValidate data-agent-entity="newsletter-form">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${variant}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className={`flex-1 h-12 px-4 text-sm border focus:outline-none ${
            variant === 'dark'
              ? 'bg-white/10 border-white/25 text-white placeholder:text-white/60 focus:border-white'
              : 'bg-white border-[#0B0C0E]/25 text-[#0B0C0E] placeholder:text-[#52565E]/70 focus:border-[#0B0C0E]'
          }`}
        />

        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="hidden"
          placeholder="Leave this field empty if you're human"
        />

        <button
          type="submit"
          className={`inline-flex items-center justify-center gap-2 px-6 h-12 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 ${
            variant === 'dark'
              ? 'bg-white text-[#0B0C0E] hover:bg-[#F5F4F0]'
              : 'bg-[#0B0C0E] text-white hover:bg-[#163A5F]'
          }`}
        >
          Subscribe
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {error && (
        <p role="alert" className="text-xs font-semibold text-[#DC2626]">
          {error}
        </p>
      )}
    </form>
  );
}
