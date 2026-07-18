import { describe, it, expect } from 'vitest';
import { askGemini } from '../services/gemini';
import { faqs } from '../utils/faqs';

describe('Gemini AI Fallback Service', () => {
  it('resolves general queries with dynamic offline mock replies', async () => {
    const res = await askGemini('Tell me about quantum computing.');
    expect(res.text).toContain('Regarding');
  });

  it('detects emergency queries and maps focal coordinates', async () => {
    const res = await askGemini('There is an emergency near Gate A');
    expect(res.text.includes('EMERGENCY') || res.text.includes('EMERGENCIA')).toBe(true);
    expect(res.action?.type).toBe('focus');
    expect(res.action?.targetId).toBe('exit-n');
  });

  it('detects wheelchair queries and recommends ADA routes', async () => {
    const res = await askGemini('Where is the wheelchair access path?');
    expect(res.text.includes('ACCESSIBILITY') || res.text.includes('ACCESIBILIDAD')).toBe(true);
    expect(res.action?.type).toBe('route');
    expect(res.action?.targetId).toBe('gate-a');
    expect(res.action?.routeType).toBe('wheelchair');
  });
});

describe('FAQs Dictionary Data Model', () => {
  it('defines exactly 50 distinct FAQs', () => {
    expect(faqs.length).toBe(50);
  });

  it('structures questions with localized dictionary keys', () => {
    faqs.forEach(faq => {
      expect(faq.id).toBeDefined();
      expect(faq.category).toBeDefined();
      expect(faq.question.en).toBeDefined();
      expect(faq.question.es).toBeDefined();
      expect(faq.question.pt).toBeDefined();
    });
  });
});