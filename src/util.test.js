import { describe, it, expect } from 'vitest';
import { timeSince, average } from './util';


describe('timeSince', () => {
    it('returns years for dates more than a year ago', () => {
        const twoYearsAgo = new Date(Date.now() - 2 * 365 * 24 * 60 * 60 * 1000);
        expect(timeSince(twoYearsAgo)).toBe('2 years');
    });

    it('returns months for dates a few months ago', () => {
        const threeMonthsAgo = new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000);
        expect(timeSince(threeMonthsAgo)).toBe('3 months');
    });

    it('returns days for dates a few days ago', () => {
        const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
        expect(timeSince(threeDaysAgo)).toBe('3 days');
    });

    it('returns hours for dates a few hours ago', () => {
        const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
        expect(timeSince(threeHoursAgo)).toBe('3 hours');
    });

    it('returns minutes for dates a few minutes ago', () => {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        expect(timeSince(fiveMinutesAgo)).toBe('5 minutes');
    });

    it('returns seconds for very recent dates', () => {
        const tenSecondsAgo = new Date(Date.now() - 10 * 1000);
        expect(timeSince(tenSecondsAgo)).toBe('10 seconds');
    });
});

describe('average', () => {
    it('calculates average of values', () => {
        expect(average([2, 4, 6])).toBe(4);
    });

    it('returns the value for single-element array', () => {
        expect(average([5])).toBe(5);
    });
});
