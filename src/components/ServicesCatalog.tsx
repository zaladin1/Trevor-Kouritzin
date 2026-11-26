import React, { useState } from 'react';
import { Check, ShoppingBag, Calendar, X, ArrowRight } from 'lucide-react';
import type { ServiceItem } from '../data/siteData';
import { trackAgentEvent } from '../lib/tracking';

interface ServicesCatalogProps {
  services: ServiceItem[];
  contactEmail: string;
}

export default function ServicesCatalog({ services, contactEmail }: ServicesCatalogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['zoom-consultation']);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [focusArea, setFocusArea] = useState('Supplement Formulation & Stack Audit');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedItems = services.filter((s) => selectedIds.includes(s.id));
  const total = selectedItems.reduce((acc, s) => acc + s.price, 0);

  const toggleItem = (item: ServiceItem) => {
    setSubmitted(false);
    setSelectedIds((prev) => {
      const exists = prev.includes(item.id);
      return exists ? prev.filter((id) => id !== item.id) : [...prev, item.id];
    });
    trackAgentEvent({
      event: 'service_select',
      entityType: 'service',
      entityId: item.id,
      label: item.title,
      value: item.price,
    });
  };

  const handleOpenBooking = (item: ServiceItem) => {
    setSubmitted(false);
    if (!selectedIds.includes(item.id)) {
      setSelectedIds((prev) => [...prev, item.id]);
    }
    setDrawerOpen(true);
    trackAgentEvent({
      event: 'service_select',
      entityType: 'service',
      entityId: item.id,
      label: item.title,
      value: item.price,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (selectedItems.length === 0) {
      setError('Please select at least one service or monograph.');
      return;
    }

    setSubmitted(true);
    trackAgentEvent({
      event: 'booking_submit',
      entityType: 'order-inquiry',
      label: selectedItems.map((s) => s.title).join(', '),
      value: total,
    });
  };

  return (
    <div className="space-y-12" data-agent-entity="services-catalog">
      {/* Architectural Catalog Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {services.map((service) => {
          const isSelected = selectedIds.includes(service.id);
          return (
            <article
              key={service.id}
              id={service.id === 'zoom-consultation' ? 'consultation' : service.id}
              className="flex flex-col justify-between border-b border-[#0B0C0E]/15 pb-8"
              data-agent-entity="service-offer"
              data-agent-id={service.id}
            >
              <div className="space-y-5">
                <div className="aspect-[4/3] bg-[#F5F4F0] overflow-hidden border border-[#E2E0DA]">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 text-xs text-[#52565E]">
                  <span className="font-semibold tracking-wide text-[#163A5F]">
                    {service.category}
                  </span>
                  <span className="truncate">{service.format}</span>
                </div>

                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B0C0E] leading-tight">
                    {service.title}
                  </h2>
                  <span className="font-mono text-xl font-medium text-[#0B0C0E] tabular-nums shrink-0">
                    ${service.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[#52565E]">{service.summary}</p>

                <ul className="space-y-2 pt-4 border-t border-[#E2E0DA]">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-xs text-[#52565E] leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-[#163A5F] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-6">
                <button
                  type="button"
                  onClick={() => handleOpenBooking(service)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold tracking-wide text-white bg-[#0B0C0E] hover:bg-[#163A5F] transition-colors whitespace-nowrap min-h-[44px]"
                >
                  {service.category === 'Consultation' ? (
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  )}
                  {service.ctaLabel}
                </button>

                <button
                  type="button"
                  onClick={() => toggleItem(service)}
                  aria-pressed={isSelected}
                  className={`px-4 py-3 text-xs font-semibold tracking-wide border transition-colors whitespace-nowrap min-h-[44px] ${
                    isSelected
                      ? 'bg-[#F5F4F0] text-[#0B0C0E] border-[#0B0C0E]'
                      : 'bg-white text-[#52565E] border-[#E2E0DA] hover:border-[#0B0C0E] hover:text-[#0B0C0E]'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Add'}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Summary Ledger Bar */}
      <div className="bg-[#0B0C0E] text-white p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold tracking-wide text-white/60">
            100% Satisfaction Guarantee · Direct Scheduling &amp; Digital Fulfillment
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
            {selectedItems.length > 0
              ? `${selectedItems.length} selection${selectedItems.length > 1 ? 's' : ''} — $${total.toFixed(2)}`
              : 'Select a consultation or monograph above'}
          </h3>
          <p className="text-sm text-[#A1A7B3]">
            {selectedItems.length > 0
              ? selectedItems.map((s) => s.title).join(' · ')
              : 'All inquiries route directly to Dr. Trevor Kouritzin in Edmonton, Alberta.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setDrawerOpen(true);
          }}
          disabled={selectedItems.length === 0}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wide text-[#0B0C0E] bg-white hover:bg-[#F5F4F0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors whitespace-nowrap min-h-[44px]"
        >
          Complete Request
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {/* Sharp Editorial Modal */}
      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0C0E]/70 backdrop-blur-xs"
        >
          <div className="bg-white border border-[#0B0C0E]/20 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E2E0DA]">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#163A5F]">
                  Booking &amp; Digital Request
                </p>
                <h3 id="booking-modal-title" className="font-serif text-3xl font-semibold text-[#0B0C0E]">
                  Confirm Selection
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close booking dialog"
                className="w-10 h-10 inline-flex items-center justify-center text-[#52565E] hover:bg-[#F5F4F0] hover:text-[#0B0C0E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="space-y-5 py-4">
                <div className="p-5 bg-[#F5F4F0] border border-[#E2E0DA] space-y-2">
                  <p className="text-sm font-semibold text-[#0B0C0E]">Request prepared for {name}</p>
                  <p className="text-sm text-[#52565E] leading-relaxed">
                    Selected: <span className="font-medium text-[#0B0C0E]">{selectedItems.map((s) => s.title).join(', ')}</span>{' '}
                    (<span className="font-mono tabular-nums">${total.toFixed(2)}</span>). Dispatch directly to{' '}
                    <a
                      href={`mailto:${contactEmail}?subject=${encodeURIComponent(
                        `Booking Request: ${selectedItems.map((s) => s.title).join(', ')}`
                      )}&body=${encodeURIComponent(
                        `Name: ${name}\nEmail: ${email}\nFocus Area: ${focusArea}\nSelected: ${selectedItems
                          .map((s) => `${s.title} ($${s.price})`)
                          .join(', ')}\n\nNotes:\n${notes}`
                      )}`}
                      className="text-[#163A5F] font-semibold underline"
                    >
                      {contactEmail}
                    </a>{' '}
                    for scheduling and fulfillment.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full py-3 px-4 text-xs font-semibold tracking-wide text-white bg-[#0B0C0E] hover:bg-[#163A5F] transition-colors min-h-[44px]"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="bg-[#F5F4F0] border border-[#E2E0DA] p-4 space-y-2">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <span className="text-[#52565E]">{item.title}</span>
                      <span className="font-mono font-medium text-[#0B0C0E] tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#E2E0DA] flex items-center justify-between text-sm font-semibold text-[#0B0C0E]">
                    <span>Total</span>
                    <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                  </div>
                </div>

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
                    <option>E-Book Access Only</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="booking-notes" className="block text-xs font-semibold text-[#0B0C0E] mb-1.5">
                    Context or Preferred Schedule (Optional)
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share your goals, timezone, or questions..."
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
                  className="w-full py-3.5 px-4 text-xs font-semibold tracking-wide text-white bg-[#0B0C0E] hover:bg-[#163A5F] transition-colors min-h-[44px]"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
