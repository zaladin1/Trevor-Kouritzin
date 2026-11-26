import React, { useState } from 'react';
import { Check, Calendar, CheckCircle2, Loader2 } from 'lucide-react';
import type { ServiceItem } from '../data/siteData';
import { trackAgentEvent } from '../lib/tracking';
import { submitToFormSubmit } from '../lib/formsubmit';

interface ServicesCatalogProps {
  services: ServiceItem[];
  contactEmail: string;
}

export default function ServicesCatalog({ services, contactEmail }: ServicesCatalogProps) {
  const consultation = services[0];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [focusArea, setFocusArea] = useState('Supplement Formulation & Stack Audit');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!consultation) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim() !== '') return;

    setError('');
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitToFormSubmit({
        subject: `[DoctorTrev] 1-Hour Zoom Consultation Request — ${name.trim()}`,
        replyTo: email.trim(),
        fields: {
          Form_Type: '1-Hour Zoom Consultation Booking',
          Service: `${consultation.title} ($${consultation.price.toFixed(2)} ${consultation.currency})`,
          Full_Name: name.trim(),
          Email: email.trim(),
          Primary_Focus: focusArea,
          Preferred_Schedule_and_Notes: notes.trim() || 'None provided',
        },
      });

      setSubmitted(true);
      trackAgentEvent({
        event: 'booking_submit',
        entityType: 'order-inquiry',
        entityId: consultation.id,
        label: consultation.title,
        value: consultation.price,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Unable to send your request right now. Please email ${contactEmail} directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="consultation"
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      data-agent-entity="services-catalog"
    >
      {/* Flagship Service Overview */}
      <article
        className="lg:col-span-6 space-y-6"
        data-agent-entity="service-offer"
        data-agent-id={consultation.id}
      >
        <div className="aspect-[4/3] bg-[#F5F4F0] overflow-hidden border border-[#E2E0DA]">
          <img
            src={consultation.image}
            alt={consultation.imageAlt}
            loading="eager"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between gap-3 text-xs text-[#52565E] pb-3 border-b border-[#E2E0DA]">
          <span className="font-semibold tracking-wide text-[#163A5F]">
            {consultation.category}
          </span>
          <span>{consultation.format}</span>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B0C0E] leading-tight">
            {consultation.title}
          </h2>
          <span className="font-mono text-2xl font-medium text-[#0B0C0E] tabular-nums shrink-0">
            ${consultation.price.toFixed(2)}
          </span>
        </div>

        <p className="text-base leading-relaxed text-[#52565E]">{consultation.summary}</p>

        <div className="pt-4 border-t border-[#E2E0DA] space-y-3">
          <p className="text-xs font-semibold tracking-wide text-[#0B0C0E]">
            What Is Included
          </p>
          <ul className="space-y-2.5">
            {consultation.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5 text-sm text-[#52565E] leading-relaxed">
                <Check className="w-4 h-4 text-[#163A5F] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      {/* Direct Booking Request Form */}
      <div className="lg:col-span-6 bg-[#F5F4F0] border border-[#0B0C0E]/15 p-6 sm:p-10 space-y-6">
        <div className="space-y-1.5 pb-4 border-b border-[#0B0C0E]/15">
          <p className="text-xs font-semibold tracking-wide text-[#163A5F]">
            Direct Scheduling Request
          </p>
          <h3 className="font-serif text-3xl font-semibold text-[#0B0C0E]">
            Schedule Your Session
          </h3>
          <p className="text-sm text-[#52565E]">
            Submit your focus area and preferred availability to confirm a 1-on-1 Zoom appointment.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border border-[#0B0C0E]/20 p-6 space-y-4" role="status">
            <div className="flex items-center gap-3 text-[#0B0C0E]">
              <CheckCircle2 className="w-6 h-6 text-[#163A5F] shrink-0" aria-hidden="true" />
              <h4 className="font-serif text-2xl font-semibold">Consultation Request Sent</h4>
            </div>
            <p className="text-sm text-[#52565E] leading-relaxed">
              Thank you, <span className="font-semibold text-[#0B0C0E]">{name}</span>. Your{' '}
              <span className="font-medium text-[#0B0C0E]">{consultation.title}</span> request (${consultation.price.toFixed(2)} USD) has been submitted, and scheduling details will follow at{' '}
              <span className="font-medium text-[#0B0C0E]">{email}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setNotes('');
              }}
              className="px-5 py-3 text-xs font-semibold tracking-wide text-white bg-[#0B0C0E] hover:bg-[#163A5F] transition-colors min-h-[44px]"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate data-agent-entity="consultation-form">
            <div className="bg-white border border-[#E2E0DA] p-4 flex items-center justify-between text-sm">
              <span className="font-medium text-[#0B0C0E]">{consultation.title}</span>
              <span className="font-mono font-semibold text-[#0B0C0E] tabular-nums">
                ${consultation.price.toFixed(2)} USD
              </span>
            </div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              placeholder="Leave empty"
            />

            <div>
              <label htmlFor="booking-name" className="block text-xs font-semibold text-[#0B0C0E] mb-1.5">
                Full Name
              </label>
              <input
                id="booking-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jordan Alvarez"
                className="w-full h-11 px-3 bg-white border border-[#0B0C0E]/25 text-sm text-[#0B0C0E] focus:border-[#0B0C0E] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="booking-email" className="block text-xs font-semibold text-[#0B0C0E] mb-1.5">
                Email Address
              </label>
              <input
                id="booking-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-3 bg-white border border-[#0B0C0E]/25 text-sm text-[#0B0C0E] focus:border-[#0B0C0E] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="booking-focus" className="block text-xs font-semibold text-[#0B0C0E] mb-1.5">
                Primary Focus
              </label>
              <select
                id="booking-focus"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                className="w-full h-11 px-3 bg-white border border-[#0B0C0E]/25 text-sm text-[#0B0C0E] focus:border-[#0B0C0E] focus:outline-none"
              >
                <option>Supplement Formulation &amp; Stack Audit</option>
                <option>Clinical Nutrition &amp; Cardiometabolic Health</option>
                <option>Ketogenic Diet Implementation</option>
                <option>Competitive Bodybuilding / Hypertrophy Programming</option>
                <option>Bloodwork Framework &amp; Preventive Strategy</option>
              </select>
            </div>

            <div>
              <label htmlFor="booking-notes" className="block text-xs font-semibold text-[#0B0C0E] mb-1.5">
                Context or Preferred Schedule (Optional)
              </label>
              <textarea
                id="booking-notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share your goals, timezone, preferred days/times, or specific questions..."
                className="w-full p-3 bg-white border border-[#0B0C0E]/25 text-sm text-[#0B0C0E] focus:border-[#0B0C0E] focus:outline-none"
              />
            </div>

            {error && (
              <p role="alert" className="text-xs font-semibold text-[#DC2626]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-semibold tracking-wide text-white bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-60 transition-colors min-h-[44px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Sending Request...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  Request 1-Hour Zoom Consultation
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
