'use client';

import type { ReactNode } from 'react';

/* Yönetim panelinde tekrar eden küçük parçalar.
   Hepsi telefonda rahat kullanılacak ölçüde tasarlandı. */

export const inputClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-body ' +
  'placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none';

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-[14px] font-medium text-ink">
        {label}
      </label>
      {hint && <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{hint}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-card border border-line bg-white p-5 sm:p-7 ${className}`}>
      {children}
    </div>
  );
}

export function Toast({ message, tone }: { message: string; tone: 'ok' | 'error' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 left-1/2 z-[90] w-[min(92vw,26rem)] -translate-x-1/2 rounded-2xl px-5 py-3.5 text-[14px] shadow-float ${
        tone === 'ok' ? 'bg-ink text-white' : 'bg-[#B42318] text-white'
      }`}
    >
      {message}
    </div>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-card border border-dashed border-line px-6 py-12 text-center">
      <p className="text-[15px] text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-[46ch] text-[13px] leading-relaxed text-muted">{text}</p>
    </div>
  );
}

export function Spinner({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`animate-spin ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 00-9-9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
