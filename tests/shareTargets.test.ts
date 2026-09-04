/**
 * Guards the share menu after Header and PrintView were collapsed onto one
 * implementation. The expected URLs below were derived from the two original
 * inline arrays, so a diff here means a share link changed.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SITE_URL, buildShareTargets } from '../src/components/shareTargets';

const opened: string[] = [];

beforeEach(() => {
  opened.length = 0;
  vi.stubGlobal('window', { open: (href: string) => { opened.push(href); } });
});
afterEach(() => vi.unstubAllGlobals());

/** Fires every target and returns the URL each one opened. */
function urlsFor(options: Parameters<typeof buildShareTargets>[0]) {
  const out: Record<string, string> = {};
  for (const target of buildShareTargets(options)) {
    opened.length = 0;
    target.action();
    out[target.label] = opened[0];
  }
  return out;
}

const MESSAGE = 'Plan your Stanford degree for free with Grad Tree';

describe('buildShareTargets', () => {
  it('defaults to the site URL', () => {
    expect(SITE_URL).toBe('https://gradtree.app');
  });

  it('builds the header share links', () => {
    expect(urlsFor({ message: MESSAGE, emailSubject: 'Grad Tree - Stanford Degree Planner' }))
      .toMatchSnapshot();
  });

  it('builds the print dialog share links', () => {
    expect(urlsFor({
      message: MESSAGE,
      emailSubject: 'My Grad Tree Degree Plan',
      iconSize: 13,
      xLabel: 'X',
    })).toMatchSnapshot();
  });

  it('differs between the two only in the mail subject', () => {
    // Compared by position: the X target is deliberately labelled differently
    // on each side, so labels are not shared keys.
    const header = Object.values(urlsFor({ message: MESSAGE, emailSubject: 'Grad Tree - Stanford Degree Planner' }));
    const print = Object.values(urlsFor({ message: MESSAGE, emailSubject: 'My Grad Tree Degree Plan', xLabel: 'X' }));
    const differingIndexes = header.map((url, i) => (url === print[i] ? null : i)).filter(i => i !== null);
    expect(differingIndexes).toEqual([3]); // index 3 is Email
  });

  it('keeps the platform order and labels each side expects', () => {
    const labels = (o: Parameters<typeof buildShareTargets>[0]) =>
      buildShareTargets(o).map(t => t.label);
    expect(labels({ message: MESSAGE, emailSubject: 'x' }))
      .toEqual(['Messages', 'WhatsApp', 'Telegram', 'Email', 'X / Twitter', 'Reddit', 'Facebook', 'LinkedIn']);
    expect(labels({ message: MESSAGE, emailSubject: 'x', xLabel: 'X' }))
      .toEqual(['Messages', 'WhatsApp', 'Telegram', 'Email', 'X', 'Reddit', 'Facebook', 'LinkedIn']);
  });

  it('applies the requested icon size', () => {
    const icons = buildShareTargets({ message: MESSAGE, emailSubject: 'x', iconSize: 13 });
    const sizes = icons.map(t => (t.icon as { props?: { size?: number; width?: number } })?.props);
    expect(sizes.every(p => p?.size === 13 || p?.width === 13)).toBe(true);
  });
});
