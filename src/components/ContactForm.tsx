import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { trackAgentEvent } from '../lib/tracking';
import { submitToFormSubmit } from '../lib/formsubmit';

interface ContactFormProps {
  contactEmail: string;
}

export default function ContactForm({ contactEmail }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Academic & Industry Speaking');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot.trim() !== '') return;

    setError('');
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!message.trim()) {
      setError('Please include a brief summary of your speaking, podcast, or consulting inquiry.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitToFormSubmit({
        subject: `[DoctorTrev] ${inquiryType} — ${name.trim()}`,
        replyTo: email.trim(),
        fields: {
          Form_Type: 'Contact & Speaking Inquiry',
          Full_Name: name.trim(),
          Email: email.trim(),
          Inquiry_Category: inquiryType,
          Organization_or_Event: organization.trim() || 'N/A',
          Message: message.trim(),
        },
      });

      setSubmitted(true);
      trackAgentEvent({
        event: 'contact_submit',
        entityType: 'inquiry',
        label: inquiryType,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Unable to send your message right now. Please email ${contactEmail} directly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#F5F4F0] border border-[#0B0C0E]/20 p-8 space-y-4" role="status">
        <div className="flex items-center gap-3 text-[#0B0C0E]">
          <CheckCircle2 className="w-6 h-6 text-[#163A5F] shrink-0" aria-hidden="true" />
          <h3 className="font-serif text-3xl font-semibold">Inquiry Received</h3>
        </div>
        <p className="text-sm leading-relaxed text-[#52565E]">
          Thank you, <span className="font-semibold text-[#0B0C0E]">{name}</span>. Your{' '}
          <span className="font-medium text-[#0B0C0E]">{inquiryType}</span> message has been sent, and we will follow up at{' '}
          <span className="font-medium text-[#0B0C0E]">{email}</span>.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setMessage('');
            }}
            className="px-5 py-3 text-xs font-semibold tracking-wide text-white bg-[#0B0C0E] hover:bg-[#163A5F] transition-colors min-h-[44px]"
          >
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-[#0B0C0E]/15 p-6 sm:p-8 space-y-5"
      data-agent-entity="contact-form"
    >
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-[#0B0C0E] mb-1.5">
            Full Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Morgan"
            className="w-full h-11 px-3 bg-[#F5F4F0] border border-[#0B0C0E]/20 text-sm text-[#0B0C0E] focus:border-[#0B0C0E] focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold text-[#0B0C0E] mb-1.5">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@organization.org"
            className="w-full h-11 px-3 bg-[#F5F4F0] border border-[#0B0C0E]/20 text-sm text-[#0B0C0E] focus:border-[#0B0C0E] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-type" className="block text-xs font-semibold text-[#0B0C0E] mb-1.5">
            Inquiry Category
          </label>
          <select
            id="contact-type"
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className="w-full h-11 px-3 bg-[#F5F4F0] border border-[#0B0C0E]/20 text-sm text-[#0B0C0E] focus:border-[#0B0C0E] focus:bg-white focus:outline-none"
          >
            <option>Academic &amp; Industry Speaking</option>
            <option>Podcast Interview Request</option>
            <option>Supplement Formulation Consulting</option>
            <option>1-on-1 Clinical / Performance Consultation</option>
            <option>Workshop or Conference Keynote</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-org" className="block text-xs font-semibold text-[#0B0C0E] mb-1.5">
            Organization / Event (Optional)
          </label>
          <input
            id="contact-org"
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="University, Podcast, or Company"
            className="w-full h-11 px-3 bg-[#F5F4F0] border border-[#0B0C0E]/20 text-sm text-[#0B0C0E] focus:border-[#0B0C0E] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-[#0B0C0E] mb-1.5">
          Inquiry Details
        </label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Outline your conference dates, audience profile, formulation scope, or consultation objectives..."
          className="w-full p-3 bg-[#F5F4F0] border border-[#0B0C0E]/20 text-sm text-[#0B0C0E] focus:border-[#0B0C0E] focus:bg-white focus:outline-none"
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
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wide text-white bg-[#0B0C0E] hover:bg-[#163A5F] disabled:opacity-60 transition-colors min-h-[44px]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Sending Inquiry...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            Submit Inquiry
          </>
        )}
      </button>
    </form>
  );
}
