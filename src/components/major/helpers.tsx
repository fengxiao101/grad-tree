import React from 'react';

// Small pieces shared across the program requirement UI.

export function renderNoteWithLinks(text: string): React.ReactNode[] {
  const urlRegex = /https?:\/\/[^\s]+|(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:edu|com|org|net|gov|io)(?:\/[^\s]*)?/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const url = match[0];
    const href = url.startsWith('http') ? url : `https://${url}`;
    parts.push(
      <a key={match.index} href={href} target="_blank" rel="noopener noreferrer"
        className="underline hover:text-blue-600" onClick={e => e.stopPropagation()}>
        {url}
      </a>
    );
    lastIndex = match.index + url.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function getAccent(color: 'green' | 'teal' | 'sky') {
  return {
    green: { select: 'border-cardinal-200 focus:ring-cardinal-300 text-cardinal-800', pill: 'bg-cardinal-50 text-cardinal-700' },
    teal:  { select: 'border-teal-200 focus:ring-teal-300 text-teal-800',             pill: 'bg-teal-50 text-teal-700' },
    sky:   { select: 'border-sky-200 focus:ring-sky-300 text-sky-800',                pill: 'bg-sky-50 text-sky-700' },
  }[color];
}


export const EMPTY_FILL = { checked: false, note: '' };
